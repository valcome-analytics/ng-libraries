/* tslint:disable */

//@ts-nocheck
import { ParserError } from '@angular/compiler';

export class ColorUtils {

  public static hexToRGB(hex: string): [number, number, number] {
    const normalizedHex = hex.replace('#', '');

    if (normalizedHex.length === 6) {
      const r = parseInt(normalizedHex.substring(0, 2), 16);
      const g = parseInt(normalizedHex.substring(2, 4), 16);
      const b = parseInt(normalizedHex.substring(4, 6), 16);
      return [r, g, b];
    } else {
      throw new ParserError('Invalid hex length. hex must have a length of 6');
    }
  }

  public static rgbToHex(rgb: number[]) {
    return '#' + this.componentToHex(rgb[0]) + this.componentToHex(rgb[1]) + this.componentToHex(rgb[2]);
  }

  public static getTextColor(color: string, dark: string = '#000000'): string {
    const [red, green, blue] = this.hexToRGB(color);

    if ((red * 0.299 + green * 0.587 + blue * 0.114) > 186) {
      return dark;
    } else {
      return '#ffffff';
    }
  }

  public static mixColors(color1: number[], color2: number[], weight: number): number[] {
    let w1: number = weight;
    let w2: number = 1 - w1;
    return [Math.round(color1[0] * w1 + color2[0] * w2),
      Math.round(color1[1] * w1 + color2[1] * w2),
      Math.round(color1[2] * w1 + color2[2] * w2)];
  }

  public static getTrafficColorScale(value: number,
                                     red: number[] = [229, 53, 68],
                                     yellow: number[] = [255, 226, 28],
                                     green: number[] = [68, 210, 48]): string {

    let result: number[];

    if (value < .5) {
      result = ColorUtils.mixColors(yellow, red, value + value);
    } else {
      result = ColorUtils.mixColors(green, yellow, (value - 0.5) * 2);
    }

    return ColorUtils.rgbToHex(result);
  }

  // pSBC Version 4.0
  public static shadeBlendConvert(p, c0, c1?: string | boolean, l?: boolean = null) {
    let r, g, b, P, f, t, h, i = parseInt, m = Math.round, a = typeof (c1) == 'string';
    if (typeof (p) != 'number' || p < -1 || p > 1 || typeof (c0) != 'string' || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) {
      return null;
    }
    if (!this.pSBCr) {
      this.pSBCr = (d) => {
        let n = d.length, x = {};
        if (n > 9) {
          [r, g, b, a] = d = d.split(','), n = d.length;
          if (n < 3 || n > 4) {
            return null;
          }
          x.r = i(r[3] == 'a' ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1;
        } else {
          if (n == 8 || n == 6 || n < 4) {
            return null;
          }
          if (n < 6) {
            d = '#' + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : '');
          }
          d = i(d.slice(1), 16);
          if (n == 9 || n == 5) {
            x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000;
          } else {
            x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1;
          }
        }
        return x;
      };
    }
    h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == 'c' ? !h : false : h, f = this.pSBCr(c0), P = p < 0, t = c1 && c1 != 'c' ? this.pSBCr(c1) : P ? {
      r: 0,
      g: 0,
      b: 0,
      a: -1
    } : { r: 255, g: 255, b: 255, a: -1 }, p = P ? p * -1 : p, P = 1 - p;
    if (!f || !t) {
      return null;
    }
    if (l) {
      r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b);
    } else {
      r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5);
    }
    a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
    if (h) {
      return 'rgb' + (f ? 'a(' : '(') + r + ',' + g + ',' + b + (f ? ',' + m(a * 1000) / 1000 : '') + ')';
    } else {
      return '#' + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2);
    }
  }

  private static componentToHex(c: number) {
    let hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }
}
