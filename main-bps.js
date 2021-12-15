var _0x2386 = ['async', 'cocos2d-js.js', 'cocos2d-js-min.js', '?cbid=', 'removeChild', 'removeEventListener', 'addEventListener', 'load', 'body', 'appendChild', '_CCSettings', 'rawAssets', 'assetTypes', 'number', 'view', 'resizeWithBrowserSize', 'sys', 'isMobile', 'landscape', 'setOrientation', 'ORIENTATION_LANDSCAPE', 'portrait', 'macro', 'ORIENTATION_PORTRAIT', 'enableAutoFullScreen', 'browserType', 'BROWSER_TYPE_MOBILE_QQ', 'AssetLibrary', 'init', 'gameContentBasePath', 'res/import', 'res/raw-', 'runtime', 'director', 'setRuntimeLaunchScene', 'loadScene', 'isBrowser', 'getElementById', 'GameCanvas', 'GameDiv', 'style', 'backgroundImage', 'debug', 'project.js', 'push', 'map', 'platformSrcDir', 'getCBID', 'scenes', 'DebugMode', 'INFO', 'ERROR', 'groupList', 'collisionMatrix', 'game', 'run'];
(function(_0x23239e, _0x41f602) {
    var _0x22512f = function(_0x3d20d1) {
        while (--_0x3d20d1) {
            _0x23239e['push'](_0x23239e['shift']());
        }
    };
    _0x22512f(++_0x41f602);
}(_0x2386, 0x192));
var _0x26a4 = function(_0x2d8f05, _0x4b81bb) {
    _0x2d8f05 = _0x2d8f05 - 0x0;
    var _0x4d74cb = _0x2386[_0x2d8f05];
    return _0x4d74cb;
};
(function() {
    'use strict';

    function _0x3e0215() {
        var _0x4825c9 = window['_CCSettings'];
        window[_0x26a4('0x0')] = undefined;
        if (!_0x4825c9['debug']) {
            var _0xbbec30 = _0x4825c9[_0x26a4('0x1')];
            var _0x17b55b = _0x4825c9[_0x26a4('0x2')];
            for (var _0x3472fc in _0xbbec30) {
                var _0x4cd6f5 = _0xbbec30[_0x3472fc];
                for (var _0x4093a8 in _0x4cd6f5) {
                    var _0x2431ec = _0x4cd6f5[_0x4093a8];
                    var _0x4dc98a = _0x2431ec[0x1];
                    if (typeof _0x4dc98a === _0x26a4('0x3')) {
                        _0x2431ec[0x1] = _0x17b55b[_0x4dc98a];
                    }
                }
            }
        }
        var _0x28482e = function() {
            cc[_0x26a4('0x4')][_0x26a4('0x5')](!![]);
            if (cc[_0x26a4('0x6')][_0x26a4('0x7')]) {
                if (_0x4825c9['orientation'] === _0x26a4('0x8')) {
                    cc[_0x26a4('0x4')][_0x26a4('0x9')](cc['macro'][_0x26a4('0xa')]);
                } else if (_0x4825c9['orientation'] === _0x26a4('0xb')) {
                    cc[_0x26a4('0x4')][_0x26a4('0x9')](cc[_0x26a4('0xc')][_0x26a4('0xd')]);
                }
                cc[_0x26a4('0x4')][_0x26a4('0xe')](cc['sys']['browserType'] !== cc[_0x26a4('0x6')]['BROWSER_TYPE_BAIDU'] && cc[_0x26a4('0x6')]['browserType'] !== cc['sys']['BROWSER_TYPE_WECHAT'] && cc[_0x26a4('0x6')][_0x26a4('0xf')] !== cc[_0x26a4('0x6')][_0x26a4('0x10')]);
            }
            cc[_0x26a4('0x11')][_0x26a4('0x12')]({
                'libraryPath': window[_0x26a4('0x13')] + _0x26a4('0x14'),
                'rawAssetsBase': window['gameContentBasePath'] + _0x26a4('0x15'),
                'rawAssets': _0x4825c9[_0x26a4('0x1')],
                'packedAssets': _0x4825c9['packedAssets']
            });
            var _0x11e2de = _0x4825c9['launchScene'];
            if (cc[_0x26a4('0x16')]) {
                cc[_0x26a4('0x17')][_0x26a4('0x18')](_0x11e2de);
            }
            cc[_0x26a4('0x17')][_0x26a4('0x19')](_0x11e2de, null, function() {
                if (cc[_0x26a4('0x6')][_0x26a4('0x1a')]) {
                    var _0x31cecd = document[_0x26a4('0x1b')](_0x26a4('0x1c'));
                    _0x31cecd['style']['visibility'] = '';
                    var _0x30832d = document[_0x26a4('0x1b')](_0x26a4('0x1d'));
                    if (_0x30832d) {
                        _0x30832d[_0x26a4('0x1e')][_0x26a4('0x1f')] = '';
                    }
                }
            });
        };
        var _0x273e6a = _0x4825c9['jsList'];
        var _0x5930b4 = _0x4825c9[_0x26a4('0x20')] ? 'project.dev.js' : _0x26a4('0x21');
        if (_0x273e6a) {
            _0x273e6a[_0x26a4('0x22')](_0x5930b4);
        } else {
            _0x273e6a = [_0x5930b4];
        }
        _0x273e6a = _0x273e6a[_0x26a4('0x23')](function(_0x4ba507) {
            return window[_0x26a4('0x24')] + _0x4ba507 + '?cbid=' + window[_0x26a4('0x25')]();
        });
        var _0x5be731 = {
            'id': _0x26a4('0x1c'),
            'scenes': _0x4825c9[_0x26a4('0x26')],
            'debugMode': _0x4825c9[_0x26a4('0x20')] ? cc[_0x26a4('0x27')][_0x26a4('0x28')] : cc['DebugMode'][_0x26a4('0x29')],
            'showFPS': _0x4825c9[_0x26a4('0x20')],
            'frameRate': 0x3c,
            'jsList': _0x273e6a,
            'groupList': _0x4825c9[_0x26a4('0x2a')],
            'collisionMatrix': _0x4825c9[_0x26a4('0x2b')],
            'renderMode': 0x0
        };
        cc[_0x26a4('0x2c')][_0x26a4('0x2d')](_0x5be731, _0x28482e);
    }
    if (window['document']) {
        var _0x2e02be = document['createElement']('script');
        _0x2e02be[_0x26a4('0x2e')] = !![];
        _0x2e02be['src'] = window['platformSrcDir'] + (window[_0x26a4('0x0')][_0x26a4('0x20')] ? _0x26a4('0x2f') : _0x26a4('0x30')) + _0x26a4('0x31') + window[_0x26a4('0x25')]();
        var _0x43c828 = function() {
            document['body'][_0x26a4('0x32')](_0x2e02be);
            _0x2e02be[_0x26a4('0x33')]('load', _0x43c828, ![]);
            _0x3e0215();
        };
        _0x2e02be[_0x26a4('0x34')](_0x26a4('0x35'), _0x43c828, ![]);
        document[_0x26a4('0x36')][_0x26a4('0x37')](_0x2e02be);
    }
}());