// tslint:disable: no-any
import express from 'express';

export const userAgentMiddleware = (
  req: any,
  res: express.Response,
  next: express.NextFunction
) => {
  const { body } = req;
  const ip = req.clientIp;
  const userAgent = req.useragent;

  const client = {
    ip,
    browser: userAgent.browser,
    os: userAgent.os,
    platform: userAgent.platform,
    source: userAgent.source,
    version: userAgent.version,
    isYaBrowser: userAgent.isYaBrowser,
    isAuthoritative: userAgent.isAuthoritative,
    isMobile: userAgent.isMobile,
    isMobileNative: userAgent.isMobileNative,
    isTablet: userAgent.isTablet,
    isiPad: userAgent.isiPad,
    isiPod: userAgent.isiPod,
    isiPhone: userAgent.isiPhone,
    isiPhoneNative: userAgent.isiPhoneNative,
    isAndroid: userAgent.isAndroid,
    isAndroidNative: userAgent.isAndroidNative,
    isBlackberry: userAgent.isBlackberry,
    isOpera: userAgent.isOpera,
    isIE: userAgent.isIE,
    isEdge: userAgent.isEdge,
    isIECompatibilityMode: userAgent.isIECompatibilityMode,
    isSafari: userAgent.isSafari,
    isFirefox: userAgent.isFirefox,
    isWebkit: userAgent.isWebkit,
    isChrome: userAgent.isChrome,
    isPhantomJS: userAgent.isPhantomJS,
    isDesktop: userAgent.isDesktop,
    isWindows: userAgent.isWindows,
    isLinux: userAgent.isLinux,
    isLinux64: userAgent.isLinux,
    isMac: userAgent.isMac,
    isChromeOS: userAgent.isChromeOS,
    isSamsung: userAgent.isSamsung,
    isRaspberry: userAgent.isRaspberry,
    isBot: userAgent.isBot,
    isCurl: userAgent.isCurl,
    isAndroidTablet: userAgent.isAndroidTablet,
    isSmartTV: userAgent.isSmartTV,
    isFacebook: userAgent.isFacebook
  };

  req.body = { client, ...body };

  return next();
};
