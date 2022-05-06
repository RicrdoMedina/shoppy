export default class CookieHandlerUtils {
  static get(name: string): null | string {
    if (typeof window !== 'undefined') {
      const match = document.cookie.match(
        new RegExp('(^| )' + name + '=([^;]+)')
      );
      if (match) return match[2];
      return null;
    }

    return null;
  }

  static set(name: string, value: string): void {
    if (typeof window !== 'undefined') {
      document.cookie = name + '=' + value + '; Path=/;';
    }
  }
  static delete(name: string): void {
    if (typeof window !== 'undefined') {
      document.cookie =
        name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }
}
