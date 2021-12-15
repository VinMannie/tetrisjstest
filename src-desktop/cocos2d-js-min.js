(function(t, e, i) {
    function n(i, s) {
        var o = e[i];
        if (!o) {
            var c = t[i];
            if (!c) {
                var a = "function" == typeof require && require;
                if (!s && a) return a(i, !0);
                if (r) return r(i, !0);
                var h = new Error("Cannot find module '" + i + "'");
                throw h.code = "MODULE_NOT_FOUND", h
            }
            var l = {};
            o = e[i] = {
                exports: l
            }, c[0]((function(t) {
                return n(c[1][t] || t)
            }), o, l)
        }
        return o.exports
    }
    for (var r = "function" == typeof require && require, s = 0; s < i.length; s++) n(i[s])
})({
    1: [(function(t, e, i) {}), {}],
    2: [(function(t, e, i) {
        function n() {
            cc._engineLoaded = !0, null, o && o()
        }

        function r() {
            window.removeEventListener("load", r, !1), n()
        }
        cc._LogInfos = cc._LogInfos || {};
        window.CocosEngine = cc.ENGINE_VERSION = "1.9.3", cc._renderContext = null, cc._supportRender = !1, cc._canvas = null, cc.container = null, cc._gameDiv = null, t("./cocos2d/core/utils"), t("./cocos2d/core/platform/CCSys");
        var s = !1,
            o = null;
        cc._engineLoaded = !1, cc.initEngine = function(t, e) {
            if (s) {
                var i = o;
                o = function() {
                    i && i(), e && e()
                }
            } else o = e, !cc.game.config && t ? cc.game.config = t : cc.game.config || cc.game._loadConfig(), (function(t) {
                var e = cc.game.CONFIG_KEY,
                    i = parseInt(t[e.renderMode]) || 0;
                (isNaN(i) || i > 2 || i < 0) && (t[e.renderMode] = 0), cc._renderType = cc.game.RENDER_TYPE_CANVAS, cc._supportRender = !1, 0 === i ? cc.sys.capabilities.opengl ? (cc._renderType = cc.game.RENDER_TYPE_WEBGL, cc._supportRender = !0) : cc.sys.capabilities.canvas && (cc._renderType = cc.game.RENDER_TYPE_CANVAS, cc._supportRender = !0) : 1 === i && cc.sys.capabilities.canvas ? (cc._renderType = cc.game.RENDER_TYPE_CANVAS, cc._supportRender = !0) : 2 === i && cc.sys.capabilities.opengl && (cc._renderType = cc.game.RENDER_TYPE_WEBGL, cc._supportRender = !0)
            })(t = cc.game.config), document.body ? n() : window.addEventListener("load", r, !1), s = !0
        }
    }), {
        "./cocos2d/core/platform/CCSys": 88,
        "./cocos2d/core/utils": 127
    }],
    3: [(function(t, e, i) {
        function n(t, e) {
            return function(i) {
                "use strict";
                if (1 !== arguments.length) {
                    var n = "";
                    2 === arguments.length ? n = "Arguments: " + arguments[1] : arguments.length > 2 && (n = "Arguments: " + cc.js.shiftArguments.apply(null, arguments).join(", ")), t(e + " " + i + ", please go to " + o + "#" + i + " to see details. " + n)
                } else t(e + " " + i + ", please go to " + o + "#" + i + " to see details.")
            }
        }
        var r, s = t("./cocos2d/core/platform/CCEnum");
        cc.DebugMode = s({
            NONE: 0,
            INFO: 1,
            WARN: 2,
            ERROR: 3,
            INFO_FOR_WEB_PAGE: 4,
            WARN_FOR_WEB_PAGE: 5,
            ERROR_FOR_WEB_PAGE: 6
        }), cc._initDebugSetting = function(t) {
            if (cc.log = cc.logID = cc.warn = cc.warnID = cc.error = cc.errorID = cc.assert = cc.assertID = function() {}, t !== cc.DebugMode.NONE) {
                t > cc.DebugMode.ERROR ? (function() {
                    function e(t) {
                        if (cc._canvas) {
                            if (!r) {
                                var e = document.createElement("Div");
                                e.setAttribute("id", "logInfoDiv"), e.setAttribute("width", "200"), e.setAttribute("height", cc._canvas.height);
                                var i = e.style;
                                i.zIndex = "99999", i.position = "absolute", i.top = i.left = "0", (r = document.createElement("textarea")).setAttribute("rows", "20"), r.setAttribute("cols", "30"), r.setAttribute("disabled", "true");
                                var n = r.style;
                                n.backgroundColor = "transparent", n.borderBottom = "1px solid #cccccc", n.borderTopWidth = n.borderLeftWidth = n.borderRightWidth = "0px", n.borderTopStyle = n.borderLeftStyle = n.borderRightStyle = "none", n.padding = "0px", n.margin = 0, e.appendChild(r), cc._canvas.parentNode.appendChild(e)
                            }
                            r.value = r.value + t + "\r\n", r.scrollTop = r.scrollHeight
                        }
                    }
                    cc.error = function() {
                        e("ERROR :  " + cc.js.formatStr.apply(null, arguments))
                    }, cc.assert = function(t, i) {
                        "use strict";
                        !t && i && e("ASSERT: " + (i = cc.js.formatStr.apply(null, cc.js.shiftArguments.apply(null, arguments))))
                    }, t !== cc.DebugMode.ERROR_FOR_WEB_PAGE && (cc.warn = function() {
                        e("WARN :  " + cc.js.formatStr.apply(null, arguments))
                    }), t === cc.DebugMode.INFO_FOR_WEB_PAGE && (cc.log = cc.info = function() {
                        e(cc.js.formatStr.apply(null, arguments))
                    })
                })() : console && console.log.apply && (console.error || (console.error = console.log), console.warn || (console.warn = console.log), console.error.bind ? cc.error = console.error.bind(console) : cc.error = function() {
                    return console.error.apply(console, arguments)
                }, cc.assert = function(t, e) {
                    if (!t) throw e && (e = cc.js.formatStr.apply(null, cc.js.shiftArguments.apply(null, arguments))), new Error(e)
                }), t !== cc.DebugMode.ERROR && (console.warn.bind ? cc.warn = console.warn.bind(console) : cc.warn = function() {
                    return console.warn.apply(console, arguments)
                }), t === cc.DebugMode.INFO && (console.log.bind ? cc.log = console.log.bind(console) : cc.log = function() {
                    return console.log.apply(console, arguments)
                }, cc.info = function() {
                    (console.info || console.log).apply(console, arguments)
                }), cc.warnID = n(cc.warn, "Warning"), cc.errorID = n(cc.error, "Error"), cc.logID = n(cc.log, "Log");
                var e = n((function() {
                    for (var t = [!1], e = 0; e < arguments.length; ++e) t.push(arguments[e]);
                    cc.assert.apply(null, t)
                }), "Assert");
                cc.assertID = function(t) {
                    "use strict";
                    t || e.apply(null, cc.js.shiftArguments.apply(null, arguments))
                }
            }
        }, cc._throw = function(t) {
            var e = t.stack;
            e ? cc.error(e) : cc.error(t)
        };
        var o = "https://github.com/cocos-creator/engine/blob/master/EngineErrorMap.md"
    }), {
        "./cocos2d/core/platform/CCEnum": 81
    }],
    4: [(function(t, e, i) {}), {}],
    5: [(function(t, e, i) {
        cc.ClippingNode = _ccsg.Node.extend({
            inverted: !1,
            _alphaThreshold: 0,
            _stencil: null,
            _className: "ClippingNode",
            _originStencilProgram: null,
            ctor: function(t) {
                t = t || null, _ccsg.Node.prototype.ctor.call(this), this._stencil = t, t && (this._originStencilProgram = t.getShaderProgram()), this.alphaThreshold = 1, this.inverted = !1, this._renderCmd.initStencilBits()
            },
            onEnter: function() {
                _ccsg.Node.prototype.onEnter.call(this), this._stencil && this._stencil.performRecursive(_ccsg.Node.performType.onEnter)
            },
            onEnterTransitionDidFinish: function() {
                _ccsg.Node.prototype.onEnterTransitionDidFinish.call(this), this._stencil && this._stencil.performRecursive(_ccsg.Node.performType.onEnterTransitionDidFinish)
            },
            onExitTransitionDidStart: function() {
                this._stencil && this._stencil.performRecursive(_ccsg.Node.performType.onExitTransitionDidStart), _ccsg.Node.prototype.onExitTransitionDidStart.call(this)
            },
            onExit: function() {
                this._stencil && this._stencil.performRecursive(_ccsg.Node.performType.onExit), _ccsg.Node.prototype.onExit.call(this)
            },
            visit: function(t) {
                this._renderCmd.clippingVisit(t && t._renderCmd)
            },
            _visitChildren: function() {
                this._reorderChildDirty && this.sortAllChildren();
                for (var t, e = this._children, i = 0, n = e.length; i < n; i++)(t = e[i]) && t._visible && t.visit(this);
                this._renderCmd._dirtyFlag = 0
            },
            getAlphaThreshold: function() {
                return this._alphaThreshold
            },
            setAlphaThreshold: function(t) {
                1 === t && t !== this._alphaThreshold && this._renderCmd.resetProgramByStencil(), this._alphaThreshold = t
            },
            isInverted: function() {
                return this.inverted
            },
            setInverted: function(t) {
                this.inverted = t
            },
            getStencil: function() {
                return this._stencil
            },
            setStencil: function(t) {
                this._stencil !== t && (t && (this._originStencilProgram = t.getShaderProgram()), this._renderCmd.setStencil(t))
            },
            _createRenderCmd: function() {
                return cc._renderType === cc.game.RENDER_TYPE_CANVAS ? new cc.ClippingNode.CanvasRenderCmd(this) : new cc.ClippingNode.WebGLRenderCmd(this)
            }
        }), cc.ClippingNode.stencilBits = -1;
        var n = cc.ClippingNode.prototype;
        cc.defineGetterSetter(n, "stencil", n.getStencil, n.setStencil), cc.defineGetterSetter(n, "alphaThreshold", n.getAlphaThreshold, n.setAlphaThreshold)
    }), {}],
    6: [(function(t, e, i) {
        t("../shape-nodes/CCDrawNode"), cc.ClippingNode.CanvasRenderCmd = function(t) {
            this._rootCtor(t), this._needDraw = !1, this._rendererClipCmd = new cc.CustomRenderCmd(this, this._drawStencilCommand), this._rendererRestoreCmd = new cc.CustomRenderCmd(this, this._restoreCmdCallback)
        };
        var n = cc.ClippingNode.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
        n.constructor = cc.ClippingNode.CanvasRenderCmd, n.resetProgramByStencil = function() {}, n.initStencilBits = function() {}, n.setStencil = function(t) {
            null != t && (this._node._stencil = t, t instanceof cc.DrawNode || cc.errorID(6300))
        }, n._restoreCmdCallback = function(t) {
            (t || cc._renderContext).restore()
        }, n._drawStencilCommand = function(t, e, i) {
            var n = t || cc._renderContext,
                r = n.getContext();
            n.save(), r.beginPath(), n.setTransform(this._worldTransform, e, i);
            for (var s = this._node._stencil._buffer, o = 0; o < s.length; ++o) {
                var c = s[o].verts;
                if (!(c.length < 3)) {
                    r.moveTo(c[0].x, -c[0].y);
                    for (var a = 1; a < c.length; ++a) r.lineTo(c[a].x, -c[a].y)
                }
            }
            r.clip()
        }, n.clippingVisit = function(t) {
            var e = this._node;
            if (t = t || this.getParentRenderCmd(), this._propagateFlagsDown(t), e._visible) {
                t && (this._curLevel = t._curLevel + 1), this._syncStatus(t), e._stencil && cc.renderer.pushRenderCommand(this._rendererClipCmd);
                var i, n = e._children,
                    r = n.length;
                if (r > 0)
                    for (e.sortAllChildren(), i = 0; i < r; i++) n[i].visit(e);
                e._stencil && cc.renderer.pushRenderCommand(this._rendererRestoreCmd), this._dirtyFlag = 0
            }
        }
    }), {
        "../shape-nodes/CCDrawNode": 162
    }],
    7: [(function(t, e, i) {
        function n(t, e) {
            t.shaderProgram = e;
            var i = t.children;
            if (i)
                for (var r = 0; r < i.length; r++) n(i[r], e)
        }
        t("../core/CCDrawingPrimitives");
        var r = {
            stencilEnabled: !1,
            depthWriteMask: !0
        };
        cc.ClippingNode.WebGLRenderCmd = function(t) {
            this._rootCtor(t), this._needDraw = !1, this._beforeVisitCmd = new cc.CustomRenderCmd(this, this._onBeforeVisit), this._afterDrawStencilCmd = new cc.CustomRenderCmd(this, this._onAfterDrawStencil), this._afterVisitCmd = new cc.CustomRenderCmd(this, this._onAfterVisit), this._previousState = null, this._state = {
                stencilEnabled: !0,
                stencilWriteMask: 0,
                depthWriteMask: !1,
                stencilFunc: 0,
                stencilRef: 0,
                stencilValueMask: 0
            }
        };
        var s = cc.ClippingNode.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
        s.constructor = cc.ClippingNode.WebGLRenderCmd, cc.ClippingNode.WebGLRenderCmd._init_once = null, cc.ClippingNode.WebGLRenderCmd._visit_once = null, cc.ClippingNode.WebGLRenderCmd._layer = -1, s.initStencilBits = function() {
            cc.ClippingNode.WebGLRenderCmd._init_once = !0, cc.ClippingNode.WebGLRenderCmd._init_once && (cc.ClippingNode.stencilBits = cc._renderContext.getParameter(cc._renderContext.STENCIL_BITS), cc.ClippingNode.stencilBits <= 0 && cc.logID(6301), cc.ClippingNode.WebGLRenderCmd._init_once = !1)
        }, s.transform = function(t, e) {
            var i = this._node;
            this.originTransform(t, e), i._stencil && (i._stencil._renderCmd.transform(this, !0), i._stencil._dirtyFlag &= ~_ccsg.Node._dirtyFlags.transformDirty)
        }, s.clippingVisit = function(t) {
            var e = this._node;
            if (t = t || this.getParentRenderCmd(), this.visit(t), cc.ClippingNode.stencilBits < 1) e._visitChildren();
            else if (e._stencil && e._stencil.visible) {
                if (cc.ClippingNode.WebGLRenderCmd._layer + 1 === cc.ClippingNode.stencilBits) return cc.ClippingNode.WebGLRenderCmd._visit_once = !0, cc.ClippingNode.WebGLRenderCmd._visit_once && (cc.logID(6302, cc.ClippingNode.stencilBits), cc.ClippingNode.WebGLRenderCmd._visit_once = !1), void e._visitChildren();
                cc.renderer.pushRenderCommand(this._beforeVisitCmd), e._stencil.visit(e), cc.renderer.pushRenderCommand(this._afterDrawStencilCmd);
                var i = e._children;
                if (i && i.length > 0) {
                    var n = i.length;
                    e.sortAllChildren();
                    for (var r = 0; r < n; r++) i[r].visit(e)
                }
                cc.renderer.pushRenderCommand(this._afterVisitCmd), this._dirtyFlag = 0
            } else e.inverted && e._visitChildren()
        }, s.setStencil = function(t) {
            var e = this._node;
            e._stencil && (e._stencil._parent = null), e._stencil = t, e._stencil && (e._stencil._parent = e)
        }, s._drawFullScreenQuadClearStencil = function() {
            var t = cc.math.projection_matrix_stack;
            t.push(), t.top.identity();
            var e = cc.math.modelview_matrix_stack;
            e.push(), e.top.identity(), cc._drawingUtil.drawSolidRect(cc.p(-1, -1), cc.p(1, 1), cc.color(255, 255, 255, 255)), t.pop(), e.pop()
        }, s.resetProgramByStencil = function() {
            var t = this._node;
            if (t._stencil) {
                var e = t._originStencilProgram;
                n(t._stencil, e)
            }
        }, s._onBeforeVisit = function(t) {
            var e = t || cc._renderContext,
                i = this._node;
            cc.ClippingNode.WebGLRenderCmd._layer++;
            var s = 1 << cc.ClippingNode.WebGLRenderCmd._layer,
                o = s | s - 1;
            if (this._previousState = r, e.enable(e.STENCIL_TEST), e.stencilMask(s), e.depthMask(!1), e.stencilFunc(e.NEVER, s, s), e.stencilOp(this._node.inverted ? e.REPLACE : e.ZERO, e.KEEP, e.KEEP), this._drawFullScreenQuadClearStencil(), e.stencilFunc(e.NEVER, s, s), e.stencilOp(this._node.inverted ? e.ZERO : e.REPLACE, e.KEEP, e.KEEP), i.alphaThreshold < 1) {
                var c = cc.shaderCache.programForKey(cc.macro.SHADER_POSITION_TEXTURECOLORALPHATEST);
                cc.gl.useProgram(c.getProgram()), c.setUniformLocationWith1f(cc.macro.UNIFORM_ALPHA_TEST_VALUE_S, i.alphaThreshold), c.setUniformLocationWithMatrix4fv(cc.macro.UNIFORM_MVMATRIX_S, cc.renderer.mat4Identity.mat), n(i._stencil, c)
            }
            this._state.stencilWriteMask = s, this._state.stencilRef = this._state.stencilValueMask = o, this._state.stencilFunc = e.NEVER, r = this._state
        }, s._onAfterDrawStencil = function(t) {
            var e = t || cc._renderContext;
            e.depthMask(this._previousState.depthWriteMask), e.stencilFunc(e.EQUAL, this._state.stencilRef, this._state.stencilValueMask), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), this._state.stencilFunc = e.EQUAL
        }, s._onAfterVisit = function(t) {
            var e = t || cc._renderContext,
                i = this._previousState;
            i.stencilEnabled ? (e.stencilFunc(i.stencilFunc, i.stencilRef, i.stencilValueMask), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.stencilMask(i.stencilWriteMask)) : e.disable(e.STENCIL_TEST), r = this._previousState, this._previousState = null, cc.ClippingNode.WebGLRenderCmd._layer--
        }
    }), {
        "../core/CCDrawingPrimitives": 12
    }],
    8: [(function(t, e, i) {
        cc.configuration = {
            ERROR: 0,
            STRING: 1,
            INT: 2,
            DOUBLE: 3,
            BOOLEAN: 4,
            _maxTextureSize: 0,
            _maxModelviewStackDepth: 0,
            _supportsPVRTC: !1,
            _supportsNPOT: !1,
            _supportsBGRA8888: !1,
            _supportsDiscardFramebuffer: !1,
            _supportsShareableVAO: !1,
            _maxSamplesAllowed: 0,
            _maxTextureUnits: 0,
            _GlExtensions: "",
            _valueDict: {},
            _inited: !1,
            _init: function() {
                var t = this._valueDict;
                t["cocos2d.x.version"] = cc.ENGINE_VERSION, t["cocos2d.x.compiled_with_profiler"] = !1, t["cocos2d.x.compiled_with_gl_state_cache"] = cc.macro.ENABLE_GL_STATE_CACHE, this._inited = !0
            },
            getMaxTextureSize: function() {
                return this._maxTextureSize
            },
            getMaxModelviewStackDepth: function() {
                return this._maxModelviewStackDepth
            },
            getMaxTextureUnits: function() {
                return this._maxTextureUnits
            },
            supportsNPOT: function() {
                return this._supportsNPOT
            },
            supportsPVRTC: function() {
                return this._supportsPVRTC
            },
            supportsETC: function() {
                return !1
            },
            supportsS3TC: function() {
                return !1
            },
            supportsATITC: function() {
                return !1
            },
            supportsBGRA8888: function() {
                return this._supportsBGRA8888
            },
            supportsDiscardFramebuffer: function() {
                return this._supportsDiscardFramebuffer
            },
            supportsShareableVAO: function() {
                return this._supportsShareableVAO
            },
            checkForGLExtension: function(t) {
                return this._GlExtensions.indexOf(t) > -1
            },
            getValue: function(t, e) {
                this._inited || this._init();
                var i = this._valueDict;
                return i[t] ? i[t] : e
            },
            setValue: function(t, e) {
                this._valueDict[t] = e
            },
            gatherGPUInfo: function() {
                if (cc._renderType !== cc.game.RENDER_TYPE_CANVAS) {
                    this._inited || this._init();
                    var t = cc._renderContext,
                        e = this._valueDict;
                    e["gl.vendor"] = t.getParameter(t.VENDOR), e["gl.renderer"] = t.getParameter(t.RENDERER), e["gl.version"] = t.getParameter(t.VERSION), this._GlExtensions = "";
                    for (var i = t.getSupportedExtensions(), n = 0; n < i.length; n++) this._GlExtensions += i[n] + " ";
                    this._maxTextureSize = t.getParameter(t.MAX_TEXTURE_SIZE), e["gl.max_texture_size"] = this._maxTextureSize, this._maxTextureUnits = t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS), e["gl.max_texture_units"] = this._maxTextureUnits, this._supportsPVRTC = this.checkForGLExtension("GL_IMG_texture_compression_pvrtc"), e["gl.supports_PVRTC"] = this._supportsPVRTC, this._supportsNPOT = !0, e["gl.supports_NPOT"] = this._supportsNPOT, this._supportsBGRA8888 = this.checkForGLExtension("GL_IMG_texture_format_BGRA888"), e["gl.supports_BGRA8888"] = this._supportsBGRA8888, this._supportsDiscardFramebuffer = this.checkForGLExtension("GL_EXT_discard_framebuffer"), e["gl.supports_discard_framebuffer"] = this._supportsDiscardFramebuffer, this._supportsShareableVAO = this.checkForGLExtension("vertex_array_object"), e["gl.supports_vertex_array_object"] = this._supportsShareableVAO, cc.checkGLErrorDebug()
                }
            },
            loadConfigFile: function(t) {
                this._inited || this._init();
                var e = cc.loader.getRes(t);
                if (!e) throw new Error("Please load the resource first : " + t);
                cc.assertID(e, 1101, t);
                var i = e.data;
                if (i)
                    for (var n in i) this._valueDict[n] = i[n];
                else cc.logID(1100, t)
            }
        }
    }), {}],
    9: [(function(t, e, i) {
        var n = t("./event/event-target"),
            r = t("./platform/_CCClass"),
            s = t("./load-pipeline/auto-release-utils"),
            o = t("./component-scheduler"),
            c = t("./node-activator"),
            a = t("./event/event-listeners"),
            h = t("./event-manager");
        cc.g_NumberOfDraws = 0, cc.Director = r.extend({
            ctor: function() {
                var t = this;
                n.call(t), t._landscape = !1, t._nextDeltaTimeZero = !1, t._paused = !1, t._purgeDirectorInNextLoop = !1, t._sendCleanupToScene = !1, t._animationInterval = 0, t._oldAnimationInterval = 0, t._projection = 0, t._projectionDelegate = null, t._contentScaleFactor = 1, t._winSizeInPoints = null, t._openGLView = null, t._scenesStack = null, t._nextScene = null, t._loadingScene = "", t._runningScene = null, t._scene = null, t._totalFrames = 0, t._lastUpdate = Date.now(), t._deltaTime = 0, t._dirtyRegion = null, t._scheduler = null, t._compScheduler = null, t._nodeActivator = null, t._actionManager = null, cc.game.on(cc.game.EVENT_SHOW, (function() {
                    t._lastUpdate = Date.now()
                }))
            },
            init: function() {
                return this._oldAnimationInterval = this._animationInterval = 1 / cc.defaultFPS, this._scenesStack = [], this._projection = cc.Director.PROJECTION_DEFAULT, this._projectionDelegate = null, this._totalFrames = 0, this._lastUpdate = Date.now(), this._paused = !1, this._purgeDirectorInNextLoop = !1, this._winSizeInPoints = cc.size(0, 0), this._openGLView = null, this._contentScaleFactor = 1, this._scheduler = new cc.Scheduler, cc.ActionManager ? (this._actionManager = new cc.ActionManager, this._scheduler.scheduleUpdate(this._actionManager, cc.Scheduler.PRIORITY_SYSTEM, !1)) : this._actionManager = null, this.sharedInit(), !0
            },
            sharedInit: function() {
                this._compScheduler = new o, this._nodeActivator = new c, cc.AnimationManager ? (this._animationManager = new cc.AnimationManager, this._scheduler.scheduleUpdate(this._animationManager, cc.Scheduler.PRIORITY_SYSTEM, !1)) : this._animationManager = null, cc.CollisionManager ? (this._collisionManager = new cc.CollisionManager, this._scheduler.scheduleUpdate(this._collisionManager, cc.Scheduler.PRIORITY_SYSTEM, !1)) : this._collisionManager = null, cc.PhysicsManager ? (this._physicsManager = new cc.PhysicsManager, this._scheduler.scheduleUpdate(this._physicsManager, cc.Scheduler.PRIORITY_SYSTEM, !1)) : this._physicsManager = null, cc._widgetManager && cc._widgetManager.init(this), cc.loader.init(this)
            },
            calculateDeltaTime: function() {
                var t = Date.now();
                this._nextDeltaTimeZero ? (this._deltaTime = 0, this._nextDeltaTimeZero = !1) : (this._deltaTime = (t - this._lastUpdate) / 1e3, cc.game.config[cc.game.CONFIG_KEY.debugMode] > 0 && this._deltaTime > 1 && (this._deltaTime = 1 / 60)), this._lastUpdate = t
            },
            convertToGL: function(t) {
                var e = cc.game.container,
                    i = cc.view,
                    n = e.getBoundingClientRect(),
                    r = n.left + window.pageXOffset - e.clientLeft,
                    s = n.top + window.pageYOffset - e.clientTop,
                    o = i._devicePixelRatio * (t.x - r),
                    c = i._devicePixelRatio * (s + n.height - t.y);
                return i._isRotated ? {
                    x: i._viewPortRect.width - c,
                    y: o
                } : {
                    x: o,
                    y: c
                }
            },
            convertToUI: function(t) {
                var e = cc.game.container,
                    i = cc.view,
                    n = e.getBoundingClientRect(),
                    r = n.left + window.pageXOffset - e.clientLeft,
                    s = n.top + window.pageYOffset - e.clientTop,
                    o = {
                        x: 0,
                        y: 0
                    };
                return i._isRotated ? (o.x = r + t.y / i._devicePixelRatio, o.y = s + n.height - (i._viewPortRect.width - t.x) / i._devicePixelRatio) : (o.x = r + t.x * i._devicePixelRatio, o.y = s + n.height - t.y * i._devicePixelRatio), o
            },
            _visitScene: function() {
                if (this._runningScene) {
                    var t = cc.renderer;
                    t.childrenOrderDirty ? (t.clearRenderCommands(), cc.renderer.assignedZ = 0, this._runningScene._renderCmd._curLevel = 0, this._runningScene.visit(), t.resetFlag()) : t.transformDirty() && t.transform()
                }
            },
            end: function() {
                this._purgeDirectorInNextLoop = !0
            },
            getContentScaleFactor: function() {
                return this._contentScaleFactor
            },
            getWinSize: function() {
                return cc.size(this._winSizeInPoints)
            },
            getWinSizeInPixels: function() {
                return cc.size(this._winSizeInPoints.width * this._contentScaleFactor, this._winSizeInPoints.height * this._contentScaleFactor)
            },
            getVisibleSize: null,
            getVisibleOrigin: null,
            getZEye: null,
            pause: function() {
                this._paused || (this._oldAnimationInterval = this._animationInterval, this.setAnimationInterval(.25), this._paused = !0)
            },
            popScene: function() {
                cc.assertID(this._runningScene, 1204), this._scenesStack.pop();
                var t = this._scenesStack.length;
                0 === t ? this.end() : (this._sendCleanupToScene = !0, this._nextScene = this._scenesStack[t - 1])
            },
            purgeCachedData: function() {
                cc.textureCache._clear(), cc.loader.releaseAll()
            },
            purgeDirector: function() {
                this.getScheduler().unscheduleAll(), this._compScheduler.unscheduleAll(), this._nodeActivator.reset(), h && h.setEnabled(!1), this._runningScene && (this._runningScene.performRecursive(_ccsg.Node.performType.onExitTransitionDidStart), this._runningScene.performRecursive(_ccsg.Node.performType.onExit), this._runningScene.performRecursive(_ccsg.Node.performType.cleanup), cc.renderer.clearRenderCommands()), this._runningScene = null, this._nextScene = null, this._scenesStack.length = 0, this.stopAnimation(), this.purgeCachedData()
            },
            reset: function() {
                this.purgeDirector(), h && h.setEnabled(!0), this._actionManager && this._scheduler.scheduleUpdate(this._actionManager, cc.Scheduler.PRIORITY_SYSTEM, !1), this._animationManager && this._scheduler.scheduleUpdate(this._animationManager, cc.Scheduler.PRIORITY_SYSTEM, !1), this._collisionManager && this._scheduler.scheduleUpdate(this._collisionManager, cc.Scheduler.PRIORITY_SYSTEM, !1), this._physicsManager && this._scheduler.scheduleUpdate(this._physicsManager, cc.Scheduler.PRIORITY_SYSTEM, !1), this.startAnimation()
            },
            pushScene: function(t) {
                cc.assertID(t, 1205), this._sendCleanupToScene = !1, this._scenesStack.push(t), this._nextScene = t
            },
            runSceneImmediate: function(t, e, i) {
                t instanceof cc.Scene && t._load();
                for (var n = cc.game, r = Object.keys(n._persistRootNodes).map((function(t) {
                        return n._persistRootNodes[t]
                    })), o = 0; o < r.length; o++) {
                    var c = r[o];
                    n._ignoreRemovePersistNode = c, c.parent = null, n._ignoreRemovePersistNode = null
                }
                var a = this._scene,
                    h = a && a.autoReleaseAssets && a.dependAssets;
                s.autoRelease(h, t.dependAssets, r), cc.isValid(a) && a.destroy(), this._scene = null, cc.Object._deferredDestroy(), e && e(), this.emit(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, t);
                var l = t;
                if (t instanceof cc.Scene) {
                    this._scene = t, l = t._sgNode;
                    for (var u = 0; u < r.length; u++) {
                        var _ = r[u],
                            d = t.getChildByUuid(_.uuid);
                        if (d) {
                            var f = d.getSiblingIndex();
                            d._destroyImmediate(), t.insertChild(_, f)
                        } else _.parent = t
                    }
                    t._activate()
                }
                if (this._runningScene) {
                    var p = this._scenesStack.length;
                    this._scenesStack[Math.max(p - 1, 0)] = l, this._sendCleanupToScene = !0, this._nextScene = l
                } else this.pushScene(l), this.startAnimation();
                this._nextScene && this.setNextScene(), i && i(null, t), this.emit(cc.Director.EVENT_AFTER_SCENE_LAUNCH, t)
            },
            runScene: function(t, e, i) {
                cc.assertID(t, 1205), t instanceof cc.Scene && t._load(), this.once(cc.Director.EVENT_AFTER_UPDATE, (function() {
                    this.runSceneImmediate(t, e, i)
                }))
            },
            _getSceneUuid: function(t) {
                var e = cc.game._sceneInfos;
                if ("string" == typeof t) {
                    t.endsWith(".fire") || (t += ".fire"), "/" === t[0] || t.startsWith("db://assets/") || (t = "/" + t);
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        if (n.url.endsWith(t)) return n
                    }
                } else if ("number" == typeof t) {
                    if (0 <= t && t < e.length) return e[t];
                    cc.errorID(1206, t)
                } else cc.errorID(1207, t);
                return null
            },
            loadScene: function(t, e, i) {
                if (this._loadingScene) return cc.errorID(1208, t, this._loadingScene), !1;
                var n = this._getSceneUuid(t);
                if (n) {
                    var r = n.uuid;
                    this.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, t), this._loadingScene = t;
                    return this._loadSceneByUuid(r, e, i), !0
                }
                return cc.errorID(1209, t), !1
            },
            preloadScene: function(t, e) {
                var i = this._getSceneUuid(t);
                if (i) this.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, t), cc.loader.load({
                    uuid: i.uuid,
                    type: "uuid"
                }, (function(i, n) {
                    i && cc.errorID(1210, t, i.message), e && e(i, n)
                }));
                else {
                    var n = 'Can not preload the scene "' + t + '" because it is not in the build settings.';
                    e(new Error(n)), cc.error("preloadScene: " + n)
                }
            },
            _loadSceneByUuid: function(t, e, i, n) {
                console.time("LoadScene " + t), cc.AssetLibrary.loadAsset(t, (function(n, r) {
                    console.timeEnd("LoadScene " + t);
                    var s = cc.director;
                    if (s._loadingScene = "", n) n = "Failed to load scene: " + n, cc.error(n);
                    else {
                        if (r instanceof cc.SceneAsset) {
                            var o = r.scene;
                            return o._id = r._uuid, o._name = r._name, void s.runSceneImmediate(o, i, e)
                        }
                        n = "The asset " + t + " is not a scene", cc.error(n)
                    }
                    e && e(n)
                }))
            },
            resume: function() {
                this._paused && (this.setAnimationInterval(this._oldAnimationInterval), this._lastUpdate = Date.now(), this._lastUpdate || cc.logID(1200), this._paused = !1, this._deltaTime = 0)
            },
            setContentScaleFactor: function(t) {
                t !== this._contentScaleFactor && (this._contentScaleFactor = t)
            },
            setDepthTest: null,
            setClearColor: null,
            setDefaultValues: function() {},
            setNextDeltaTimeZero: function(t) {
                this._nextDeltaTimeZero = t
            },
            setNextScene: function() {
                var t = !1,
                    e = !1;
                if (cc.TransitionScene && (t = !!this._runningScene && this._runningScene instanceof cc.TransitionScene, e = !!this._nextScene && this._nextScene instanceof cc.TransitionScene), !e) {
                    var i = this._runningScene;
                    i && (i.performRecursive(_ccsg.Node.performType.onExitTransitionDidStart), i.performRecursive(_ccsg.Node.performType.onExit)), this._sendCleanupToScene && i && i.performRecursive(_ccsg.Node.performType.cleanup)
                }
                this._runningScene = this._nextScene, cc.renderer.childrenOrderDirty = !0, this._nextScene = null, t || null === this._runningScene || (this._runningScene.performRecursive(_ccsg.Node.performType.onEnter), this._runningScene.performRecursive(_ccsg.Node.performType.onEnterTransitionDidFinish))
            },
            getDelegate: function() {
                return this._projectionDelegate
            },
            setDelegate: function(t) {
                this._projectionDelegate = t
            },
            setOpenGLView: null,
            setProjection: null,
            setViewport: null,
            getOpenGLView: null,
            getProjection: null,
            setAlphaBlending: null,
            isSendCleanupToScene: function() {
                return this._sendCleanupToScene
            },
            getRunningScene: function() {
                return this._runningScene
            },
            getScene: function() {
                return this._scene
            },
            getAnimationInterval: function() {
                return this._animationInterval
            },
            isDisplayStats: function() {
                return !!cc.profiler && cc.profiler.isShowingStats()
            },
            setDisplayStats: function(t) {
                cc.profiler && (t ? cc.profiler.showStats() : cc.profiler.hideStats(), cc.game.config[cc.game.CONFIG_KEY.showFPS] = !!t)
            },
            isNextDeltaTimeZero: function() {
                return this._nextDeltaTimeZero
            },
            isPaused: function() {
                return this._paused
            },
            getTotalFrames: function() {
                return this._totalFrames
            },
            popToRootScene: function() {
                this.popToSceneStackLevel(1)
            },
            popToSceneStackLevel: function(t) {
                cc.assertID(this._runningScene, 1203);
                var e = this._scenesStack,
                    i = e.length;
                if (0 !== i) {
                    if (!(t > i)) {
                        for (; i > t;) {
                            var n = e.pop();
                            n.running && (n.performRecursive(_ccsg.Node.performType.onExitTransitionDidStart), n.performRecursive(_ccsg.Node.performType.onExit)), n.performRecursive(_ccsg.Node.performType.cleanup), i--
                        }
                        this._nextScene = e[e.length - 1], this._sendCleanupToScene = !0
                    }
                } else this.end()
            },
            getScheduler: function() {
                return this._scheduler
            },
            setScheduler: function(t) {
                this._scheduler !== t && (this._scheduler = t)
            },
            getActionManager: function() {
                return this._actionManager
            },
            setActionManager: function(t) {
                this._actionManager !== t && (this._actionManager && this._scheduler.unscheduleUpdate(this._actionManager), this._actionManager = t, this._scheduler.scheduleUpdate(this._actionManager, cc.Scheduler.PRIORITY_SYSTEM, !1))
            },
            getAnimationManager: function() {
                return this._animationManager
            },
            getCollisionManager: function() {
                return this._collisionManager
            },
            getPhysicsManager: function() {
                return this._physicsManager
            },
            getDeltaTime: function() {
                return this._deltaTime
            }
        }), cc.js.addon(cc.Director.prototype, n.prototype), cc.Director.EVENT_PROJECTION_CHANGED = "director_projection_changed", cc.Director.EVENT_BEFORE_SCENE_LOADING = "director_before_scene_loading", cc.Director.EVENT_BEFORE_SCENE_LAUNCH = "director_before_scene_launch", cc.Director.EVENT_AFTER_SCENE_LAUNCH = "director_after_scene_launch", cc.Director.EVENT_BEFORE_UPDATE = "director_before_update", cc.Director.EVENT_AFTER_UPDATE = "director_after_update", cc.Director.EVENT_BEFORE_VISIT = "director_before_visit", cc.Director.EVENT_AFTER_VISIT = "director_after_visit", cc.Director.EVENT_AFTER_DRAW = "director_after_draw", cc.DisplayLinkDirector = cc.Director.extend({
            invalid: !1,
            startAnimation: function() {
                this._nextDeltaTimeZero = !0, this.invalid = !1
            },
            mainLoop: function() {
                this._purgeDirectorInNextLoop ? (this._purgeDirectorInNextLoop = !1, this.purgeDirector()) : this.invalid || (this.calculateDeltaTime(), this._paused || (this.emit(cc.Director.EVENT_BEFORE_UPDATE), this._compScheduler.startPhase(), this._compScheduler.updatePhase(this._deltaTime), this._scheduler.update(this._deltaTime), this._compScheduler.lateUpdatePhase(this._deltaTime), this.emit(cc.Director.EVENT_AFTER_UPDATE), cc.Object._deferredDestroy()), this._nextScene && this.setNextScene(), this.emit(cc.Director.EVENT_BEFORE_VISIT), this._visitScene(), this.emit(cc.Director.EVENT_AFTER_VISIT), cc.g_NumberOfDraws = 0, cc.renderer.clear(), cc.renderer.rendering(cc._renderContext), this._totalFrames++, this.emit(cc.Director.EVENT_AFTER_DRAW), h.frameUpdateListeners())
            },
            stopAnimation: function() {
                this.invalid = !0
            },
            setAnimationInterval: function(t) {
                this._animationInterval = t, this.invalid || (this.stopAnimation(), this.startAnimation())
            },
            __fastOn: function(t, e, i) {
                var n = this._bubblingListeners;
                n || (n = this._bubblingListeners = new a), n.add(t, e, i), this._addEventFlag(t, n, !1)
            },
            __fastOff: function(t, e, i) {
                var n = this._bubblingListeners;
                n && (n.remove(t, e, i), this._purgeEventFlag(t, n, !1))
            }
        }), cc.Director.sharedDirector = null, cc.Director.firstUseDirector = !0, cc.Director._getInstance = function() {
            return cc.Director.firstUseDirector && (cc.Director.firstUseDirector = !1, cc.Director.sharedDirector = new cc.DisplayLinkDirector, cc.Director.sharedDirector.init()), cc.Director.sharedDirector
        }, cc.defaultFPS = 60, cc.Director.PROJECTION_2D = 0, cc.Director.PROJECTION_3D = 1, cc.Director.PROJECTION_CUSTOM = 3, cc.Director.PROJECTION_DEFAULT = cc.Director.PROJECTION_2D
    }), {
        "./component-scheduler": 36,
        "./event-manager": 52,
        "./event/event-listeners": 53,
        "./event/event-target": 54,
        "./load-pipeline/auto-release-utils": 63,
        "./node-activator": 76,
        "./platform/_CCClass": 91
    }],
    10: [(function(t, e, i) {
        t("./CCDirector"), t("./CCGame");
        var n = t("./event-manager");
        cc.game.once(cc.game.EVENT_RENDERER_INITED, (function() {
            if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
                var t = cc.Director.prototype;
                t.getProjection = function(t) {
                    return this._projection
                }, t.setProjection = function(t) {
                    this._projection = t, this.emit(cc.Director.EVENT_PROJECTION_CHANGED, this)
                }, t.setDepthTest = function() {}, t.setClearColor = function(t) {
                    cc.renderer._clearColor = t, cc.renderer._clearFillStyle = "rgb(" + t.r + "," + t.g + "," + t.b + ")"
                }, t.setOpenGLView = function(t) {
                    this._winSizeInPoints.width = cc._canvas.width, this._winSizeInPoints.height = cc._canvas.height, this._openGLView = t || cc.view, n && n.setEnabled(!0)
                }, t.getVisibleSize = function() {
                    return this.getWinSize()
                }, t.getVisibleOrigin = function() {
                    return cc.p(0, 0)
                }
            }
        }))
    }), {
        "./CCDirector": 9,
        "./CCGame": 15,
        "./event-manager": 52
    }],
    11: [(function(t, e, i) {
        t("./CCDirector"), t("./CCGame"), t("../kazmath");
        var n = t("./event-manager"),
            r = cc.math;
        cc.game.once(cc.game.EVENT_RENDERER_INITED, (function() {
            if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
                cc.DirectorDelegate = cc._Class.extend({
                    updateProjection: function() {}
                });
                var t = cc.Director.prototype,
                    e = function(t) {
                        if (t && t._renderCmd) {
                            t._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty);
                            var i, n = t._children;
                            for (i = 0; i < n.length; i++) e(n[i])
                        }
                    };
                cc.Director._getInstance().on(cc.Director.EVENT_PROJECTION_CHANGED, (function() {
                    for (var t = cc.director._scenesStack, i = 0; i < t.length; i++) e(t[i])
                })), t.setProjection = function(t) {
                    var e = this._winSizeInPoints;
                    this.setViewport();
                    var i = this._openGLView,
                        n = i._viewPortRect.x / i._scaleX,
                        s = i._viewPortRect.y / i._scaleY;
                    switch (t) {
                        case cc.Director.PROJECTION_2D:
                            r.glMatrixMode(r.KM_GL_PROJECTION), r.glLoadIdentity();
                            var o = r.Matrix4.createOrthographicProjection(0, e.width, 0, e.height, -1024, 1024);
                            r.glMultMatrix(o), r.glMatrixMode(r.KM_GL_MODELVIEW), r.glLoadIdentity();
                            break;
                        case cc.Director.PROJECTION_3D:
                            var c = this.getZEye(),
                                a = new r.Matrix4,
                                h = new r.Matrix4;
                            r.glMatrixMode(r.KM_GL_PROJECTION), r.glLoadIdentity(), a = r.Matrix4.createPerspectiveProjection(60, e.width / e.height, .1, 2 * c), r.glMultMatrix(a);
                            var l = new r.Vec3(-n + e.width / 2, -s + e.height / 2, c),
                                u = new r.Vec3(-n + e.width / 2, -s + e.height / 2, 0),
                                _ = new r.Vec3(0, 1, 0);
                            h.lookAt(l, u, _), r.glMultMatrix(h), r.glMatrixMode(r.KM_GL_MODELVIEW), r.glLoadIdentity();
                            break;
                        case cc.Director.PROJECTION_CUSTOM:
                            this._projectionDelegate && this._projectionDelegate.updateProjection();
                            break;
                        default:
                            cc.logID(1201)
                    }
                    this._projection = t, this.emit(cc.Director.EVENT_PROJECTION_CHANGED, this), cc.gl.setProjectionMatrixDirty(), cc.renderer.childrenOrderDirty = !0
                }, t.setDepthTest = function(t) {
                    cc.renderer.setDepthTest(t)
                }, t.setClearColor = function(t) {
                    var e = cc.renderer._clearColor;
                    e.r = t.r / 255, e.g = t.g / 255, e.b = t.b / 255, e.a = t.a / 255
                }, t.setOpenGLView = function(t) {
                    this._winSizeInPoints.width = cc._canvas.width, this._winSizeInPoints.height = cc._canvas.height, this._openGLView = t || cc.view;
                    cc.configuration.gatherGPUInfo(), this.setGLDefaultValues(), n && n.setEnabled(!0)
                }, t.getVisibleSize = function() {
                    return this._openGLView.getVisibleSize()
                }, t.getVisibleOrigin = function() {
                    return this._openGLView.getVisibleOrigin()
                }, t.getZEye = function() {
                    return this._winSizeInPoints.height / 1.1566
                }, t.setViewport = function() {
                    var t = this._openGLView;
                    if (t) {
                        var e = this._winSizeInPoints;
                        t.setViewPortInPoints(-t._viewPortRect.x / t._scaleX, -t._viewPortRect.y / t._scaleY, e.width, e.height)
                    }
                }, t.getOpenGLView = function() {
                    return this._openGLView
                }, t.getProjection = function() {
                    return this._projection
                }, t.setAlphaBlending = function(t) {
                    t ? cc.gl.blendFunc(cc.macro.BLEND_SRC, cc.macro.BLEND_DST) : cc.gl.blendFunc(cc.macro.ONE, cc.macro.ZERO)
                }, t.setGLDefaultValues = function() {
                    this.setAlphaBlending(!0), this.setProjection(this._projection), cc._renderContext.clearColor(0, 0, 0, 0)
                }
            }
        }))
    }), {
        "../kazmath": 147,
        "./CCDirector": 9,
        "./CCGame": 15,
        "./event-manager": 52
    }],
    12: [(function(t, e, i) {
        var n = t("./CCGame");
        cc._drawingUtil = null, n.once(n.EVENT_RENDERER_INITED, (function() {
            cc._renderType === n.RENDER_TYPE_WEBGL ? cc._drawingUtil = new(t("./CCDrawingPrimitivesWebGL"))(cc._renderContext) : cc._drawingUtil = new(t("./CCDrawingPrimitivesCanvas"))(cc._renderContext)
        }))
    }), {
        "./CCDrawingPrimitivesCanvas": 13,
        "./CCDrawingPrimitivesWebGL": 14,
        "./CCGame": 15
    }],
    13: [(function(t, e, i) {
        var n = cc._Class.extend({
            _cacheArray: [],
            ctor: function(t) {
                this._renderContext = t
            },
            drawPoint: function(t, e) {
                e || (e = 1);
                var i = cc.view.getScaleX(),
                    n = cc.view.getScaleY(),
                    r = cc.p(t.x * i, t.y * n),
                    s = this._renderContext.getContext();
                s.beginPath(), s.arc(r.x, -r.y, e * i, 0, 2 * Math.PI, !1), s.closePath(), s.fill()
            },
            drawPoints: function(t, e, i) {
                if (null != t) {
                    i || (i = 1);
                    var n = this._renderContext.getContext(),
                        r = cc.view.getScaleX(),
                        s = cc.view.getScaleY();
                    n.beginPath();
                    for (var o = 0, c = t.length; o < c; o++) n.arc(t[o].x * r, -t[o].y * s, i * r, 0, 2 * Math.PI, !1);
                    n.closePath(), n.fill()
                }
            },
            drawLine: function(t, e) {
                var i = this._renderContext.getContext(),
                    n = cc.view.getScaleX(),
                    r = cc.view.getScaleY();
                i.beginPath(), i.moveTo(t.x * n, -t.y * r), i.lineTo(e.x * n, -e.y * r), i.closePath(), i.stroke()
            },
            drawRect: function(t, e) {
                this.drawLine(cc.p(t.x, t.y), cc.p(e.x, t.y)), this.drawLine(cc.p(e.x, t.y), cc.p(e.x, e.y)), this.drawLine(cc.p(e.x, e.y), cc.p(t.x, e.y)), this.drawLine(cc.p(t.x, e.y), cc.p(t.x, t.y))
            },
            drawSolidRect: function(t, e, i) {
                var n = [t, cc.p(e.x, t.y), e, cc.p(t.x, e.y)];
                this.drawSolidPoly(n, 4, i)
            },
            drawPoly: function(t, e, i, n) {
                if (n = n || !1, null != t) {
                    if (t.length < 3) throw new Error("Polygon's point must greater than 2");
                    var r = t[0],
                        s = this._renderContext.getContext(),
                        o = cc.view.getScaleX(),
                        c = cc.view.getScaleY();
                    s.beginPath(), s.moveTo(r.x * o, -r.y * c);
                    for (var a = 1, h = t.length; a < h; a++) s.lineTo(t[a].x * o, -t[a].y * c);
                    i && s.closePath(), n ? s.fill() : s.stroke()
                }
            },
            drawSolidPoly: function(t, e, i) {
                this.setDrawColor(i.r, i.g, i.b, i.a), this.drawPoly(t, e, !0, !0)
            },
            drawCircle: function(t, e, i, n, r) {
                r = r || !1;
                var s = this._renderContext.getContext(),
                    o = cc.view.getScaleX(),
                    c = cc.view.getScaleY();
                s.beginPath();
                var a = i - 2 * Math.PI;
                s.arc(0 | t.x * o, 0 | -t.y * c, e * o, -i, -a, !1), r && s.lineTo(0 | t.x * o, 0 | -t.y * c), s.stroke()
            },
            drawQuadBezier: function(t, e, i, n) {
                var r = this._cacheArray;
                r.length = 0;
                for (var s = 0, o = 0; o < n; o++) {
                    var c = Math.pow(1 - s, 2) * t.x + 2 * (1 - s) * s * e.x + s * s * i.x,
                        a = Math.pow(1 - s, 2) * t.y + 2 * (1 - s) * s * e.y + s * s * i.y;
                    r.push(cc.p(c, a)), s += 1 / n
                }
                r.push(cc.p(i.x, i.y)), this.drawPoly(r, n + 1, !1, !1)
            },
            drawCubicBezier: function(t, e, i, n, r) {
                var s = this._cacheArray;
                s.length = 0;
                for (var o = 0, c = 0; c < r; c++) {
                    var a = Math.pow(1 - o, 3) * t.x + 3 * Math.pow(1 - o, 2) * o * e.x + 3 * (1 - o) * o * o * i.x + o * o * o * n.x,
                        h = Math.pow(1 - o, 3) * t.y + 3 * Math.pow(1 - o, 2) * o * e.y + 3 * (1 - o) * o * o * i.y + o * o * o * n.y;
                    s.push(cc.p(a, h)), o += 1 / r
                }
                s.push(cc.p(n.x, n.y)), this.drawPoly(s, r + 1, !1, !1)
            },
            drawCatmullRom: function(t, e) {
                this.drawCardinalSpline(t, .5, e)
            },
            drawCardinalSpline: function(t, e, i) {
                cc._renderContext.setStrokeStyle("rgba(255,255,255,1)");
                var n = this._cacheArray;
                n.length = 0;
                for (var r, s, o = 1 / t.length, c = 0; c < i + 1; c++) {
                    var a = c / i;
                    1 === a ? (r = t.length - 1, s = 1) : s = (a - o * (r = 0 | a / o)) / o;
                    var h = cc.cardinalSplineAt(cc.getControlPointAt(t, r - 1), cc.getControlPointAt(t, r - 0), cc.getControlPointAt(t, r + 1), cc.getControlPointAt(t, r + 2), e, s);
                    n.push(h)
                }
                this.drawPoly(n, i + 1, !1, !1)
            },
            drawImage: function(t, e, i, n, r) {
                var s = arguments.length,
                    o = this._renderContext.getContext();
                switch (s) {
                    case 2:
                        var c = t.height;
                        o.drawImage(t, e.x, -(e.y + c));
                        break;
                    case 3:
                        o.drawImage(t, e.x, -(e.y + i.height), i.width, i.height);
                        break;
                    case 5:
                        o.drawImage(t, e.x, e.y, i.width, i.height, n.x, -(n.y + r.height), r.width, r.height);
                        break;
                    default:
                        throw new Error("Argument must be non-nil")
                }
            },
            drawStar: function(t, e, i) {
                var n = t || this._renderContext,
                    r = n.getContext();
                e *= cc.view.getScaleX();
                var s = "rgba(" + (0 | i.r) + "," + (0 | i.g) + "," + (0 | i.b);
                n.setFillStyle(s + ",1)");
                var o = e / 10;
                r.beginPath(), r.moveTo(-e, e), r.lineTo(0, o), r.lineTo(e, e), r.lineTo(o, 0), r.lineTo(e, -e), r.lineTo(0, -o), r.lineTo(-e, -e), r.lineTo(-o, 0), r.lineTo(-e, e), r.closePath(), r.fill();
                var c = r.createRadialGradient(0, 0, o, 0, 0, e);
                c.addColorStop(0, s + ", 1)"), c.addColorStop(.3, s + ", 0.8)"), c.addColorStop(1, s + ", 0.0)"), n.setFillStyle(c), r.beginPath();
                var a = cc.macro.PI2;
                r.arc(0, 0, e - o, 0, a, !1), r.closePath(), r.fill()
            },
            drawColorBall: function(t, e, i) {
                var n = t || this._renderContext,
                    r = n.getContext();
                e *= cc.view.getScaleX();
                var s = "rgba(" + (0 | i.r) + "," + (0 | i.g) + "," + (0 | i.b),
                    o = e / 10,
                    c = r.createRadialGradient(0, 0, o, 0, 0, e);
                c.addColorStop(0, s + ", 1)"), c.addColorStop(.3, s + ", 0.8)"), c.addColorStop(.6, s + ", 0.4)"), c.addColorStop(1, s + ", 0.0)"), n.setFillStyle(c), r.beginPath();
                var a = cc.macro.PI2;
                r.arc(0, 0, e, 0, a, !1), r.closePath(), r.fill()
            },
            fillText: function(t, e, i) {
                this._renderContext.getContext().fillText(t, e, -i)
            },
            setDrawColor: function(t, e, i, n) {
                this._renderContext.setFillStyle("rgba(" + t + "," + e + "," + i + "," + n / 255 + ")"), this._renderContext.setStrokeStyle("rgba(" + t + "," + e + "," + i + "," + n / 255 + ")")
            },
            setPointSize: function(t) {},
            setLineWidth: function(t) {
                this._renderContext.getContext().lineWidth = t * cc.view.getScaleX()
            }
        });
        e.exports = n
    }), {}],
    14: [(function(t, e, i) {
        var n = cc.macro,
            r = cc._Class.extend({
                _initialized: !1,
                _shader: null,
                _colorLocation: "u_color",
                _pointSizeLocation: "u_pointSize",
                _pointSize: -1,
                ctor: function(t) {
                    if (!t instanceof WebGLRenderingContext) throw new Error("Can't initialise DrawingPrimitiveWebGL. context need is WebGLRenderingContext");
                    this._renderContext = t, this._colorArray = new Float32Array([1, 1, 1, 1])
                },
                lazy_init: function() {
                    this._initialized || (this._shader = cc.shaderCache.programForKey(n.SHADER_POSITION_UCOLOR), this._shader._addUniformLocation(this._colorLocation), this._shader._addUniformLocation(this._pointSizeLocation), this._initialized = !0)
                },
                drawInit: function() {
                    this._initialized = !1
                },
                drawPoint: function(t) {
                    this.lazy_init();
                    var e = this._renderContext;
                    this._shader.use(), this._shader.setUniformForModelViewAndProjectionMatrixWithMat4(), e.enableVertexAttribArray(n.VERTEX_ATTRIB_POSITION), this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray), this._shader.setUniformLocationWith1f(this._pointSizeLocation, this._pointSize);
                    var i = e.createBuffer();
                    e.bindBuffer(e.ARRAY_BUFFER, i), e.bufferData(e.ARRAY_BUFFER, new Float32Array([t.x, t.y]), e.STATIC_DRAW), e.vertexAttribPointer(n.VERTEX_ATTRIB_POSITION, 2, e.FLOAT, !1, 0, 0), e.drawArrays(e.POINTS, 0, 1), e.deleteBuffer(i), cc.incrementGLDraws(1)
                },
                drawPoints: function(t, e) {
                    if (t && 0 !== t.length) {
                        this.lazy_init();
                        var i = this._renderContext;
                        this._shader.use(), this._shader.setUniformForModelViewAndProjectionMatrixWithMat4(), i.enableVertexAttribArray(n.VERTEX_ATTRIB_POSITION), this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray), this._shader.setUniformLocationWith1f(this._pointSizeLocation, this._pointSize);
                        var r = i.createBuffer();
                        i.bindBuffer(i.ARRAY_BUFFER, r), i.bufferData(i.ARRAY_BUFFER, this._pointsToTypeArray(t), i.STATIC_DRAW), i.vertexAttribPointer(n.VERTEX_ATTRIB_POSITION, 2, i.FLOAT, !1, 0, 0), i.drawArrays(i.POINTS, 0, t.length), i.deleteBuffer(r), cc.incrementGLDraws(1)
                    }
                },
                _pointsToTypeArray: function(t) {
                    for (var e = new Float32Array(2 * t.length), i = 0; i < t.length; i++) e[2 * i] = t[i].x, e[2 * i + 1] = t[i].y;
                    return e
                },
                drawLine: function(t, e) {
                    this.lazy_init();
                    var i = this._renderContext;
                    this._shader.use(), this._shader.setUniformForModelViewAndProjectionMatrixWithMat4(), i.enableVertexAttribArray(n.VERTEX_ATTRIB_POSITION), this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);
                    var r = i.createBuffer();
                    i.bindBuffer(i.ARRAY_BUFFER, r), i.bufferData(i.ARRAY_BUFFER, this._pointsToTypeArray([t, e]), i.STATIC_DRAW), i.vertexAttribPointer(n.VERTEX_ATTRIB_POSITION, 2, i.FLOAT, !1, 0, 0), i.drawArrays(i.LINES, 0, 2), i.deleteBuffer(r), cc.incrementGLDraws(1)
                },
                drawRect: function(t, e) {
                    this.drawLine(cc.p(t.x, t.y), cc.p(e.x, t.y)), this.drawLine(cc.p(e.x, t.y), cc.p(e.x, e.y)), this.drawLine(cc.p(e.x, e.y), cc.p(t.x, e.y)), this.drawLine(cc.p(t.x, e.y), cc.p(t.x, t.y))
                },
                drawSolidRect: function(t, e, i) {
                    var n = [t, cc.p(e.x, t.y), e, cc.p(t.x, e.y)];
                    this.drawSolidPoly(n, 4, i)
                },
                drawPoly: function(t, e, i) {
                    this.lazy_init();
                    var r = this._renderContext;
                    this._shader.use(), this._shader.setUniformForModelViewAndProjectionMatrixWithMat4(), r.enableVertexAttribArray(n.VERTEX_ATTRIB_POSITION), this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);
                    var s = r.createBuffer();
                    r.bindBuffer(r.ARRAY_BUFFER, s), r.bufferData(r.ARRAY_BUFFER, this._pointsToTypeArray(t), r.STATIC_DRAW), r.vertexAttribPointer(n.VERTEX_ATTRIB_POSITION, 2, r.FLOAT, !1, 0, 0), i ? r.drawArrays(r.LINE_LOOP, 0, t.length) : r.drawArrays(r.LINE_STRIP, 0, t.length), r.deleteBuffer(s), cc.incrementGLDraws(1)
                },
                drawSolidPoly: function(t, e, i) {
                    this.lazy_init(), i && this.setDrawColor(i.r, i.g, i.b, i.a);
                    var r = this._renderContext;
                    this._shader.use(), this._shader.setUniformForModelViewAndProjectionMatrixWithMat4(), r.enableVertexAttribArray(n.VERTEX_ATTRIB_POSITION), this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);
                    var s = r.createBuffer();
                    r.bindBuffer(r.ARRAY_BUFFER, s), r.bufferData(r.ARRAY_BUFFER, this._pointsToTypeArray(t), r.STATIC_DRAW), r.vertexAttribPointer(n.VERTEX_ATTRIB_POSITION, 2, r.FLOAT, !1, 0, 0), r.drawArrays(r.TRIANGLE_FAN, 0, t.length), r.deleteBuffer(s), cc.incrementGLDraws(1)
                },
                drawCircle: function(t, e, i, r, s) {
                    this.lazy_init();
                    var o = 1;
                    s && o++;
                    var c = 2 * Math.PI / r,
                        a = new Float32Array(2 * (r + 2));
                    if (a) {
                        for (var h = 0; h <= r; h++) {
                            var l = h * c,
                                u = e * Math.cos(l + i) + t.x,
                                _ = e * Math.sin(l + i) + t.y;
                            a[2 * h] = u, a[2 * h + 1] = _
                        }
                        a[2 * (r + 1)] = t.x, a[2 * (r + 1) + 1] = t.y;
                        var d = this._renderContext;
                        this._shader.use(), this._shader.setUniformForModelViewAndProjectionMatrixWithMat4(), d.enableVertexAttribArray(n.VERTEX_ATTRIB_POSITION), this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);
                        var f = d.createBuffer();
                        d.bindBuffer(d.ARRAY_BUFFER, f), d.bufferData(d.ARRAY_BUFFER, a, d.STATIC_DRAW), d.vertexAttribPointer(n.VERTEX_ATTRIB_POSITION, 2, d.FLOAT, !1, 0, 0), d.drawArrays(d.LINE_STRIP, 0, r + o), d.deleteBuffer(f), cc.incrementGLDraws(1)
                    }
                },
                drawQuadBezier: function(t, e, i, r) {
                    this.lazy_init();
                    for (var s = new Float32Array(2 * (r + 1)), o = 0, c = 0; c < r; c++) s[2 * c] = Math.pow(1 - o, 2) * t.x + 2 * (1 - o) * o * e.x + o * o * i.x, s[2 * c + 1] = Math.pow(1 - o, 2) * t.y + 2 * (1 - o) * o * e.y + o * o * i.y, o += 1 / r;
                    s[2 * r] = i.x, s[2 * r + 1] = i.y;
                    var a = this._renderContext;
                    this._shader.use(), this._shader.setUniformForModelViewAndProjectionMatrixWithMat4(), a.enableVertexAttribArray(n.VERTEX_ATTRIB_POSITION), this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);
                    var h = a.createBuffer();
                    a.bindBuffer(a.ARRAY_BUFFER, h), a.bufferData(a.ARRAY_BUFFER, s, a.STATIC_DRAW), a.vertexAttribPointer(n.VERTEX_ATTRIB_POSITION, 2, a.FLOAT, !1, 0, 0), a.drawArrays(a.LINE_STRIP, 0, r + 1), a.deleteBuffer(h), cc.incrementGLDraws(1)
                },
                drawCubicBezier: function(t, e, i, r, s) {
                    this.lazy_init();
                    for (var o = new Float32Array(2 * (s + 1)), c = 0, a = 0; a < s; a++) o[2 * a] = Math.pow(1 - c, 3) * t.x + 3 * Math.pow(1 - c, 2) * c * e.x + 3 * (1 - c) * c * c * i.x + c * c * c * r.x, o[2 * a + 1] = Math.pow(1 - c, 3) * t.y + 3 * Math.pow(1 - c, 2) * c * e.y + 3 * (1 - c) * c * c * i.y + c * c * c * r.y, c += 1 / s;
                    o[2 * s] = r.x, o[2 * s + 1] = r.y;
                    var h = this._renderContext;
                    this._shader.use(), this._shader.setUniformForModelViewAndProjectionMatrixWithMat4(), h.enableVertexAttribArray(n.VERTEX_ATTRIB_POSITION), this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);
                    var l = h.createBuffer();
                    h.bindBuffer(h.ARRAY_BUFFER, l), h.bufferData(h.ARRAY_BUFFER, o, h.STATIC_DRAW), h.vertexAttribPointer(n.VERTEX_ATTRIB_POSITION, 2, h.FLOAT, !1, 0, 0), h.drawArrays(h.LINE_STRIP, 0, s + 1), h.deleteBuffer(l), cc.incrementGLDraws(1)
                },
                drawCatmullRom: function(t, e) {
                    this.drawCardinalSpline(t, .5, e)
                },
                drawCardinalSpline: function(t, e, i) {
                    this.lazy_init();
                    for (var r, s, o = new Float32Array(2 * (i + 1)), c = 1 / t.length, a = 0; a < i + 1; a++) {
                        var h = a / i;
                        1 === h ? (r = t.length - 1, s = 1) : s = (h - c * (r = 0 | h / c)) / c;
                        var l = cc.cardinalSplineAt(cc.getControlPointAt(t, r - 1), cc.getControlPointAt(t, r), cc.getControlPointAt(t, r + 1), cc.getControlPointAt(t, r + 2), e, s);
                        o[2 * a] = l.x, o[2 * a + 1] = l.y
                    }
                    var u = this._renderContext;
                    this._shader.use(), this._shader.setUniformForModelViewAndProjectionMatrixWithMat4(), u.enableVertexAttribArray(n.VERTEX_ATTRIB_POSITION), this._shader.setUniformLocationWith4fv(this._colorLocation, this._colorArray);
                    var _ = u.createBuffer();
                    u.bindBuffer(u.ARRAY_BUFFER, _), u.bufferData(u.ARRAY_BUFFER, o, u.STATIC_DRAW), u.vertexAttribPointer(n.VERTEX_ATTRIB_POSITION, 2, u.FLOAT, !1, 0, 0), u.drawArrays(u.LINE_STRIP, 0, i + 1), u.deleteBuffer(_), cc.incrementGLDraws(1)
                },
                setDrawColor: function(t, e, i, n) {
                    this._colorArray[0] = t / 255, this._colorArray[1] = e / 255, this._colorArray[2] = i / 255, this._colorArray[3] = n / 255
                },
                setPointSize: function(t) {
                    this._pointSize = t
                },
                setLineWidth: function(t) {
                    this._renderContext.lineWidth && this._renderContext.lineWidth(t)
                }
            });
        e.exports = r
    }), {}],
    15: [(function(t, e, i) {
        var n, r = t("./event/event-target");
        n = t("./platform/CCView"), t("../audio/CCAudioEngine");
        var s = t("./platform/CCInputManager"),
            o = {
                EVENT_HIDE: "game_on_hide",
                EVENT_SHOW: "game_on_show",
                EVENT_GAME_INITED: "game_inited",
                EVENT_RENDERER_INITED: "renderer_inited",
                RENDER_TYPE_CANVAS: 0,
                RENDER_TYPE_WEBGL: 1,
                RENDER_TYPE_OPENGL: 2,
                _persistRootNodes: {},
                _ignoreRemovePersistNode: null,
                CONFIG_KEY: {
                    width: "width",
                    height: "height",
                    debugMode: "debugMode",
                    exposeClassName: "exposeClassName",
                    showFPS: "showFPS",
                    frameRate: "frameRate",
                    id: "id",
                    renderMode: "renderMode",
                    registerSystemEvent: "registerSystemEvent",
                    jsList: "jsList",
                    scenes: "scenes"
                },
                _paused: !0,
                _configLoaded: !1,
                _isCloning: !1,
                _prepareCalled: !1,
                _prepared: !1,
                _rendererInitialized: !1,
                _renderContext: null,
                _intervalId: null,
                _lastTime: null,
                _frameTime: null,
                _sceneInfos: [],
                frame: null,
                container: null,
                canvas: null,
                config: null,
                onStart: null,
                setFrameRate: function(t) {
                    this.config[this.CONFIG_KEY.frameRate] = t, this._intervalId && window.cancelAnimFrame(this._intervalId), this._intervalId = 0, this._paused = !0, this._setAnimFrame(), this._runMainLoop()
                },
                step: function() {
                    cc.director.mainLoop()
                },
                pause: function() {
                    this._paused || (this._paused = !0, cc.audioEngine && cc.audioEngine._break(), this._intervalId && window.cancelAnimFrame(this._intervalId), this._intervalId = 0)
                },
                resume: function() {
                    this._paused && (this._paused = !1, cc.audioEngine && cc.audioEngine._restore(), this._runMainLoop())
                },
                isPaused: function() {
                    return this._paused
                },
                restart: function() {
                    cc.director.once(cc.Director.EVENT_AFTER_DRAW, (function() {
                        for (var t in o._persistRootNodes) o.removePersistRootNode(o._persistRootNodes[t]);
                        cc.director.getScene().destroy(), cc.Object._deferredDestroy(), cc.director.purgeDirector(), cc.audioEngine && cc.audioEngine.uncacheAll(), cc.director.reset(), o.onStart()
                    }))
                },
                end: function() {
                    close()
                },
                prepare: function(t) {
                    var e = this,
                        i = e.config,
                        r = e.CONFIG_KEY;
                    if (this._configLoaded) {
                        if (this._prepared) t && t();
                        else if (!this._prepareCalled)
                            if (cc._engineLoaded) {
                                this._prepareCalled = !0, this._initRenderer(i[r.width], i[r.height]), cc.view = n ? n._getInstance() : null, cc.director = cc.Director._getInstance(), cc.director.setOpenGLView && cc.director.setOpenGLView(cc.view), cc.winSize = cc.director.getWinSize(), this._initEvents(), this._setAnimFrame(), this._runMainLoop();
                                var s = i[r.jsList];
                                s && s.length > 0 ? cc.loader.load(s, (function(i) {
                                    if (i) throw new Error(JSON.stringify(i));
                                    e._prepared = !0, t && t(), e.emit(e.EVENT_GAME_INITED)
                                })) : (t && t(), e.emit(e.EVENT_GAME_INITED))
                            } else cc.initEngine(this.config, (function() {
                                e.prepare(t)
                            }))
                    } else this._loadConfig((function() {
                        e.prepare(t)
                    }))
                },
                run: function(t, e) {
                    "function" == typeof t ? o.onStart = t : (t && (o.config = t), "function" == typeof e && (o.onStart = e)), this.prepare(o.onStart && o.onStart.bind(o))
                },
                addPersistRootNode: function(t) {
                    if (cc.Node.isNode(t) && t.uuid) {
                        var e = t.uuid;
                        if (!this._persistRootNodes[e]) {
                            var i = cc.director._scene;
                            if (cc.isValid(i)) {
                                if (t.parent) {
                                    if (!(t.parent instanceof cc.Scene)) return void cc.warnID(3801);
                                    if (t.parent !== i) return void cc.warnID(3802)
                                } else t.parent = i;
                                this._persistRootNodes[e] = t, t._persistNode = !0
                            }
                        }
                    } else cc.warnID(3800)
                },
                removePersistRootNode: function(t) {
                    if (t !== this._ignoreRemovePersistNode) {
                        var e = t.uuid || "";
                        t === this._persistRootNodes[e] && (delete this._persistRootNodes[e], t._persistNode = !1)
                    }
                },
                isPersistRootNode: function(t) {
                    return t._persistNode
                },
                _setAnimFrame: function() {
                    this._lastTime = new Date;
                    var t = o.config[o.CONFIG_KEY.frameRate];
                    this._frameTime = 1e3 / t, 60 !== t && 30 !== t ? (window.requestAnimFrame = this._stTime, window.cancelAnimFrame = this._ctTime) : (window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || this._stTime, window.cancelAnimFrame = window.cancelAnimationFrame || window.cancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame || this._ctTime)
                },
                _stTime: function(t) {
                    var e = (new Date).getTime(),
                        i = Math.max(0, o._frameTime - (e - o._lastTime)),
                        n = window.setTimeout((function() {
                            t()
                        }), i);
                    return o._lastTime = e + i, n
                },
                _ctTime: function(t) {
                    window.clearTimeout(t)
                },
                _runMainLoop: function() {
                    var t, e = this,
                        i = e.config,
                        n = e.CONFIG_KEY,
                        r = cc.director,
                        s = !0,
                        o = i[n.frameRate];
                    r.setDisplayStats(i[n.showFPS]), t = function() {
                        if (!e._paused) {
                            if (e._intervalId = window.requestAnimFrame(t), 30 === o && (s = !s)) return;
                            r.mainLoop()
                        }
                    }, e._intervalId = window.requestAnimFrame(t), e._paused = !1
                },
                _loadConfig: function(t) {
                    if (this.config) return this._initConfig(this.config), void(t && t());
                    if (document.ccConfig) return this._initConfig(document.ccConfig), void(t && t());
                    var e = this;
                    cc.loader.load("project.json", (function(i, n) {
                        i && cc.logID(3818), e._initConfig(n || {}), t && t()
                    }))
                },
                _initConfig: function(t) {
                    var e = this.CONFIG_KEY;
                    "number" != typeof t[e.debugMode] && (t[e.debugMode] = 0), t[e.exposeClassName] = !!t[e.exposeClassName], "number" != typeof t[e.frameRate] && (t[e.frameRate] = 60), "number" != typeof t[e.renderMode] && (t[e.renderMode] = 0), "boolean" != typeof t[e.registerSystemEvent] && (t[e.registerSystemEvent] = !0), t[e.showFPS] = !(e.showFPS in t) || !!t[e.showFPS], this._sceneInfos = t[e.scenes] || [], this.collisionMatrix = t.collisionMatrix || [], this.groupList = t.groupList || [], cc._initDebugSetting(t[e.debugMode]), this.config = t, this._configLoaded = !0
                },
                _initRenderer: function(t, e) {
                    if (!this._rendererInitialized) {
                        if (!cc._supportRender) throw new Error("The renderer doesn't support the renderMode " + this.config[this.CONFIG_KEY.renderMode]);
                        var i, n, r = this.config[o.CONFIG_KEY.id],
                            s = window,
                            c = cc.sys.platform === cc.sys.WECHAT_GAME,
                            a = cc.sys.platform === cc.sys.QQ_PLAY;
                        if (c) this.container = cc.container = n = document.createElement("DIV"), this.frame = n.parentNode === document.body ? document.documentElement : n.parentNode, i = cc.sys.browserType === cc.sys.BROWSER_TYPE_WECHAT_GAME_SUB ? wx.getSharedCanvas() : canvas, this.canvas = cc._canvas = i;
                        else if (a) this.container = cc.container = document.createElement("DIV"), this.frame = document.documentElement, this.canvas = cc._canvas = i = canvas;
                        else {
                            var h = r instanceof HTMLElement ? r : document.querySelector(r) || document.querySelector("#" + r);
                            "CANVAS" === h.tagName ? (t = t || h.width, e = e || h.height, this.canvas = cc._canvas = i = h, this.container = cc.container = n = document.createElement("DIV"), i.parentNode && i.parentNode.insertBefore(n, i)) : ("DIV" !== h.tagName && cc.warnID(3819), t = t || h.clientWidth, e = e || h.clientHeight, this.canvas = cc._canvas = i = document.createElement("CANVAS"), this.container = cc.container = n = document.createElement("DIV"), h.appendChild(n)), n.setAttribute("id", "Cocos2dGameContainer"), n.appendChild(i), this.frame = n.parentNode === document.body ? document.documentElement : n.parentNode;
                            (function(t, e) {
                                (" " + t.className + " ").indexOf(" " + e + " ") > -1 || (t.className && (t.className += " "), t.className += e)
                            })(i, "gameCanvas"), i.setAttribute("width", t || 480), i.setAttribute("height", e || 320), i.setAttribute("tabindex", 99)
                        }
                        if (cc._renderType === o.RENDER_TYPE_WEBGL) {
                            var l = {
                                stencil: !0,
                                antialias: cc.macro.ENABLE_WEBGL_ANTIALIAS,
                                alpha: cc.macro.ENABLE_TRANSPARENT_CANVAS
                            };
                            c && (l.preserveDrawingBuffer = !0), this._renderContext = cc._renderContext = cc.webglContext = cc.create3DContext(i, l)
                        }
                        this._renderContext ? (cc.renderer = cc.rendererWebGL, s.gl = this._renderContext, cc.renderer.init()) : (cc._renderType = o.RENDER_TYPE_CANVAS, cc.renderer = cc.rendererCanvas, cc.renderer.init(), this._renderContext = cc._renderContext = new cc.CanvasContextWrapper(i.getContext("2d"))), cc._gameDiv = n, o.canvas.oncontextmenu = function() {
                            if (!cc._isContextMenuEnable) return !1
                        }, this.emit(this.EVENT_RENDERER_INITED, !0), this._rendererInitialized = !0
                    }
                },
                _initEvents: function() {
                    function t() {
                        r || (r = !0, o.emit(o.EVENT_HIDE, o))
                    }

                    function e() {
                        r && (r = !1, o.emit(o.EVENT_SHOW, o))
                    }
                    var i, n = window;
                    this.config[this.CONFIG_KEY.registerSystemEvent] && s.registerSystemEvent(this.canvas), void 0 !== document.hidden ? i = "hidden" : void 0 !== document.mozHidden ? i = "mozHidden" : void 0 !== document.msHidden ? i = "msHidden" : void 0 !== document.webkitHidden && (i = "webkitHidden");
                    var r = !1;
                    if (i)
                        for (var c = ["visibilitychange", "mozvisibilitychange", "msvisibilitychange", "webkitvisibilitychange", "qbrowserVisibilityChange"], a = 0; a < c.length; a++) document.addEventListener(c[a], (function(n) {
                            var r = document[i];
                            (r = r || n.hidden) ? t(): e()
                        }), !1);
                    else n.addEventListener("blur", t, !1), n.addEventListener("focus", e, !1);
                    navigator.userAgent.indexOf("MicroMessenger") > -1 && (n.onfocus = e), "onpageshow" in window && "onpagehide" in window && (n.addEventListener("pagehide", t, !1), n.addEventListener("pageshow", e, !1)), this.on(o.EVENT_HIDE, (function() {
                        o.pause()
                    })), this.on(o.EVENT_SHOW, (function() {
                        o.resume()
                    }))
                }
            };
        r.call(o), cc.js.addon(o, r.prototype), cc.game = e.exports = o
    }), {
        "../audio/CCAudioEngine": 1,
        "./event/event-target": 54,
        "./platform/BKInputManager": 77,
        "./platform/CCInputManager": 83,
        "./platform/CCView": 89
    }],
    16: [(function(t, e, i) {
        "use strict";

        function n(t) {
            var e = cc.Mask;
            if (e)
                for (var i = 0, n = t; n && cc.Node.isNode(n); n = n._parent, ++i)
                    if (n.getComponent(e)) return {
                        index: i,
                        node: n
                    };
            return null
        }
        var r = t("./utils/prefab-helper"),
            s = t("./utils/scene-graph-helper"),
            o = t("./event-manager"),
            c = cc.Object.Flags,
            a = c.Destroying,
            h = "position-changed",
            l = "size-changed",
            u = "anchor-changed",
            _ = "rotation-changed",
            d = "scale-changed",
            f = t("./utils/misc"),
            p = (t("./event/event"), !!cc.ActionManager),
            g = function() {},
            m = cc.Enum({
                TOUCH_START: "touchstart",
                TOUCH_MOVE: "touchmove",
                TOUCH_END: "touchend",
                TOUCH_CANCEL: "touchcancel",
                MOUSE_DOWN: "mousedown",
                MOUSE_MOVE: "mousemove",
                MOUSE_ENTER: "mouseenter",
                MOUSE_LEAVE: "mouseleave",
                MOUSE_UP: "mouseup",
                MOUSE_WHEEL: "mousewheel"
            }),
            v = [m.TOUCH_START, m.TOUCH_MOVE, m.TOUCH_END, m.TOUCH_CANCEL],
            y = [m.MOUSE_DOWN, m.MOUSE_ENTER, m.MOUSE_MOVE, m.MOUSE_LEAVE, m.MOUSE_UP, m.MOUSE_WHEEL],
            C = null,
            T = function(t, e) {
                var i = t.getLocation(),
                    n = this.owner;
                return !!n._hitTest(i, this) && (e.type = m.TOUCH_START, e.touch = t, e.bubbles = !0, n.dispatchEvent(e), !0)
            },
            E = function(t, e) {
                var i = this.owner;
                e.type = m.TOUCH_MOVE, e.touch = t, e.bubbles = !0, i.dispatchEvent(e)
            },
            x = function(t, e) {
                var i = t.getLocation(),
                    n = this.owner;
                n._hitTest(i, this) ? e.type = m.TOUCH_END : e.type = m.TOUCH_CANCEL, e.touch = t, e.bubbles = !0, n.dispatchEvent(e)
            },
            R = function(t, e) {
                t.getLocation();
                var i = this.owner;
                e.type = m.TOUCH_CANCEL, e.touch = t, e.bubbles = !0, i.dispatchEvent(e)
            },
            S = function(t) {
                var e = t.getLocation(),
                    i = this.owner;
                i._hitTest(e, this) && (t.type = m.MOUSE_DOWN, t.bubbles = !0, i.dispatchEvent(t), t.stopPropagation())
            },
            w = function(t) {
                var e = t.getLocation(),
                    i = this.owner,
                    n = i._hitTest(e, this);
                if (n) this._previousIn || (C && (t.type = m.MOUSE_LEAVE, C.dispatchEvent(t), C._mouseListener._previousIn = !1), C = this.owner, t.type = m.MOUSE_ENTER, i.dispatchEvent(t), this._previousIn = !0), t.type = m.MOUSE_MOVE, t.bubbles = !0, i.dispatchEvent(t);
                else {
                    if (!this._previousIn) return;
                    t.type = m.MOUSE_LEAVE, i.dispatchEvent(t), this._previousIn = !1, C = null
                }
                t.stopPropagation()
            },
            A = function(t) {
                var e = t.getLocation(),
                    i = this.owner;
                i._hitTest(e, this) && (t.type = m.MOUSE_UP, t.bubbles = !0, i.dispatchEvent(t), t.stopPropagation())
            },
            b = function(t) {
                var e = t.getLocation(),
                    i = this.owner;
                i._hitTest(e, this) && (t.type = m.MOUSE_WHEEL, t.bubbles = !0, i.dispatchEvent(t), t.stopPropagation())
            },
            I = cc.Class({
                name: "cc.Node",
                extends: t("./utils/base-node"),
                properties: {
                    _opacity: 255,
                    _color: cc.Color.WHITE,
                    _cascadeOpacityEnabled: !0,
                    _anchorPoint: cc.p(.5, .5),
                    _contentSize: cc.size(0, 0),
                    _rotationX: 0,
                    _rotationY: 0,
                    _scaleX: 1,
                    _scaleY: 1,
                    _position: cc.p(0, 0),
                    _skewX: 0,
                    _skewY: 0,
                    _localZOrder: 0,
                    _globalZOrder: 0,
                    _opacityModifyRGB: !1,
                    groupIndex: {
                        default: 0,
                        type: cc.Integer
                    },
                    group: {
                        get: function() {
                            return cc.game.groupList[this.groupIndex] || ""
                        },
                        set: function(t) {
                            this.groupIndex = cc.game.groupList.indexOf(t), this.emit("group-changed")
                        }
                    },
                    x: {
                        get: function() {
                            return this._position.x
                        },
                        set: function(t) {
                            var e = this._position;
                            if (t !== e.x) {
                                e.x = t, this._sgNode.setPositionX(t);
                                var i = this._hasListenerCache;
                                i && i[h] && this.emit(h)
                            }
                        }
                    },
                    y: {
                        get: function() {
                            return this._position.y
                        },
                        set: function(t) {
                            var e = this._position;
                            if (t !== e.y) {
                                e.y = t, this._sgNode.setPositionY(t);
                                var i = this._hasListenerCache;
                                i && i[h] && this.emit(h)
                            }
                        }
                    },
                    rotation: {
                        get: function() {
                            return this._rotationX !== this._rotationY && cc.logID(1602), this._rotationX
                        },
                        set: function(t) {
                            if (this._rotationX !== t || this._rotationY !== t) {
                                this._rotationX = this._rotationY = t, this._sgNode.rotation = t;
                                var e = this._hasListenerCache;
                                e && e[_] && this.emit(_)
                            }
                        }
                    },
                    rotationX: {
                        get: function() {
                            return this._rotationX
                        },
                        set: function(t) {
                            if (this._rotationX !== t) {
                                this._rotationX = t, this._sgNode.rotationX = t;
                                var e = this._hasListenerCache;
                                e && e[_] && this.emit(_)
                            }
                        }
                    },
                    rotationY: {
                        get: function() {
                            return this._rotationY
                        },
                        set: function(t) {
                            if (this._rotationY !== t) {
                                this._rotationY = t, this._sgNode.rotationY = t;
                                var e = this._hasListenerCache;
                                e && e[_] && this.emit(_)
                            }
                        }
                    },
                    scaleX: {
                        get: function() {
                            return this._scaleX
                        },
                        set: function(t) {
                            if (this._scaleX !== t) {
                                this._scaleX = t, this._sgNode.scaleX = t;
                                var e = this._hasListenerCache;
                                e && e[d] && this.emit(d)
                            }
                        }
                    },
                    scaleY: {
                        get: function() {
                            return this._scaleY
                        },
                        set: function(t) {
                            if (this._scaleY !== t) {
                                this._scaleY = t, this._sgNode.scaleY = t;
                                var e = this._hasListenerCache;
                                e && e[d] && this.emit(d)
                            }
                        }
                    },
                    skewX: {
                        get: function() {
                            return this._skewX
                        },
                        set: function(t) {
                            this._skewX = t, this._sgNode.skewX = t
                        }
                    },
                    skewY: {
                        get: function() {
                            return this._skewY
                        },
                        set: function(t) {
                            this._skewY = t, this._sgNode.skewY = t
                        }
                    },
                    opacity: {
                        get: function() {
                            return this._opacity
                        },
                        set: function(t) {
                            if (this._opacity !== t && (this._opacity = t, this._sgNode.setOpacity(t), !this._cascadeOpacityEnabled)) {
                                var e = this._sizeProvider;
                                e instanceof _ccsg.Node && e !== this._sgNode && e.setOpacity(t)
                            }
                        },
                        range: [0, 255]
                    },
                    cascadeOpacity: {
                        get: function() {
                            return this._cascadeOpacityEnabled
                        },
                        set: function(t) {
                            if (this._cascadeOpacityEnabled !== t) {
                                this._cascadeOpacityEnabled = t, this._sgNode.cascadeOpacity = t;
                                var e = t ? 255 : this._opacity,
                                    i = this._sizeProvider;
                                i instanceof _ccsg.Node && i.setOpacity(e)
                            }
                        }
                    },
                    color: {
                        get: function() {
                            return this._color.clone()
                        },
                        set: function(t) {
                            this._color.equals(t) || (this._color.fromColor(t), this._sizeProvider instanceof _ccsg.Node && this._sizeProvider.setColor(t))
                        }
                    },
                    anchorX: {
                        get: function() {
                            return this._anchorPoint.x
                        },
                        set: function(t) {
                            var e = this._anchorPoint;
                            if (e.x !== t) {
                                e.x = t;
                                var i = this._sizeProvider;
                                i instanceof _ccsg.Node && i.setAnchorPoint(e), this.emit(u)
                            }
                        }
                    },
                    anchorY: {
                        get: function() {
                            return this._anchorPoint.y
                        },
                        set: function(t) {
                            var e = this._anchorPoint;
                            if (e.y !== t) {
                                e.y = t;
                                var i = this._sizeProvider;
                                i instanceof _ccsg.Node && i.setAnchorPoint(e), this.emit(u)
                            }
                        }
                    },
                    width: {
                        get: function() {
                            if (this._sizeProvider) {
                                var t = this._sizeProvider._getWidth();
                                return this._contentSize.width = t, t
                            }
                            return this._contentSize.width
                        },
                        set: function(t) {
                            if (t !== this._contentSize.width) {
                                var e = this._sizeProvider;
                                e && e.setContentSize(t, e._getHeight());
                                this._contentSize.width = t, this.emit(l)
                            }
                        }
                    },
                    height: {
                        get: function() {
                            if (this._sizeProvider) {
                                var t = this._sizeProvider._getHeight();
                                return this._contentSize.height = t, t
                            }
                            return this._contentSize.height
                        },
                        set: function(t) {
                            if (t !== this._contentSize.height) {
                                var e = this._sizeProvider;
                                e && e.setContentSize(e._getWidth(), t);
                                this._contentSize.height = t, this.emit(l)
                            }
                        }
                    },
                    zIndex: {
                        get: function() {
                            return this._localZOrder
                        },
                        set: function(t) {
                            this._localZOrder !== t && (this._localZOrder = t, this._sgNode.zIndex = t, this._parent && (function(t) {
                                t._parent._delaySort(), o._setDirtyForNode(t)
                            })(this))
                        }
                    }
                },
                ctor: function(t) {
                    var e = this._sgNode = new _ccsg.Node;
                    cc.game._isCloning || (e.cascadeOpacity = !0), this._sizeProvider = null, this._reorderChildDirty = !1, this._widget = null, this._touchListener = null, this._mouseListener = null
                },
                statics: {
                    isNode: function(t) {
                        return t instanceof I && (t.constructor === I || !(t instanceof cc.Scene))
                    }
                },
                _onSetParent: function(t) {
                    var e = this._sgNode;
                    e.parent && e.parent.removeChild(e, !1), t && (t._sgNode.addChild(e), t._delaySort())
                },
                _onSiblingIndexChanged: function(t) {
                    var e = this._parent,
                        i = e._children,
                        n = 0,
                        r = i.length;
                    for (0; n < r; n++) i[n]._sgNode._arrivalOrder = n, o._setDirtyForNode(i[n]);
                    cc.renderer.childrenOrderDirty = !0, e._sgNode._reorderChildDirty = !0, e._delaySort()
                },
                _onPreDestroy: function() {
                    var t = this._onPreDestroyBase();
                    p && cc.director.getActionManager().removeAllActionsFromTarget(this), C === this && (C = null), this._reorderChildDirty && cc.director.__fastOff(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this), o.removeListeners(this), t || this._removeSgNode()
                },
                _onPostActivated: function(t) {
                    var e = p ? cc.director.getActionManager() : null;
                    if (t)
                        if (e && e.resumeTarget(this), o.resumeTarget(this), this._touchListener) {
                            var i = this._touchListener.mask = n(this);
                            this._mouseListener && (this._mouseListener.mask = i)
                        } else this._mouseListener && (this._mouseListener.mask = n(this));
                    else e && e.pauseTarget(this), o.pauseTarget(this)
                },
                _onHierarchyChanged: function(t) {
                    this._onHierarchyChangedBase(t), cc._widgetManager._nodesOrderDirty = !0
                },
                _onBatchCreated: function() {
                    var t = this._prefab;
                    t && t.sync && !t._synced && t.root === this && r.syncWithPrefab(this), this._updateDummySgNode(), this._parent && this._parent._sgNode.addChild(this._sgNode), this._activeInHierarchy || (p && cc.director.getActionManager().pauseTarget(this), o.pauseTarget(this));
                    for (var e = this._children, i = 0, n = e.length; i < n; i++) e[i]._onBatchCreated()
                },
                on: function(t, e, i, r) {
                    var s = !1;
                    return -1 !== v.indexOf(t) ? this._touchListener || (this._touchListener = cc.EventListener.create({
                        event: cc.EventListener.TOUCH_ONE_BY_ONE,
                        swallowTouches: !0,
                        owner: this,
                        mask: n(this),
                        onTouchBegan: T,
                        onTouchMoved: E,
                        onTouchEnded: x,
                        onTouchCancelled: R
                    }), o.addListener(this._touchListener, this), s = !0) : -1 !== y.indexOf(t) && (this._mouseListener || (this._mouseListener = cc.EventListener.create({
                        event: cc.EventListener.MOUSE,
                        _previousIn: !1,
                        owner: this,
                        mask: n(this),
                        onMouseDown: S,
                        onMouseMove: w,
                        onMouseUp: A,
                        onMouseScroll: b
                    }), o.addListener(this._mouseListener, this), s = !0)), s && !this._activeInHierarchy && cc.director.getScheduler().schedule((function() {
                        this._activeInHierarchy || o.pauseTarget(this)
                    }), this, 0, 0, 0, !1), this._EventTargetOn(t, e, i, r)
                },
                off: function(t, e, i, n) {
                    this._EventTargetOff(t, e, i, n), -1 !== v.indexOf(t) ? this._checkTouchListeners() : -1 !== y.indexOf(t) && this._checkMouseListeners()
                },
                targetOff: function(t) {
                    this._EventTargetTargetOff(t), this._checkTouchListeners(), this._checkMouseListeners()
                },
                pauseSystemEvents: function(t) {
                    o.pauseTarget(this, t)
                },
                resumeSystemEvents: function(t) {
                    o.resumeTarget(this, t)
                },
                _checkTouchListeners: function() {
                    if (!(this._objFlags & a) && this._touchListener) {
                        var t = 0;
                        if (this._bubblingListeners)
                            for (; t < v.length; ++t)
                                if (this._bubblingListeners.has(v[t])) return;
                        if (this._capturingListeners)
                            for (; t < v.length; ++t)
                                if (this._capturingListeners.has(v[t])) return;
                        o.removeListener(this._touchListener), this._touchListener = null
                    }
                },
                _checkMouseListeners: function() {
                    if (!(this._objFlags & a) && this._mouseListener) {
                        var t = 0;
                        if (this._bubblingListeners)
                            for (; t < y.length; ++t)
                                if (this._bubblingListeners.has(y[t])) return;
                        if (this._capturingListeners)
                            for (; t < y.length; ++t)
                                if (this._capturingListeners.has(y[t])) return;
                        C === this && (C = null), o.removeListener(this._mouseListener), this._mouseListener = null
                    }
                },
                _hitTest: function(t, e) {
                    var i = this.width,
                        n = this.height,
                        r = t,
                        s = cc.Camera;
                    s && s.main && s.main.containsNode(this) && (r = s.main.getCameraToWorldPoint(r));
                    var o = cc.affineTransformInvertIn(this._sgNode.getNodeToWorldTransform());
                    (r = cc.pointApplyAffineTransform(r, o)).x += this._anchorPoint.x * i, r.y += this._anchorPoint.y * n;
                    var c = r.x,
                        a = i - r.x,
                        h = r.y,
                        l = n - r.y;
                    if (c >= 0 && a >= 0 && l >= 0 && h >= 0) {
                        if (e && e.mask) {
                            for (var u = e.mask, _ = this, d = 0; _ && d < u.index; ++d, _ = _.parent);
                            if (_ === u.node) {
                                var f = _.getComponent(cc.Mask);
                                return !f || !f.enabledInHierarchy || f._hitTest(t)
                            }
                            return e.mask = null, !0
                        }
                        return !0
                    }
                    return !1
                },
                _getCapturingTargets: function(t, e) {
                    for (var i = this.parent; i;) i.hasEventListener(t, !0) && e.push(i), i = i.parent
                },
                _getBubblingTargets: function(t, e) {
                    for (var i = this.parent; i;) i.hasEventListener(t) && e.push(i), i = i.parent
                },
                isRunning: function() {
                    return this._activeInHierarchy
                },
                runAction: p ? function(t) {
                    if (this.active) return cc.assertID(t, 1618), cc.macro.ENABLE_GC_FOR_NATIVE_OBJECTS || this._retainAction(t), cc.director.getActionManager().addAction(t, this, !1), t
                } : g,
                pauseAllActions: p ? function() {
                    cc.director.getActionManager().pauseTarget(this)
                } : g,
                resumeAllActions: p ? function() {
                    cc.director.getActionManager().resumeTarget(this)
                } : g,
                stopAllActions: p ? function() {
                    cc.director.getActionManager().removeAllActionsFromTarget(this)
                } : g,
                stopAction: p ? function(t) {
                    cc.director.getActionManager().removeAction(t)
                } : g,
                stopActionByTag: p ? function(t) {
                    t !== cc.Action.TAG_INVALID ? cc.director.getActionManager().removeActionByTag(t, this) : cc.logID(1612)
                } : g,
                getActionByTag: p ? function(t) {
                    return t === cc.Action.TAG_INVALID ? (cc.logID(1613), null) : cc.director.getActionManager().getActionByTag(t, this)
                } : function() {
                    return null
                },
                getNumberOfRunningActions: p ? function() {
                    return cc.director.getActionManager().getNumberOfRunningActionsInTarget(this)
                } : function() {
                    return 0
                },
                _retainAction: function(t) {
                    0
                },
                _releaseAllActions: function() {},
                setTag: function(t) {
                    this._tag = t, this._sgNode.tag = t
                },
                getPosition: function() {
                    return new cc.Vec2(this._position)
                },
                setPosition: function(t, e) {
                    var i;
                    void 0 === e ? (i = t.x, e = t.y) : i = t;
                    var n = this._position;
                    if (n.x !== i || n.y !== e) {
                        n.x = i, n.y = e, this._sgNode.setPosition(i, e);
                        var r = this._hasListenerCache;
                        r && r[h] && this.emit(h)
                    }
                },
                getScale: function() {
                    return this._scaleX !== this._scaleY && cc.logID(1603), this._scaleX
                },
                setScale: function(t, e) {
                    if ("object" == typeof t ? (e = t.y, t = t.x) : e = e || 0 === e ? e : t, this._scaleX !== t || this._scaleY !== e) {
                        this._scaleX = t, this._scaleY = e, this._sgNode.setScale(t, e);
                        var i = this._hasListenerCache;
                        i && i[d] && this.emit(d)
                    }
                },
                getContentSize: function(t) {
                    if (this._sizeProvider && !t) {
                        var e = this._sizeProvider.getContentSize();
                        return this._contentSize = e, cc.size(e)
                    }
                    return cc.size(this._contentSize)
                },
                setContentSize: function(t, e) {
                    var i = this._contentSize;
                    if (void 0 === e) {
                        if (t.width === i.width && t.height === i.height) return;
                        0, i.width = t.width, i.height = t.height
                    } else {
                        if (t === i.width && e === i.height) return;
                        0, i.width = t, i.height = e
                    }
                    this._sizeProvider && this._sizeProvider.setContentSize(i), this.emit(l)
                },
                setOpacityModifyRGB: function(t) {
                    if (this._opacityModifyRGB !== t) {
                        this._opacityModifyRGB = t, this._sgNode.setOpacityModifyRGB(t);
                        var e = this._sizeProvider;
                        e instanceof _ccsg.Node && e !== this._sgNode && e.setOpacityModifyRGB(t)
                    }
                },
                isOpacityModifyRGB: function() {
                    return this._opacityModifyRGB
                },
                setGlobalZOrder: function(t) {
                    this._globalZOrder = t, this._sgNode.setGlobalZOrder(t)
                },
                getGlobalZOrder: function() {
                    return this._globalZOrder = this._sgNode.getGlobalZOrder(), this._globalZOrder
                },
                getAnchorPoint: function() {
                    return cc.p(this._anchorPoint)
                },
                setAnchorPoint: function(t, e) {
                    var i = this._anchorPoint;
                    if (void 0 === e) {
                        if (t.x === i.x && t.y === i.y) return;
                        i.x = t.x, i.y = t.y
                    } else {
                        if (t === i.x && e === i.y) return;
                        i.x = t, i.y = e
                    }
                    var n = this._sizeProvider;
                    n instanceof _ccsg.Node && n.setAnchorPoint(i), this.emit(u)
                },
                getAnchorPointInPoints: function() {
                    return this._sgNode.getAnchorPointInPoints()
                },
                getDisplayedOpacity: function() {
                    return this._sgNode.getDisplayedOpacity()
                },
                _updateDisplayedOpacity: function(t) {
                    this._sgNode.updateDisplayedOpacity(t)
                },
                getDisplayedColor: function() {
                    return this._sgNode.getDisplayedColor()
                },
                getNodeToParentTransformAR: function() {
                    var t = this.getContentSize(),
                        e = this._sgNode.getNodeToParentTransform();
                    if (!this._isSgTransformArToMe(t)) {
                        var i = this._anchorPoint.x * t.width,
                            n = this._anchorPoint.y * t.height,
                            r = cc.affineTransformMake(1, 0, 0, 1, i, n);
                        e = cc.affineTransformConcatIn(r, e)
                    }
                    return e
                },
                getBoundingBox: function() {
                    var t = this.getContentSize(),
                        e = cc.rect(0, 0, t.width, t.height);
                    return cc._rectApplyAffineTransformIn(e, this.getNodeToParentTransform())
                },
                getBoundingBoxToWorld: function() {
                    var t;
                    return this.parent && (t = this.parent.getNodeToWorldTransformAR()), this._getBoundingBoxTo(t)
                },
                _getBoundingBoxTo: function(t) {
                    var e = this.getContentSize(),
                        i = e.width,
                        n = e.height,
                        r = cc.rect(-this._anchorPoint.x * i, -this._anchorPoint.y * n, i, n),
                        s = cc.affineTransformConcat(this.getNodeToParentTransformAR(), t);
                    if (cc._rectApplyAffineTransformIn(r, s), !this._children) return r;
                    for (var o = this._children, c = 0; c < o.length; c++) {
                        var a = o[c];
                        if (a && a.active) {
                            var h = a._getBoundingBoxTo(s);
                            h && (r = cc.rectUnion(r, h))
                        }
                    }
                    return r
                },
                getNodeToParentTransform: function() {
                    var t = this.getContentSize(),
                        e = this._sgNode.getNodeToParentTransform();
                    if (this._isSgTransformArToMe(t)) {
                        var i = -this._anchorPoint.x * t.width,
                            n = -this._anchorPoint.y * t.height,
                            r = cc.affineTransformMake(1, 0, 0, 1, i, n);
                        e = cc.affineTransformConcatIn(r, e)
                    }
                    return e
                },
                getNodeToWorldTransform: function() {
                    var t = this.getContentSize();
                    cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
                    var e = this._sgNode.getNodeToWorldTransform();
                    if (this._isSgTransformArToMe(t)) {
                        var i = -this._anchorPoint.x * t.width,
                            n = -this._anchorPoint.y * t.height,
                            r = cc.affineTransformMake(1, 0, 0, 1, i, n);
                        e = cc.affineTransformConcatIn(r, e)
                    }
                    return e
                },
                getNodeToWorldTransformAR: function() {
                    var t = this.getContentSize();
                    cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
                    var e = this._sgNode.getNodeToWorldTransform();
                    if (!this._isSgTransformArToMe(t)) {
                        var i = this._anchorPoint.x * t.width,
                            n = this._anchorPoint.y * t.height,
                            r = cc.affineTransformMake(1, 0, 0, 1, i, n);
                        e = cc.affineTransformConcatIn(r, e)
                    }
                    return e
                },
                getParentToNodeTransform: function() {
                    return this._sgNode.getParentToNodeTransform()
                },
                getWorldToNodeTransform: function() {
                    return cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene(), this._sgNode.getWorldToNodeTransform()
                },
                _isSgTransformArToMe: function(t) {
                    var e = this._sgNode.getContentSize();
                    return 0 === e.width && 0 === e.height && (0 !== t.width || 0 !== t.height) || !!this._sgNode.isIgnoreAnchorPointForPosition()
                },
                convertToNodeSpace: function(t) {
                    cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
                    var e = this._sgNode.convertToNodeSpace(t);
                    return cc.pAdd(e, cc.p(this._anchorPoint.x * this._contentSize.width, this._anchorPoint.y * this._contentSize.height))
                },
                convertToWorldSpace: function(t) {
                    cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene();
                    var e = t.x - this._anchorPoint.x * this._contentSize.width,
                        i = t.y - this._anchorPoint.y * this._contentSize.height;
                    return cc.v2(this._sgNode.convertToWorldSpace(cc.v2(e, i)))
                },
                convertToNodeSpaceAR: function(t) {
                    return cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene(), this._sgNode.isIgnoreAnchorPointForPosition() ? cc.v2(this._sgNode.convertToNodeSpace(t)) : this._sgNode.convertToNodeSpaceAR(t)
                },
                convertToWorldSpaceAR: function(t) {
                    return cc._renderType === cc.game.RENDER_TYPE_CANVAS && cc.director._visitScene(), this._sgNode.isIgnoreAnchorPointForPosition() ? cc.v2(this._sgNode.convertToWorldSpace(t)) : cc.v2(this._sgNode.convertToWorldSpaceAR(t))
                },
                convertTouchToNodeSpace: function(t) {
                    return this.convertToNodeSpace(t.getLocation())
                },
                convertTouchToNodeSpaceAR: function(t) {
                    return this.convertToNodeSpaceAR(t.getLocation())
                },
                setNodeDirty: function() {
                    this._sgNode.setNodeDirty()
                },
                addChild: function(t, e, i) {
                    e = void 0 === e ? t._localZOrder : e;
                    var n, r = !1;
                    void 0 === i ? (i = void 0, n = t._name) : cc.js.isString(i) ? (n = i, i = void 0) : cc.js.isNumber(i) && (r = !0, n = ""), cc.assertID(t, 1606), cc.assertID(null === t._parent, 1605), t.parent = this, t.zIndex = e, r ? t.setTag(i) : t.setName(n)
                },
                cleanup: function() {
                    p && cc.director.getActionManager().removeAllActionsFromTarget(this), o.removeListeners(this);
                    var t, e, i = this._children.length;
                    for (t = 0; t < i; ++t)(e = this._children[t]) && e.cleanup()
                },
                sortAllChildren: function() {
                    if (this._reorderChildDirty) {
                        this._reorderChildDirty = !1;
                        var t = this._children;
                        if (t.length > 1) {
                            var e, i, n, r = t.length;
                            for (e = 1; e < r; e++) {
                                for (n = t[e], i = e - 1; i >= 0;) {
                                    if (n._localZOrder < t[i]._localZOrder) t[i + 1] = t[i];
                                    else {
                                        if (!(n._localZOrder === t[i]._localZOrder && n._sgNode._arrivalOrder < t[i]._sgNode._arrivalOrder)) break;
                                        t[i + 1] = t[i]
                                    }
                                    i--
                                }
                                t[i + 1] = n
                            }
                            this.emit("child-reorder")
                        }
                        cc.director.__fastOff(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this)
                    }
                },
                _delaySort: function() {
                    this._reorderChildDirty || (this._reorderChildDirty = !0, cc.director.__fastOn(cc.Director.EVENT_AFTER_UPDATE, this.sortAllChildren, this))
                },
                _updateDummySgNode: function() {
                    var t = this._sgNode;
                    t.setPosition(this._position), t.setRotationX(this._rotationX), t.setRotationY(this._rotationY), t.setScale(this._scaleX, this._scaleY), t.setSkewX(this._skewX), t.setSkewY(this._skewY);
                    var e = t._arrivalOrder;
                    t.setLocalZOrder(this._localZOrder), t._arrivalOrder = e, t.setGlobalZOrder(this._globalZOrder), t.setOpacity(this._opacity), t.setOpacityModifyRGB(this._opacityModifyRGB), t.setCascadeOpacityEnabled(this._cascadeOpacityEnabled), t.setTag(this._tag)
                },
                _updateSgNode: function() {
                    this._updateDummySgNode();
                    var t = this._sgNode;
                    t.setAnchorPoint(this._anchorPoint), t.setVisible(this._active), t.setColor(this._color);
                    var e = p ? cc.director.getActionManager() : null;
                    this._activeInHierarchy ? (e && e.resumeTarget(this), o.resumeTarget(this)) : (e && e.pauseTarget(this), o.pauseTarget(this))
                },
                _removeSgNode: s.removeSgNode,
                onRestore: !1
            });
        f.propertyDefine(I, ["parent", "tag", "skewX", "skewY", "position", "rotation", "rotationX", "rotationY", "scale", "scaleX", "scaleY", "opacity", "color"], {
            x: ["getPositionX", "setPositionX"],
            y: ["getPositionY", "setPositionY"],
            zIndex: ["getLocalZOrder", "setLocalZOrder"],
            opacityModifyRGB: ["isOpacityModifyRGB", "setOpacityModifyRGB"],
            cascadeOpacity: ["isCascadeOpacityEnabled", "setCascadeOpacityEnabled"]
        }), I.EventType = m, cc.Node = e.exports = I
    }), {
        "./event-manager": 52,
        "./event/event": 55,
        "./utils/base-node": 124,
        "./utils/misc": 128,
        "./utils/prefab-helper": 130,
        "./utils/scene-graph-helper": 131
    }],
    17: [(function(t, e, i) {
        cc.Scene = cc.Class({
            name: "cc.Scene",
            extends: t("./CCNode"),
            properties: {
                autoReleaseAssets: {
                    default: void 0,
                    type: cc.Boolean
                }
            },
            ctor: function() {
                var t = this._sgNode = new _ccsg.Scene;
                t.setAnchorPoint(0, 0), this._anchorPoint.x = 0, this._anchorPoint.y = 0, this._activeInHierarchy = !1, this._inited = !cc.game._isCloning, this.dependAssets = null
            },
            destroy: function() {
                this._super(), this._activeInHierarchy = !1
            },
            _onHierarchyChanged: function() {},
            _instantiate: null,
            _load: function() {
                this._inited || (this._onBatchCreated(), this._inited = !0)
            },
            _activate: function(t) {
                t = !1 !== t, cc.director._nodeActivator.activateNode(this, t)
            }
        }), e.exports = cc.Scene
    }), {
        "./CCNode": 16
    }],
    18: [(function(t, e, i) {
        function n() {
            this._lock = !1, this._scheduler = null, this._elapsed = -1, this._runForever = !1, this._useDelay = !1, this._timesExecuted = 0, this._repeat = 0, this._delay = 0, this._interval = 0, this._target = null, this._callback = null
        }
        var r = function(t, e, i, n, r, s, o) {
                this.prev = t, this.next = e, this.callback = i, this.target = n, this.priority = r, this.paused = s, this.markedForDeletion = o, this.isUpdate = !i
            },
            s = [];
        r.get = function(t, e, i, n, o, c, a) {
            var h = s.pop();
            return h ? (h.prev = t, h.next = e, h.callback = i, h.target = n, h.priority = o, h.paused = c, h.markedForDeletion = a, h.isUpdate = !i) : h = new r(t, e, i, n, o, c, a), h
        }, r.put = function(t) {
            s.length < 20 && (t.prev = t.next = t.callback = t.target = null, s.push(t))
        };
        var o = function(t, e, i, n) {
                this.list = t, this.entry = e, this.target = i, this.callback = n
            },
            c = [];
        o.get = function(t, e, i, n) {
            var r = c.pop();
            return r ? (r.list = t, r.entry = e, r.target = i, r.callback = n) : r = new o(t, e, i, n), r
        }, o.put = function(t) {
            c.length < 20 && (t.list = t.entry = t.target = t.callback = null, c.push(t))
        };
        var a = function(t, e, i, n, r, s) {
                this.timers = t, this.target = e, this.timerIndex = i, this.currentTimer = n, this.currentTimerSalvaged = r, this.paused = s
            },
            h = [];
        a.get = function(t, e, i, n, r, s) {
            var o = h.pop();
            return o ? (o.timers = t, o.target = e, o.timerIndex = i, o.currentTimer = n, o.currentTimerSalvaged = r, o.paused = s) : o = new a(t, e, i, n, r, s), o
        }, a.put = function(t) {
            h.length < 20 && (t.timers = t.target = t.currentTimer = null, h.push(t))
        };
        var l = n.prototype;
        l.initWithCallback = function(t, e, i, n, r, s) {
            return this._lock = !1, this._scheduler = t, this._target = i, this._callback = e, this._elapsed = -1, this._interval = n, this._delay = s, this._useDelay = this._delay > 0, this._repeat = r, this._runForever = this._repeat === cc.macro.REPEAT_FOREVER, !0
        }, l.getInterval = function() {
            return this._interval
        }, l.setInterval = function(t) {
            this._interval = t
        }, l.update = function(t) {
            -1 === this._elapsed ? (this._elapsed = 0, this._timesExecuted = 0) : (this._elapsed += t, this._runForever && !this._useDelay ? this._elapsed >= this._interval && (this.trigger(), this._elapsed = 0) : (this._useDelay ? this._elapsed >= this._delay && (this.trigger(), this._elapsed -= this._delay, this._timesExecuted += 1, this._useDelay = !1) : this._elapsed >= this._interval && (this.trigger(), this._elapsed = 0, this._timesExecuted += 1), this._callback && !this._runForever && this._timesExecuted > this._repeat && this.cancel()))
        }, l.getCallback = function() {
            return this._callback
        }, l.trigger = function() {
            this._target && this._callback && (this._lock = !0, this._callback.call(this._target, this._elapsed), this._lock = !1)
        }, l.cancel = function() {
            this._scheduler.unschedule(this._callback, this._target)
        };
        var u = [];
        n.get = function() {
            return u.pop() || new n
        }, n.put = function(t) {
            u.length < 20 && !t._lock && (t._scheduler = t._target = t._callback = null, u.push(t))
        };
        var _ = function(t) {
            return t.__instanceId || t.uuid
        };
        cc.Scheduler = cc._Class.extend({
            ctor: function() {
                this._timeScale = 1, this._updatesNegList = [], this._updates0List = [], this._updatesPosList = [], this._hashForUpdates = {}, this._hashForTimers = {}, this._currentTarget = null, this._currentTargetSalvaged = !1, this._updateHashLocked = !1, this._arrayForTimers = []
            },
            _removeHashElement: function(t) {
                delete this._hashForTimers[_(t.target)];
                for (var e = this._arrayForTimers, i = 0, n = e.length; i < n; i++)
                    if (e[i] === t) {
                        e.splice(i, 1);
                        break
                    }
                a.put(t)
            },
            _removeUpdateFromHash: function(t) {
                var e = _(t.target),
                    i = this._hashForUpdates[e];
                if (i) {
                    for (var n = i.list, s = i.entry, c = 0, a = n.length; c < a; c++)
                        if (n[c] === s) {
                            n.splice(c, 1);
                            break
                        }
                    delete this._hashForUpdates[e], r.put(s), o.put(i)
                }
            },
            _priorityIn: function(t, e, i) {
                for (var n = 0; n < t.length; n++)
                    if (i < t[n].priority) return void t.splice(n, 0, e);
                t.push(e)
            },
            _appendIn: function(t, e) {
                t.push(e)
            },
            setTimeScale: function(t) {
                this._timeScale = t
            },
            getTimeScale: function() {
                return this._timeScale
            },
            update: function(t) {
                this._updateHashLocked = !0, 1 !== this._timeScale && (t *= this._timeScale);
                var e, i, n, r;
                for (e = 0, n = (i = this._updatesNegList).length; e < n; e++)(r = i[e]).paused || r.markedForDeletion || (r.isUpdate ? r.target.update(t) : r.callback.call(r.target, t));
                for (e = 0, n = (i = this._updates0List).length; e < n; e++)(r = i[e]).paused || r.markedForDeletion || (r.isUpdate ? r.target.update(t) : r.callback.call(r.target, t));
                for (e = 0, n = (i = this._updatesPosList).length; e < n; e++)(r = i[e]).paused || r.markedForDeletion || (r.isUpdate ? r.target.update(t) : r.callback.call(r.target, t));
                var s, o = this._arrayForTimers;
                for (e = 0; e < o.length; e++) {
                    if (s = o[e], this._currentTarget = s, this._currentTargetSalvaged = !1, !s.paused)
                        for (s.timerIndex = 0; s.timerIndex < s.timers.length; ++s.timerIndex) s.currentTimer = s.timers[s.timerIndex], s.currentTimerSalvaged = !1, s.currentTimer.update(t), s.currentTimer = null;
                    this._currentTargetSalvaged && 0 === this._currentTarget.timers.length && (this._removeHashElement(this._currentTarget), --e)
                }
                for (e = 0, i = this._updatesNegList; e < i.length;)(r = i[e]).markedForDeletion ? this._removeUpdateFromHash(r) : e++;
                for (e = 0, i = this._updates0List; e < i.length;)(r = i[e]).markedForDeletion ? this._removeUpdateFromHash(r) : e++;
                for (e = 0, i = this._updatesPosList; e < i.length;)(r = i[e]).markedForDeletion ? this._removeUpdateFromHash(r) : e++;
                this._updateHashLocked = !1, this._currentTarget = null
            },
            scheduleCallbackForTarget: function(t, e, i, n, r, s) {
                this.schedule(e, t, i, n, r, s)
            },
            schedule: function(t, e, i, r, s, o) {
                "use strict";
                if ("function" != typeof t) {
                    var c = t;
                    t = e, e = c
                }
                4 !== arguments.length && 5 !== arguments.length || (o = !!r, r = cc.macro.REPEAT_FOREVER, s = 0), cc.assertID(e, 1502);
                var h = _(e);
                cc.assertID(h, 1510);
                var l = this._hashForTimers[h];
                l ? l.paused !== o && cc.warnID(1511) : (l = a.get(null, e, 0, null, null, o), this._arrayForTimers.push(l), this._hashForTimers[h] = l);
                var u, d;
                if (null == l.timers) l.timers = [];
                else
                    for (d = 0; d < l.timers.length; ++d)
                        if ((u = l.timers[d]) && t === u._callback) return cc.logID(1507, u.getInterval(), i), void(u._interval = i);
                (u = n.get()).initWithCallback(this, t, e, i, r, s), l.timers.push(u), this._currentTarget === l && this._currentTargetSalvaged && (this._currentTargetSalvaged = !1)
            },
            scheduleUpdate: function(t, e, i, n) {
                var s = _(t);
                cc.assertID(s, 1510);
                var c = this._hashForUpdates[s];
                if (c && c.entry) {
                    if (c.entry.priority === e) return c.entry.markedForDeletion = !1, void(c.entry.paused = i);
                    if (this._updateHashLocked) return cc.logID(1506), c.entry.markedForDeletion = !1, void(c.entry.paused = i);
                    this.unscheduleUpdate(t)
                }
                n && cc.warnID(1512);
                var a, h = r.get(null, null, n, t, e, i, !1);
                0 === e ? (a = this._updates0List, this._appendIn(a, h)) : (a = e < 0 ? this._updatesNegList : this._updatesPosList, this._priorityIn(a, h, e)), this._hashForUpdates[s] = o.get(a, h, t, null)
            },
            unschedule: function(t, e) {
                if (e && t) {
                    var i = _(e);
                    cc.assertID(i, 1510);
                    var r = this._hashForTimers[i];
                    if (r)
                        for (var s = r.timers, o = 0, c = s.length; o < c; o++) {
                            var a = s[o];
                            if (t === a._callback) return a !== r.currentTimer || r.currentTimerSalvaged || (r.currentTimerSalvaged = !0), s.splice(o, 1), n.put(a), r.timerIndex >= o && r.timerIndex--, void(0 === s.length && (this._currentTarget === r ? this._currentTargetSalvaged = !0 : this._removeHashElement(r)))
                        }
                }
            },
            unscheduleUpdate: function(t) {
                if (t) {
                    var e = _(t);
                    cc.assertID(e, 1510);
                    var i = this._hashForUpdates[e];
                    i && (this._updateHashLocked ? i.entry.markedForDeletion = !0 : this._removeUpdateFromHash(i.entry))
                }
            },
            unscheduleAllForTarget: function(t) {
                if (t) {
                    var e = _(t);
                    cc.assertID(e, 1510);
                    var i = this._hashForTimers[e];
                    if (i) {
                        var r = i.timers;
                        r.indexOf(i.currentTimer) > -1 && !i.currentTimerSalvaged && (i.currentTimerSalvaged = !0);
                        for (var s = 0, o = r.length; s < o; s++) n.put(r[s]);
                        r.length = 0, this._currentTarget === i ? this._currentTargetSalvaged = !0 : this._removeHashElement(i)
                    }
                    this.unscheduleUpdate(t)
                }
            },
            unscheduleAll: function() {
                this.unscheduleAllWithMinPriority(cc.Scheduler.PRIORITY_SYSTEM)
            },
            unscheduleAllWithMinPriority: function(t) {
                var e, i, n = this._arrayForTimers;
                for (e = n.length - 1; e >= 0; e--) i = n[e], this.unscheduleAllForTarget(i.target);
                var r, s = 0;
                if (t < 0)
                    for (e = 0; e < this._updatesNegList.length;) s = this._updatesNegList.length, (r = this._updatesNegList[e]) && r.priority >= t && this.unscheduleUpdate(r.target), s == this._updatesNegList.length && e++;
                if (t <= 0)
                    for (e = 0; e < this._updates0List.length;) s = this._updates0List.length, (r = this._updates0List[e]) && this.unscheduleUpdate(r.target), s == this._updates0List.length && e++;
                for (e = 0; e < this._updatesPosList.length;) s = this._updatesPosList.length, (r = this._updatesPosList[e]) && r.priority >= t && this.unscheduleUpdate(r.target), s == this._updatesPosList.length && e++
            },
            isScheduled: function(t, e) {
                cc.assertID(t, 1508), cc.assertID(e, 1509);
                var i = _(e);
                cc.assertID(i, 1510);
                var n = this._hashForTimers[i];
                if (!n) return !1;
                if (null == n.timers) return !1;
                for (var r = n.timers, s = 0; s < r.length; ++s) {
                    if (t === r[s]._callback) return !0
                }
                return !1
            },
            pauseAllTargets: function() {
                return this.pauseAllTargetsWithMinPriority(cc.Scheduler.PRIORITY_SYSTEM)
            },
            pauseAllTargetsWithMinPriority: function(t) {
                var e, i, n, r = [],
                    s = this._arrayForTimers;
                for (i = 0, n = s.length; i < n; i++)(e = s[i]) && (e.paused = !0, r.push(e.target));
                var o;
                if (t < 0)
                    for (i = 0; i < this._updatesNegList.length; i++)(o = this._updatesNegList[i]) && o.priority >= t && (o.paused = !0, r.push(o.target));
                if (t <= 0)
                    for (i = 0; i < this._updates0List.length; i++)(o = this._updates0List[i]) && (o.paused = !0, r.push(o.target));
                for (i = 0; i < this._updatesPosList.length; i++)(o = this._updatesPosList[i]) && o.priority >= t && (o.paused = !0, r.push(o.target));
                return r
            },
            resumeTargets: function(t) {
                if (t)
                    for (var e = 0; e < t.length; e++) this.resumeTarget(t[e])
            },
            pauseTarget: function(t) {
                cc.assertID(t, 1503);
                var e = _(t);
                cc.assertID(e, 1510);
                var i = this._hashForTimers[e];
                i && (i.paused = !0);
                var n = this._hashForUpdates[e];
                n && (n.entry.paused = !0)
            },
            resumeTarget: function(t) {
                cc.assertID(t, 1504);
                var e = _(t);
                cc.assertID(e, 1510);
                var i = this._hashForTimers[e];
                i && (i.paused = !1);
                var n = this._hashForUpdates[e];
                n && (n.entry.paused = !1)
            },
            isTargetPaused: function(t) {
                cc.assertID(t, 1505);
                var e = _(t);
                cc.assertID(e, 1510);
                var i = this._hashForTimers[e];
                if (i) return i.paused;
                var n = this._hashForUpdates[e];
                return !!n && n.entry.paused
            },
            scheduleUpdateForTarget: function(t, e, i) {
                this.scheduleUpdate(t, e, i)
            },
            unscheduleCallbackForTarget: function(t, e) {
                this.unschedule(e, t)
            },
            unscheduleUpdateForTarget: function(t) {
                this.unscheduleUpdate(t)
            },
            unscheduleAllCallbacksForTarget: function(t) {
                this.unscheduleAllForTarget(t)
            },
            unscheduleAllCallbacks: function() {
                this.unscheduleAllWithMinPriority(cc.Scheduler.PRIORITY_SYSTEM)
            },
            unscheduleAllCallbacksWithMinPriority: function(t) {
                this.unscheduleAllWithMinPriority(t)
            }
        }), cc.Scheduler.PRIORITY_SYSTEM = 1 << 31, cc.Scheduler.PRIORITY_NON_SYSTEM = cc.Scheduler.PRIORITY_SYSTEM + 1
    }), {}],
    19: [(function(t, e, i) {
        var n = t("./CCRawAsset");
        cc.Asset = cc.Class({
            name: "cc.Asset",
            extends: n,
            properties: {
                rawUrl: {
                    get: function() {
                        if (this._rawFiles) {
                            if (cc.AssetLibrary) return cc.AssetLibrary.getLibUrlNoExt(this._uuid) + "/" + this._rawFiles[0];
                            cc.errorID(6400)
                        }
                        return ""
                    },
                    visible: !1
                },
                rawUrls: {
                    get: function() {
                        if (this._rawFiles) {
                            if (cc.AssetLibrary) {
                                var t = cc.AssetLibrary.getLibUrlNoExt(this._uuid) + "/";
                                return this._rawFiles.map((function(e) {
                                    return t + e
                                }))
                            }
                            cc.errorID(6401)
                        }
                        return []
                    },
                    visible: !1
                },
                _rawFiles: null
            },
            statics: {
                deserialize: function(t) {
                    return cc.deserialize(t)
                },
                preventDeferredLoadDependents: !1
            },
            serialize: function() {
                return Editor.serialize(this)
            },
            createNode: null,
            _setRawFiles: function(t) {
                this._rawFiles = t.length > 0 ? t : null
            },
            _preloadRawFiles: null
        }), e.exports = cc.Asset
    }), {
        "./CCRawAsset": 25
    }],
    20: [(function(t, e, i) {
        var n = cc.Class({
            name: "cc.AudioClip",
            extends: cc.RawAsset
        });
        cc.AudioClip = n, e.exports = n
    }), {}],
    21: [(function(t, e, i) {
        var n = cc.Class({
            name: "cc.BitmapFont",
            extends: cc.Font,
            properties: {
                fntDataStr: {
                    default: ""
                },
                spriteFrame: {
                    default: null,
                    type: cc.SpriteFrame
                },
                fontSize: {
                    default: -1
                },
                _fntConfig: null
            }
        });
        cc.BitmapFont = n, e.exports = n
    }), {}],
    22: [(function(t, e, i) {
        var n = cc.Class({
            name: "cc.Font",
            extends: cc.Asset
        });
        cc.Font = n, e.exports = n
    }), {}],
    23: [(function(t, e, i) {
        var n = cc.Class({
            name: "cc.LabelAtlas",
            extends: cc.BitmapFont
        });
        cc.LabelAtlas = n, e.exports = n
    }), {}],
    24: [(function(t, e, i) {
        var n = cc.Class({
            name: "cc.Prefab",
            extends: cc.Asset,
            properties: {
                data: null,
                asyncLoadAssets: void 0,
                _createFunction: {
                    default: null,
                    serializable: !1
                }
            },
            createNode: !1,
            compileCreateFunction: function() {
                var e = t("../platform/instantiate-jit");
                this._createFunction = e.compile(this.data)
            },
            _doInstantiate: function(t) {
                return this.data._prefab ? this.data._prefab._synced = !0 : cc.warnID(3700), this._createFunction || this.compileCreateFunction(), this._createFunction(t)
            },
            _instantiate: function() {
                var t;
                return t = this._doInstantiate(), this.data._instantiate(t), t
            }
        });
        cc.Prefab = e.exports = n, cc.js.obsolete(cc, "cc._Prefab", "Prefab")
    }), {
        "../platform/instantiate-jit": 98
    }],
    25: [(function(t, e, i) {
        var n = t("../platform/CCObject");
        cc.RawAsset = cc.Class({
            name: "cc.RawAsset",
            extends: n,
            ctor: function() {
                Object.defineProperty(this, "_uuid", {
                    value: "",
                    writable: !0
                })
            },
            statics: {
                createNodeByInfo: null
            }
        }), Object.defineProperty(cc.RawAsset, "isRawAssetType", {
            value: function(t) {
                return cc.isChildClassOf(t, cc.RawAsset) && !cc.isChildClassOf(t, cc.Asset)
            }
        }), e.exports = cc.RawAsset
    }), {
        "../platform/CCObject": 85
    }],
    26: [(function(t, e, i) {
        var n = cc.Class({
            name: "cc.SceneAsset",
            extends: cc.Asset,
            properties: {
                scene: null,
                asyncLoadAssets: void 0
            }
        });
        cc.SceneAsset = n, e.exports = n
    }), {}],
    27: [(function(t, e, i) {
        var n = cc.Class({
            name: "cc.Script",
            extends: cc.Asset
        });
        cc._Script = n;
        var r = cc.Class({
            name: "cc.JavaScript",
            extends: n
        });
        cc._JavaScript = r;
        var s = cc.Class({
            name: "cc.CoffeeScript",
            extends: n
        });
        cc._CoffeeScript = s;
        var o = cc.Class({
            name: "cc.TypeScript",
            extends: n
        });
        cc._TypeScript = o
    }), {}],
    28: [(function(t, e, i) {
        var n = cc.Class({
            name: "cc.SpriteAtlas",
            extends: cc.Asset,
            properties: {
                _spriteFrames: {
                    default: {}
                }
            },
            getTexture: function() {
                var t = Object.keys(this._spriteFrames);
                if (t.length > 0) {
                    var e = this._spriteFrames[t[0]];
                    return e ? e.getTexture() : null
                }
                return null
            },
            getSpriteFrame: function(t) {
                return this._spriteFrames[t]
            },
            getSpriteFrames: function() {
                var t = [],
                    e = this._spriteFrames;
                for (var i in e) t.push(e[i]);
                return t
            }
        });
        cc.SpriteAtlas = n, e.exports = n
    }), {}],
    29: [(function(t, e, i) {
        var n = cc.Class({
            name: "cc.TTFFont",
            extends: cc.Font
        });
        cc.TTFFont = n, e.exports = n
    }), {}],
    30: [(function(t, e, i) {
        t("./CCRawAsset"), t("./CCAsset"), t("./CCFont"), t("./CCPrefab"), t("./CCAudioClip"), t("./CCScripts"), t("./CCSceneAsset"), t("../sprites/CCSpriteFrame"), t("../textures/CCTexture2D"), t("./CCTTFFont"), t("./CCSpriteAtlas"), t("./CCBitmapFont"), t("./CCLabelAtlas")
    }), {
        "../sprites/CCSpriteFrame": 118,
        "../textures/CCTexture2D": 119,
        "./CCAsset": 19,
        "./CCAudioClip": 20,
        "./CCBitmapFont": 21,
        "./CCFont": 22,
        "./CCLabelAtlas": 23,
        "./CCPrefab": 24,
        "./CCRawAsset": 25,
        "./CCSceneAsset": 26,
        "./CCScripts": 27,
        "./CCSpriteAtlas": 28,
        "./CCTTFFont": 29
    }],
    31: [(function(t, e, i) {
        var n = t("../utils/misc"),
            r = t("../event-manager"),
            s = !!cc.ActionManager,
            o = function() {};
        cc.s_globalOrderOfArrival = 1, _ccsg.Node = cc.Class({
            name: "ccsg.Node",
            properties: {
                _running: !1,
                _localZOrder: 0,
                _globalZOrder: 0,
                _arrivalOrder: 0,
                _reorderChildDirty: !1,
                _vertexZ: 0,
                _customZ: void 0,
                _rotationX: 0,
                _rotationY: 0,
                _scaleX: 1,
                _scaleY: 1,
                _position: cc.p(0, 0),
                _skewX: 0,
                _skewY: 0,
                _children: [],
                _visible: !0,
                _anchorPoint: cc.p(0, 0),
                _contentSize: cc.size(0, 0),
                _parent: null,
                _ignoreAnchorPointForPosition: !1,
                tag: cc.macro.NODE_TAG_INVALID,
                _name: "",
                _realOpacity: 255,
                _realColor: cc.Color.WHITE,
                _cascadeColorEnabled: !1,
                _cascadeOpacityEnabled: !1,
                _isTransitionFinished: !1,
                _actionManager: null,
                _scheduler: null,
                _renderCmd: null
            },
            ctor: function() {
                this.__instanceId = cc.ClassManager.getNewInstanceId(), this._renderCmd = this._createRenderCmd()
            },
            init: function() {
                return !0
            },
            attr: function(t) {
                for (var e in t) this[e] = t[e]
            },
            getSkewX: function() {
                return this._skewX
            },
            setSkewX: function(t) {
                this._skewX = t, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty)
            },
            getSkewY: function() {
                return this._skewY
            },
            setSkewY: function(t) {
                this._skewY = t, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty)
            },
            setLocalZOrder: function(t) {
                this._parent ? this._parent.reorderChild(this, t) : this._localZOrder = t, r._setDirtyForNode(this)
            },
            _setLocalZOrder: function(t) {
                this._localZOrder = t
            },
            getLocalZOrder: function() {
                return this._localZOrder
            },
            getZOrder: function() {
                return cc.logID(1600), this.getLocalZOrder()
            },
            setZOrder: function(t) {
                cc.logID(1601), this.setLocalZOrder(t)
            },
            setGlobalZOrder: function(t) {
                this._globalZOrder !== t && (this._globalZOrder = t, r._setDirtyForNode(this))
            },
            getGlobalZOrder: function() {
                return this._globalZOrder
            },
            getVertexZ: function() {
                return this._vertexZ
            },
            setVertexZ: function(t) {
                this._customZ = this._vertexZ = t
            },
            getRotation: function() {
                return this._rotationX !== this._rotationY && cc.logID(1602), this._rotationX
            },
            setRotation: function(t) {
                this._rotationX = this._rotationY = t, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty)
            },
            getRotationX: function() {
                return this._rotationX
            },
            setRotationX: function(t) {
                this._rotationX = t, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty)
            },
            getRotationY: function() {
                return this._rotationY
            },
            setRotationY: function(t) {
                this._rotationY = t, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty)
            },
            getScale: function() {
                return this._scaleX !== this._scaleY && cc.logID(1603), this._scaleX
            },
            setScale: function(t, e) {
                this._scaleX = t, this._scaleY = e || 0 === e ? e : t, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty)
            },
            getScaleX: function() {
                return this._scaleX
            },
            setScaleX: function(t) {
                this._scaleX = t, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty)
            },
            getScaleY: function() {
                return this._scaleY
            },
            setScaleY: function(t) {
                this._scaleY = t, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty)
            },
            setPosition: function(t, e) {
                var i = this._position;
                if (void 0 === e) {
                    if (i.x === t.x && i.y === t.y) return;
                    i.x = t.x, i.y = t.y
                } else {
                    if (i.x === t && i.y === e) return;
                    i.x = t, i.y = e
                }
                this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty)
            },
            getPosition: function() {
                return cc.p(this._position)
            },
            getPositionX: function() {
                return this._position.x
            },
            setPositionX: function(t) {
                this._position.x = t, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty)
            },
            getPositionY: function() {
                return this._position.y
            },
            setPositionY: function(t) {
                this._position.y = t, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty)
            },
            getChildrenCount: function() {
                return this._children.length
            },
            getChildren: function() {
                return this._children
            },
            isVisible: function() {
                return this._visible
            },
            setVisible: function(t) {
                this._visible !== t && (this._visible = t, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty), cc.renderer.childrenOrderDirty = !0)
            },
            getAnchorPoint: function() {
                return cc.p(this._anchorPoint)
            },
            setAnchorPoint: function(t, e) {
                var i = this._anchorPoint;
                if (void 0 === e) {
                    if (t.x === i.x && t.y === i.y) return;
                    i.x = t.x, i.y = t.y
                } else {
                    if (t === i.x && e === i.y) return;
                    i.x = t, i.y = e
                }
                this._renderCmd._updateAnchorPointInPoint()
            },
            _getAnchorX: function() {
                return this._anchorPoint.x
            },
            _setAnchorX: function(t) {
                this._anchorPoint.x !== t && (this._anchorPoint.x = t, this._renderCmd._updateAnchorPointInPoint())
            },
            _getAnchorY: function() {
                return this._anchorPoint.y
            },
            _setAnchorY: function(t) {
                this._anchorPoint.y !== t && (this._anchorPoint.y = t, this._renderCmd._updateAnchorPointInPoint())
            },
            getAnchorPointInPoints: function() {
                return this._renderCmd.getAnchorPointInPoints()
            },
            _getWidth: function() {
                return this._contentSize.width
            },
            _setWidth: function(t) {
                this._contentSize.width = t, this._renderCmd._updateAnchorPointInPoint()
            },
            _getHeight: function() {
                return this._contentSize.height
            },
            _setHeight: function(t) {
                this._contentSize.height = t, this._renderCmd._updateAnchorPointInPoint()
            },
            getContentSize: function() {
                return cc.size(this._contentSize)
            },
            setContentSize: function(t, e) {
                var i = this._contentSize;
                if (void 0 === e) {
                    if (t.width === i.width && t.height === i.height) return;
                    i.width = t.width, i.height = t.height
                } else {
                    if (t === i.width && e === i.height) return;
                    i.width = t, i.height = e
                }
                this._renderCmd._updateAnchorPointInPoint()
            },
            isRunning: function() {
                return this._running
            },
            getParent: function() {
                return this._parent
            },
            setParent: function(t) {
                this._parent = t;
                var e = _ccsg.Node._dirtyFlags;
                this._renderCmd.setDirtyFlag(e.transformDirty | e.opacityDirty)
            },
            isIgnoreAnchorPointForPosition: function() {
                return this._ignoreAnchorPointForPosition
            },
            setIgnoreAnchorPointForPosition: function(t) {
                t !== this._ignoreAnchorPointForPosition && (this._ignoreAnchorPointForPosition = t, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty))
            },
            getTag: function() {
                return this.tag
            },
            setTag: function(t) {
                this.tag = t
            },
            setName: function(t) {
                this._name = t
            },
            getName: function() {
                return this._name
            },
            updateOrderOfArrival: function() {
                this._arrivalOrder = ++cc.s_globalOrderOfArrival
            },
            getScheduler: function() {
                return this._scheduler || cc.director.getScheduler()
            },
            setScheduler: function(t) {
                this._scheduler !== t && (this.unscheduleAllCallbacks(), this._scheduler = t)
            },
            boundingBox: function() {
                return cc.logID(1608), this.getBoundingBox()
            },
            getBoundingBox: function() {
                var t = cc.rect(0, 0, this._contentSize.width, this._contentSize.height);
                return cc._rectApplyAffineTransformIn(t, this.getNodeToParentTransform())
            },
            cleanup: function() {
                this.stopAllActions(), this.unscheduleAllCallbacks(), r.removeListeners(this)
            },
            getChildByTag: function(t) {
                var e = this._children;
                if (null !== e)
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        if (n && n.tag === t) return n
                    }
                return null
            },
            getChildByName: function(t) {
                if (!t) return cc.log("Invalid name"), null;
                for (var e = this._children, i = 0, n = e.length; i < n; i++)
                    if (e[i]._name === t) return e[i];
                return null
            },
            addChild: function(t, e, i) {
                e = void 0 === e ? t._localZOrder : e;
                var n, r = !1;
                void 0 === i ? n = t._name : "string" == typeof i ? (n = i, i = void 0) : "number" == typeof i && (r = !0, n = ""), cc.assertID(t, 1606), cc.assertID(null === t._parent, 1605), this._addChildHelper(t, e, i, n, r)
            },
            _addChildHelper: function(t, e, i, n, r) {
                this._children || (this._children = []), this._insertChild(t, e), r ? t.setTag(i) : t.setName(n), t.setParent(this), t.updateOrderOfArrival(), this._running && (t.performRecursive(_ccsg.Node.performType.onEnter), this._isTransitionFinished && t.performRecursive(_ccsg.Node.performType.onEnterTransitionDidFinish)), t._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty), this._cascadeColorEnabled && t._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.colorDirty), this._cascadeOpacityEnabled && t._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.opacityDirty)
            },
            removeFromParent: function(t) {
                this._parent && (void 0 === t && (t = !0), this._parent.removeChild(this, t))
            },
            removeFromParentAndCleanup: function(t) {
                cc.logID(1607), this.removeFromParent(t)
            },
            removeChild: function(t, e) {
                0 !== this._children.length && (void 0 === e && (e = !0), this._children.indexOf(t) > -1 && this._detachChild(t, e), cc.renderer.childrenOrderDirty = !0)
            },
            removeChildByTag: function(t, e) {
                t === cc.macro.NODE_TAG_INVALID && cc.logID(1609);
                var i = this.getChildByTag(t);
                i ? this.removeChild(i, e) : cc.logID(1610, t)
            },
            removeAllChildrenWithCleanup: function(t) {
                this.removeAllChildren(t)
            },
            removeAllChildren: function(t) {
                var e = this._children;
                if (null !== e) {
                    void 0 === t && (t = !0);
                    for (var i = 0; i < e.length; i++) {
                        var n = e[i];
                        n && (this._running && (n.performRecursive(_ccsg.Node.performType.onExitTransitionDidStart), n.performRecursive(_ccsg.Node.performType.onExit)), t && n.performRecursive(_ccsg.Node.performType.cleanup), n.parent = null, n._renderCmd.detachFromParent())
                    }
                    this._children.length = 0, cc.renderer.childrenOrderDirty = !0
                }
            },
            _detachChild: function(t, e) {
                this._running && (t.performRecursive(_ccsg.Node.performType.onExitTransitionDidStart), t.performRecursive(_ccsg.Node.performType.onExit)), e && t.performRecursive(_ccsg.Node.performType.cleanup), t.parent = null, t._renderCmd.detachFromParent(), cc.js.array.remove(this._children, t)
            },
            _insertChild: function(t, e) {
                cc.renderer.childrenOrderDirty = this._reorderChildDirty = !0, this._children.push(t), t._setLocalZOrder(e)
            },
            setNodeDirty: function() {
                this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.transformDirty)
            },
            reorderChild: function(t, e) {
                cc.assertID(t, 1617), -1 !== this._children.indexOf(t) ? e !== t.zIndex && (cc.renderer.childrenOrderDirty = this._reorderChildDirty = !0, t.updateOrderOfArrival(), t._setLocalZOrder(e), this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.orderDirty)) : cc.logID(1635)
            },
            sortAllChildren: function() {
                if (this._reorderChildDirty) {
                    var t, e, i, n = this._children,
                        r = n.length;
                    for (t = 1; t < r; t++) {
                        for (i = n[t], e = t - 1; e >= 0;) {
                            if (i._localZOrder < n[e]._localZOrder) n[e + 1] = n[e];
                            else {
                                if (!(i._localZOrder === n[e]._localZOrder && i._arrivalOrder < n[e]._arrivalOrder)) break;
                                n[e + 1] = n[e]
                            }
                            e--
                        }
                        n[e + 1] = i
                    }
                    this._reorderChildDirty = !1
                }
            },
            draw: function(t) {},
            transformAncestors: function() {
                null !== this._parent && (this._parent.transformAncestors(), this._parent.transform())
            },
            onEnter: function() {
                this._isTransitionFinished = !1, this._running = !0, this.resume()
            },
            performRecursive: function(t) {
                var e = _ccsg.Node.performType;
                if (!(t >= e.max)) {
                    var i, n, r, s, o, c = 0,
                        a = _ccsg.Node._performStacks[_ccsg.Node._performing];
                    for (a || (a = [], _ccsg.Node._performStacks.push(a)), a.length = 0, _ccsg.Node._performing++, r = a[0] = this; r;) {
                        if ((i = r._children) && i.length > 0)
                            for (s = 0, o = i.length; s < o; ++s) n = i[s], a.push(n);
                        r = a[++c]
                    }
                    switch (t) {
                        case e.onEnter:
                            for (s = a.length - 1; s >= 0; --s) r = a[s], a[s] = null, r && r.onEnter();
                            break;
                        case e.onExit:
                            for (s = a.length - 1; s >= 0; --s) r = a[s], a[s] = null, r && r.onExit();
                            break;
                        case e.onEnterTransitionDidFinish:
                            for (s = a.length - 1; s >= 0; --s) r = a[s], a[s] = null, r && r.onEnterTransitionDidFinish();
                            break;
                        case e.cleanup:
                            for (s = a.length - 1; s >= 0; --s) r = a[s], a[s] = null, r && r.cleanup();
                            break;
                        case e.onExitTransitionDidStart:
                            for (s = a.length - 1; s >= 0; --s) r = a[s], a[s] = null, r && r.onExitTransitionDidStart()
                    }
                    _ccsg.Node._performing--
                }
            },
            onEnterTransitionDidFinish: function() {
                this._isTransitionFinished = !0
            },
            onExitTransitionDidStart: function() {},
            onExit: function() {
                this._running = !1, this.pause()
            },
            runAction: s ? function(t) {
                return cc.assertID(t, 1618), cc.director.getActionManager().addAction(t, this, !this._running), t
            } : o,
            stopAllActions: s ? function() {
                cc.director.getActionManager().removeAllActionsFromTarget(this)
            } : o,
            stopAction: s ? function(t) {
                cc.director.getActionManager().removeAction(t)
            } : o,
            stopActionByTag: s ? function(t) {
                t !== cc.Action.TAG_INVALID ? cc.director.getActionManager().removeActionByTag(t, this) : cc.logID(1612)
            } : o,
            getActionByTag: s ? function(t) {
                return t === cc.Action.TAG_INVALID ? (cc.logID(1613), null) : cc.director.getActionManager().getActionByTag(t, this)
            } : function() {
                return null
            },
            getNumberOfRunningActions: s ? function() {
                return cc.director.getActionManager().getNumberOfRunningActionsInTarget(this)
            } : function() {
                return 0
            },
            scheduleUpdate: function() {
                this.scheduleUpdateWithPriority(0)
            },
            scheduleUpdateWithPriority: function(t) {
                this.scheduler.scheduleUpdate(this, t, !this._running)
            },
            unscheduleUpdate: function() {
                this.scheduler.unscheduleUpdate(this)
            },
            schedule: function(t, e, i, n, r) {
                var s = arguments.length;
                "function" == typeof t ? 1 === s ? (e = 0, i = cc.macro.REPEAT_FOREVER, n = 0, r = this.__instanceId) : 2 === s ? "number" == typeof e ? (i = cc.macro.REPEAT_FOREVER, n = 0, r = this.__instanceId) : (r = e, e = 0, i = cc.macro.REPEAT_FOREVER, n = 0) : 3 === s ? ("string" == typeof i ? (r = i, i = cc.macro.REPEAT_FOREVER) : r = this.__instanceId, n = 0) : 4 === s && (r = this.__instanceId) : 1 === s ? (e = 0, i = cc.macro.REPEAT_FOREVER, n = 0) : 2 === s && (i = cc.macro.REPEAT_FOREVER, n = 0), cc.assertID(t, 1619), cc.assertID(e >= 0, 1620), e = e || 0, i = isNaN(i) ? cc.macro.REPEAT_FOREVER : i, n = n || 0, this.scheduler.schedule(t, this, e, i, n, !this._running, r)
            },
            scheduleOnce: function(t, e, i) {
                void 0 === i && (i = this.__instanceId), this.schedule(t, 0, 0, e, i)
            },
            unschedule: function(t) {
                t && this.scheduler.unschedule(t, this)
            },
            unscheduleAllCallbacks: function() {
                this.scheduler.unscheduleAllForTarget(this)
            },
            resumeSchedulerAndActions: function() {
                cc.logID(1614), this.resume()
            },
            resume: function() {
                this.scheduler.resumeTarget(this), s && cc.director.getActionManager().resumeTarget(this), r.resumeTarget(this)
            },
            pauseSchedulerAndActions: function() {
                cc.logID(1615), this.pause()
            },
            pause: function() {
                this.scheduler.pauseTarget(this), s && cc.director.getActionManager().pauseTarget(this), r.pauseTarget(this)
            },
            getParentToNodeTransform: function() {
                return this._renderCmd.getParentToNodeTransform()
            },
            parentToNodeTransform: function() {
                return this.getParentToNodeTransform()
            },
            getNodeToWorldTransform: function() {
                for (var t = this.getNodeToParentTransform(), e = this._parent; null !== e; e = e.parent) t = cc.affineTransformConcat(t, e.getNodeToParentTransform());
                return t
            },
            nodeToWorldTransform: function() {
                return this.getNodeToWorldTransform()
            },
            getWorldToNodeTransform: function() {
                return cc.affineTransformInvert(this.getNodeToWorldTransform())
            },
            worldToNodeTransform: function() {
                return this.getWorldToNodeTransform()
            },
            convertToNodeSpace: function(t) {
                return cc.pointApplyAffineTransform(t, this.getWorldToNodeTransform())
            },
            convertToWorldSpace: function(t) {
                return t = t || cc.v2(0, 0), cc.pointApplyAffineTransform(t, this.getNodeToWorldTransform())
            },
            convertToNodeSpaceAR: function(t) {
                return cc.pSub(this.convertToNodeSpace(t), this._renderCmd.getAnchorPointInPoints())
            },
            convertToWorldSpaceAR: function(t) {
                t = t || cc.v2(0, 0);
                var e = cc.pAdd(t, this._renderCmd.getAnchorPointInPoints());
                return this.convertToWorldSpace(e)
            },
            _convertToWindowSpace: function(t) {
                var e = this.convertToWorldSpace(t);
                return cc.director.convertToUI(e)
            },
            convertTouchToNodeSpace: function(t) {
                var e = t.getLocation();
                return this.convertToNodeSpace(e)
            },
            convertTouchToNodeSpaceAR: function(t) {
                var e = cc.director.convertToGL(t.getLocation());
                return this.convertToNodeSpaceAR(e)
            },
            updateTransform: function() {
                for (var t = this._children, e = 0; e < t.length; e++) {
                    var i;
                    (i = t[e]) && i.updateTransform()
                }
            },
            retain: function() {},
            release: function() {},
            visit: function(t) {
                var e = this._renderCmd,
                    i = t ? t._renderCmd : null;
                if (this._visible) {
                    var n = cc.renderer;
                    e.visit(i);
                    var r, s, o = this._children,
                        c = o.length;
                    if (c > 0) {
                        for (this._reorderChildDirty && this.sortAllChildren(), r = 0; r < c && (s = o[r])._localZOrder < 0; r++) s.visit(this);
                        for (n.pushRenderCommand(e); r < c; r++) o[r].visit(this)
                    } else n.pushRenderCommand(e);
                    e._dirtyFlag = 0
                } else e._propagateFlagsDown(i)
            },
            transform: function(t, e) {
                this._renderCmd.transform(t, e)
            },
            nodeToParentTransform: function() {
                return this.getNodeToParentTransform()
            },
            getNodeToParentTransform: function(t) {
                var e = this._renderCmd.getNodeToParentTransform();
                if (t) {
                    for (var i = {
                            a: e.a,
                            b: e.b,
                            c: e.c,
                            d: e.d,
                            tx: e.tx,
                            ty: e.ty
                        }, n = this._parent; null != n && n != t; n = n.getParent()) cc.affineTransformConcatIn(i, n.getNodeToParentTransform());
                    return i
                }
                return e
            },
            getNodeToParentAffineTransform: function(t) {
                return this.getNodeToParentTransform(t)
            },
            getShaderProgram: function() {
                return this._renderCmd.getShaderProgram()
            },
            setShaderProgram: function(t) {
                this._renderCmd.setShaderProgram(t)
            },
            getGLServerState: function() {
                return 0
            },
            setGLServerState: function(t) {},
            getBoundingBoxToWorld: function() {
                var t = cc.rect(0, 0, this._contentSize.width, this._contentSize.height),
                    e = this.getNodeToWorldTransform();
                if (cc._rectApplyAffineTransformIn(t, e), !this._children) return t;
                for (var i = this._children, n = 0; n < i.length; n++) {
                    var r = i[n];
                    if (r && r._visible) {
                        var s = r._getBoundingBoxToCurrentNode(e);
                        s && (t = cc.rectUnion(t, s))
                    }
                }
                return t
            },
            _getBoundingBoxToCurrentNode: function(t) {
                var e = cc.rect(0, 0, this._contentSize.width, this._contentSize.height),
                    i = void 0 === t ? this.getNodeToParentTransform() : cc.affineTransformConcat(this.getNodeToParentTransform(), t);
                if (cc._rectApplyAffineTransformIn(e, i), !this._children) return e;
                for (var n = this._children, r = 0; r < n.length; r++) {
                    var s = n[r];
                    if (s && s._visible) {
                        var o = s._getBoundingBoxToCurrentNode(i);
                        o && (e = cc.rectUnion(e, o))
                    }
                }
                return e
            },
            getOpacity: function() {
                return this._realOpacity
            },
            getDisplayedOpacity: function() {
                return this._renderCmd.getDisplayedOpacity()
            },
            setOpacity: function(t) {
                this._realOpacity = t, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.opacityDirty)
            },
            updateDisplayedOpacity: function(t) {
                this._renderCmd._updateDisplayOpacity(t)
            },
            isCascadeOpacityEnabled: function() {
                return this._cascadeOpacityEnabled
            },
            setCascadeOpacityEnabled: function(t) {
                this._cascadeOpacityEnabled !== t && (this._cascadeOpacityEnabled = t, this._renderCmd.setCascadeOpacityEnabledDirty())
            },
            getColor: function() {
                var t = this._realColor;
                return cc.color(t.r, t.g, t.b, t.a)
            },
            getDisplayedColor: function() {
                return this._renderCmd.getDisplayedColor()
            },
            setColor: function(t) {
                var e = this._realColor;
                e.r = t.r, e.g = t.g, e.b = t.b, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.colorDirty)
            },
            updateDisplayedColor: function(t) {
                this._renderCmd._updateDisplayColor(t)
            },
            isCascadeColorEnabled: function() {
                return this._cascadeColorEnabled
            },
            setCascadeColorEnabled: function(t) {
                this._cascadeColorEnabled !== t && (this._cascadeColorEnabled = t, this._renderCmd.setCascadeColorEnabledDirty())
            },
            setOpacityModifyRGB: function(t) {},
            isOpacityModifyRGB: function() {
                return !1
            },
            _createRenderCmd: function() {
                return cc._renderType === cc.game.RENDER_TYPE_CANVAS ? new _ccsg.Node.CanvasRenderCmd(this) : new _ccsg.Node.WebGLRenderCmd(this)
            }
        }), _ccsg.Node.extend = cc._Class.extend, _ccsg.Node.prototype.ctor = _ccsg.Node, _ccsg.Node.performType = {
            onEnter: 1,
            onExit: 2,
            cleanup: 3,
            onEnterTransitionDidFinish: 4,
            onExitTransitionDidStart: 5,
            max: 6
        }, _ccsg.Node._performStacks = [
            []
        ], _ccsg.Node._performing = 0;
        n.propertyDefine(_ccsg.Node, ["skewX", "skewY", "vertexZ", "rotation", "rotationX", "rotationY", "scale", "scaleX", "scaleY", "children", "childrenCount", "parent", "scheduler", "shaderProgram", "opacity", "color"], {
            x: ["getPositionX", "setPositionX"],
            y: ["getPositionY", "setPositionY"],
            width: ["_getWidth", "_setWidth"],
            height: ["_getHeight", "_setHeight"],
            anchorX: ["_getAnchorX", "_setAnchorX"],
            anchorY: ["_getAnchorY", "_setAnchorY"],
            zIndex: ["getLocalZOrder", "setLocalZOrder"],
            visible: ["isVisible", "setVisible"],
            running: ["isRunning"],
            ignoreAnchor: ["isIgnoreAnchorPointForPosition", "setIgnoreAnchorPointForPosition"],
            opacityModifyRGB: ["isOpacityModifyRGB", "setOpacityModifyRGB"],
            cascadeOpacity: ["isCascadeOpacityEnabled", "setCascadeOpacityEnabled"],
            cascadeColor: ["isCascadeColorEnabled", "setCascadeColorEnabled"]
        })
    }), {
        "../event-manager": 52,
        "../utils/misc": 128
    }],
    32: [(function(t, e, i) {
        function n(t, e) {
            var i, n, r, s, o, c, a = 1,
                h = _ccsg.Node._performStacks[_ccsg.Node._performing];
            h || (h = [], _ccsg.Node._performStacks.push(h)), h.length = 0, _ccsg.Node._performing++, h[0] = t;
            for (; a;)
                if (a--, r = h[a], h[a] = null, r && (i = r._children) && i.length > 0)
                    for (s = r._renderCmd, o = 0, c = i.length; o < c; ++o) n = i[o], h[a] = n, a++, n._renderCmd[e](s);
            _ccsg.Node._performing--
        }
        cc.CustomRenderCmd = function(t, e) {
            this._needDraw = !0, this._target = t, this._callback = e
        }, cc.CustomRenderCmd.prototype.rendering = function(t, e, i) {
            this._callback && this._callback.call(this._target, t, e, i)
        };
        var r = _ccsg.Node._dirtyFlags = {
            transformDirty: 1,
            visibleDirty: 2,
            colorDirty: 4,
            opacityDirty: 8,
            cacheDirty: 16,
            orderDirty: 32,
            textDirty: 64,
            gradientDirty: 128,
            textureDirty: 256,
            contentDirty: 512,
            cullingDirty: 1024,
            COUNT: 9
        };
        cc.js.get(r, "all", (function() {
            return (1 << r.COUNT) - 1
        }), !1), _ccsg.Node._requestDirtyFlag = function(t) {
            cc.assertID(!r[t], 1622, t);
            var e = 1 << r.COUNT;
            return r[t] = e, r.COUNT++, e
        };
        var s = Math.PI / 180;
        _ccsg.Node.RenderCmd = function(t) {
            this._node = t, this._anchorPointInPoints = new cc.Vec2(0, 0), this._needDraw = !1, this._dirtyFlag = 1, this._curLevel = -1, this._cameraFlag = 0, this._displayedColor = new cc.Color(255, 255, 255, 255), this._displayedOpacity = 255, this._cascadeColorEnabledDirty = !1, this._cascadeOpacityEnabledDirty = !1, this._transform = {
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                tx: 0,
                ty: 0
            }, this._worldTransform = {
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                tx: 0,
                ty: 0
            }, this._inverse = {
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                tx: 0,
                ty: 0
            }, this._transformUpdated = !1, cc.renderer.pushDirtyNode(this)
        }, _ccsg.Node.RenderCmd.prototype = {
            constructor: _ccsg.Node.RenderCmd,
            _ctor: _ccsg.Node.RenderCmd,
            getAnchorPointInPoints: function() {
                return cc.p(this._anchorPointInPoints)
            },
            getDisplayedColor: function() {
                var t = this._displayedColor;
                return cc.color(t.r, t.g, t.b, t.a)
            },
            getDisplayedOpacity: function() {
                return this._displayedOpacity
            },
            setCascadeColorEnabledDirty: function() {
                this._cascadeColorEnabledDirty = !0, this.setDirtyFlag(r.colorDirty)
            },
            setCascadeOpacityEnabledDirty: function() {
                this._cascadeOpacityEnabledDirty = !0, this.setDirtyFlag(r.opacityDirty)
            },
            getParentToNodeTransform: function() {
                return this._dirtyFlag & r.transformDirty && cc.affineTransformInvertOut(this.getNodeToParentTransform(), this._inverse), this._inverse
            },
            detachFromParent: function() {},
            _updateAnchorPointInPoint: function() {
                var t = this._anchorPointInPoints,
                    e = this._node._contentSize,
                    i = this._node._anchorPoint;
                t.x = e.width * i.x, t.y = e.height * i.y, this.setDirtyFlag(r.transformDirty)
            },
            setDirtyFlag: function(t) {
                0 === this._dirtyFlag && 0 !== t && cc.renderer.pushDirtyNode(this), this._dirtyFlag |= t
            },
            getParentRenderCmd: function() {
                return this._node && this._node._parent && this._node._parent._renderCmd ? this._node._parent._renderCmd : null
            },
            updateTransform: function(t, e) {
                var i = this._node,
                    n = t ? t._worldTransform : null,
                    r = this._transform,
                    o = this._worldTransform;
                if (!this._transformUpdated) {
                    var c = i._rotationX || i._rotationY,
                        a = i._skewX || i._skewY,
                        h = i._scaleX,
                        l = i._scaleY,
                        u = this._anchorPointInPoints.x,
                        _ = this._anchorPointInPoints.y,
                        d = 1,
                        f = 0,
                        p = 0,
                        g = 1;
                    if (c || a) {
                        if (r.tx = i._position.x, r.ty = i._position.y, c) {
                            var m = i._rotationX * s;
                            if (p = Math.sin(m), g = Math.cos(m), i._rotationY === i._rotationX) d = g, f = -p;
                            else {
                                var v = i._rotationY * s;
                                d = Math.cos(v), f = -Math.sin(v)
                            }
                        }
                        if (r.a = d *= h, r.b = f *= h, r.c = p *= l, r.d = g *= l, a) {
                            var y = Math.tan(i._skewX * s),
                                C = Math.tan(i._skewY * s);
                            y === 1 / 0 && (y = 99999999), C === 1 / 0 && (C = 99999999), r.a = d + p * C, r.b = f + g * C, r.c = p + d * y, r.d = g + f * y
                        }(u || _) && (r.tx -= r.a * u + r.c * _, r.ty -= r.b * u + r.d * _, i._ignoreAnchorPointForPosition && (r.tx += u, r.ty += _))
                    } else r.a = h, r.b = 0, r.c = 0, r.d = l, r.tx = i._position.x, r.ty = i._position.y, (u || _) && (r.tx -= r.a * u, r.ty -= r.d * _, i._ignoreAnchorPointForPosition && (r.tx += u, r.ty += _))
                }
                n ? (o.a = r.a * n.a + r.b * n.c, o.b = r.a * n.b + r.b * n.d, o.c = r.c * n.a + r.d * n.c, o.d = r.c * n.b + r.d * n.d, o.tx = r.tx * n.a + r.ty * n.c + n.tx, o.ty = r.tx * n.b + r.ty * n.d + n.ty) : (o.a = r.a, o.b = r.b, o.c = r.c, o.d = r.d, o.tx = r.tx, o.ty = r.ty)
            },
            transform: function(t, e) {
                this.updateTransform(t), this._currentRegion && (this._updateCurrentRegions(), this._notifyRegionStatus && this._notifyRegionStatus(_ccsg.Node.CanvasRenderCmd.RegionStatus.DirtyDouble)), cc.macro.ENABLE_CULLING ? (this._updateCameraFlag(t), this._doCulling && this._doCulling()) : this._doCulling && (this._needDraw = !0), e && n(this._node, "transform")
            },
            _updateCameraFlag: function(t) {
                var e = cc.Camera;
                cc._renderType === cc.game.RENDER_TYPE_WEBGL && e && t && this._cameraFlag != e.flags.InCamera && (this._cameraFlag = t._cameraFlag > 0 ? e.flags.ParentInCamera : 0)
            },
            culling: function(t, e) {
                cc.macro.ENABLE_CULLING ? (this._updateCameraFlag(t), this._doCulling && this._doCulling(), e && n(this._node, "culling")) : this._doCulling && (this._needDraw = !0)
            },
            getNodeToParentTransform: function() {
                return this._dirtyFlag & r.transformDirty && this.transform(), this._transform
            },
            setNodeToParentTransform: function(t) {
                t ? (this._transform = t, this._transformUpdated = !0) : this._transformUpdated = !1, this.setDirtyFlag(r.transformDirty)
            },
            _propagateFlagsDown: function(t) {
                if (t) {
                    var e = this._dirtyFlag,
                        i = t._node,
                        n = t._dirtyFlag;
                    i._cascadeColorEnabled && n & r.colorDirty && (e |= r.colorDirty), i._cascadeOpacityEnabled && n & r.opacityDirty && (e |= r.opacityDirty), n & r.transformDirty && (e |= r.transformDirty), n & r.cullingDirty && (e |= r.cullingDirty), this._dirtyFlag = e
                }
            },
            visit: function(t) {
                var e = this._node,
                    i = cc.renderer;
                t && (this._curLevel = t._curLevel + 1), this._propagateFlagsDown(t), isNaN(e._customZ) && (e._vertexZ = i.assignedZ, i.assignedZ += i.assignedZStep), this._syncStatus(t)
            },
            _updateDisplayColor: function(t) {
                var e, i, n, s, o = this._node,
                    c = this._displayedColor,
                    a = o._realColor;
                if (this._notifyRegionStatus && this._notifyRegionStatus(_ccsg.Node.CanvasRenderCmd.RegionStatus.Dirty), this._cascadeColorEnabledDirty && !o._cascadeColorEnabled) {
                    c.r = a.r, c.g = a.g, c.b = a.b;
                    var h = new cc.Color(255, 255, 255, 255);
                    for (e = 0, i = (n = o._children).length; e < i; e++)(s = n[e]) && s._renderCmd && s._renderCmd._updateDisplayColor(h);
                    this._cascadeColorEnabledDirty = !1
                } else {
                    if (void 0 === t) {
                        var l = o._parent;
                        t = l && l._cascadeColorEnabled ? l.getDisplayedColor() : cc.Color.WHITE
                    }
                    if (c.r = 0 | a.r * t.r / 255, c.g = 0 | a.g * t.g / 255, c.b = 0 | a.b * t.b / 255, o._cascadeColorEnabled)
                        for (e = 0, i = (n = o._children).length; e < i; e++)(s = n[e]) && s._renderCmd && (s._renderCmd._updateDisplayColor(c), s._renderCmd._updateColor())
                }
                this._dirtyFlag &= ~r.colorDirty
            },
            _updateDisplayOpacity: function(t) {
                var e, i, n, s, o = this._node;
                if (this._notifyRegionStatus && this._notifyRegionStatus(_ccsg.Node.CanvasRenderCmd.RegionStatus.Dirty), this._cascadeOpacityEnabledDirty && !o._cascadeOpacityEnabled) {
                    for (this._displayedOpacity = o._realOpacity, e = 0, i = (n = o._children).length; e < i; e++)(s = n[e]) && s._renderCmd && s._renderCmd._updateDisplayOpacity(255);
                    this._cascadeOpacityEnabledDirty = !1
                } else {
                    if (void 0 === t) {
                        var c = o._parent;
                        t = 255, c && c._cascadeOpacityEnabled && (t = c.getDisplayedOpacity())
                    }
                    if (this._displayedOpacity = o._realOpacity * t / 255, o._cascadeOpacityEnabled)
                        for (e = 0, i = (n = o._children).length; e < i; e++)(s = n[e]) && s._renderCmd && (s._renderCmd._updateDisplayOpacity(this._displayedOpacity), s._renderCmd._updateColor())
                }
                this._dirtyFlag &= ~r.opacityDirty
            },
            _syncDisplayColor: function(t) {
                var e = this._node,
                    i = this._displayedColor,
                    n = e._realColor;
                if (void 0 === t) {
                    var r = e._parent;
                    t = r && r._cascadeColorEnabled ? r.getDisplayedColor() : cc.Color.WHITE
                }
                i.r = 0 | n.r * t.r / 255, i.g = 0 | n.g * t.g / 255, i.b = 0 | n.b * t.b / 255
            },
            _syncDisplayOpacity: function(t) {
                var e = this._node;
                if (void 0 === t) {
                    var i = e._parent;
                    t = 255, i && i._cascadeOpacityEnabled && (t = i.getDisplayedOpacity())
                }
                this._displayedOpacity = e._realOpacity * t / 255
            },
            _updateColor: function() {},
            updateStatus: function() {
                var t = this._dirtyFlag,
                    e = t & r.colorDirty,
                    i = t & r.opacityDirty;
                if (t & r.contentDirty && (this._notifyRegionStatus && this._notifyRegionStatus(_ccsg.Node.CanvasRenderCmd.RegionStatus.Dirty), this._dirtyFlag &= ~r.contentDirty), e && this._updateDisplayColor(), i && this._updateDisplayOpacity(), (e || i) && this._updateColor(), t & r.transformDirty) {
                    var n = this.getParentRenderCmd();
                    this.transform(n, !0), this._dirtyFlag &= ~r.transformDirty, this._dirtyFlag &= ~r.cullingDirty
                } else t & r.cullingDirty && (this.culling(n, !0), this._dirtyFlag &= ~r.cullingDirty)
            },
            _syncStatus: function(t) {
                var e = this._dirtyFlag,
                    i = e & r.colorDirty,
                    n = e & r.opacityDirty;
                i && this._syncDisplayColor(), n && this._syncDisplayOpacity(), (i || n) && this._updateColor(), e & r.transformDirty ? this.transform(t) : e & r.cullingDirty && this.culling(t)
            }
        }, _ccsg.Node.RenderCmd.prototype.originUpdateTransform = _ccsg.Node.RenderCmd.prototype.updateTransform, _ccsg.Node.RenderCmd.prototype.originTransform = _ccsg.Node.RenderCmd.prototype.transform, _ccsg.Node.RenderCmd.prototype.originCulling = _ccsg.Node.RenderCmd.prototype.culling, _ccsg.Node.RenderCmd.prototype.originUpdateStatus = _ccsg.Node.RenderCmd.prototype.updateStatus, _ccsg.Node.RenderCmd.prototype._originSyncStatus = _ccsg.Node.RenderCmd.prototype._syncStatus
    }), {}],
    33: [(function(t, e, i) {
        _ccsg.Node.CanvasRenderCmd = function(t) {
            this._ctor(t), this._currentRegion = new cc.Region, this._oldRegion = new cc.Region, this._regionFlag = 0
        }, _ccsg.Node.CanvasRenderCmd.RegionStatus = {
            NotDirty: 0,
            Dirty: 1,
            DirtyDouble: 2
        };
        var n = _ccsg.Node.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.RenderCmd.prototype);
        n.constructor = _ccsg.Node.CanvasRenderCmd, n._rootCtor = _ccsg.Node.CanvasRenderCmd, n._notifyRegionStatus = function(t) {
            this._needDraw && this._regionFlag < t && (this._regionFlag = t)
        };
        var r = new cc.Rect;
        n.getLocalBB = function() {
            var t = this._node;
            return r.x = r.y = 0, r.width = t._contentSize.width, r.height = t._contentSize.height, r
        }, n._updateCurrentRegions = function() {
            var t = this._currentRegion;
            this._currentRegion = this._oldRegion, this._oldRegion = t, _ccsg.Node.CanvasRenderCmd.RegionStatus.DirtyDouble !== this._regionFlag || this._currentRegion.isEmpty() || this._oldRegion.union(this._currentRegion), this._currentRegion.updateRegion(this.getLocalBB(), this._worldTransform)
        }, n.detachFromParent = function() {
            for (var t, e = this._node._children, i = 0, n = e.length; i < n; i++)(t = e[i]) && t._renderCmd && t._renderCmd.detachFromParent()
        }, n.setShaderProgram = function(t) {}, n.getShaderProgram = function() {
            return null
        }, _ccsg.Node.CanvasRenderCmd._getCompositeOperationByBlendFunc = function(t) {
            return t ? t.src === cc.macro.SRC_ALPHA && t.dst === cc.macro.ONE || t.src === cc.macro.ONE && t.dst === cc.macro.ONE ? "lighter" : t.src === cc.macro.ZERO && t.dst === cc.macro.SRC_ALPHA ? "destination-in" : t.src === cc.macro.ZERO && t.dst === cc.macro.ONE_MINUS_SRC_ALPHA ? "destination-out" : "source-over" : "source-over"
        }
    }), {}],
    34: [(function(t, e, i) {
        _ccsg.Node.WebGLRenderCmd = function(t) {
            this._ctor(t), this._shaderProgram = null
        };
        var n = _ccsg.Node.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.RenderCmd.prototype);
        n.constructor = _ccsg.Node.WebGLRenderCmd, n._rootCtor = _ccsg.Node.WebGLRenderCmd, n._updateColor = function() {}, n.setShaderProgram = function(t) {
            this._shaderProgram = t
        }, n.getShaderProgram = function() {
            return this._shaderProgram
        }
    }), {}],
    35: [(function(t, e, i) {
        function n(t) {
            return t instanceof cc.Scene ? cc.visibleRect : !t._sizeProvider || t._sizeProvider instanceof _ccsg.Node ? t._contentSize : t.getContentSize()
        }

        function r(t, e, i, n) {
            for (var r = t._parent._scaleX, s = t._parent._scaleY, o = 0, c = 0, a = t._parent;;) {
                var h = a._position;
                if (o += h.x, c += h.y, !(a = a._parent)) return i.x = i.y = 0, void(n.x = n.y = 1);
                if (a === e) break;
                var l = a._scaleX,
                    u = a._scaleY;
                o *= l, c *= u, r *= l, s *= u
            }
            n.x = 0 !== r ? 1 / r : 1, n.y = 0 !== s ? 1 / s : 1, i.x = -o, i.y = -c
        }

        function s(t, e) {
            var i, s, o, c = e._target;
            c ? r(t, i = c, s = u, o = _) : i = t._parent;
            var a = n(i),
                d = i._anchorPoint,
                f = i instanceof cc.Scene,
                p = t._position.x,
                g = t._position.y,
                m = t._anchorPoint;
            if (e._alignFlags & h) {
                var v, y, C = a.width;
                f ? (v = cc.visibleRect.left.x, y = cc.visibleRect.right.x) : y = (v = -d.x * C) + C, v += e._isAbsLeft ? e._left : e._left * C, y -= e._isAbsRight ? e._right : e._right * C, c && (v += s.x, v *= o.x, y += s.x, y *= o.x);
                var T, E = m.x,
                    x = t._scaleX;
                if (x < 0 && (E = 1 - E, x = -x), e.isStretchWidth) T = y - v, 0 !== x && (t.width = T / x), p = v + E * T;
                else if (T = t.width * x, e.isAlignHorizontalCenter) {
                    var R = e._isAbsHorizontalCenter ? e._horizontalCenter : e._horizontalCenter * C,
                        S = (.5 - d.x) * a.width;
                    c && (R *= o.x, S += s.x, S *= o.x), p = S + (E - .5) * T + R
                } else p = e.isAlignLeft ? v + E * T : y + (E - 1) * T
            }
            if (e._alignFlags & l) {
                var w, A, b = a.height;
                f ? (A = cc.visibleRect.bottom.y, w = cc.visibleRect.top.y) : w = (A = -d.y * b) + b, A += e._isAbsBottom ? e._bottom : e._bottom * b, w -= e._isAbsTop ? e._top : e._top * b, c && (A += s.y, A *= o.y, w += s.y, w *= o.y);
                var I, O = m.y,
                    N = t._scaleY;
                if (N < 0 && (O = 1 - O, N = -N), e.isStretchHeight) I = w - A, 0 !== N && (t.height = I / N), g = A + O * I;
                else if (I = t.height * N, e.isAlignVerticalCenter) {
                    var P = e._isAbsVerticalCenter ? e._verticalCenter : e._verticalCenter * b,
                        L = (.5 - d.y) * a.height;
                    c && (P *= o.y, L += s.y, L *= o.y), g = L + (O - .5) * I + P
                } else g = e.isAlignBottom ? A + O * I : w + (O - 1) * I
            }
            t.setPosition(p, g)
        }

        function o(t) {
            var e = t._widget;
            if (e) {
                s(t, e), e.isAlignOnce ? e.enabled = !1 : d.push(e)
            }
            for (var i = t._children, n = 0; n < i.length; n++) {
                var r = i[n];
                r._active && o(r)
            }
        }

        function c() {
            var t = cc.director.getScene();
            if (t) {
                if (f.isAligning = !0, f._nodesOrderDirty) d.length = 0, o(t), f._nodesOrderDirty = !1;
                else {
                    var e, i = f._activeWidgetsIterator;
                    for (i.i = 0; i.i < d.length; ++i.i) s((e = d[i.i]).node, e)
                }
                f.isAligning = !1
            }
        }

        function a(t) {
            var e = t._parent;
            cc.Node.isNode(e) && a(e);
            var i = t._widget || t.getComponent(cc.Widget);
            i && s(t, i)
        }
        var h = 56,
            l = 7,
            u = cc.Vec2.ZERO,
            _ = cc.Vec2.ONE,
            d = [],
            f = cc._widgetManager = e.exports = {
                _AlignFlags: {
                    TOP: 1,
                    MID: 2,
                    BOT: 4,
                    LEFT: 8,
                    CENTER: 16,
                    RIGHT: 32
                },
                isAligning: !1,
                _nodesOrderDirty: !1,
                _activeWidgetsIterator: new cc.js.array.MutableForwardIterator(d),
                init: function(t) {
                    t.on(cc.Director.EVENT_BEFORE_VISIT, c)
                },
                add: function(t) {
                    t.node._widget = t, this._nodesOrderDirty = !0
                },
                remove: function(t) {
                    t.node._widget = null, this._activeWidgetsIterator.remove(t)
                },
                updateAlignment: a
            }
    }), {}],
    36: [(function(t, e, i) {
        function n(t, e) {
            for (var i = e.constructor._executionOrder, n = e.__instanceId, r = 0, s = t.length - 1, o = s >>> 1; r <= s; o = r + s >>> 1) {
                var c = t[o],
                    a = c.constructor._executionOrder;
                if (a > i) s = o - 1;
                else if (a < i) r = o + 1;
                else {
                    var h = c.__instanceId;
                    if (h > n) s = o - 1;
                    else {
                        if (!(h < n)) return o;
                        r = o + 1
                    }
                }
            }
            return ~r
        }

        function r(t, e) {
            for (var i = t.array, n = t.i + 1; n < i.length;) {
                var r = i[n];
                r._enabled && r.node._activeInHierarchy ? ++n : (t.removeAt(n), e && (r._objFlags &= ~e))
            }
        }

        function s(t, e) {
            return t.constructor._executionOrder - e.constructor._executionOrder
        }

        function o(t, e) {
            if ("function" == typeof t) return e ? function(e, i) {
                var n = e.array;
                for (e.i = 0; e.i < n.length; ++e.i) {
                    var r = n[e.i];
                    t(r, i)
                }
            } : function(e) {
                var i = e.array;
                for (e.i = 0; e.i < i.length; ++e.i) {
                    var n = i[e.i];
                    t(n)
                }
            };
            var i = "var a=it.array;for(it.i=0;it.i<a.length;++it.i){var c=a[it.i];" + t + "}";
            return e ? Function("it", "dt", i) : Function("it", i)
        }

        function c() {
            this.startInvoker = new g(o(_)), this.updateInvoker = new m(o(d, !0)), this.lateUpdateInvoker = new m(o(f, !0)), this.scheduleInNextFrame = [], this._updating = !1
        }
        t("./platform/CCClass");
        var a = t("./platform/CCObject").Flags,
            h = t("./platform/js").array,
            l = a.IsStartCalled,
            u = a.IsOnEnableCalled,
            _ = (a.IsEditorOnEnableCalled, "c.start();c._objFlags|=" + l),
            d = "c.update(dt)",
            f = "c.lateUpdate(dt)",
            p = cc.Class({
                __ctor__: function(t) {
                    var e = h.MutableForwardIterator;
                    this._zero = new e([]), this._neg = new e([]), this._pos = new e([]), this._invoke = t
                },
                statics: {
                    stableRemoveInactive: r
                },
                add: null,
                remove: null,
                invoke: null
            }),
            g = cc.Class({
                extends: p,
                add: function(t) {
                    var e = t.constructor._executionOrder;
                    (0 === e ? this._zero : e < 0 ? this._neg : this._pos).array.push(t)
                },
                remove: function(t) {
                    var e = t.constructor._executionOrder;
                    (0 === e ? this._zero : e < 0 ? this._neg : this._pos).fastRemove(t)
                },
                cancelInactive: function(t) {
                    r(this._zero, t), r(this._neg, t), r(this._pos, t)
                },
                invoke: function() {
                    var t = this._neg;
                    t.array.length > 0 && (t.array.sort(s), this._invoke(t), t.array.length = 0), this._invoke(this._zero), this._zero.array.length = 0;
                    var e = this._pos;
                    e.array.length > 0 && (e.array.sort(s), this._invoke(e), e.array.length = 0)
                }
            }),
            m = cc.Class({
                extends: p,
                add: function(t) {
                    var e = t.constructor._executionOrder;
                    if (0 === e) this._zero.array.push(t);
                    else {
                        var i = e < 0 ? this._neg.array : this._pos.array,
                            r = n(i, t);
                        r < 0 && i.splice(~r, 0, t)
                    }
                },
                remove: function(t) {
                    var e = t.constructor._executionOrder;
                    if (0 === e) this._zero.fastRemove(t);
                    else {
                        var i = e < 0 ? this._neg : this._pos,
                            r = n(i.array, t);
                        r >= 0 && i.removeAt(r)
                    }
                },
                invoke: function(t) {
                    this._neg.array.length > 0 && this._invoke(this._neg, t), this._invoke(this._zero, t), this._pos.array.length > 0 && this._invoke(this._pos, t)
                }
            }),
            v = cc.Class({
                ctor: c,
                unscheduleAll: c,
                statics: {
                    LifeCycleInvoker: p,
                    OneOffInvoker: g,
                    createInvokeImpl: o,
                    invokeOnEnable: function(t) {
                        var e = cc.director._compScheduler,
                            i = t.array;
                        for (t.i = 0; t.i < i.length; ++t.i) {
                            var n = i[t.i];
                            if (n._enabled) {
                                n.onEnable();
                                !n.node._activeInHierarchy || e._onEnabled(n)
                            }
                        }
                    }
                },
                _onEnabled: function(t) {
                    cc.director.getScheduler().resumeTarget(t), t._objFlags |= u, this._updating ? this.scheduleInNextFrame.push(t) : this._scheduleImmediate(t)
                },
                _onDisabled: function(t) {
                    cc.director.getScheduler().pauseTarget(t), t._objFlags &= ~u;
                    var e = this.scheduleInNextFrame.indexOf(t);
                    e >= 0 ? h.fastRemoveAt(this.scheduleInNextFrame, e) : (!t.start || t._objFlags & l || this.startInvoker.remove(t), t.update && this.updateInvoker.remove(t), t.lateUpdate && this.lateUpdateInvoker.remove(t))
                },
                enableComp: function(t, e) {
                    if (!(t._objFlags & u)) {
                        if (t.onEnable) {
                            if (e) return void e.add(t);
                            t.onEnable();
                            if (!t.node._activeInHierarchy) return
                        }
                        this._onEnabled(t)
                    }
                },
                disableComp: function(t) {
                    t._objFlags & u && (t.onDisable && t.onDisable(), this._onDisabled(t))
                },
                _scheduleImmediate: function(t) {
                    !t.start || t._objFlags & l || this.startInvoker.add(t), t.update && this.updateInvoker.add(t), t.lateUpdate && this.lateUpdateInvoker.add(t)
                },
                _deferredSchedule: function() {
                    for (var t = this.scheduleInNextFrame, e = 0, i = t.length; e < i; e++) {
                        var n = t[e];
                        this._scheduleImmediate(n)
                    }
                    t.length = 0
                },
                startPhase: function() {
                    this._updating = !0, this.scheduleInNextFrame.length > 0 && this._deferredSchedule(), this.startInvoker.invoke()
                },
                updatePhase: function(t) {
                    this.updateInvoker.invoke(t)
                },
                lateUpdatePhase: function(t) {
                    this.lateUpdateInvoker.invoke(t), this._updating = !1
                }
            });
        e.exports = v
    }), {
        "./platform/CCClass": 79,
        "./platform/CCObject": 85,
        "./platform/js": 100,
        "./utils/misc": 128
    }],
    37: [(function(t, e, i) {
        function n(t) {
            t.stopPropagation()
        }
        var r = ["touchstart", "touchmove", "touchend", "mousedown", "mousemove", "mouseup", "mouseenter", "mouseleave", "mousewheel"],
            s = cc.Class({
                name: "cc.BlockInputEvents",
                extends: t("./CCComponent"),
                editor: {
                    menu: "i18n:MAIN_MENU.component.ui/Block Input Events",
                    inspector: "packages://inspector/inspectors/comps/block-input-events.js",
                    help: "i18n:COMPONENT.help_url.block-input-events"
                },
                onEnable: function() {
                    for (var t = 0; t < r.length; t++) this.node.on(r[t], n, this)
                },
                onDisable: function() {
                    for (var t = 0; t < r.length; t++) this.node.off(r[t], n, this)
                }
            });
        cc.BlockInputEvents = e.exports = s
    }), {
        "./CCComponent": 39
    }],
    38: [(function(t, e, i) {
        var n = t("../event-manager"),
            r = {
                getContentSize: function() {
                    return cc.visibleRect
                },
                setContentSize: function(t) {},
                _getWidth: function() {
                    return this.getContentSize().width
                },
                _getHeight: function() {
                    return this.getContentSize().height
                }
            },
            s = cc.Class({
                name: "cc.Canvas",
                extends: t("./CCComponent"),
                editor: !1,
                resetInEditor: !1,
                statics: {
                    instance: null
                },
                properties: {
                    _designResolution: cc.size(960, 640),
                    designResolution: {
                        get: function() {
                            return cc.size(this._designResolution)
                        },
                        set: function(t) {
                            this._designResolution.width = t.width, this._designResolution.height = t.height, this.applySettings()
                        },
                        tooltip: !1
                    },
                    _fitWidth: !1,
                    _fitHeight: !0,
                    fitHeight: {
                        get: function() {
                            return this._fitHeight
                        },
                        set: function(t) {
                            this._fitHeight !== t && (this._fitHeight = t, this.applySettings())
                        },
                        tooltip: !1
                    },
                    fitWidth: {
                        get: function() {
                            return this._fitWidth
                        },
                        set: function(t) {
                            this._fitWidth !== t && (this._fitWidth = t, this.applySettings())
                        },
                        tooltip: !1
                    }
                },
                ctor: function() {
                    this._thisOnResized = this.onResized.bind(this)
                },
                __preload: function() {
                    if (s.instance) return cc.errorID(6700, this.node.name, s.instance.node.name);
                    if (s.instance = this, this.node._sizeProvider) {} else this.node._sizeProvider = r;
                    cc.director.on(cc.Director.EVENT_BEFORE_VISIT, this.alignWithScreen, this), cc.sys.isMobile ? window.addEventListener("resize", this._thisOnResized) : n.addCustomListener("canvas-resize", this._thisOnResized), this.applySettings(), this.onResized()
                },
                onDestroy: function() {
                    this.node._sizeProvider === r && (this.node._sizeProvider = null), cc.director.off(cc.Director.EVENT_BEFORE_VISIT, this.alignWithScreen, this), cc.sys.isMobile ? window.removeEventListener("resize", this._thisOnResized) : n.removeCustomListeners("canvas-resize", this._thisOnResized), s.instance === this && (s.instance = null)
                },
                alignWithScreen: function() {
                    var t, e = cc.visibleRect,
                        i = 0,
                        n = 0;
                    !this.fitHeight && !this.fitWidth && (i = .5 * ((t = cc.view.getDesignResolutionSize()).width - e.width), n = .5 * (t.height - e.height)), this.node.setPosition(.5 * e.width + i, .5 * e.height + n)
                },
                onResized: function() {
                    this.alignWithScreen()
                },
                applySettings: function() {
                    var t, e = cc.ResolutionPolicy;
                    t = this.fitHeight && this.fitWidth ? e.SHOW_ALL : this.fitHeight || this.fitWidth ? this.fitWidth ? e.FIXED_WIDTH : e.FIXED_HEIGHT : e.NO_BORDER;
                    var i = this._designResolution;
                    cc.view.setDesignResolutionSize(i.width, i.height, t)
                }
            });
        cc.Canvas = e.exports = s
    }), {
        "../event-manager": 52,
        "./CCComponent": 39
    }],
    39: [(function(t, e, i) {
        var n = t("../platform/CCObject"),
            r = t("../platform/js"),
            s = new(t("../platform/id-generater"))("Comp"),
            o = n.Flags.IsOnEnableCalled,
            c = n.Flags.IsOnLoadCalled,
            a = cc.Class({
                name: "cc.Component",
                extends: n,
                ctor: function() {
                    this.__instanceId = cc.ClassManager.getNewInstanceId(), this.__eventTargets = []
                },
                properties: {
                    node: {
                        default: null,
                        visible: !1
                    },
                    name: {
                        get: function() {
                            if (this._name) return this._name;
                            var t = cc.js.getClassName(this),
                                e = t.lastIndexOf(".");
                            return e >= 0 && (t = t.slice(e + 1)), this.node.name + "<" + t + ">"
                        },
                        set: function(t) {
                            this._name = t
                        },
                        visible: !1
                    },
                    _id: {
                        default: "",
                        serializable: !1
                    },
                    uuid: {
                        get: function() {
                            var t = this._id;
                            return t || (t = this._id = s.getNewId()), t
                        },
                        visible: !1
                    },
                    __scriptAsset: !1,
                    _enabled: !0,
                    enabled: {
                        get: function() {
                            return this._enabled
                        },
                        set: function(t) {
                            if (this._enabled !== t && (this._enabled = t, this.node._activeInHierarchy)) {
                                var e = cc.director._compScheduler;
                                t ? e.enableComp(this) : e.disableComp(this)
                            }
                        },
                        visible: !1
                    },
                    enabledInHierarchy: {
                        get: function() {
                            return (this._objFlags & o) > 0
                        },
                        visible: !1
                    },
                    _isOnLoadCalled: {
                        get: function() {
                            return this._objFlags & c
                        }
                    }
                },
                update: null,
                lateUpdate: null,
                __preload: null,
                onLoad: null,
                start: null,
                onEnable: null,
                onDisable: null,
                onDestroy: null,
                onFocusInEditor: null,
                onLostFocusInEditor: null,
                resetInEditor: null,
                addComponent: function(t) {
                    return this.node.addComponent(t)
                },
                getComponent: function(t) {
                    return this.node.getComponent(t)
                },
                getComponents: function(t) {
                    return this.node.getComponents(t)
                },
                getComponentInChildren: function(t) {
                    return this.node.getComponentInChildren(t)
                },
                getComponentsInChildren: function(t) {
                    return this.node.getComponentsInChildren(t)
                },
                _getLocalBounds: null,
                onRestore: null,
                destroy: function() {
                    this._super() && this._enabled && this.node._activeInHierarchy && cc.director._compScheduler.disableComp(this)
                },
                _onPreDestroy: function() {
                    this.unscheduleAllCallbacks();
                    for (var t = this.__eventTargets, e = 0, i = t.length; e < i; ++e) {
                        var n = t[e];
                        n && n.targetOff(this)
                    }
                    t.length = 0, cc.director._nodeActivator.destroyComp(this), this.node._removeComponent(this)
                },
                _instantiate: function(t) {
                    return t || (t = cc.instantiate._clone(this, this)), t.node = null, t
                },
                isRunning: function() {
                    return this.enabledInHierarchy
                },
                schedule: function(t, e, i, n) {
                    cc.assertID(t, 1619), cc.assertID(e >= 0, 1620), e = e || 0, i = isNaN(i) ? cc.macro.REPEAT_FOREVER : i, n = n || 0;
                    var r = cc.director.getScheduler(),
                        s = r.isTargetPaused(this);
                    r.schedule(t, this, e, i, n, s)
                },
                scheduleOnce: function(t, e) {
                    this.schedule(t, 0, 0, e)
                },
                unschedule: function(t) {
                    t && cc.director.getScheduler().unschedule(t, this)
                },
                unscheduleAllCallbacks: function() {
                    cc.director.getScheduler().unscheduleAllForTarget(this)
                }
            });
        a._requireComponent = null, a._executionOrder = 0, r.value(a, "_registerEditorProps", (function(t, e) {
            var i = e.requireComponent;
            i && (t._requireComponent = i);
            var n = e.executionOrder;
            n && "number" == typeof n && (t._executionOrder = n)
        })), a.prototype.__scriptUuid = "", cc.Component = e.exports = a
    }), {
        "../platform/CCObject": 85,
        "../platform/id-generater": 96,
        "../platform/js": 100
    }],
    40: [(function(t, e, i) {
        cc.Component.EventHandler = cc.Class({
            name: "cc.ClickEvent",
            properties: {
                target: {
                    default: null,
                    type: cc.Node
                },
                component: {
                    default: ""
                },
                handler: {
                    default: ""
                },
                customEventData: {
                    default: ""
                }
            },
            statics: {
                emitEvents: function(t) {
                    "use strict";
                    var e, i, n;
                    if (arguments.length > 0)
                        for (i = 0, n = (e = new Array(arguments.length - 1)).length; i < n; i++) e[i] = arguments[i + 1];
                    for (i = 0, n = t.length; i < n; i++) {
                        var r = t[i];
                        r instanceof cc.Component.EventHandler && r.emit(e)
                    }
                }
            },
            emit: function(t) {
                var e = this.target;
                if (cc.isValid(e)) {
                    var i = e.getComponent(this.component);
                    if (cc.isValid(i)) {
                        var n = i[this.handler];
                        "function" == typeof n && (null != this.customEventData && "" !== this.customEventData && (t = t.slice()).push(this.customEventData), n.apply(i, t))
                    }
                }
            }
        })
    }), {}],
    41: [(function(t, e, i) {
        t("../../clipping-nodes/CCClippingNode"), t("../../clipping-nodes/CCClippingNodeCanvasRenderCmd"), t("../../clipping-nodes/CCClippingNodeWebGLRenderCmd"), t("../../shape-nodes/CCDrawNode");
        var n = cc._RendererInSG,
            r = cc.Enum({
                RECT: 0,
                ELLIPSE: 1,
                IMAGE_STENCIL: 2
            }),
            s = cc.Class({
                name: "cc.Mask",
                extends: n,
                editor: !1,
                properties: {
                    _clippingStencil: {
                        default: null,
                        serializable: !1
                    },
                    _type: r.RECT,
                    type: {
                        get: function() {
                            return this._type
                        },
                        set: function(t) {
                            this._type = t, this._refreshStencil()
                        },
                        type: r,
                        tooltip: !1
                    },
                    spriteFrame: {
                        default: null,
                        type: cc.SpriteFrame,
                        tooltip: !1,
                        notify: function() {
                            this._refreshStencil()
                        }
                    },
                    alphaThreshold: {
                        default: 1,
                        type: cc.Float,
                        range: [0, 1, .1],
                        slide: !0,
                        tooltip: !1,
                        notify: function() {
                            cc._renderType !== cc.game.RENDER_TYPE_CANVAS ? this._sgNode.setAlphaThreshold(this.alphaThreshold) : cc.warnID(4201)
                        }
                    },
                    inverted: {
                        default: !1,
                        type: cc.Boolean,
                        tooltip: !1,
                        notify: function() {
                            cc._renderType !== cc.game.RENDER_TYPE_CANVAS ? this._sgNode.setInverted(this.inverted) : cc.warnID(4202)
                        }
                    },
                    _segements: 64,
                    segements: {
                        get: function() {
                            return this._segements
                        },
                        set: function(t) {
                            this._segements = cc.clampf(t, 3, 1e4), this._refreshStencil()
                        },
                        tooltip: !1
                    },
                    _resizeToTarget: {
                        animatable: !1,
                        set: function(t) {
                            t && this._resizeNodeToTargetNode()
                        }
                    }
                },
                statics: {
                    Type: r
                },
                _resizeNodeToTargetNode: !1,
                _initSgNode: function() {},
                _createSgNode: function() {
                    return new cc.ClippingNode
                },
                _hitTest: function(t) {
                    var e = this.node.getContentSize(),
                        i = e.width,
                        n = e.height,
                        s = this.node.getNodeToWorldTransform();
                    if (this.type === r.RECT || this.type === r.IMAGE_STENCIL) {
                        var o = cc.rect(0, 0, i, n);
                        cc._rectApplyAffineTransformIn(o, s);
                        var c = t.x - o.x,
                            a = o.x + o.width - t.x,
                            h = t.y - o.y,
                            l = o.y + o.height - t.y;
                        return c >= 0 && a >= 0 && l >= 0 && h >= 0
                    }
                    if (this.type === r.ELLIPSE) {
                        var u = i / 2,
                            _ = n / 2,
                            d = s.a * u + s.c * _ + s.tx,
                            f = s.b * u + s.d * _ + s.ty,
                            p = t.x - d,
                            g = t.y - f;
                        return p * p / (u * u) + g * g / (_ * _) < 1
                    }
                },
                onEnable: function() {
                    this._super(), this.spriteFrame && this.spriteFrame.ensureLoadTexture(), this._refreshStencil(), this.node.on("size-changed", this._refreshStencil, this), this.node.on("anchor-changed", this._refreshStencil, this)
                },
                onDisable: function() {
                    this._super(), this.node.off("size-changed", this._refreshStencil, this), this.node.off("anchor-changed", this._refreshStencil, this)
                },
                _calculateCircle: function(t, e, i) {
                    for (var n = [], r = 2 * Math.PI / i, s = 0; s < i; ++s) n.push(cc.v2(e.x * Math.cos(r * s) + t.x, e.y * Math.sin(r * s) + t.y));
                    return n
                },
                _refreshStencil: function() {
                    if (this.type !== r.IMAGE_STENCIL || cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
                        var t = this.node.getContentSize(),
                            e = this.node.getAnchorPoint(),
                            i = this._clippingStencil;
                        if (this._type === r.IMAGE_STENCIL) {
                            i instanceof cc.Scale9Sprite && i._spriteFrame === this.spriteFrame || ((i = new cc.Scale9Sprite).setSpriteFrame(this.spriteFrame), this._sgNode.setStencil(i)), i.setContentSize(t), i.setAnchorPoint(e), this._sgNode.setAlphaThreshold(this.alphaThreshold)
                        } else {
                            i instanceof cc.DrawNode || (i = new cc.DrawNode, this._sgNode.setStencil(i));
                            var n = t.width,
                                s = t.height,
                                o = -n * e.x,
                                c = -s * e.y,
                                a = cc.color(255, 255, 255, 0);
                            if (i.clear(), this._type === r.RECT) {
                                var h = [cc.v2(o, c), cc.v2(o + n, c), cc.v2(o + n, c + s), cc.v2(o, c + s)];
                                i.drawPoly(h, a, 0, a)
                            } else if (this._type === r.ELLIPSE) {
                                var l = cc.v2(o + n / 2, c + s / 2),
                                    u = {
                                        x: n / 2,
                                        y: s / 2
                                    };
                                i.drawPoly(this._calculateCircle(l, u, this._segements), a, 0, a)
                            }
                        }
                        this._sgNode.setInverted(this.inverted), this._clippingStencil = i, cc.renderer.childrenOrderDirty = !0
                    } else cc.warnID(4200)
                }
            });
        cc.Mask = e.exports = s
    }), {
        "../../clipping-nodes/CCClippingNode": 5,
        "../../clipping-nodes/CCClippingNodeCanvasRenderCmd": 6,
        "../../clipping-nodes/CCClippingNodeWebGLRenderCmd": 7,
        "../../shape-nodes/CCDrawNode": 162
    }],
    42: [(function(t, e, i) {
        var n = cc.Class({
            extends: t("./CCSGComponent"),
            name: "cc._RendererInSG",
            ctor: function() {
                var t = this._sgNode = this._createSgNode();
                t.setVisible(!1), this._plainNode = new _ccsg.Node
            },
            __preload: function() {
                this._initSgNode()
            },
            onEnable: function() {
                this._replaceSgNode(this._sgNode)
            },
            onDisable: function() {
                this._replaceSgNode(this._plainNode)
            },
            onDestroy: function() {
                this._removeSgNode()
            },
            _replaceSgNode: function(t) {
                var e = this.node,
                    i = e._sgNode;
                i._entity = null;
                var n = i.getChildren().slice();
                i.removeAllChildren(!1), t.getChildrenCount() > 0 && t.removeAllChildren(!1);
                for (var r = 0, s = n.length; r < s; ++r) t.addChild(n[r]);
                var o = i.getParent();
                o && (o.removeChild(i, !1), o.addChild(t), t._arrivalOrder = i._arrivalOrder, cc.renderer.childrenOrderDirty = o._reorderChildDirty = !0), e._sgNode = t, e._sgNode._entity = e, e._updateSgNode()
            }
        });
        cc._RendererInSG = e.exports = n
    }), {
        "./CCSGComponent": 44
    }],
    43: [(function(t, e, i) {
        var n = cc.Class({
            extends: t("./CCSGComponent"),
            name: "cc._RendererUnderSG",
            ctor: function() {
                var t = this._sgNode = this._createSgNode();
                t && t.setVisible(!1)
            },
            __preload: function() {
                this._initSgNode(), this._registSizeProvider(), this._appendSgNode(this._sgNode)
            },
            onEnable: function() {
                this._sgNode && this._sgNode.setVisible(!0)
            },
            onDisable: function() {
                this._sgNode && this._sgNode.setVisible(!1)
            },
            onDestroy: function() {
                this.node._sizeProvider === this._sgNode && (this.node._sizeProvider = null), this._removeSgNode()
            },
            _appendSgNode: function(t) {
                if (t) {
                    var e = this.node;
                    t.setColor(e._color), e._cascadeOpacityEnabled || t.setOpacity(e._opacity), t.setAnchorPoint(e._anchorPoint), t.setOpacityModifyRGB(e._opacityModifyRGB), t.setLocalZOrder(-1);
                    e._sgNode.addChild(t)
                }
            }
        });
        cc._RendererUnderSG = e.exports = n
    }), {
        "./CCSGComponent": 44
    }],
    44: [(function(t, e, i) {
        var n = t("../utils/scene-graph-helper"),
            r = cc.Class({
                extends: t("./CCComponent"),
                name: "cc._SGComponent",
                editor: !1,
                properties: {
                    _sgNode: {
                        default: null,
                        serializable: !1
                    }
                },
                _createSgNode: null,
                _initSgNode: null,
                _removeSgNode: n.removeSgNode,
                _registSizeProvider: function() {
                    if (this.node._sizeProvider) {} else this.node._sizeProvider = this._sgNode
                }
            });
        cc._SGComponent = e.exports = r
    }), {
        "../utils/scene-graph-helper": 131,
        "./CCComponent": 39
    }],
    45: [(function(t, e, i) {
        var n = t("./CCRendererUnderSG"),
            r = cc.Scale9Sprite.RenderingType,
            s = cc.Scale9Sprite.FillType,
            o = cc.BlendFunc.BlendFactor,
            c = cc.Enum({
                CUSTOM: 0,
                TRIMMED: 1,
                RAW: 2
            }),
            a = cc.Class({
                name: "cc.Sprite",
                extends: n,
                editor: !1,
                ctor: function() {
                    this._blendFunc = new cc.BlendFunc(this._srcBlendFactor, this._dstBlendFactor)
                },
                properties: {
                    _spriteFrame: {
                        default: null,
                        type: cc.SpriteFrame
                    },
                    _type: r.SIMPLE,
                    _sizeMode: c.TRIMMED,
                    _fillType: 0,
                    _fillCenter: cc.v2(0, 0),
                    _fillStart: 0,
                    _fillRange: 0,
                    _isTrimmedMode: !0,
                    _srcBlendFactor: o.SRC_ALPHA,
                    _dstBlendFactor: o.ONE_MINUS_SRC_ALPHA,
                    _atlas: {
                        default: null,
                        type: cc.SpriteAtlas,
                        tooltip: !1,
                        editorOnly: !0,
                        visible: !0,
                        animatable: !1
                    },
                    spriteFrame: {
                        get: function() {
                            return this._spriteFrame
                        },
                        set: function(t, e) {
                            var i = this._spriteFrame;
                            i !== t && (this._spriteFrame = t, this._applySpriteFrame(i))
                        },
                        type: cc.SpriteFrame
                    },
                    type: {
                        get: function() {
                            return this._type
                        },
                        set: function(t) {
                            this._type = t, this._sgNode.setRenderingType(t)
                        },
                        type: r,
                        animatable: !1,
                        tooltip: !1
                    },
                    fillType: {
                        get: function() {
                            return this._fillType
                        },
                        set: function(t) {
                            this._fillType = t, this._sgNode && this._sgNode.setFillType(t)
                        },
                        type: s,
                        tooltip: !1
                    },
                    fillCenter: {
                        get: function() {
                            return this._fillCenter
                        },
                        set: function(t) {
                            this._fillCenter = cc.v2(t), this._sgNode && this._sgNode.setFillCenter(this._fillCenter)
                        },
                        tooltip: !1
                    },
                    fillStart: {
                        get: function() {
                            return this._fillStart
                        },
                        set: function(t) {
                            this._fillStart = cc.clampf(t, -1, 1), this._sgNode && this._sgNode.setFillStart(t)
                        },
                        tooltip: !1
                    },
                    fillRange: {
                        get: function() {
                            return this._fillRange
                        },
                        set: function(t) {
                            this._fillRange = cc.clampf(t, -1, 1), this._sgNode && this._sgNode.setFillRange(t)
                        },
                        tooltip: !1
                    },
                    trim: {
                        get: function() {
                            return this._isTrimmedMode
                        },
                        set: function(t) {
                            this._isTrimmedMode !== t && (this._isTrimmedMode = t, this._sgNode.enableTrimmedContentSize(t))
                        },
                        animatable: !1,
                        tooltip: !1
                    },
                    srcBlendFactor: {
                        get: function() {
                            return this._srcBlendFactor
                        },
                        set: function(t) {
                            this._srcBlendFactor = t, this._blendFunc.src = t, this._sgNode.setBlendFunc(this._blendFunc)
                        },
                        animatable: !1,
                        type: o,
                        tooltip: !1
                    },
                    dstBlendFactor: {
                        get: function() {
                            return this._dstBlendFactor
                        },
                        set: function(t) {
                            this._dstBlendFactor = t, this._blendFunc.dst = t, this._sgNode.setBlendFunc(this._blendFunc)
                        },
                        animatable: !1,
                        type: o,
                        tooltip: !1
                    },
                    sizeMode: {
                        get: function() {
                            return this._sizeMode
                        },
                        set: function(t) {
                            this._sizeMode = t, t !== c.CUSTOM && this._applySpriteSize()
                        },
                        animatable: !1,
                        type: c,
                        tooltip: !1
                    }
                },
                statics: {
                    FillType: s,
                    Type: r,
                    SizeMode: c
                },
                setVisible: function(t) {
                    this.enabled = t
                },
                setInsetLeft: function(t) {
                    this._sgNode.setInsetLeft(t)
                },
                getInsetLeft: function() {
                    return this._sgNode.getInsetLeft()
                },
                setInsetTop: function(t) {
                    this._sgNode.setInsetTop(t)
                },
                getInsetTop: function() {
                    return this._sgNode.getInsetTop()
                },
                setInsetRight: function(t) {
                    this._sgNode.setInsetRight(t)
                },
                getInsetRight: function() {
                    return this._sgNode.getInsetRight()
                },
                setInsetBottom: function(t) {
                    this._sgNode.setInsetBottom(t)
                },
                getInsetBottom: function() {
                    return this._sgNode.getInsetBottom()
                },
                onEnable: function() {
                    this._sgNode && this._spriteFrame && this._spriteFrame.textureLoaded() && this._sgNode.setVisible(!0)
                },
                _applyAtlas: !1,
                _applySpriteFrameInsets: function() {
                    var t = this._spriteFrame,
                        e = this._sgNode;
                    e.setInsetTop(t.insetTop), e.setInsetBottom(t.insetBottom), e.setInsetRight(t.insetRight), e.setInsetLeft(t.insetLeft)
                },
                _applySpriteSize: function() {
                    if (this._spriteFrame)
                        if (c.RAW === this._sizeMode) {
                            var t = this._spriteFrame.getOriginalSize();
                            this.node.setContentSize(t)
                        } else if (c.TRIMMED === this._sizeMode) {
                        var e = this._spriteFrame.getRect();
                        this.node.setContentSize(e.width, e.height)
                    }
                },
                _onTextureLoaded: function(t) {
                    if (this.isValid) {
                        var e = this._sgNode;
                        e.setSpriteFrame(this._spriteFrame), this._applySpriteSize(), this.enabledInHierarchy && !e.isVisible() && e.setVisible(!0)
                    }
                },
                _applySpriteFrame: function(t, e) {
                    var i = this._sgNode;
                    t && t.off && t.off("load", this._onTextureLoaded, this);
                    var n = this._spriteFrame;
                    n ? (e || this._applySpriteFrameInsets(), n.textureLoaded() ? this._onTextureLoaded(null) : (n.once("load", this._onTextureLoaded, this), n.ensureLoadTexture())) : (i.setSpriteFrame(null), i.setVisible(!1))
                },
                _createSgNode: function() {
                    return new cc.Scale9Sprite
                },
                _initSgNode: function() {
                    var t = this._sgNode,
                        e = 0 !== t.getInsetLeft() || 0 !== t.getInsetRight() || 0 !== t.getInsetTop() || 0 !== t.getInsetBottom();
                    this._applySpriteFrame(null, e), t.setContentSize(this.node.getContentSize(!0)), this._applySpriteSize(), t.setRenderingType(this._type), t.setFillType(this._fillType), t.setFillCenter(this._fillCenter), t.setFillStart(this._fillStart), t.setFillRange(this._fillRange), t.enableTrimmedContentSize(this._isTrimmedMode), this._blendFunc.src = this._srcBlendFactor, this._blendFunc.dst = this._dstBlendFactor, t.setBlendFunc(this._blendFunc)
                },
                _resized: !1
            });
        t("../utils/misc").propertyDefine(a, ["insetLeft", "insetTop", "insetRight", "insetBottom"], {
            type: [null, "setRenderingType"]
        }), cc.Sprite = e.exports = a
    }), {
        "../utils/misc": 128,
        "./CCRendererUnderSG": 43
    }],
    46: [(function(t, e, i) {
        t("./CCComponent"), t("./CCRendererInSG"), t("./CCRendererUnderSG"), t("./CCComponentEventHandler"), t("./missing-script"), e.exports = [t("./CCSprite"), t("./CCWidget"), t("./CCCanvas"), t("./CCAudioSource"), t("./CCAnimation"), t("./CCButton"), t("./CCLabel"), t("./CCProgressBar"), t("./CCMask"), t("./CCScrollBar"), t("./CCScrollView"), t("./CCPageViewIndicator"), t("./CCPageView"), t("./CCSlider"), t("./CCLayout"), t("./CCEditBox"), t("./CCVideoPlayer"), t("./CCWebView"), t("./CCSpriteDistortion"), t("./CCLabelOutline"), t("./CCRichText"), t("./CCToggleContainer"), t("./CCToggleGroup"), t("./CCToggle"), t("./CCBlockInputEvents")]
    }), {
        "./CCAnimation": 1,
        "./CCAudioSource": 1,
        "./CCBlockInputEvents": 37,
        "./CCButton": 1,
        "./CCCanvas": 38,
        "./CCComponent": 39,
        "./CCComponentEventHandler": 40,
        "./CCEditBox": 1,
        "./CCLabel": 1,
        "./CCLabelOutline": 1,
        "./CCLayout": 1,
        "./CCMask": 41,
        "./CCPageView": 1,
        "./CCPageViewIndicator": 1,
        "./CCProgressBar": 1,
        "./CCRendererInSG": 42,
        "./CCRendererUnderSG": 43,
        "./CCRichText": 1,
        "./CCScrollBar": 1,
        "./CCScrollView": 1,
        "./CCSlider": 1,
        "./CCSprite": 45,
        "./CCSpriteDistortion": 1,
        "./CCToggle": 1,
        "./CCToggleContainer": 1,
        "./CCToggleGroup": 1,
        "./CCVideoPlayer": 1,
        "./CCWebView": 1,
        "./CCWidget": 1,
        "./missing-script": 47
    }],
    47: [(function(t, e, i) {
        var n = cc.js,
            r = t("../utils/misc").BUILTIN_CLASSID_RE,
            s = cc.Class({
                name: "cc.MissingClass",
                properties: {
                    _$erialized: {
                        default: null,
                        visible: !1,
                        editorOnly: !0
                    }
                }
            }),
            o = cc.Class({
                name: "cc.MissingScript",
                extends: cc.Component,
                editor: {
                    inspector: "packages://inspector/inspectors/comps/missing-script.js"
                },
                properties: {
                    compiled: {
                        default: !1,
                        serializable: !1
                    },
                    _$erialized: {
                        default: null,
                        visible: !1,
                        editorOnly: !0
                    }
                },
                ctor: !1,
                statics: {
                    safeFindClass: function(t, e) {
                        var i = n._getClassById(t);
                        return i || (t ? (cc.deserialize.reportMissingClass(t), o.getMissingWrapper(t, e)) : null)
                    },
                    getMissingWrapper: function(t, e) {
                        return e.node && (/^[0-9a-zA-Z+/]{23}$/.test(t) || r.test(t)) ? o : s
                    }
                },
                onLoad: function() {
                    cc.warnID(4600, this.node.name)
                }
            });
        cc._MissingScript = e.exports = o
    }), {
        "../utils/misc": 128
    }],
    48: [(function(t, e, i) {
        var n = cc.js;
        t("../event/event");
        var r = function(t, e) {
            cc.Event.call(this, cc.Event.MOUSE, e), this._eventType = t, this._button = 0, this._x = 0, this._y = 0, this._prevX = 0, this._prevY = 0, this._scrollX = 0, this._scrollY = 0
        };
        n.extend(r, cc.Event);
        var s = r.prototype;
        s.setScrollData = function(t, e) {
            this._scrollX = t, this._scrollY = e
        }, s.getScrollX = function() {
            return this._scrollX
        }, s.getScrollY = function() {
            return this._scrollY
        }, s.setLocation = function(t, e) {
            this._x = t, this._y = e
        }, s.getLocation = function() {
            return {
                x: this._x,
                y: this._y
            }
        }, s.getLocationInView = function() {
            return {
                x: this._x,
                y: cc.view._designResolutionSize.height - this._y
            }
        }, s._setPrevCursor = function(t, e) {
            this._prevX = t, this._prevY = e
        }, s.getPreviousLocation = function() {
            return {
                x: this._prevX,
                y: this._prevY
            }
        }, s.getDelta = function() {
            return {
                x: this._x - this._prevX,
                y: this._y - this._prevY
            }
        }, s.getDeltaX = function() {
            return this._x - this._prevX
        }, s.getDeltaY = function() {
            return this._y - this._prevY
        }, s.setButton = function(t) {
            this._button = t
        }, s.getButton = function() {
            return this._button
        }, s.getLocationX = function() {
            return this._x
        }, s.getLocationY = function() {
            return this._y
        }, r.NONE = 0, r.DOWN = 1, r.UP = 2, r.MOVE = 3, r.SCROLL = 4, r.BUTTON_LEFT = 0, r.BUTTON_RIGHT = 2, r.BUTTON_MIDDLE = 1, r.BUTTON_4 = 3, r.BUTTON_5 = 4, r.BUTTON_6 = 5, r.BUTTON_7 = 6, r.BUTTON_8 = 7;
        var o = function(t, e) {
            cc.Event.call(this, cc.Event.TOUCH, e), this._eventCode = 0, this._touches = t || [], this.touch = null, this.currentTouch = null
        };
        n.extend(o, cc.Event), (s = o.prototype).getEventCode = function() {
            return this._eventCode
        }, s.getTouches = function() {
            return this._touches
        }, s._setEventCode = function(t) {
            this._eventCode = t
        }, s._setTouches = function(t) {
            this._touches = t
        }, s.setLocation = function(t, e) {
            this.touch && this.touch.setTouchInfo(this.touch.getID(), t, e)
        }, s.getLocation = function() {
            return this.touch ? this.touch.getLocation() : cc.v2()
        }, s.getLocationInView = function() {
            return this.touch ? this.touch.getLocationInView() : cc.v2()
        }, s.getPreviousLocation = function() {
            return this.touch ? this.touch.getPreviousLocation() : cc.v2()
        }, s.getStartLocation = function() {
            return this.touch ? this.touch.getStartLocation() : cc.v2()
        }, s.getID = function() {
            return this.touch ? this.touch.getID() : null
        }, s.getDelta = function() {
            return this.touch ? this.touch.getDelta() : cc.v2()
        }, s.getDeltaX = function() {
            return this.touch ? this.touch.getDelta().x : 0
        }, s.getDeltaY = function() {
            return this.touch ? this.touch.getDelta().y : 0
        }, s.getLocationX = function() {
            return this.touch ? this.touch.getLocationX() : 0
        }, s.getLocationY = function() {
            return this.touch ? this.touch.getLocationY() : 0
        }, o.MAX_TOUCHES = 5, o.BEGAN = 0, o.MOVED = 1, o.ENDED = 2, o.CANCELED = 3;
        var c = function(t, e) {
            cc.Event.call(this, cc.Event.ACCELERATION, e), this.acc = t
        };
        n.extend(c, cc.Event);
        var a = function(t, e, i) {
            cc.Event.call(this, cc.Event.KEYBOARD, i), this.keyCode = t, this.isPressed = e
        };
        n.extend(a, cc.Event), cc.Event.EventMouse = r, cc.Event.EventTouch = o, cc.Event.EventAcceleration = c, cc.Event.EventKeyboard = a, e.exports = cc.Event
    }), {
        "../event/event": 55
    }],
    49: [(function(t, e, i) {
        cc.EventListener = cc._Class.extend({
            ctor: function(t, e, i) {
                this._onEvent = i, this._type = t || 0, this._listenerID = e || "", this._registered = !1, this._fixedPriority = 0, this._node = null, this._target = null, this._paused = !0, this._isEnabled = !0
            },
            _setPaused: function(t) {
                this._paused = t
            },
            _isPaused: function() {
                return this._paused
            },
            _setRegistered: function(t) {
                this._registered = t
            },
            _isRegistered: function() {
                return this._registered
            },
            _getType: function() {
                return this._type
            },
            _getListenerID: function() {
                return this._listenerID
            },
            _setFixedPriority: function(t) {
                this._fixedPriority = t
            },
            _getFixedPriority: function() {
                return this._fixedPriority
            },
            _setSceneGraphPriority: function(t) {
                this._target = t, this._node = t
            },
            _getSceneGraphPriority: function() {
                return this._node
            },
            checkAvailable: function() {
                return null !== this._onEvent
            },
            clone: function() {
                return null
            },
            setEnabled: function(t) {
                this._isEnabled = t
            },
            isEnabled: function() {
                return this._isEnabled
            },
            retain: function() {},
            release: function() {}
        }), cc.EventListener.UNKNOWN = 0, cc.EventListener.TOUCH_ONE_BY_ONE = 1, cc.EventListener.TOUCH_ALL_AT_ONCE = 2, cc.EventListener.KEYBOARD = 3, cc.EventListener.MOUSE = 4, cc.EventListener.ACCELERATION = 6, cc.EventListener.CUSTOM = 8, cc._EventListenerCustom = cc.EventListener.extend({
            _onCustomEvent: null,
            ctor: function(t, e) {
                this._onCustomEvent = e, cc.EventListener.prototype.ctor.call(this, cc.EventListener.CUSTOM, t, this._callback)
            },
            _callback: function(t) {
                null !== this._onCustomEvent && this._onCustomEvent(t)
            },
            checkAvailable: function() {
                return cc.EventListener.prototype.checkAvailable.call(this) && null !== this._onCustomEvent
            },
            clone: function() {
                return new cc._EventListenerCustom(this._listenerID, this._onCustomEvent)
            }
        }), cc._EventListenerMouse = cc.EventListener.extend({
            onMouseDown: null,
            onMouseUp: null,
            onMouseMove: null,
            onMouseScroll: null,
            ctor: function() {
                cc.EventListener.prototype.ctor.call(this, cc.EventListener.MOUSE, cc._EventListenerMouse.LISTENER_ID, this._callback)
            },
            _callback: function(t) {
                var e = cc.Event.EventMouse;
                switch (t._eventType) {
                    case e.DOWN:
                        this.onMouseDown && this.onMouseDown(t);
                        break;
                    case e.UP:
                        this.onMouseUp && this.onMouseUp(t);
                        break;
                    case e.MOVE:
                        this.onMouseMove && this.onMouseMove(t);
                        break;
                    case e.SCROLL:
                        this.onMouseScroll && this.onMouseScroll(t)
                }
            },
            clone: function() {
                var t = new cc._EventListenerMouse;
                return t.onMouseDown = this.onMouseDown, t.onMouseUp = this.onMouseUp, t.onMouseMove = this.onMouseMove, t.onMouseScroll = this.onMouseScroll, t
            },
            checkAvailable: function() {
                return !0
            }
        }), cc._EventListenerMouse.LISTENER_ID = "__cc_mouse", cc._EventListenerTouchOneByOne = cc.EventListener.extend({
            _claimedTouches: null,
            swallowTouches: !1,
            onTouchBegan: null,
            onTouchMoved: null,
            onTouchEnded: null,
            onTouchCancelled: null,
            ctor: function() {
                cc.EventListener.prototype.ctor.call(this, cc.EventListener.TOUCH_ONE_BY_ONE, cc._EventListenerTouchOneByOne.LISTENER_ID, null), this._claimedTouches = []
            },
            setSwallowTouches: function(t) {
                this.swallowTouches = t
            },
            isSwallowTouches: function() {
                return this.swallowTouches
            },
            clone: function() {
                var t = new cc._EventListenerTouchOneByOne;
                return t.onTouchBegan = this.onTouchBegan, t.onTouchMoved = this.onTouchMoved, t.onTouchEnded = this.onTouchEnded, t.onTouchCancelled = this.onTouchCancelled, t.swallowTouches = this.swallowTouches, t
            },
            checkAvailable: function() {
                return !!this.onTouchBegan || (cc.logID(1801), !1)
            }
        }), cc._EventListenerTouchOneByOne.LISTENER_ID = "__cc_touch_one_by_one", cc._EventListenerTouchAllAtOnce = cc.EventListener.extend({
            onTouchesBegan: null,
            onTouchesMoved: null,
            onTouchesEnded: null,
            onTouchesCancelled: null,
            ctor: function() {
                cc.EventListener.prototype.ctor.call(this, cc.EventListener.TOUCH_ALL_AT_ONCE, cc._EventListenerTouchAllAtOnce.LISTENER_ID, null)
            },
            clone: function() {
                var t = new cc._EventListenerTouchAllAtOnce;
                return t.onTouchesBegan = this.onTouchesBegan, t.onTouchesMoved = this.onTouchesMoved, t.onTouchesEnded = this.onTouchesEnded, t.onTouchesCancelled = this.onTouchesCancelled, t
            },
            checkAvailable: function() {
                return null !== this.onTouchesBegan || null !== this.onTouchesMoved || null !== this.onTouchesEnded || null !== this.onTouchesCancelled || (cc.logID(1802), !1)
            }
        }), cc._EventListenerTouchAllAtOnce.LISTENER_ID = "__cc_touch_all_at_once", cc.EventListener.create = function(t) {
            cc.assertID(t && t.event, 1900);
            var e = t.event;
            delete t.event;
            var i = null;
            e === cc.EventListener.TOUCH_ONE_BY_ONE ? i = new cc._EventListenerTouchOneByOne : e === cc.EventListener.TOUCH_ALL_AT_ONCE ? i = new cc._EventListenerTouchAllAtOnce : e === cc.EventListener.MOUSE ? i = new cc._EventListenerMouse : e === cc.EventListener.CUSTOM ? (i = new cc._EventListenerCustom(t.eventName, t.callback), delete t.eventName, delete t.callback) : e === cc.EventListener.KEYBOARD ? i = new cc._EventListenerKeyboard : e === cc.EventListener.ACCELERATION && (i = new cc._EventListenerAcceleration(t.callback), delete t.callback);
            for (var n in t) i[n] = t[n];
            return i
        }, cc._EventListenerAcceleration = cc.EventListener.extend({
            _onAccelerationEvent: null,
            ctor: function(t) {
                this._onAccelerationEvent = t, cc.EventListener.prototype.ctor.call(this, cc.EventListener.ACCELERATION, cc._EventListenerAcceleration.LISTENER_ID, this._callback)
            },
            _callback: function(t) {
                this._onAccelerationEvent(t.acc, t)
            },
            checkAvailable: function() {
                return cc.assertID(this._onAccelerationEvent, 1803), !0
            },
            clone: function() {
                return new cc._EventListenerAcceleration(this._onAccelerationEvent)
            }
        }), cc._EventListenerAcceleration.LISTENER_ID = "__cc_acceleration", cc._EventListenerKeyboard = cc.EventListener.extend({
            onKeyPressed: null,
            onKeyReleased: null,
            ctor: function() {
                cc.EventListener.prototype.ctor.call(this, cc.EventListener.KEYBOARD, cc._EventListenerKeyboard.LISTENER_ID, this._callback)
            },
            _callback: function(t) {
                t.isPressed ? this.onKeyPressed && this.onKeyPressed(t.keyCode, t) : this.onKeyReleased && this.onKeyReleased(t.keyCode, t)
            },
            clone: function() {
                var t = new cc._EventListenerKeyboard;
                return t.onKeyPressed = this.onKeyPressed, t.onKeyReleased = this.onKeyReleased, t
            },
            checkAvailable: function() {
                return null !== this.onKeyPressed || null !== this.onKeyReleased || (cc.logID(1800), !1)
            }
        }), cc._EventListenerKeyboard.LISTENER_ID = "__cc_keyboard"
    }), {}],
    50: [(function(t, e, i) {
        var n = t("../platform/js"),
            r = cc._Class.extend({
                ctor: function() {
                    this._fixedListeners = [], this._sceneGraphListeners = [], this.gt0Index = 0
                },
                size: function() {
                    return this._fixedListeners.length + this._sceneGraphListeners.length
                },
                empty: function() {
                    return 0 === this._fixedListeners.length && 0 === this._sceneGraphListeners.length
                },
                push: function(t) {
                    0 === t._getFixedPriority() ? this._sceneGraphListeners.push(t) : this._fixedListeners.push(t)
                },
                clearSceneGraphListeners: function() {
                    this._sceneGraphListeners.length = 0
                },
                clearFixedListeners: function() {
                    this._fixedListeners.length = 0
                },
                clear: function() {
                    this._sceneGraphListeners.length = 0, this._fixedListeners.length = 0
                },
                getFixedPriorityListeners: function() {
                    return this._fixedListeners
                },
                getSceneGraphPriorityListeners: function() {
                    return this._sceneGraphListeners
                }
            }),
            s = {
                DIRTY_NONE: 0,
                DIRTY_FIXED_PRIORITY: 1,
                DIRTY_SCENE_GRAPH_PRIORITY: 2,
                DIRTY_ALL: 3,
                _listenersMap: {},
                _priorityDirtyFlagMap: {},
                _nodeListenersMap: {},
                _nodePriorityMap: {},
                _globalZOrderNodeMap: {},
                _toAddedListeners: [],
                _toRemovedListeners: [],
                _dirtyNodes: [],
                _inDispatch: 0,
                _isEnabled: !1,
                _nodePriorityIndex: 0,
                _internalCustomListenerIDs: [],
                _setDirtyForNode: function(t) {
                    if (void 0 !== this._nodeListenersMap[t.__instanceId] && this._dirtyNodes.push(t), t.getChildren)
                        for (var e = t.getChildren(), i = 0, n = e ? e.length : 0; i < n; i++) this._setDirtyForNode(e[i])
                },
                pauseTarget: function(t, e) {
                    if (t instanceof cc._BaseNode || t instanceof _ccsg.Node) {
                        var i, n, r = this._nodeListenersMap[t.__instanceId];
                        if (r)
                            for (i = 0, n = r.length; i < n; i++) r[i]._setPaused(!0);
                        if (!0 === e) {
                            var s = t.getChildren();
                            for (i = 0, n = s ? s.length : 0; i < n; i++) this.pauseTarget(s[i], !0)
                        }
                    } else cc.warnID(3506)
                },
                resumeTarget: function(t, e) {
                    if (t instanceof cc._BaseNode || t instanceof _ccsg.Node) {
                        var i, n, r = this._nodeListenersMap[t.__instanceId];
                        if (r)
                            for (i = 0, n = r.length; i < n; i++) r[i]._setPaused(!1);
                        if (this._setDirtyForNode(t), !0 === e && t.getChildren) {
                            var s = t.getChildren();
                            for (i = 0, n = s ? s.length : 0; i < n; i++) this.resumeTarget(s[i], !0)
                        }
                    } else cc.warnID(3506)
                },
                _addListener: function(t) {
                    0 === this._inDispatch ? this._forceAddEventListener(t) : this._toAddedListeners.push(t)
                },
                _forceAddEventListener: function(t) {
                    var e = t._getListenerID(),
                        i = this._listenersMap[e];
                    if (i || (i = new r, this._listenersMap[e] = i), i.push(t), 0 === t._getFixedPriority()) {
                        this._setDirty(e, this.DIRTY_SCENE_GRAPH_PRIORITY);
                        var n = t._getSceneGraphPriority();
                        null === n && cc.logID(3507), this._associateNodeAndEventListener(n, t), n.isRunning() && this.resumeTarget(n)
                    } else this._setDirty(e, this.DIRTY_FIXED_PRIORITY)
                },
                _getListeners: function(t) {
                    return this._listenersMap[t]
                },
                _updateDirtyFlagForSceneGraph: function() {
                    if (0 !== this._dirtyNodes.length) {
                        for (var t, e, i = this._dirtyNodes, n = this._nodeListenersMap, r = 0, s = i.length; r < s; r++)
                            if (t = n[i[r].__instanceId])
                                for (var o = 0, c = t.length; o < c; o++)(e = t[o]) && this._setDirty(e._getListenerID(), this.DIRTY_SCENE_GRAPH_PRIORITY);
                        this._dirtyNodes.length = 0
                    }
                },
                _removeAllListenersInVector: function(t) {
                    if (t)
                        for (var e, i = 0; i < t.length;)(e = t[i])._setRegistered(!1), null != e._getSceneGraphPriority() && (this._dissociateNodeAndEventListener(e._getSceneGraphPriority(), e), e._setSceneGraphPriority(null)), 0 === this._inDispatch ? cc.js.array.remove(t, e) : ++i
                },
                _removeListenersForListenerID: function(t) {
                    var e, i = this._listenersMap[t];
                    if (i) {
                        var n = i.getFixedPriorityListeners(),
                            r = i.getSceneGraphPriorityListeners();
                        this._removeAllListenersInVector(r), this._removeAllListenersInVector(n), delete this._priorityDirtyFlagMap[t], this._inDispatch || (i.clear(), delete this._listenersMap[t])
                    }
                    var s, o = this._toAddedListeners;
                    for (e = 0; e < o.length;)(s = o[e]) && s._getListenerID() === t ? cc.js.array.remove(o, s) : ++e
                },
                _sortEventListeners: function(t) {
                    var e = this.DIRTY_NONE,
                        i = this._priorityDirtyFlagMap;
                    if (i[t] && (e = i[t]), e !== this.DIRTY_NONE && (i[t] = this.DIRTY_NONE, e & this.DIRTY_FIXED_PRIORITY && this._sortListenersOfFixedPriority(t), e & this.DIRTY_SCENE_GRAPH_PRIORITY)) {
                        var n = cc.director.getScene();
                        n && this._sortListenersOfSceneGraphPriority(t, n)
                    }
                },
                _sortListenersOfSceneGraphPriority: function(t, e) {
                    var i = this._getListeners(t);
                    if (i) {
                        var n = i.getSceneGraphPriorityListeners();
                        n && 0 !== n.length && (this._nodePriorityIndex = 0, this._nodePriorityMap = {}, this._visitTarget(e, !0), i.getSceneGraphPriorityListeners().sort(this._sortEventListenersOfSceneGraphPriorityDes))
                    }
                },
                _sortEventListenersOfSceneGraphPriorityDes: function(t, e) {
                    var i = s._nodePriorityMap,
                        n = t._getSceneGraphPriority(),
                        r = e._getSceneGraphPriority();
                    return e && r && i[r.__instanceId] ? t && n && i[n.__instanceId] ? i[r.__instanceId] - i[n.__instanceId] : 1 : -1
                },
                _sortListenersOfFixedPriority: function(t) {
                    var e = this._listenersMap[t];
                    if (e) {
                        var i = e.getFixedPriorityListeners();
                        if (i && 0 !== i.length) {
                            i.sort(this._sortListenersOfFixedPriorityAsc);
                            for (var n = 0, r = i.length; n < r && !(i[n]._getFixedPriority() >= 0);) ++n;
                            e.gt0Index = n
                        }
                    }
                },
                _sortListenersOfFixedPriorityAsc: function(t, e) {
                    return t._getFixedPriority() - e._getFixedPriority()
                },
                _onUpdateListeners: function(t) {
                    var e, i, n, r = t.getFixedPriorityListeners(),
                        s = t.getSceneGraphPriorityListeners(),
                        o = this._toRemovedListeners;
                    if (s)
                        for (e = 0; e < s.length;)(i = s[e])._isRegistered() ? ++e : (cc.js.array.remove(s, i), -1 !== (n = o.indexOf(i)) && o.splice(n, 1));
                    if (r)
                        for (e = 0; e < r.length;)(i = r[e])._isRegistered() ? ++e : (cc.js.array.remove(r, i), -1 !== (n = o.indexOf(i)) && o.splice(n, 1));
                    s && 0 === s.length && t.clearSceneGraphListeners(), r && 0 === r.length && t.clearFixedListeners()
                },
                frameUpdateListeners: function() {
                    var t = this._listenersMap,
                        e = this._priorityDirtyFlagMap;
                    for (var i in t) t[i].empty() && (delete e[i], delete t[i]);
                    var n = this._toAddedListeners;
                    if (0 !== n.length) {
                        for (var r = 0, s = n.length; r < s; r++) this._forceAddEventListener(n[r]);
                        n.length = 0
                    }
                    0 !== this._toRemovedListeners.length && this._cleanToRemovedListeners()
                },
                _updateTouchListeners: function(t) {
                    var e = this._inDispatch;
                    if (cc.assertID(e > 0, 3508), !(e > 1)) {
                        var i;
                        (i = this._listenersMap[cc._EventListenerTouchOneByOne.LISTENER_ID]) && this._onUpdateListeners(i), (i = this._listenersMap[cc._EventListenerTouchAllAtOnce.LISTENER_ID]) && this._onUpdateListeners(i), cc.assertID(1 === e, 3509);
                        var n = this._toAddedListeners;
                        if (0 !== n.length) {
                            for (var r = 0, s = n.length; r < s; r++) this._forceAddEventListener(n[r]);
                            this._toAddedListeners.length = 0
                        }
                        0 !== this._toRemovedListeners.length && this._cleanToRemovedListeners()
                    }
                },
                _cleanToRemovedListeners: function() {
                    for (var t = this._toRemovedListeners, e = 0; e < t.length; e++) {
                        var i = t[e],
                            n = this._listenersMap[i._getListenerID()];
                        if (n) {
                            var r, s = n.getFixedPriorityListeners(),
                                o = n.getSceneGraphPriorityListeners();
                            o && -1 !== (r = o.indexOf(i)) && o.splice(r, 1), s && -1 !== (r = s.indexOf(i)) && s.splice(r, 1)
                        }
                    }
                    t.length = 0
                },
                _onTouchEventCallback: function(t, e) {
                    if (!t._isRegistered) return !1;
                    var i = e.event,
                        n = i.currentTouch;
                    i.currentTarget = t._node;
                    var r, o = !1,
                        c = i.getEventCode(),
                        a = cc.Event.EventTouch;
                    return c === a.BEGAN ? t.onTouchBegan && (o = t.onTouchBegan(n, i)) && t._registered && t._claimedTouches.push(n) : t._claimedTouches.length > 0 && -1 !== (r = t._claimedTouches.indexOf(n)) && (o = !0, c === a.MOVED && t.onTouchMoved ? t.onTouchMoved(n, i) : c === a.ENDED ? (t.onTouchEnded && t.onTouchEnded(n, i), t._registered && t._claimedTouches.splice(r, 1)) : c === a.CANCELLED && (t.onTouchCancelled && t.onTouchCancelled(n, i), t._registered && t._claimedTouches.splice(r, 1))), i.isStopped() ? (s._updateTouchListeners(i), !0) : !!(o && t._registered && t.swallowTouches) && (e.needsMutableSet && e.touches.splice(n, 1), !0)
                },
                _dispatchTouchEvent: function(t) {
                    this._sortEventListeners(cc._EventListenerTouchOneByOne.LISTENER_ID), this._sortEventListeners(cc._EventListenerTouchAllAtOnce.LISTENER_ID);
                    var e = this._getListeners(cc._EventListenerTouchOneByOne.LISTENER_ID),
                        i = this._getListeners(cc._EventListenerTouchAllAtOnce.LISTENER_ID);
                    if (null !== e || null !== i) {
                        var n = t.getTouches(),
                            r = cc.js.array.copy(n),
                            s = {
                                event: t,
                                needsMutableSet: e && i,
                                touches: r,
                                selTouch: null
                            };
                        if (e)
                            for (var o = 0; o < n.length; o++) t.currentTouch = n[o], t._propagationStopped = t._propagationImmediateStopped = !1, this._dispatchEventToListeners(e, this._onTouchEventCallback, s);
                        i && r.length > 0 && (this._dispatchEventToListeners(i, this._onTouchesEventCallback, {
                            event: t,
                            touches: r
                        }), t.isStopped()) || this._updateTouchListeners(t)
                    }
                },
                _onTouchesEventCallback: function(t, e) {
                    if (!t._registered) return !1;
                    var i = cc.Event.EventTouch,
                        n = e.event,
                        r = e.touches,
                        o = n.getEventCode();
                    return n.currentTarget = t._node, o === i.BEGAN && t.onTouchesBegan ? t.onTouchesBegan(r, n) : o === i.MOVED && t.onTouchesMoved ? t.onTouchesMoved(r, n) : o === i.ENDED && t.onTouchesEnded ? t.onTouchesEnded(r, n) : o === i.CANCELLED && t.onTouchesCancelled && t.onTouchesCancelled(r, n), !!n.isStopped() && (s._updateTouchListeners(n), !0)
                },
                _associateNodeAndEventListener: function(t, e) {
                    var i = this._nodeListenersMap[t.__instanceId];
                    i || (i = [], this._nodeListenersMap[t.__instanceId] = i), i.push(e)
                },
                _dissociateNodeAndEventListener: function(t, e) {
                    var i = this._nodeListenersMap[t.__instanceId];
                    i && (cc.js.array.remove(i, e), 0 === i.length && delete this._nodeListenersMap[t.__instanceId])
                },
                _dispatchEventToListeners: function(t, e, i) {
                    var n, r, s = !1,
                        o = t.getFixedPriorityListeners(),
                        c = t.getSceneGraphPriorityListeners(),
                        a = 0;
                    if (o && 0 !== o.length)
                        for (; a < t.gt0Index; ++a)
                            if ((r = o[a]).isEnabled() && !r._isPaused() && r._isRegistered() && e(r, i)) {
                                s = !0;
                                break
                            }
                    if (c && !s)
                        for (n = 0; n < c.length; n++)
                            if ((r = c[n]).isEnabled() && !r._isPaused() && r._isRegistered() && e(r, i)) {
                                s = !0;
                                break
                            }
                    if (o && !s)
                        for (; a < o.length; ++a)
                            if ((r = o[a]).isEnabled() && !r._isPaused() && r._isRegistered() && e(r, i)) {
                                s = !0;
                                break
                            }
                },
                _setDirty: function(t, e) {
                    var i = this._priorityDirtyFlagMap;
                    null == i[t] ? i[t] = e : i[t] = e | i[t]
                },
                _visitTarget: function(t, e) {
                    t._reorderChildDirty && t.sortAllChildren();
                    var i = t.getChildren(),
                        n = 0,
                        r = i.length,
                        s = this._globalZOrderNodeMap,
                        o = this._nodeListenersMap;
                    if (r > 0) {
                        for (var c; n < r && ((c = i[n]) && c.getLocalZOrder() < 0); n++) this._visitTarget(c, !1);
                        for (void 0 !== o[t.__instanceId] && (s[t.getGlobalZOrder()] || (s[t.getGlobalZOrder()] = []), s[t.getGlobalZOrder()].push(t.__instanceId)); n < r; n++)(c = i[n]) && this._visitTarget(c, !1)
                    } else void 0 !== o[t.__instanceId] && (s[t.getGlobalZOrder()] || (s[t.getGlobalZOrder()] = []), s[t.getGlobalZOrder()].push(t.__instanceId));
                    if (e) {
                        var a = [];
                        for (var h in s) a.push(h);
                        a.sort(this._sortNumberAsc);
                        var l, u, _ = a.length,
                            d = this._nodePriorityMap;
                        for (n = 0; n < _; n++)
                            for (l = s[a[n]], u = 0; u < l.length; u++) d[l[u]] = ++this._nodePriorityIndex;
                        this._globalZOrderNodeMap = {}
                    }
                },
                _sortNumberAsc: function(t, e) {
                    return t - e
                },
                hasEventListener: function(t) {
                    return !!this._getListeners(t)
                },
                addListener: function(t, e) {
                    if (cc.assertID(t && e, 3503), cc.js.isNumber(e) || e instanceof cc._BaseNode || e instanceof _ccsg.Node) {
                        if (t instanceof cc.EventListener) {
                            if (t._isRegistered()) return void cc.logID(3505)
                        } else cc.assertID(!cc.js.isNumber(e), 3504), t = cc.EventListener.create(t);
                        if (t.checkAvailable()) {
                            if (cc.js.isNumber(e)) {
                                if (0 === e) return void cc.logID(3500);
                                t._setSceneGraphPriority(null), t._setFixedPriority(e), t._setRegistered(!0), t._setPaused(!1), this._addListener(t)
                            } else t._setSceneGraphPriority(e), t._setFixedPriority(0), t._setRegistered(!0), this._addListener(t);
                            return t
                        }
                    } else cc.warnID(3506)
                },
                addCustomListener: function(t, e) {
                    var i = new cc._EventListenerCustom(t, e);
                    return this.addListener(i, 1), i
                },
                removeListener: function(t) {
                    if (null != t) {
                        var e, i = this._listenersMap;
                        for (var n in i) {
                            var r = i[n],
                                s = r.getFixedPriorityListeners(),
                                o = r.getSceneGraphPriorityListeners();
                            if ((e = this._removeListenerInVector(o, t)) ? this._setDirty(t._getListenerID(), this.DIRTY_SCENE_GRAPH_PRIORITY) : (e = this._removeListenerInVector(s, t)) && this._setDirty(t._getListenerID(), this.DIRTY_FIXED_PRIORITY), r.empty() && (delete this._priorityDirtyFlagMap[t._getListenerID()], delete i[n]), e) break
                        }
                        if (!e)
                            for (var c = this._toAddedListeners, a = 0, h = c.length; a < h; a++) {
                                var l = c[a];
                                if (l === t) {
                                    cc.js.array.remove(c, l), l._setRegistered(!1);
                                    break
                                }
                            }
                    }
                },
                _removeListenerInCallback: function(t, e) {
                    if (null == t) return !1;
                    for (var i = 0, n = t.length; i < n; i++) {
                        var r = t[i];
                        if (r._onCustomEvent === e || r._onEvent === e) return r._setRegistered(!1), null != r._getSceneGraphPriority() && (this._dissociateNodeAndEventListener(r._getSceneGraphPriority(), r), r._setSceneGraphPriority(null)), 0 === this._inDispatch ? cc.js.array.remove(t, r) : this._toRemovedListeners.push(r), !0
                    }
                    return !1
                },
                _removeListenerInVector: function(t, e) {
                    if (null == t) return !1;
                    for (var i = 0, n = t.length; i < n; i++) {
                        var r = t[i];
                        if (r === e) return r._setRegistered(!1), null != r._getSceneGraphPriority() && (this._dissociateNodeAndEventListener(r._getSceneGraphPriority(), r), r._setSceneGraphPriority(null)), 0 === this._inDispatch ? cc.js.array.remove(t, r) : this._toRemovedListeners.push(r), !0
                    }
                    return !1
                },
                removeListeners: function(t, e) {
                    if (cc.js.isNumber(t) || t instanceof cc._BaseNode || t instanceof _ccsg.Node)
                        if (void 0 !== t.__instanceId) {
                            delete this._nodePriorityMap[t.__instanceId], cc.js.array.remove(this._dirtyNodes, t);
                            var i, n = this._nodeListenersMap[t.__instanceId];
                            if (n) {
                                var r = cc.js.array.copy(n);
                                for (i = 0; i < r.length; i++) this.removeListener(r[i]);
                                delete this._nodeListenersMap[t.__instanceId]
                            }
                            var s = this._toAddedListeners;
                            for (i = 0; i < s.length;) {
                                var o = s[i];
                                o._getSceneGraphPriority() === t ? (o._setSceneGraphPriority(null), o._setRegistered(!1), s.splice(i, 1)) : ++i
                            }
                            if (!0 === e) {
                                var c, a = t.getChildren();
                                for (i = 0, c = a.length; i < c; i++) this.removeListeners(a[i], !0)
                            }
                        } else t === cc.EventListener.TOUCH_ONE_BY_ONE ? this._removeListenersForListenerID(cc._EventListenerTouchOneByOne.LISTENER_ID) : t === cc.EventListener.TOUCH_ALL_AT_ONCE ? this._removeListenersForListenerID(cc._EventListenerTouchAllAtOnce.LISTENER_ID) : t === cc.EventListener.MOUSE ? this._removeListenersForListenerID(cc._EventListenerMouse.LISTENER_ID) : t === cc.EventListener.ACCELERATION ? this._removeListenersForListenerID(cc._EventListenerAcceleration.LISTENER_ID) : t === cc.EventListener.KEYBOARD ? this._removeListenersForListenerID(cc._EventListenerKeyboard.LISTENER_ID) : cc.logID(3501);
                    else cc.warnID(3506)
                },
                removeCustomListeners: function(t) {
                    this._removeListenersForListenerID(t)
                },
                removeAllListeners: function() {
                    var t = this._listenersMap,
                        e = this._internalCustomListenerIDs;
                    for (var i in t) - 1 === e.indexOf(i) && this._removeListenersForListenerID(i)
                },
                setPriority: function(t, e) {
                    if (null != t) {
                        var i = this._listenersMap;
                        for (var n in i) {
                            var r = i[n].getFixedPriorityListeners();
                            if (r) {
                                if (-1 !== r.indexOf(t)) return null != t._getSceneGraphPriority() && cc.logID(3502), void(t._getFixedPriority() !== e && (t._setFixedPriority(e), this._setDirty(t._getListenerID(), this.DIRTY_FIXED_PRIORITY)))
                            }
                        }
                    }
                },
                setEnabled: function(t) {
                    this._isEnabled = t
                },
                isEnabled: function() {
                    return this._isEnabled
                },
                dispatchEvent: function(t) {
                    if (this._isEnabled) {
                        if (this._updateDirtyFlagForSceneGraph(), this._inDispatch++, !t || !t.getType) throw new Error("event is undefined");
                        if (t.getType().startsWith(cc.Event.TOUCH)) return this._dispatchTouchEvent(t), void this._inDispatch--;
                        var e = (function(t) {
                            var e = cc.Event,
                                i = t.type;
                            return i === e.ACCELERATION ? cc._EventListenerAcceleration.LISTENER_ID : i === e.KEYBOARD ? cc._EventListenerKeyboard.LISTENER_ID : i.startsWith(e.MOUSE) ? cc._EventListenerMouse.LISTENER_ID : (i.startsWith(e.TOUCH) && cc.logID(2e3), "")
                        })(t);
                        this._sortEventListeners(e);
                        var i = this._listenersMap[e];
                        null != i && (this._dispatchEventToListeners(i, this._onListenerCallback, t), this._onUpdateListeners(i)), this._inDispatch--
                    }
                },
                _onListenerCallback: function(t, e) {
                    return e.currentTarget = t._target, t._onEvent(e), e.isStopped()
                },
                dispatchCustomEvent: function(t, e) {
                    var i = new cc.Event.EventCustom(t);
                    i.setUserData(e), this.dispatchEvent(i)
                }
            };
        n.get(cc, "eventManager", (function() {
            return cc.warnID(1405, "cc.eventManager", "cc.EventTarget or cc.systemEvent"), s
        })), e.exports = s
    }), {
        "../platform/js": 100
    }],
    51: [(function(t, e, i) {
        cc.Touch = cc._Class.extend({
            ctor: function(t, e, i) {
                this._lastModified = 0, this.setTouchInfo(i, t, e)
            },
            getLocation: function() {
                return {
                    x: this._point.x,
                    y: this._point.y
                }
            },
            getLocationX: function() {
                return this._point.x
            },
            getLocationY: function() {
                return this._point.y
            },
            getPreviousLocation: function() {
                return {
                    x: this._prevPoint.x,
                    y: this._prevPoint.y
                }
            },
            getStartLocation: function() {
                return {
                    x: this._startPoint.x,
                    y: this._startPoint.y
                }
            },
            getDelta: function() {
                return cc.pSub(this._point, this._prevPoint)
            },
            getLocationInView: function() {
                return {
                    x: this._point.x,
                    y: cc.view._designResolutionSize.height - this._point.y
                }
            },
            getPreviousLocationInView: function() {
                return {
                    x: this._prevPoint.x,
                    y: cc.view._designResolutionSize.height - this._prevPoint.y
                }
            },
            getStartLocationInView: function() {
                return {
                    x: this._startPoint.x,
                    y: cc.view._designResolutionSize.height - this._startPoint.y
                }
            },
            getID: function() {
                return this._id
            },
            setTouchInfo: function(t, e, i) {
                this._prevPoint = this._point, this._point = cc.p(e || 0, i || 0), this._id = t, this._startPointCaptured || (this._startPoint = cc.p(this._point), cc.view._convertPointWithScale(this._startPoint), this._startPointCaptured = !0)
            },
            _setPoint: function(t, e) {
                void 0 === e ? (this._point.x = t.x, this._point.y = t.y) : (this._point.x = t, this._point.y = e)
            },
            _setPrevPoint: function(t, e) {
                this._prevPoint = void 0 === e ? cc.p(t.x, t.y) : cc.p(t || 0, e || 0)
            }
        })
    }), {}],
    52: [(function(t, e, i) {
        t("./CCEvent");
        var n;
        t("./CCTouch"), t("./CCEventListener"), n = t("./CCEventManager"), e.exports = n
    }), {
        "./CCEvent": 48,
        "./CCEventListener": 49,
        "./CCEventManager": 50,
        "./CCTouch": 51
    }],
    53: [(function(t, e, i) {
        function n() {
            s.call(this)
        }
        var r = cc.js,
            s = t("../platform/callbacks-invoker").CallbacksHandler;
        r.extend(n, s), n.prototype.invoke = function(t, e) {
            var i = t.type,
                n = this._callbackTable[i];
            if (n) {
                var r = !n.isInvoking;
                n.isInvoking = !0;
                for (var s = n.callbacks, o = n.targets, c = 0, a = s.length; c < a; ++c) {
                    var h = s[c];
                    if (h) {
                        var l = o[c] || t.currentTarget;
                        if (h.call(l, t, e), t._propagationImmediateStopped) break
                    }
                }
                r && (n.isInvoking = !1, n.containCanceled && n.purgeCanceled())
            }
        }, e.exports = n
    }), {
        "../platform/callbacks-invoker": 93
    }],
    54: [(function(t, e, i) {
        function n() {
            this._capturingListeners = null, this._bubblingListeners = null, this._hasListenerCache = null
        }
        var r = t("./event-listeners");
        t("./event");
        var s = cc.js.array.fastRemove,
            o = new Array(16);
        o.length = 0;
        var c = n.prototype;
        c._addEventFlag = function(t, e, i) {
            var n = this._hasListenerCache;
            n || (n = this._hasListenerCache = cc.js.createMap()), void 0 === n[t] && (n[t] = 0);
            var r = i ? 2 : 4;
            n[t] |= r
        }, c._purgeEventFlag = function(t, e, i) {
            var n = this._hasListenerCache;
            if (n && !e.has(t)) {
                var r = i ? 2 : 4;
                n[t] &= ~r, 0 === n[t] && delete n[t]
            }
        }, c._resetFlagForTarget = function(t, e, i) {
            var n = this._hasListenerCache;
            if (n) {
                var r = i ? 2 : 4;
                for (var s in n) e.has(s) || (n[s] &= ~r, 0 === n[s] && delete n[s])
            }
        }, c.hasEventListener = function(t, e) {
            var i = this._hasListenerCache;
            if (!i) return !1;
            var n = e ? 2 : 4;
            return (i[t] & n) > 0
        }, c.on = function(t, e, i, n) {
            "boolean" == typeof i ? (n = i, i = void 0) : n = !!n;
            if (e) {
                var s = null;
                return (s = n ? this._capturingListeners = this._capturingListeners || new r : this._bubblingListeners = this._bubblingListeners || new r).has(t, e, i) || (s.add(t, e, i), i && i.__eventTargets && i.__eventTargets.push(this), this._addEventFlag(t, s, n)), e
            }
            cc.errorID(6800)
        }, c.off = function(t, e, i, n) {
            if ("boolean" == typeof i ? (n = i, i = void 0) : n = !!n, e) {
                var r = n ? this._capturingListeners : this._bubblingListeners;
                r && (r.remove(t, e, i), i && i.__eventTargets && s(i.__eventTargets, this), this._purgeEventFlag(t, r, n))
            } else this._capturingListeners && this._capturingListeners.removeAll(t), this._bubblingListeners && this._bubblingListeners.removeAll(t), this._hasListenerCache && delete this._hasListenerCache[t]
        }, c.targetOff = function(t) {
            this._capturingListeners && (this._capturingListeners.removeAll(t), this._resetFlagForTarget(t, this._capturingListeners, !0)), this._bubblingListeners && (this._bubblingListeners.removeAll(t), this._resetFlagForTarget(t, this._bubblingListeners, !1))
        }, c.once = function(t, e, i, n) {
            var r = "__ONCE_FLAG:" + t,
                s = n ? this._capturingListeners : this._bubblingListeners;
            if (!(s && s.has(r, e, i))) {
                var o = this,
                    c = function(a) {
                        o.off(t, c, i, n), s.remove(r, e, i), e.call(this, a)
                    };
                this.on(t, c, i, n), s || (s = n ? this._capturingListeners : this._bubblingListeners), s.add(r, e, i)
            }
        }, c.dispatchEvent = function(t) {
            (function(t, e) {
                var i, n;
                for (e.target = t, o.length = 0, t._getCapturingTargets(e.type, o), e.eventPhase = 1, n = o.length - 1; n >= 0; --n)
                    if ((i = o[n])._isTargetActive(e.type) && i._capturingListeners && (e.currentTarget = i, i._capturingListeners.invoke(e, o), e._propagationStopped)) return void(o.length = 0);
                if (o.length = 0, t._isTargetActive(e.type) && (e.eventPhase = 2, e.currentTarget = t, t._capturingListeners && t._capturingListeners.invoke(e), !e._propagationImmediateStopped && t._bubblingListeners && t._bubblingListeners.invoke(e)), !e._propagationStopped && e.bubbles)
                    for (t._getBubblingTargets(e.type, o), e.eventPhase = 3, n = 0; n < o.length; ++n)
                        if ((i = o[n])._isTargetActive(e.type) && i._bubblingListeners && (e.currentTarget = i, i._bubblingListeners.invoke(e), e._propagationStopped)) return void(o.length = 0);
                o.length = 0
            })(this, t), o.length = 0
        }, c.emit = function(t, e) {
            var i = this._hasListenerCache;
            if (i) {
                var n = i[t];
                if (n) {
                    var r = cc.Event.EventCustom.get(t);
                    r.detail = e, r.eventPhase = 2, r.target = r.currentTarget = this;
                    var s = this._capturingListeners;
                    s && 2 & n && s.invoke(r);
                    var o = this._bubblingListeners;
                    o && 4 & n && !r._propagationImmediateStopped && o.invoke(r), r.detail = null, cc.Event.EventCustom.put(r)
                }
            }
        }, c._isTargetActive = function(t) {
            return !0
        }, c._getCapturingTargets = function(t, e) {}, c._getBubblingTargets = function(t, e) {}, n.prototype._EventTargetOn = n.prototype.on, n.prototype._EventTargetOnce = n.prototype.once, n.prototype._EventTargetOff = n.prototype.off, n.prototype._EventTargetTargetOff = n.prototype.targetOff, cc.EventTarget = e.exports = n
    }), {
        "./event": 55,
        "./event-listeners": 53
    }],
    55: [(function(t, e, i) {
        var n = t("../platform/js");
        cc.Event = function(t, e) {
            this.type = t, this.bubbles = !!e, this.target = null, this.currentTarget = null, this.eventPhase = 0, this._propagationStopped = !1, this._propagationImmediateStopped = !1
        }, cc.Event.prototype = {
            constructor: cc.Event,
            unuse: function() {
                this.type = cc.Event.NO_TYPE, this.target = null, this.currentTarget = null, this.eventPhase = cc.Event.NONE, this._propagationStopped = !1, this._propagationImmediateStopped = !1
            },
            reuse: function(t, e) {
                this.type = t, this.bubbles = e || !1
            },
            stopPropagation: function() {
                this._propagationStopped = !0
            },
            stopPropagationImmediate: function() {
                this._propagationImmediateStopped = !0
            },
            isStopped: function() {
                return this._propagationStopped || this._propagationImmediateStopped
            },
            getCurrentTarget: function() {
                return this.currentTarget
            },
            getType: function() {
                return this.type
            }
        }, cc.Event.NO_TYPE = "no_type", cc.Event.TOUCH = "touch", cc.Event.MOUSE = "mouse", cc.Event.KEYBOARD = "keyboard", cc.Event.ACCELERATION = "acceleration", cc.Event.NONE = 0, cc.Event.CAPTURING_PHASE = 1, cc.Event.AT_TARGET = 2, cc.Event.BUBBLING_PHASE = 3;
        var r = function(t, e) {
            cc.Event.call(this, t, e), this.detail = null
        };
        n.extend(r, cc.Event), r.prototype.reset = r, r.prototype.setUserData = function(t) {
            this.detail = t
        }, r.prototype.getUserData = function() {
            return this.detail
        }, r.prototype.getEventName = cc.Event.prototype.getType;
        var s = new n.Pool(10);
        r.put = function(t) {
            s.put(t)
        }, r.get = function(t, e) {
            var i = s._get();
            return i ? i.reset(t, e) : i = new r(t, e), i
        }, cc.Event.EventCustom = r, e.exports = cc.Event
    }), {
        "../platform/js": 100
    }],
    56: [(function(t, e, i) {
        t("./event"), t("./event-listeners"), t("./event-target"), t("./system-event")
    }), {
        "./event": 55,
        "./event-listeners": 53,
        "./event-target": 54,
        "./system-event": 57
    }],
    57: [(function(t, e, i) {
        var n, r = t("../event/event-target"),
            s = t("../event-manager");
        n = t("../platform/CCInputManager");
        var o = cc.Enum({
                KEY_DOWN: "keydown",
                KEY_UP: "keyup",
                DEVICEMOTION: "x_devicemotion_x"
            }),
            c = null,
            a = null,
            h = 0,
            l = cc.Class({
                name: "SystemEvent",
                extends: r,
                statics: {
                    EventType: o
                },
                setAccelerometerEnabled: function(t) {
                    n.setAccelerometerEnabled(t)
                },
                setAccelerometerInterval: function(t) {
                    n.setAccelerometerInterval(t)
                },
                on: function(t, e, i, n) {
                    if (this._super(t, e, i, n), (t === o.KEY_DOWN || t === o.KEY_UP) && (c || (c = cc.EventListener.create({
                            event: cc.EventListener.KEYBOARD,
                            onKeyPressed: function(t, e) {
                                e.type = o.KEY_DOWN, cc.systemEvent.dispatchEvent(e)
                            },
                            onKeyReleased: function(t, e) {
                                e.type = o.KEY_UP, cc.systemEvent.dispatchEvent(e)
                            }
                        })), !s.hasEventListener(cc._EventListenerKeyboard.LISTENER_ID))) {
                        var r = cc.director.getTotalFrames();
                        r !== h && (s.addListener(c, 1), h = r)
                    }
                    t === o.DEVICEMOTION && (a || (a = cc.EventListener.create({
                        event: cc.EventListener.ACCELERATION,
                        callback: function(t, e) {
                            e.type = o.DEVICEMOTION, cc.systemEvent.dispatchEvent(e)
                        }
                    })), s.hasEventListener(cc._EventListenerAcceleration.LISTENER_ID) || s.addListener(a, 1))
                },
                off: function(t, e, i, n) {
                    if (this._super(t, e, i, n), c && (t === o.KEY_DOWN || t === o.KEY_UP)) {
                        var r = this.hasEventListener(o.KEY_DOWN),
                            h = this.hasEventListener(o.KEY_UP);
                        r || h || s.removeListener(c)
                    }
                    a && t === o.DEVICEMOTION && s.removeListener(a)
                }
            });
        cc.SystemEvent = e.exports = l, cc.systemEvent = new cc.SystemEvent
    }), {
        "../event-manager": 52,
        "../event/event-target": 54,
        "../platform/CCInputManager": 83
    }],
    58: [(function(t, e, i) {
        t("./platform"), t("./assets"), t("./CCNode"), t("./CCScene"), t("./components"), t("./graphics"), t("./collider"), t("./collider/CCIntersection"), t("./physics"), t("./camera/CCCamera"), t("./base-ui/CCWidgetManager")
    }), {
        "./CCNode": 16,
        "./CCScene": 17,
        "./assets": 30,
        "./base-ui/CCWidgetManager": 35,
        "./camera/CCCamera": 1,
        "./collider": 1,
        "./collider/CCIntersection": 1,
        "./components": 46,
        "./graphics": 1,
        "./physics": 1,
        "./platform": 97
    }],
    59: [(function(t, e, i) {
        function n(t) {
            var e, i, n;
            if ("object" == typeof t) {
                if (i = t, t.url) return i;
                e = t.uuid
            } else i = {}, e = t;
            return n = i.type ? "uuid" === i.type : cc.AssetLibrary._getAssetUrl(e), cc.AssetLibrary._getAssetInfoInRuntime(e, g), i.url = n ? g.url : e, g.url && "uuid" === i.type && g.raw ? (i.type = null, i.isRawAsset = !0) : n || (i.isRawAsset = !0), i
        }

        function r() {
            var t = new a,
                e = new h,
                i = new l;
            o.call(this, [t, e, i]), this.assetLoader = t, this.downloader = e, this.loader = i, this.onProgress = null, this._autoReleaseSetting = {}
        }
        var s = t("../platform/js"),
            o = t("./pipeline"),
            c = t("./loading-items"),
            a = t("./asset-loader"),
            h = t("./downloader"),
            l = t("./loader"),
            u = t("./asset-table"),
            _ = t("../platform/utils").callInNextTick,
            d = t("./auto-release-utils"),
            f = new u,
            p = ["mp3", "ogg", "wav", "m4a"],
            g = {
                url: null,
                raw: !1
            },
            m = [],
            v = [];
        s.extend(r, o);
        var y = r.prototype;
        y.init = function(t) {}, y.getXMLHttpRequest = function() {
            return window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject("MSXML2.XMLHTTP")
        }, y.addDownloadHandlers = function(t) {
            this.downloader.addHandlers(t)
        }, y.addLoadHandlers = function(t) {
            this.loader.addHandlers(t)
        }, y.load = function(t, e, i) {
            void 0 === i && (i = e, e = this.onProgress || null);
            var r = this,
                s = !1;
            t instanceof Array || (s = !0, t = t ? [t] : []), m.length = 0;
            for (var o = 0; o < t.length; ++o) {
                var a = t[o];
                a && a.id && (cc.warnID(4920, a.id), a.uuid || a.url || (a.url = a.id));
                var h = n(a);
                if (h.url || h.uuid) {
                    var l = this._cache[h.url];
                    m.push(l || h)
                }
            }
            var u = c.create(this, e, (function(t, e) {
                _((function() {
                    if (i) {
                        if (s) {
                            var n = h.url;
                            i.call(r, e.getError(n), e.getContent(n))
                        } else i.call(r, t, e);
                        i = null
                    }
                    e.destroy()
                }))
            }));
            c.initQueueDeps(u), u.append(m), m.length = 0
        }, y.flowInDeps = function(t, e, i) {
            v.length = 0;
            for (var r = 0; r < e.length; ++r) {
                var s = n(e[r]);
                if (s.url || s.uuid) {
                    var o = this._cache[s.url];
                    o ? v.push(o) : v.push(s)
                }
            }
            var a = c.create(this, t ? function(t, e, i) {
                this._ownerQueue && this._ownerQueue.onProgress && this._ownerQueue._childOnProgress(i)
            } : null, (function(e, n) {
                i(e, n), t && t.deps && (t.deps.length = 0), n.destroy()
            }));
            if (t) {
                var h = c.getQueue(t);
                a._ownerQueue = h._ownerQueue || h
            }
            var l = a.append(v, t);
            return v.length = 0, l
        }, y._resources = f, y._getResUuid = function(t, e, i) {
            if (!t) return null;
            var n = t.indexOf("?"); - 1 !== n && (t = t.substr(0, n));
            var r = f.getUuid(t, e);
            if (!r) {
                var s = cc.path.extname(t);
                s && (t = t.slice(0, -s.length), (r = f.getUuid(t, e)) && !i && cc.warnID(4901, t, s))
            }
            return r
        }, y._getReferenceKey = function(t) {
            var e;
            return "object" == typeof t ? e = t._uuid || null : "string" == typeof t && (e = this._getResUuid(t, null, !0) || t), e ? (cc.AssetLibrary._getAssetInfoInRuntime(e, g), this._cache[g.url] ? g.url : e) : (cc.warnID(4800, t), e)
        }, y._urlNotFound = function(t, e, i) {
            _((function() {
                t = cc.url.normalize(t);
                var n = (e ? s.getClassName(e) : "Asset") + ' in "resources/' + t + '" does not exist.';
                i && i(new Error(n), [])
            }))
        }, y._parseLoadResArgs = function(t, e, i) {
            if (void 0 === i) {
                var n = cc.isChildClassOf(t, cc.RawAsset);
                e ? (i = e, n && (e = this.onProgress || null)) : void 0 !== e || n || (i = t, e = this.onProgress || null, t = null), void 0 === e || n || (e = t, t = null)
            }
            return {
                type: t,
                onProgress: e,
                onComplete: i
            }
        }, y.loadRes = function(t, e, i, n) {
            var r = this._parseLoadResArgs(e, i, n);
            e = r.type, i = r.onProgress, n = r.onComplete;
            var s = this,
                o = s._getResUuid(t, e);
            o ? this.load({
                type: "uuid",
                uuid: o
            }, i, (function(t, e) {
                e && s.setAutoReleaseRecursively(o, !1), n && n(t, e)
            })) : s._urlNotFound(t, e, n)
        }, y._loadResUuids = function(t, e, i, n) {
            if (t.length > 0) {
                var r = this,
                    s = t.map((function(t) {
                        return {
                            type: "uuid",
                            uuid: t
                        }
                    }));
                this.load(s, e, (function(t, e) {
                    if (i) {
                        for (var o = [], c = n && [], a = 0; a < s.length; ++a) {
                            var h = s[a].uuid,
                                l = this._getReferenceKey(h),
                                u = e.getContent(l);
                            u && (r.setAutoReleaseRecursively(h, !1), o.push(u), c && c.push(n[a]))
                        }
                        n ? i(t, o, c) : i(t, o)
                    }
                }))
            } else i && _((function() {
                n ? i(null, [], []) : i(null, [])
            }))
        }, y.loadResArray = function(t, e, i, n) {
            var r = this._parseLoadResArgs(e, i, n);
            e = r.type, i = r.onProgress, n = r.onComplete;
            for (var s = [], o = 0; o < t.length; o++) {
                var c = t[o],
                    a = this._getResUuid(c, e);
                if (!a) return void this._urlNotFound(c, e, n);
                s.push(a)
            }
            this._loadResUuids(s, i, n)
        }, y.loadResDir = function(t, e, i, n) {
            var r = this._parseLoadResArgs(e, i, n);
            e = r.type, i = r.onProgress, n = r.onComplete;
            var s = [],
                o = f.getUuidArray(t, e, s);
            this._loadResUuids(o, i, n, s)
        }, y.getRes = function(t, e) {
            var i = this._cache[t];
            if (!i) {
                var n = this._getResUuid(t, e, !0);
                if (!n) return null;
                var r = this._getReferenceKey(n);
                i = this._cache[r]
            }
            return i && i.alias && (i = i.alias), i && i.complete ? i.content : null
        }, y.getResCount = function() {
            return Object.keys(this._cache).length
        }, y.getDependsRecursively = function(t) {
            if (t) {
                var e = this._getReferenceKey(t),
                    i = d.getDependsRecursively(e);
                return i.push(e), i
            }
            return []
        }, y.release = function(t) {
            if (Array.isArray(t))
                for (var e = 0; e < t.length; e++) {
                    var i = t[e];
                    this.release(i)
                } else if (t) {
                    var n = this._getReferenceKey(t),
                        r = this.getItem(n);
                    if (r) {
                        this.removeItem(n);
                        if ((t = r.content) instanceof cc.Asset) {
                            0;
                            for (var s = t.rawUrls, o = 0; o < s.length; o++) this.release(s[o])
                        } else t instanceof cc.Texture2D ? cc.textureCache.removeTextureForKey(r.rawUrl || r.url) : -1 !== p.indexOf(r.type) && cc.audioEngine.uncache(r.rawUrl || r.url);
                        0
                    }
                }
        }, y.releaseAsset = function(t) {
            var e = t._uuid;
            e && this.release(e)
        }, y.releaseRes = function(t, e) {
            var i = this._getResUuid(t, e);
            i ? this.release(i) : cc.errorID(4914, t)
        }, y.releaseResDir = function(t, e) {
            for (var i = f.getUuidArray(t, e), n = 0; n < i.length; n++) {
                var r = i[n];
                this.release(r)
            }
        }, y.releaseAll = function() {
            for (var t in this._cache) this.release(t)
        }, y.removeItem = function(t) {
            var e = o.prototype.removeItem.call(this, t);
            return delete this._autoReleaseSetting[t], e
        }, y.setAutoRelease = function(t, e) {
            var i = this._getReferenceKey(t);
            i && (this._autoReleaseSetting[i] = !!e)
        }, y.setAutoReleaseRecursively = function(t, e) {
            e = !!e;
            var i = this._getReferenceKey(t);
            if (i) {
                this._autoReleaseSetting[i] = e;
                for (var n = d.getDependsRecursively(i), r = 0; r < n.length; r++) {
                    var s = n[r];
                    this._autoReleaseSetting[s] = e
                }
            } else 0
        }, y.isAutoRelease = function(t) {
            var e = this._getReferenceKey(t);
            return !!e && !!this._autoReleaseSetting[e]
        }, cc.loader = new r, e.exports = cc.loader
    }), {
        "../platform/js": 100,
        "../platform/utils": 104,
        "./asset-loader": 60,
        "./asset-table": 61,
        "./auto-release-utils": 63,
        "./downloader": 64,
        "./loader": 67,
        "./loading-items": 68,
        "./pipeline": 71,
        "./released-asset-checker": 72
    }],
    60: [(function(t, e, i) {
        var n = t("../utils/CCPath"),
            r = t("./pipeline"),
            s = t("./loading-items"),
            o = function(t) {
                this.id = "AssetLoader", this.async = !0, this.pipeline = null
            };
        o.ID = "AssetLoader";
        var c = [];
        o.prototype.handle = function(t, e) {
            var i = t.uuid;
            if (!i) return t.content ? t.content : null;
            cc.AssetLibrary.queryAssetInfo(i, (function(r, o, a) {
                if (r) e(r);
                else if (t.url = t.rawUrl = o, t.isRawAsset = a, a) {
                    var h = n.extname(o).toLowerCase();
                    if (!h) return void e(new Error("Download Uuid: can not find type of raw asset[" + i + "]: " + o));
                    h = h.substr(1);
                    var l = s.getQueue(t);
                    c[0] = {
                        queueId: t.queueId,
                        id: o,
                        url: o,
                        type: h,
                        error: null,
                        alias: t,
                        complete: !0
                    }, l.append(c), t.type = h, e(null, t.content)
                } else t.type = "uuid", e(null, t.content)
            }))
        }, r.AssetLoader = e.exports = o
    }), {
        "../utils/CCPath": 122,
        "./loading-items": 68,
        "./pipeline": 71
    }],
    61: [(function(t, e, i) {
        function n() {
            this._pathToUuid = {}
        }

        function r(t, e) {
            if (t.length > e.length) {
                var i = t.charCodeAt(e.length);
                return 46 === i || 47 === i
            }
            return !0
        }
        var s = t("../utils/misc").pushToMap,
            o = n.prototype;
        o.getUuid = function(t, e) {
            t = cc.url.normalize(t);
            var i = this._pathToUuid[t];
            if (i)
                if (Array.isArray(i)) {
                    if (!e) return i[0].uuid;
                    for (var n = 0; n < i.length; n++) {
                        var r = i[n];
                        if (cc.isChildClassOf(r.type, e)) return r.uuid
                    }
                } else if (!e || cc.isChildClassOf(i.type, e)) return i.uuid;
            return ""
        }, o.getUuidArray = function(t, e, i) {
            "/" === (t = cc.url.normalize(t))[t.length - 1] && (t = t.slice(0, -1));
            var n = this._pathToUuid,
                s = [],
                o = cc.isChildClassOf;
            for (var c in n)
                if (c.startsWith(t) && r(c, t) || !t) {
                    var a = n[c];
                    if (Array.isArray(a))
                        for (var h = 0; h < a.length; h++) {
                            var l = a[h];
                            e && !o(l.type, e) || (s.push(l.uuid), i && i.push(c))
                        } else e && !o(a.type, e) || (s.push(a.uuid), i && i.push(c))
                }
            return s
        }, o.add = function(t, e, i, n) {
            t = t.substring(0, t.length - cc.path.extname(t).length);
            var r = new function(t, e) {
                this.uuid = t, this.type = e
            }(e, i);
            s(this._pathToUuid, t, r, n)
        }, o._getInfo_DEBUG = !1, o.reset = function() {
            this._pathToUuid = {}
        }, e.exports = n
    }), {
        "../utils/misc": 128
    }],
    62: [(function(t, e, i) {
        t("../utils/CCPath");
        var n = t("../platform/CCSys"),
            r = (t("./pipeline"), t("../../audio/CCAudioEngine"), n.__audioSupport),
            s = r.format,
            o = r.context;
        e.exports = function(t, e) {
            if (0 === s.length) return new Error("Audio Downloader: audio not supported on this browser!");
            t.content = t.url, !r.WEB_AUDIO || t.urlParam && t.urlParam.useDom ? (function(t, e) {
                var i = document.createElement("audio");
                if (i.src = t.url, n.platform === n.WECHAT_GAME) return t.element = i, void e(null, t.id);
                var s = function() {
                        clearTimeout(o), i.removeEventListener("canplaythrough", c, !1), i.removeEventListener("error", a, !1), r.USE_LOADER_EVENT && i.removeEventListener(r.USE_LOADER_EVENT, c, !1)
                    },
                    o = setTimeout((function() {
                        0 === i.readyState ? a() : c()
                    }), 8e3),
                    c = function() {
                        s(), t.element = i, e(null, t.url)
                    },
                    a = function() {
                        s();
                        var i = "load audio failure - " + t.url;
                        cc.log(i), e(i, t.url)
                    };
                i.addEventListener("canplaythrough", c, !1), i.addEventListener("error", a, !1), r.USE_LOADER_EVENT && i.addEventListener(r.USE_LOADER_EVENT, c, !1)
            })(t, e) : (function(t, e) {
                o || e(new Error("Audio Downloader: no web audio context."));
                var i = cc.loader.getXMLHttpRequest();
                i.open("GET", t.url, !0), i.responseType = "arraybuffer", i.onload = function() {
                    o.decodeAudioData(i.response, (function(i) {
                        t.buffer = i, e(null, t.id)
                    }), (function() {
                        e("decode error - " + t.id, null)
                    }))
                }, i.onerror = function() {
                    e("request error - " + t.id, null)
                }, i.send()
            })(t, e)
        }
    }), {
        "../../audio/CCAudioEngine": 1,
        "../platform/CCSys": 88,
        "../utils/CCPath": 122,
        "./pipeline": 71
    }],
    63: [(function(t, e, i) {
        function n(t, e) {
            var i = cc.loader.getItem(t);
            if (i) {
                var r = i.dependKeys;
                if (r)
                    for (var s = 0; s < r.length; s++) {
                        var o = r[s];
                        e[o] || (e[o] = !0, n(o, e))
                    }
            }
        }

        function r(t, e) {
            var i = cc.loader._getReferenceKey(t);
            e[i] || (e[i] = !0, n(i, e))
        }

        function s(t, e) {
            for (var i = Object.getOwnPropertyNames(t), n = 0; n < i.length; n++) {
                var s = t[i[n]];
                if ("object" == typeof s && s)
                    if (Array.isArray(s))
                        for (var o = 0; o < s.length; o++) {
                            var c = s[o];
                            c instanceof cc.RawAsset && r(c, e)
                        } else if (s.constructor && s.constructor !== Object) s instanceof cc.RawAsset && r(s, e);
                        else
                            for (var a = Object.getOwnPropertyNames(s), h = 0; h < a.length; h++) {
                                var l = s[a[h]];
                                l instanceof cc.RawAsset && r(l, e)
                            }
            }
        }

        function o(t, e) {
            for (var i = 0; i < t._components.length; i++) s(t._components[i], e);
            for (var n = 0; n < t._children.length; n++) o(t._children[n], e)
        }
        var c = t("../platform/js");
        e.exports = {
            autoRelease: function(t, e, i) {
                var n = cc.loader._autoReleaseSetting,
                    r = c.createMap();
                if (e)
                    for (var s = 0; s < e.length; s++) r[e[s]] = !0;
                for (var a = 0; a < i.length; a++) o(i[a], r);
                if (t)
                    for (var h = 0; h < t.length; h++) {
                        var l = t[h];
                        !1 === n[l] || r[l] || cc.loader.release(l)
                    }
                for (var u = Object.keys(n), _ = 0; _ < u.length; _++) {
                    var d = u[_];
                    !0 !== n[d] || r[d] || cc.loader.release(d)
                }
            },
            getDependsRecursively: function(t) {
                var e = {};
                return n(t, e), Object.keys(e)
            }
        }
    }), {
        "../platform/js": 100
    }],
    64: [(function(t, e, i) {
        function n(t, e, i, r) {
            void 0 === i && (i = !0);
            var s = f(t.url);
            if (r = r || l.imagePool.get(), i && "file:" !== window.location.protocol ? r.crossOrigin = "anonymous" : r.crossOrigin = null, r.complete && r.naturalWidth > 0 && r.src === s) return r;
            (function() {
                function i() {
                    r.removeEventListener("load", i), r.removeEventListener("error", o), e(null, r)
                }

                function o() {
                    r.removeEventListener("load", i), r.removeEventListener("error", o), "https:" !== window.location.protocol && r.crossOrigin && "anonymous" === r.crossOrigin.toLowerCase() ? n(t, e, !1, r) : e(new Error("Load image (" + s + ") failed"))
                }
                r.addEventListener("load", i), r.addEventListener("error", o), r.src = s
            })()
        }

        function r(t, e, i) {
            var n = document,
                r = document.createElement("style");
            r.type = "text/css", n.body.appendChild(r);
            var s = "";
            if (isNaN(t - 0) ? s += "@font-face { font-family:" + t + "; src:" : s += "@font-face { font-family:'" + t + "'; src:", e instanceof Array)
                for (var o = 0, c = e.length; o < c; o++) {
                    var a = e[o];
                    i = h.extname(a).toLowerCase(), s += "url('" + e[o] + "') format('" + p[i] + "')", s += o === c - 1 ? ";" : ","
                } else i = i.toLowerCase(), s += "url('" + e + "') format('" + p[i] + "');";
            r.textContent += s + "}";
            var l = document.createElement("div"),
                u = l.style;
            u.fontFamily = t, l.innerHTML = ".", u.position = "absolute", u.left = "-100px", u.top = "-100px", n.body.appendChild(l)
        }

        function s(t, e) {
            var i = t.url,
                n = t.type,
                s = t.name,
                o = t.srcs;
            if (s && o ? (-1 === o.indexOf(i) && o.push(i), r(s, o)) : (n = h.extname(i), r(s = h.basename(i, n), i, n)), !document.fonts) return null;
            document.fonts.load("1em " + s).then((function() {
                e(null, null)
            }), (function(t) {
                e(t)
            }))
        }
        var o, c = t("../platform/js"),
            a = t("../platform/CCSys"),
            h = t("../utils/CCPath"),
            l = t("../utils/misc"),
            u = t("./pipeline"),
            _ = t("./pack-downloader"),
            d = t("./text-downloader"),
            f = t("./utils").urlAppendTimestamp,
            p = {
                ".eot": "embedded-opentype",
                ".ttf": "truetype",
                ".ttc": "truetype",
                ".woff": "woff",
                ".svg": "svg"
            },
            g = {
                js: function(e, i, n) {
                    function r() {
                        h.parentNode.removeChild(h), h.removeEventListener("load", r, !1), h.removeEventListener("error", s, !1), i(null, o)
                    }

                    function s() {
                        h.parentNode.removeChild(h), h.removeEventListener("load", r, !1), h.removeEventListener("error", s, !1), i(new Error("Load " + o + " failed!"), o)
                    }
                    if (a.platform === a.WECHAT_GAME) return t(e.url), void i(null, e.url);
                    var o = e.url,
                        c = document,
                        h = document.createElement("script");
                    h.async = n, h.src = f(o), h.addEventListener("load", r, !1), h.addEventListener("error", s, !1), c.body.appendChild(h)
                },
                png: n,
                jpg: n,
                bmp: n,
                jpeg: n,
                gif: n,
                ico: n,
                tiff: n,
                webp: function(t, e, i, r) {
                    return cc.sys.capabilities.webp ? n(t, e, i, r) : new Error("Load Webp ( " + t.url + " ) failed")
                },
                image: n,
                mp3: o = t("./audio-downloader"),
                ogg: o,
                wav: o,
                m4a: o,
                txt: d,
                xml: d,
                vsh: d,
                fsh: d,
                atlas: d,
                tmx: d,
                tsx: d,
                json: d,
                ExportJson: d,
                plist: d,
                fnt: d,
                font: s,
                eot: s,
                ttf: s,
                woff: s,
                svg: s,
                ttc: s,
                uuid: function(t, e) {
                    var i = _.load(t, e);
                    return void 0 === i ? this.extMap.json(t, e) : i || void 0
                },
                default: d
            },
            m = function(t) {
                this.id = "Downloader", this.async = !0, this.pipeline = null, this._curConcurrent = 0, this._loadQueue = [], this.extMap = c.mixin(t, g)
            };
        m.ID = "Downloader", m.PackDownloader = _, m.prototype.addHandlers = function(t) {
            c.mixin(this.extMap, t)
        }, m.prototype._handleLoadQueue = function() {
            for (; this._curConcurrent < cc.macro.DOWNLOAD_MAX_CONCURRENT;) {
                var t = this._loadQueue.shift();
                if (!t) break;
                var e = this.handle(t.item, t.callback);
                void 0 !== e && (e instanceof Error ? t.callback(e) : t.callback(null, e))
            }
        }, m.prototype.handle = function(t, e) {
            var i = this,
                n = this.extMap[t.type] || this.extMap.default,
                r = void 0;
            if (this._curConcurrent < cc.macro.DOWNLOAD_MAX_CONCURRENT) {
                if (this._curConcurrent++, void 0 !== (r = n.call(this, t, (function(t, n) {
                        i._curConcurrent = Math.max(0, i._curConcurrent - 1), i._handleLoadQueue(), e && e(t, n)
                    })))) return this._curConcurrent = Math.max(0, this._curConcurrent - 1), this._handleLoadQueue(), r
            } else if (t.ignoreMaxConcurrency) {
                if (void 0 !== (r = n.call(this, t, e))) return r
            } else this._loadQueue.push({
                item: t,
                callback: e
            })
        }, u.Downloader = e.exports = m
    }), {
        "../platform/CCSys": 88,
        "../platform/js": 100,
        "../utils/CCPath": 122,
        "../utils/misc": 128,
        "./audio-downloader": 62,
        "./pack-downloader": 70,
        "./pipeline": 71,
        "./text-downloader": 73,
        "./utils": 74
    }],
    65: [(function(t, e, i) {
        t("./downloader"), t("./loader"), t("./json-unpacker"), t("./loading-items"), t("./pipeline"), t("./CCLoader")
    }), {
        "./CCLoader": 59,
        "./downloader": 64,
        "./json-unpacker": 66,
        "./loader": 67,
        "./loading-items": 68,
        "./pipeline": 71
    }],
    66: [(function(t, e, i) {
        function n() {
            this.jsons = {}, this.state = -1
        }
        n.prototype.read = function(t, e) {
            var i = "string" == typeof e ? JSON.parse(e) : e;
            i.length !== t.length && cc.errorID(4915);
            for (var n = 0; n < t.length; n++) {
                var r = t[n],
                    s = i[n];
                this.jsons[r] = s
            }
        }, n.prototype.retrieve = function(t) {
            return this.jsons[t] || null
        }, e.exports = n
    }), {}],
    67: [(function(t, e, i) {
        function n(t, e) {
            if ("string" != typeof t.content) return new Error("JSON Loader: Input item doesn't contain string content");
            try {
                return JSON.parse(t.content)
            } catch (e) {
                return new Error("JSON Loader: Parse json [" + t.id + "] failed : " + e)
            }
        }

        function r(t, e) {
            if (o.platform !== o.WECHAT_GAME && o.platform !== o.QQ_PLAY && !(t.content instanceof Image)) return new Error("Image Loader: Input item doesn't contain Image content");
            var i = t.rawUrl,
                n = cc.textureCache.getTextureForKey(i) || new a;
            return n.url = i, n.initWithElement(t.content), n.handleLoadedTexture(), cc.textureCache.cacheImage(i, n), n
        }
        var s = t("../platform/js"),
            o = t("../platform/CCSys"),
            c = t("./pipeline"),
            a = t("../textures/CCTexture2D"),
            h = t("./uuid-loader"),
            l = (t("../utils/misc"), {
                png: r,
                jpg: r,
                bmp: r,
                jpeg: r,
                gif: r,
                ico: r,
                tiff: r,
                webp: r,
                image: r,
                json: n,
                ExportJson: n,
                plist: function(t, e) {
                    if ("string" != typeof t.content) return new Error("Plist Loader: Input item doesn't contain string content");
                    var i = cc.plistParser.parse(t.content);
                    return i || new Error("Plist Loader: Parse [" + t.id + "] failed")
                },
                uuid: h,
                prefab: h,
                fire: h,
                scene: h,
                default: function(t, e) {
                    return null
                }
            }),
            u = function(t) {
                this.id = "Loader", this.async = !0, this.pipeline = null, this.extMap = s.mixin(t, l)
            };
        u.ID = "Loader", u.prototype.addHandlers = function(t) {
            this.extMap = s.mixin(this.extMap, t)
        }, u.prototype.handle = function(t, e) {
            return (this.extMap[t.type] || this.extMap.default).call(this, t, e)
        }, c.Loader = e.exports = u
    }), {
        "../platform/CCSys": 88,
        "../platform/js": 100,
        "../textures/CCTexture2D": 119,
        "../utils/misc": 128,
        "./pipeline": 71,
        "./uuid-loader": 75
    }],
    68: [(function(t, e, i) {
        function n(t) {
            return "string" == typeof(t.url || t)
        }

        function r(t, e) {
            var i = "object" == typeof t ? t.url : t,
                n = {
                    queueId: e,
                    id: i,
                    url: i,
                    rawUrl: void 0,
                    urlParam: (function(t) {
                        if (t) {
                            var e = t.split("?");
                            if (e && e[0] && e[1]) {
                                var i = {};
                                return e[1].split("&").forEach((function(t) {
                                    var e = t.split("=");
                                    i[e[0]] = e[1]
                                })), i
                            }
                        }
                    })(i),
                    type: "",
                    error: null,
                    content: null,
                    complete: !1,
                    states: {},
                    deps: null
                };
            if ("object" == typeof t && (a.mixin(n, t), t.skips))
                for (var r = 0; r < t.skips.length; r++) {
                    var s = t.skips[r];
                    n.states[s] = _.COMPLETE
                }
            return n.rawUrl = n.url, i && !n.type && (n.type = c.extname(i).toLowerCase().substr(1)), n
        }

        function s(t, e, i) {
            if (!t || !e) return !1;
            var n = !1;
            if (f.push(e.id), e.deps) {
                var r, o, c = e.deps;
                for (r = 0; r < c.length; r++) {
                    if ((o = c[r]).id === t.id) {
                        n = !0;
                        break
                    }
                    if (!(f.indexOf(o.id) >= 0) && (o.deps && s(t, o, !0))) {
                        n = !0;
                        break
                    }
                }
            }
            return i || (f.length = 0), n
        }
        var o = t("../platform/callbacks-invoker"),
            c = t("../utils/CCPath"),
            a = t("../platform/js"),
            h = 0 | 998 * Math.random(),
            l = {},
            u = [],
            _ = {
                WORKING: 1,
                COMPLETE: 2,
                ERROR: 3
            },
            d = {},
            f = [],
            p = function(t, e, i, n) {
                o.call(this), this._id = ++h, l[this._id] = this, this._pipeline = t, this._errorUrls = [], this._appending = !1, this._ownerQueue = null, this.onProgress = i, this.onComplete = n, this.map = {}, this.completed = {}, this.totalCount = 0, this.completedCount = 0, this._pipeline ? this.active = !0 : this.active = !1, e && (e.length > 0 ? this.append(e) : this.allComplete())
            };
        p.ItemState = new cc.Enum(_), p.create = function(t, e, i, n) {
            void 0 === i ? "function" == typeof e && (n = e, e = i = null) : void 0 === n && ("function" == typeof e ? (n = i, i = e, e = null) : (n = i, i = null));
            var r = u.pop();
            return r ? (r._pipeline = t, r.onProgress = i, r.onComplete = n, l[r._id] = r, r._pipeline && (r.active = !0), e && r.append(e)) : r = new p(t, e, i, n), r
        }, p.getQueue = function(t) {
            return t.queueId ? l[t.queueId] : null
        }, p.itemComplete = function(t) {
            var e = l[t.queueId];
            e && e.itemComplete(t.id)
        }, p.initQueueDeps = function(t) {
            var e = d[t._id];
            e ? (e.completed.length = 0, e.deps.length = 0) : e = d[t._id] = {
                completed: [],
                deps: []
            }
        }, p.registerQueueDep = function(t, e) {
            var i = t.queueId || t;
            if (!i) return !1;
            var n = d[i];
            if (n) - 1 === n.deps.indexOf(e) && n.deps.push(e);
            else if (t.id)
                for (var r in d) {
                    var s = d[r]; - 1 !== s.deps.indexOf(t.id) && -1 === s.deps.indexOf(e) && s.deps.push(e)
                }
        }, p.finishDep = function(t) {
            for (var e in d) {
                var i = d[e]; - 1 !== i.deps.indexOf(t) && -1 === i.completed.indexOf(t) && i.completed.push(t)
            }
        };
        var g = p.prototype;
        a.mixin(g, o.prototype), g.append = function(t, e) {
            if (!this.active) return [];
            e && !e.deps && (e.deps = []), this._appending = !0;
            var i, o, c, a = [];
            for (i = 0; i < t.length; ++i)
                if (!(o = t[i]).queueId || this.map[o.id]) {
                    if (n(o)) {
                        var h = (c = r(o, this._id)).id;
                        this.map[h] || (this.map[h] = c, this.totalCount++, e && e.deps.push(c), p.registerQueueDep(e || this._id, h), a.push(c))
                    }
                } else {
                    if (this.map[o.id] = o, e && e.deps.push(o), o.complete || s(e, o)) {
                        this.totalCount++, this.itemComplete(o.id);
                        continue
                    }
                    var u = this,
                        _ = l[o.queueId];
                    _ && (this.totalCount++, p.registerQueueDep(e || this._id, o.id), _.addListener(o.id, (function(t) {
                        u.itemComplete(t.id)
                    })))
                }
            return this._appending = !1, this.completedCount === this.totalCount ? this.allComplete() : this._pipeline.flowIn(a), a
        }, g._childOnProgress = function(t) {
            if (this.onProgress) {
                var e = d[this._id];
                this.onProgress(e ? e.completed.length : this.completedCount, e ? e.deps.length : this.totalCount, t)
            }
        }, g.allComplete = function() {
            var t = 0 === this._errorUrls.length ? null : this._errorUrls;
            this.onComplete && this.onComplete(t, this)
        }, g.isCompleted = function() {
            return this.completedCount >= this.totalCount
        }, g.isItemCompleted = function(t) {
            return !!this.completed[t]
        }, g.exists = function(t) {
            return !!this.map[t]
        }, g.getContent = function(t) {
            var e = this.map[t],
                i = null;
            return e && (e.content ? i = e.content : e.alias && (i = e.alias.content)), i
        }, g.getError = function(t) {
            var e = this.map[t],
                i = null;
            return e && (e.error ? i = e.error : e.alias && (i = e.alias.error)), i
        }, g.addListener = o.prototype.add, g.hasListener = o.prototype.has, g.removeListener = o.prototype.remove, g.removeAllListeners = o.prototype.removeAll, g.removeItem = function(t) {
            var e = this.map[t];
            e && this.completed[e.alias || t] && (delete this.completed[t], delete this.map[t], e.alias && (delete this.completed[e.alias.id], delete this.map[e.alias.id]), this.completedCount--, this.totalCount--)
        }, g.itemComplete = function(t) {
            var e = this.map[t];
            if (e) {
                var i = this._errorUrls.indexOf(t);
                if (e.error && -1 === i ? this._errorUrls.push(t) : e.error || -1 === i || this._errorUrls.splice(i, 1), this.completed[t] = e, this.completedCount++, p.finishDep(e.id), this.onProgress) {
                    var n = d[this._id];
                    this.onProgress(n ? n.completed.length : this.completedCount, n ? n.deps.length : this.totalCount, e)
                }
                this.invoke(t, e), this.removeAll(t), !this._appending && this.completedCount >= this.totalCount && this.allComplete()
            }
        }, g.destroy = function() {
            this.active = !1, this._appending = !1, this._pipeline = null, this._ownerQueue = null, this._errorUrls.length = 0, this.onProgress = null, this.onComplete = null, this.map = {}, this.completed = {}, this.totalCount = 0, this.completedCount = 0, o.call(this), l[this._id] = null, d[this._id] && (d[this._id].completed.length = 0, d[this._id].deps.length = 0), -1 === u.indexOf(this) && u.length < 10 && u.push(this)
        }, cc.LoadingItems = e.exports = p
    }), {
        "../platform/callbacks-invoker": 93,
        "../platform/js": 100,
        "../utils/CCPath": 122
    }],
    69: [(function(t, e, i) {
        var n = t("./pipeline"),
            r = /(\.[^.\n\\/]*)$/,
            s = function(t, e, i) {
                this.id = "MD5Pipe", this.async = !1, this.pipeline = null, this.md5AssetsMap = t, this.libraryBase = e, this.rawAssetsBase = i
            };
        s.ID = "MD5Pipe", s.prototype.handle = function(t) {
            return t.url = this.transformURL(t.url), t
        }, s.prototype.transformURL = function(t) {
            var e = t.indexOf("?"),
                i = t;
            if (-1 !== e && (i = t.substr(0, e)), i.startsWith(this.libraryBase)) i = i.slice(this.libraryBase.length);
            else {
                if (!i.startsWith(this.rawAssetsBase)) return t;
                i = i.slice(this.rawAssetsBase.length)
            }
            var n = this.md5AssetsMap[i];
            if (n) {
                var s = !1;
                t = t.replace(r, (function(t, e) {
                    return s = !0, "." + n + e
                })), s || (t = t + "." + n)
            }
            return t
        }, n.MD5Pipe = e.exports = s
    }), {
        "./pipeline": 71
    }],
    70: [(function(t, e, i) {
        function n(t, e) {
            return new Error("Can not retrieve " + t + " from packer " + e)
        }
        var r = t("./json-unpacker"),
            s = t("../utils/misc").pushToMap,
            o = {},
            c = {},
            a = {},
            h = 0,
            l = 2,
            u = 3;
        e.exports = {
            initPacks: function(t) {
                c = t;
                for (var e in t)
                    for (var i = t[e], n = 0; n < i.length; n++) {
                        var r = i[n],
                            a = 1 === i.length;
                        s(o, r, e, a)
                    }
            },
            _loadNewPack: function(t, e, i) {
                var r = this,
                    s = cc.AssetLibrary.getLibUrlNoExt(e) + ".json";
                cc.loader.load({
                    url: s,
                    ignoreMaxConcurrency: !0
                }, (function(s, o) {
                    if (s) return cc.errorID(4916, t), i(s);
                    var c = r._doLoadNewPack(t, e, o);
                    c ? i(null, c) : i(n(t, e))
                }))
            },
            _doPreload: function(t, e) {
                var i = a[t];
                i || (i = a[t] = new r), i.state !== u && (i.read(c[t], e), i.state = u)
            },
            _doLoadNewPack: function(t, e, i) {
                var n = a[e];
                return n.state !== u && (n.read(c[e], i), n.state = u), n.retrieve(t)
            },
            _selectLoadedPack: function(t) {
                for (var e = h, i = "", n = 0; n < t.length; n++) {
                    var r = t[n],
                        s = a[r];
                    if (s) {
                        var o = s.state;
                        if (o === u) return r;
                        o > e && (e = o, i = r)
                    }
                }
                return e !== h ? i : t[0]
            },
            load: function(t, e) {
                var i = t.uuid,
                    s = o[i];
                if (s) {
                    Array.isArray(s) && (s = this._selectLoadedPack(s));
                    var c = a[s];
                    if (c && c.state === u) {
                        var h = c.retrieve(i);
                        return h || n(i, s)
                    }
                    return c || (console.log("Create unpacker %s for %s", s, i), (c = a[s] = new r).state = l), this._loadNewPack(i, s, e), null
                }
            }
        }
    }), {
        "../utils/misc": 128,
        "./json-unpacker": 66
    }],
    71: [(function(t, e, i) {
        function n(t, e) {
            var i = t.id,
                r = e.states[i],
                o = t.next,
                c = t.pipeline;
            if (!e.error && r !== s.WORKING && r !== s.ERROR)
                if (r === s.COMPLETE) o ? n(o, e) : c.flowOut(e);
                else {
                    e.states[i] = s.WORKING;
                    var a = t.handle(e, (function(t, r) {
                        t ? (e.error = t, e.states[i] = s.ERROR, c.flowOut(e)) : (r && (e.content = r), e.states[i] = s.COMPLETE, o ? n(o, e) : c.flowOut(e))
                    }));
                    a instanceof Error ? (e.error = a, e.states[i] = s.ERROR, c.flowOut(e)) : void 0 !== a && (null !== a && (e.content = a), e.states[i] = s.COMPLETE, o ? n(o, e) : c.flowOut(e))
                }
        }
        t("../platform/js");
        var r = t("./loading-items"),
            s = r.ItemState,
            o = function(t) {
                this._pipes = t, this._cache = {};
                for (var e = 0; e < t.length; ++e) {
                    var i = t[e];
                    i.handle && i.id && (i.pipeline = this, i.next = e < t.length - 1 ? t[e + 1] : null)
                }
            };
        o.ItemState = s;
        var c = o.prototype;
        c.insertPipe = function(t, e) {
            if (!t.handle || !t.id || e > this._pipes.length) cc.warnID(4921);
            else if (this._pipes.indexOf(t) > 0) cc.warnID(4922);
            else {
                t.pipeline = this;
                var i = null;
                e < this._pipes.length && (i = this._pipes[e]);
                var n = null;
                e > 0 && (n = this._pipes[e - 1]), n && (n.next = t), t.next = i, this._pipes.splice(e, 0, t)
            }
        }, c.insertPipeAfter = function(t, e) {
            var i = this._pipes.indexOf(t);
            i < 0 || this.insertPipe(e, i + 1)
        }, c.appendPipe = function(t) {
            t.handle && t.id && (t.pipeline = this, t.next = null, this._pipes.length > 0 && (this._pipes[this._pipes.length - 1].next = t), this._pipes.push(t))
        }, c.flowIn = function(t) {
            var e, i, r = this._pipes[0];
            if (r) {
                for (e = 0; e < t.length; e++) i = t[e], this._cache[i.id] = i;
                for (e = 0; e < t.length; e++) n(r, i = t[e])
            } else
                for (e = 0; e < t.length; e++) this.flowOut(t[e])
        }, c.flowInDeps = function(t, e, i) {
            return r.create(this, (function(t, e) {
                i(t, e), e.destroy()
            })).append(e, t)
        }, c.flowOut = function(t) {
            t.error ? delete this._cache[t.id] : this._cache[t.id] || (this._cache[t.id] = t), t.complete = !0, r.itemComplete(t)
        }, c.copyItemStates = function(t, e) {
            if (e instanceof Array)
                for (var i = 0; i < e.length; ++i) e[i].states = t.states;
            else e.states = t.states
        }, c.isFlowing = function() {
            return !0
        }, c.getItems = function() {
            return null
        }, c.getItem = function(t) {
            var e = this._cache[t];
            return e ? (e.alias && (e = e.alias), e) : e
        }, c.removeItem = function(t) {
            var e = this._cache[t];
            return e && e.complete && delete this._cache[t], e
        }, c.clear = function() {
            for (var t in this._cache) {
                var e = this._cache[t];
                delete this._cache[t], e.complete || (e.error = new Error("Canceled manually"), this.flowOut(e))
            }
        }, cc.Pipeline = e.exports = o
    }), {
        "../platform/js": 100,
        "./loading-items": 68
    }],
    72: [(function(t, e, i) {}), {
        "../platform/js": 100
    }],
    73: [(function(t, e, i) {
        t("../platform/CCSys");
        var n = t("./utils").urlAppendTimestamp;
        e.exports = function(t, e) {
            var i = t.url;
            i = n(i);
            var r = cc.loader.getXMLHttpRequest(),
                s = "Load " + i + " failed!",
                o = window.navigator;
            r.open("GET", i, !0), /msie/i.test(o.userAgent) && !/opera/i.test(o.userAgent) ? (r.setRequestHeader("Accept-Charset", "utf-8"), r.onreadystatechange = function() {
                4 === r.readyState && (200 === r.status || 0 === r.status ? e(null, r.responseText) : e({
                    status: r.status,
                    errorMessage: s
                }))
            }) : (r.overrideMimeType && r.overrideMimeType("text/plain; charset=utf-8"), r.onload = function() {
                4 === r.readyState && (200 === r.status || 0 === r.status ? e(null, r.responseText) : e({
                    status: r.status,
                    errorMessage: s
                }))
            }, r.onerror = function() {
                e({
                    status: r.status,
                    errorMessage: s
                })
            }), r.send(null)
        }
    }), {
        "../platform/CCSys": 88,
        "./utils": 74
    }],
    74: [(function(t, e, i) {
        var n = /\?/;
        e.exports = {
            urlAppendTimestamp: function(t) {
                return cc.game.config.noCache && "string" == typeof t && (n.test(t) ? t += "&_t=" + (new Date - 0) : t += "?_t=" + (new Date - 0)), t
            }
        }
    }), {}],
    75: [(function(t, e, i) {
        function n(t) {
            return t && (t[0] && "cc.Scene" === t[0].__type__ || t[1] && "cc.Scene" === t[1].__type__ || t[0] && "cc.Prefab" === t[0].__type__)
        }

        function r(t, e) {
            var i;
            if ("string" == typeof t.content) try {
                i = JSON.parse(t.content)
            } catch (e) {
                return new Error("Uuid Loader: Parse asset [" + t.id + "] failed : " + e.stack)
            } else {
                if ("object" != typeof t.content) return new Error("JSON Loader: Input item doesn't contain string content");
                i = t.content
            }
            var r, c = n(i);
            r = c ? cc._MissingScript.safeFindClass : function(t) {
                var e = s._getClassById(t);
                return e || (cc.warnID(4903, t), Object)
            };
            var a, h = cc.deserialize.Details.pool.get();
            try {
                a = cc.deserialize(i, h, {
                    classFinder: r,
                    target: t.existingAsset,
                    customEnv: t
                })
            } catch (e) {
                cc.deserialize.Details.pool.put(h);
                var l = e.stack;
                return new Error("Uuid Loader: Deserialize asset [" + t.id + "] failed : " + l)
            }
            a._uuid = t.uuid;
            var u = (function(t, e, i) {
                var n = e.deferredLoadRaw;
                return n ? t instanceof cc.Asset && t.constructor.preventDeferredLoadDependents && (n = !1) : i && (t instanceof cc.SceneAsset || t instanceof cc.Prefab) && (n = t.asyncLoadAssets), n
            })(a, t, c);
            (function(t, e, i, n, r, s) {
                var c, a, h, l, u, _ = n.uuidList,
                    d = e.dependKeys = [];
                if (r)
                    for (c = [], a = [], h = [], l = 0; l < _.length; l++) {
                        u = _[l];
                        var f = n.uuidObjList[l],
                            p = n.uuidPropList[l],
                            g = cc.AssetLibrary._getAssetInfoInRuntime(u);
                        if (g.raw) {
                            var m = g.url;
                            f[p] = m, d.push(m)
                        } else c.push(f), a.push(p), h.push({
                            type: "uuid",
                            uuid: u,
                            deferredLoadRaw: !0
                        })
                    } else
                        for (c = n.uuidObjList, a = n.uuidPropList, h = new Array(_.length), l = 0; l < _.length; l++) u = _[l], h[l] = {
                            type: "uuid",
                            uuid: u
                        };
                if (n.rawProp && (c.push(i), a.push(n.rawProp), h.push(e.url)), i._preloadRawFiles) {
                    var v = s;
                    s = function() {
                        i._preloadRawFiles((function(t) {
                            v(t || null, i)
                        }))
                    }
                }
                if (0 === h.length) return cc.deserialize.Details.pool.put(n), s(null, i);
                e.content = i, t.flowInDeps(e, h, (function(t, e) {
                    var r;
                    for (var l in e.map)(r = e.map[l]).uuid && r.content && (r.content._uuid = r.uuid);
                    for (var u = 0; u < h.length; u++) {
                        var _ = h[u].uuid,
                            f = h[u].url,
                            p = c[u],
                            g = a[u];
                        if (r = e.map[f]) {
                            var m = {
                                obj: p,
                                prop: g
                            };

                            function v(t) {
                                var e = t.isRawAsset ? t.rawUrl : t.content;
                                this.obj[this.prop] = e, t.uuid !== i._uuid && d.indexOf(t.id) < 0 && d.push(t.id)
                            }
                            if (r.complete || r.content) r.error ? cc._throw(r.error) : v.call(m, r);
                            else {
                                var y = o.getQueue(r),
                                    C = y._callbackTable[_];
                                C ? C.unshift(v, m) : y.addListener(_, v, m)
                            }
                        }
                    }
                    cc.deserialize.Details.pool.put(n), s(null, i)
                }))
            })(this.pipeline, t, a, h, u, e)
        }
        var s = t("../platform/js");
        t("../platform/deserialize");
        var o = t("./loading-items");
        e.exports = r, r.isSceneObj = n
    }), {
        "../platform/deserialize": 95,
        "../platform/js": 100,
        "./loading-items": 68
    }],
    76: [(function(t, e, i) {
        function n(t, e, i) {
            e ? t._removeComponent(e) : c.array.removeAt(t._components, i)
        }

        function r() {
            this._activatingStack = []
        }
        var s = t("./component-scheduler"),
            o = t("./platform/CCObject").Flags,
            c = t("./platform/js"),
            a = o.IsPreloadStarted,
            h = o.IsOnLoadStarted,
            l = o.IsOnLoadCalled,
            u = o.Deactivating,
            _ = "c.onLoad();c._objFlags|=" + l,
            d = cc.Class({
                extends: s.LifeCycleInvoker,
                add: function(t) {
                    this._zero.array.push(t)
                },
                remove: function(t) {
                    this._zero.fastRemove(t)
                },
                cancelInactive: function(t) {
                    s.LifeCycleInvoker.stableRemoveInactive(this._zero, t)
                },
                invoke: function() {
                    this._invoke(this._zero), this._zero.array.length = 0
                }
            }),
            f = s.createInvokeImpl("c.__preload();"),
            p = s.createInvokeImpl(_),
            g = new c.Pool(4);
        g.get = function() {
            var t = this._get() || {
                preload: new d(f),
                onLoad: new s.OneOffInvoker(p),
                onEnable: new s.OneOffInvoker(s.invokeOnEnable)
            };
            t.preload._zero.i = -1;
            var e = t.onLoad;
            return e._zero.i = -1, e._neg.i = -1, e._pos.i = -1, e = t.onEnable, e._zero.i = -1, e._neg.i = -1, e._pos.i = -1, t
        };
        var m = cc.Class({
            ctor: r,
            reset: r,
            _activateNodeRecursively: function(t, e, i, r) {
                if (t._objFlags & u) cc.errorID(3816, t.name);
                else {
                    t._activeInHierarchy = !0;
                    for (var s = t._components.length, o = 0; o < s; ++o) {
                        var c = t._components[o];
                        c instanceof cc.Component ? this.activateComp(c, e, i, r) : (n(t, c, o), --o, --s)
                    }
                    for (var a = 0, h = t._children.length; a < h; ++a) {
                        var l = t._children[a];
                        l._active && this._activateNodeRecursively(l, e, i, r)
                    }
                    t._onPostActivated(!0)
                }
            },
            _deactivateNodeRecursively: function(t) {
                t._objFlags |= u, t._activeInHierarchy = !1;
                for (var e = t._components.length, i = 0; i < e; ++i) {
                    var n = t._components[i];
                    if (n._enabled && (cc.director._compScheduler.disableComp(n), t._activeInHierarchy)) return void(t._objFlags &= ~u)
                }
                for (var r = 0, s = t._children.length; r < s; ++r) {
                    var o = t._children[r];
                    if (o._activeInHierarchy && (this._deactivateNodeRecursively(o), t._activeInHierarchy)) return void(t._objFlags &= ~u)
                }
                t._onPostActivated(!1), t._objFlags &= ~u
            },
            activateNode: function(t, e) {
                if (e) {
                    var i = g.get();
                    this._activatingStack.push(i), this._activateNodeRecursively(t, i.preload, i.onLoad, i.onEnable), i.preload.invoke(), i.onLoad.invoke(), i.onEnable.invoke(), this._activatingStack.pop(), g.put(i)
                } else {
                    this._deactivateNodeRecursively(t);
                    for (var n = this._activatingStack, r = 0; r < n.length; r++) {
                        var s = n[r];
                        s.preload.cancelInactive(a), s.onLoad.cancelInactive(h), s.onEnable.cancelInactive()
                    }
                }
                t.emit("active-in-hierarchy-changed", t)
            },
            activateComp: function(t, e, i, n) {
                if (t._objFlags & a || (t._objFlags |= a, "function" == typeof t.__preload && (e ? e.add(t) : t.__preload())), t._objFlags & h || (t._objFlags |= h, t.onLoad ? i ? i.add(t) : (t.onLoad(), t._objFlags |= l) : t._objFlags |= l), t._enabled) {
                    if (!t.node._activeInHierarchy) return;
                    cc.director._compScheduler.enableComp(t, n)
                }
            },
            destroyComp: function(t) {
                cc.director._compScheduler.disableComp(t), t.onDestroy && t._objFlags & l && t.onDestroy()
            },
            resetComp: !1
        });
        e.exports = m
    }), {
        "./component-scheduler": 36,
        "./platform/CCObject": 85,
        "./platform/js": 100,
        "./utils/misc": 128
    }],
    77: [(function(t, e, i) {}), {
        "../event-manager": 52,
        "../platform/js": 100,
        "./CCMacro": 84,
        "./CCSys": 88
    }],
    78: [(function(t, e, i) {
        function n(t) {
            return t && (t.constructor === cc.SceneAsset || t instanceof cc.Scene)
        }

        function r(t, e) {
            this.url = t, this.type = e
        }
        var s = t("../assets/CCAsset"),
            o = t("./utils").callInNextTick,
            c = t("../load-pipeline/CCLoader"),
            a = t("../load-pipeline/pack-downloader"),
            h = t("../load-pipeline/auto-release-utils"),
            l = t("../utils/decode-uuid"),
            u = t("../load-pipeline/md5-pipe"),
            _ = "",
            d = "",
            f = {},
            p = {
                loadAsset: function(t, e, i) {
                    if ("string" != typeof t) return o(e, new Error("[AssetLibrary] uuid must be string"), null);
                    var r = {
                        uuid: t,
                        type: "uuid"
                    };
                    i && i.existingAsset && (r.existingAsset = i.existingAsset), c.load(r, (function(i, r) {
                        if (i || !r) i = new Error("[AssetLibrary] loading JSON or dependencies failed: " + (i ? i.message : "Unknown error"));
                        else {
                            if (r.constructor === cc.SceneAsset) {
                                var s = cc.loader._getReferenceKey(t);
                                r.scene.dependAssets = h.getDependsRecursively(s)
                            }
                            if (n(r)) {
                                var o = cc.loader._getReferenceKey(t);
                                c.removeItem(o)
                            }
                        }
                        e && e(i, r)
                    }))
                },
                getLibUrlNoExt: function(t) {
                    return t = l(t), _ + t.slice(0, 2) + "/" + t
                },
                _queryAssetInfoInEditor: function(t, e) {
                    0
                },
                _getAssetInfoInRuntime: function(t, e) {
                    e = e || {
                        url: null,
                        raw: !1
                    };
                    var i = f[t];
                    return i && !cc.isChildClassOf(i.type, cc.Asset) ? (e.url = d + i.url, e.raw = !0) : (e.url = this.getLibUrlNoExt(t) + ".json", e.raw = !1), e
                },
                _getAssetUrl: function(t) {
                    var e = f[t];
                    return e ? d + e.url : null
                },
                queryAssetInfo: function(t, e) {
                    var i = this._getAssetInfoInRuntime(t);
                    e(null, i.url, i.raw)
                },
                parseUuidInEditor: function(t) {},
                loadJson: function(t, e) {
                    var i = "" + ((new Date).getTime() + Math.random()),
                        r = {
                            uuid: i,
                            type: "uuid",
                            content: t,
                            skips: [c.assetLoader.id, c.downloader.id]
                        };
                    c.load(r, (function(t, r) {
                        if (t) t = new Error("[AssetLibrary] loading JSON or dependencies failed: " + t.message);
                        else {
                            if (r.constructor === cc.SceneAsset) {
                                var s = cc.loader._getReferenceKey(i);
                                r.scene.dependAssets = h.getDependsRecursively(s)
                            }
                            if (n(r)) {
                                var o = cc.loader._getReferenceKey(i);
                                c.removeItem(o)
                            }
                        }
                        r._uuid = "", e && e(t, r)
                    }))
                },
                getAssetByUuid: function(t) {
                    return p._uuidToAsset[t] || null
                },
                init: function(t) {
                    var e = t.libraryPath;
                    e = e.replace(/\\/g, "/"), _ = cc.path.stripSep(e) + "/", d = t.rawAssetsBase;
                    var i = t.md5AssetsMap;
                    if (i) {
                        var n = new u(i, _, d);
                        cc.loader.insertPipeAfter(cc.loader.assetLoader, n), cc.loader.md5Pipe = n
                    }
                    var o = c._resources;
                    o.reset();
                    var h = t.rawAssets;
                    if (h) {
                        var l = "resources/";
                        for (var p in h) {
                            var g = h[p];
                            for (var m in g) {
                                var v = g[m],
                                    y = v[0],
                                    C = v[1],
                                    T = cc.js._getClassById(C);
                                if (T) {
                                    if (f[m] = new r(p + "/" + y, T), "assets" === p && y.startsWith(l)) {
                                        if (cc.isChildClassOf(T, s)) {
                                            var E = cc.path.extname(y);
                                            y = E ? y.slice(l.length, -E.length) : y.slice(l.length)
                                        } else y = y.slice(l.length);
                                        var x = 1 === v[2];
                                        o.add(y, m, T, !x)
                                    }
                                } else cc.error("Cannot get", C)
                            }
                        }
                    }
                    t.packedAssets && a.initPacks(t.packedAssets);
                    var R = t.mountPaths;
                    R || (R = {
                        assets: d + "assets",
                        internal: d + "internal"
                    }), cc.url._init(R)
                }
            };
        p._uuidToAsset = {}, e.exports = cc.AssetLibrary = p
    }), {
        "../assets/CCAsset": 19,
        "../load-pipeline/CCLoader": 59,
        "../load-pipeline/auto-release-utils": 63,
        "../load-pipeline/md5-pipe": 69,
        "../load-pipeline/pack-downloader": 70,
        "../utils/decode-uuid": 125,
        "./utils": 104
    }],
    79: [(function(t, e, i) {
        function n(t, e) {
            t.indexOf(e) < 0 && t.push(e)
        }

        function r(t, e) {
            n(t.__props__, e)
        }

        function s(t, e, i, n, s) {
            var o = n.default;
            C.setClassAttr(t, i, "default", o), r(t, i);
            var c = g(t, n, e, i, !1);
            if (c) {
                for (var a = w, h = 0; h < c.length; h++) {
                    var l = c[h];
                    C.attr(t, i, l), l._onAfterProp && a.push(l._onAfterProp)
                }
                for (var u = 0; u < a.length; u++) a[u](t, i);
                w.length = 0, c.length = 0
            }
        }

        function o(t, e, i, n, r) {
            var s = n.get,
                o = n.set,
                c = t.prototype,
                a = Object.getOwnPropertyDescriptor(c, i),
                h = !a;
            if (s) {
                0;
                for (var l = g(t, n, e, i, !0), u = 0; u < l.length; u++) C.attr(t, i, l[u]);
                l.length = 0;
                C.setClassAttr(t, i, "serializable", !1), r || m.get(c, i, s, h, h)
            }
            o && (r || m.set(c, i, o, h, h))
        }

        function c(t) {
            return "function" == typeof t ? t() : t
        }

        function a(t, e, i) {
            for (var n in e) t.hasOwnProperty(n) || i && !i(n) || Object.defineProperty(t, n, m.getPropertyDescriptor(e, n))
        }

        function h(t, e, i, r) {
            var s, o, c = r.__ctor__,
                h = r.ctor,
                l = r.__ES6__;
            l ? (s = [h], o = h) : (s = c ? [c] : (function(t, e, i) {
                function r(t) {
                    return p._isCCClass(t) ? t.__ctors__ || [] : [t]
                }
                for (var s = [], o = [t].concat(e), c = 0; c < o.length; c++) {
                    var a = o[c];
                    if (a)
                        for (var h = r(a), l = 0; l < h.length; l++) n(s, h[l])
                }
                var u = i.ctor;
                u && s.push(u);
                return s
            })(e, i, r), o = b(s, e, t, r), m.value(o, "extend", (function(t) {
                return t.extends = this, p(t)
            }), !0)), m.value(o, "__ctors__", s.length > 0 ? s : null, !0);
            var u = o.prototype;
            if (e && (l || (m.extend(o, e), u = o.prototype), m.value(o, "$super", e)), i) {
                for (var d = i.length - 1; d >= 0; d--) {
                    var f = i[d];
                    a(u, f.prototype), a(o, f, (function(t) {
                        return f.hasOwnProperty(t) && !0
                    })), p._isCCClass(f) && a(C.getClassAttrs(o).constructor.prototype, C.getClassAttrs(f).constructor.prototype)
                }
                u.constructor = o
            }
            return l || (u.__initProps__ = _), m.setClassName(t, o), o
        }

        function l(t) {
            for (var e = m.getClassName(t), i = t.constructor, n = "new " + e + "(", r = 0; r < i.__props__.length; r++) {
                var s = t[i.__props__[r]];
                if ("object" == typeof s) return cc.errorID(3641, e), "new " + e + "()";
                n += s, r < i.__props__.length - 1 && (n += ",")
            }
            return n + ")"
        }

        function u(t) {
            return JSON.stringify(t).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029")
        }

        function _(t) {
            var e = C.getClassAttrs(t),
                i = t.__props__;
            null === i && (S.init(), i = t.__props__);
            var n = (function(t, e) {
                for (var i = [], n = "", r = 0; r < e.length; r++) {
                    var s = e[r],
                        o = s + T + "default";
                    if (o in t) {
                        var c;
                        c = A.test(s) ? "this." + s + "=" : "this[" + u(s) + "]=";
                        var a, h = t[o];
                        if ("object" == typeof h && h) a = h instanceof cc.ValueType ? l(h) : Array.isArray(h) ? "[]" : "{}";
                        else if ("function" == typeof h) {
                            var _ = i.length;
                            i.push(h), a = "F[" + _ + "]()"
                        } else a = "string" == typeof h ? u(h) : h;
                        n += c = c + a + ";\n"
                    }
                }
                return 0 === i.length ? Function(n) : Function("F", "return (function(){\n" + n + "})")(i)
            })(e, i);
            t.prototype.__initProps__ = n, n.call(this)
        }

        function d(t, e, i) {
            var n = !1;
            for (var r in e)
                if (!(R.indexOf(r) >= 0)) {
                    var s = e[r];
                    if ("function" == typeof s) {
                        var o = m.getPropertyDescriptor(t.prototype, r);
                        if (o) {
                            var c = o.value;
                            if ("function" == typeof c) {
                                I.test(s) && (n = !0, e[r] = (function(t, e) {
                                    return function() {
                                        var i = this._super;
                                        this._super = t;
                                        var n = e.apply(this, arguments);
                                        return this._super = i, n
                                    }
                                })(c, s));
                                continue
                            }
                        }
                        0
                    }
                }
            return n
        }

        function f(t, e, i, n, r, c) {
            if (t.__props__ = [], n && n.__props__ && (t.__props__ = n.__props__.slice()), r)
                for (var a = 0; a < r.length; ++a) {
                    var h = r[a];
                    h.__props__ && (t.__props__ = t.__props__.concat(h.__props__.filter((function(e) {
                        return t.__props__.indexOf(e) < 0
                    }))))
                }
            if (i) {
                x.preprocessAttrs(i, e, t, c);
                for (var l in i) {
                    var u = i[l];
                    "default" in u ? s(t, e, l, u) : o(t, e, l, u, c)
                }
            }
        }

        function p(t) {
            var e = (t = t || {}).name,
                i = t.extends,
                n = t.mixins,
                r = (function(t, e, i, n) {
                    var r = cc.Component,
                        s = cc._RF.peek();
                    if (s && cc.isChildClassOf(e, r)) {
                        if (cc.isChildClassOf(s.cls, r)) return cc.errorID(3615), null;
                        t = t || s.script
                    }
                    var o = h(t, e, i, n);
                    if (s)
                        if (cc.isChildClassOf(e, r)) {
                            var c = s.uuid;
                            c && m._setClassId(c, o), s.cls = o
                        } else cc.isChildClassOf(s.cls, r) || (s.cls = o);
                    return o
                })(e, i, n, t);
            e || (e = cc.js.getClassName(r)), r._sealed = !0, i && (i._sealed = !1);
            var s = t.properties;
            "function" == typeof s || i && null === i.__props__ || n && n.some((function(t) {
                return null === t.__props__
            })) ? (S.push({
                cls: r,
                props: s,
                mixins: n
            }), r.__props__ = null) : f(r, e, s, i, t.mixins, t.__ES6__);
            var o = t.statics;
            if (o) {
                var c;
                0;
                for (c in o) r[c] = o[c]
            }
            for (var a in t)
                if (!(R.indexOf(a) >= 0)) {
                    var l = t[a];
                    x.validateMethodWithProps(l, a, e, r, i) && m.value(r.prototype, a, l, !0, !0)
                }
            var u = t.editor;
            return u && cc.isChildClassOf(i, cc.Component) && cc.Component._registerEditorProps(r, u), r
        }

        function g(t, e, i, n, r) {
            function s() {
                return a = n + T, c = C.getClassAttrsProto(t)
            }

            function o(t, i) {
                if (t in e) {
                    var n = e[t];
                    typeof n === i && ((c || s())[a + t] = n)
                }
            }
            var c = null,
                a = "";
            N.length = 0;
            var h = N,
                l = e.type;
            if (l) {
                var u = O[l];
                if (u) h.push({
                    type: l,
                    _onAfterProp: E(u, "cc." + l)
                });
                else if ("Object" === l) 0;
                else if (l === C.ScriptUuid) {
                    var _ = C.ObjectType(cc.ScriptAsset);
                    _.type = "Script", h.push(_)
                } else "object" == typeof l ? v.isEnum(l) && h.push({
                    type: "Enum",
                    enumList: v.getList(l)
                }) : "function" == typeof l && (e.url ? h.push({
                    type: "Object",
                    ctor: l,
                    _onAfterProp: E("String", "cc.String")
                }) : h.push(e._short ? {
                    type: "Object",
                    ctor: l
                } : C.ObjectType(l)))
            }
            e.editorOnly && ((c || s())[a + "editorOnly"] = !0), e.url && ((c || s())[a + "saveUrlAsAsset"] = !0), !1 === e.serializable && ((c || s())[a + "serializable"] = !1), o("formerlySerializedAs", "string");
            var d = e.range;
            return d && Array.isArray(d) && d.length >= 2 && ((c || s())[a + "min"] = d[0], c[a + "max"] = d[1], d.length > 2 && (c[a + "step"] = d[2])), o("min", "number"), o("max", "number"), o("step", "number"), h
        }
        var m = t("./js"),
            v = t("./CCEnum"),
            y = t("./utils"),
            C = (y.isPlainEmptyObj_DEV, y.cloneable_DEV, t("./attribute")),
            T = C.DELIMETER,
            E = C.getTypeChecker,
            x = t("./preprocess-class");
        t("./requiring-frame");
        var R = ["name", "extends", "mixins", "ctor", "__ctor__", "properties", "statics", "editor", "__ES6__"],
            S = {
                datas: null,
                push: function(t) {
                    if (this.datas) this.datas.push(t);
                    else {
                        this.datas = [t];
                        var e = this;
                        setTimeout((function() {
                            e.init()
                        }), 0)
                    }
                },
                init: function() {
                    var t = this.datas;
                    if (t) {
                        for (var e = 0; e < t.length; ++e) {
                            var i = t[e],
                                n = i.cls,
                                r = i.props;
                            "function" == typeof r && (r = r());
                            var s = m.getClassName(n);
                            r ? f(n, s, r, n.$super, i.mixins) : cc.errorID(3633, s)
                        }
                        this.datas = null
                    }
                }
            },
            w = [],
            A = /^[$A-Za-z_][0-9A-Za-z_$]*$/,
            b = function(t, e, i, n) {
                var r = "return function CCClass(){\n";
                e && d(e, n) && (r += "this._super=null;\n"), r += "this.__initProps__(CCClass);\n";
                var s = t.length;
                if (s > 0) {
                    var o = !(i && i.startsWith("cc."));
                    o && (r += "try{\n");
                    var c = "].apply(this,arguments);\n";
                    if (1 === s) r += "CCClass.__ctors__[0" + c;
                    else {
                        r += "var cs=CCClass.__ctors__;\n";
                        for (var a = 0; a < s; a++) r += "cs[" + a + c
                    }
                    o && (r += "}catch(e){\ncc._throw(e);\n}\n")
                }
                return r += "}", Function(r)()
            },
            I = /xyz/.test((function() {
                xyz
            })) ? /\b\._super\b/ : /.*/;
        /xyz/.test((function() {
            xyz
        }));
        p._isCCClass = function(t) {
            return t && t.hasOwnProperty("__ctors__")
        }, p._fastDefine = function(t, e, i) {
            m.setClassName(t, e);
            for (var n = e.__props__ = Object.keys(i), r = C.getClassAttrsProto(e), s = 0; s < n.length; s++) {
                var o = n[s];
                r[o + T + "visible"] = !1, r[o + T + "default"] = i[o]
            }
        }, p.Attr = C, p.attr = C.attr, cc.isChildClassOf = function(t, e) {
            if (t && e) {
                if ("function" != typeof t) return !1;
                if ("function" != typeof e) return !1;
                if (t === e) return !0;
                for (;;) {
                    if (!(t = m.getSuper(t))) return !1;
                    if (t === e) return !0
                }
            }
            return !1
        }, p.getInheritanceChain = function(t) {
            for (var e = []; t = m.getSuper(t);) t !== Object && e.push(t);
            return e
        };
        var O = {
                Integer: "Number",
                Float: "Number",
                Boolean: "Boolean",
                String: "String"
            },
            N = [];
        cc.Class = p, e.exports = {
            isArray: function(t) {
                return t = c(t), Array.isArray(t)
            },
            fastDefine: p._fastDefine,
            getNewValueTypeCode: l,
            IDENTIFIER_RE: A,
            escapeForJS: u,
            getDefault: c
        }
    }), {
        "./CCEnum": 81,
        "./attribute": 92,
        "./js": 100,
        "./preprocess-class": 101,
        "./requiring-frame": 102,
        "./utils": 104
    }],
    80: [(function(t, e, i) {
        function n(t) {
            return t
        }

        function r(t, e) {
            return t[e] || (t[e] = {})
        }

        function s(t) {
            return function(e) {
                return "function" == typeof e ? t(e) : function(i) {
                    return t(i, e)
                }
            }
        }

        function o(t, e, i) {
            return function(t) {
                return function(i) {
                    return e(i, t)
                }
            }
        }

        function c(t) {
            return o.bind(null, !1)
        }

        function a(t, e) {
            return r(t, d)
        }

        function h(t, e, i) {
            return t((function(t, n) {
                var s = a(t);
                if (s) {
                    var o = void 0 !== i ? i : n;
                    r(r(s, "proto"), "editor")[e] = o
                }
            }), e)
        }

        function l(t) {
            return t(n)
        }
        t("./CCClass");
        var u = t("./preprocess-class"),
            _ = t("./js"),
            d = "__ccclassCache__",
            f = o.bind(null, !1),
            p = c(),
            g = c(),
            m = s((function(t, e) {
                var i = _.getSuper(t);
                i === Object && (i = null);
                var n = {
                        name: e,
                        extends: i,
                        ctor: t,
                        __ES6__: !0
                    },
                    r = t[d];
                if (r) {
                    var s = r.proto;
                    s && _.mixin(n, s), t[d] = void 0
                }
                return cc.Class(n)
            })),
            v = l(s),
            y = h(f, "requireComponent"),
            C = l(p),
            T = h(g, "executionOrder"),
            E = l(s),
            x = l(s),
            R = l(p),
            S = l(p),
            w = l(p);
        cc._decorator = e.exports = {
            ccclass: m,
            property: function(t, e, i) {
                function n(t, e, i) {
                    var n = a(t.constructor);
                    if (n) {
                        var o = r(r(n, "proto"), "properties");
                        (function(t, e, i, n, r, s) {
                            var o = n && (u.getFullFormOfProperty(n) || n),
                                c = e[i],
                                a = _.mixin(c || {}, o || {});
                            if (r && (r.get || r.set)) r.get && (a.get = r.get), r.set && (a.set = r.set);
                            else {
                                var h = void 0;
                                if (r) r.initializer && (h = (function(t) {
                                    var e;
                                    try {
                                        e = t()
                                    } catch (e) {
                                        return t
                                    }
                                    return "object" != typeof e || null === e ? e : t
                                })(r.initializer));
                                else {
                                    var l = s.default || (s.default = (function(t) {
                                        var e;
                                        try {
                                            e = new t
                                        } catch (t) {
                                            return {}
                                        }
                                        return e
                                    })(t));
                                    l.hasOwnProperty(i) && (h = l[i])
                                }
                                a.default = h
                            }
                            e[i] = a
                        })(t.constructor, o, e, s, i, n)
                    }
                }
                var s = null;
                if (void 0 === e) return s = t, n;
                n(t, e, i)
            },
            executeInEditMode: v,
            requireComponent: y,
            menu: C,
            executionOrder: T,
            disallowMultiple: E,
            playOnFocus: x,
            inspector: R,
            icon: S,
            help: w,
            mixins: function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                return function(e) {
                    var i = a(e);
                    i && (r(i, "proto").mixins = t)
                }
            }
        }
    }), {
        "./CCClass": 79,
        "./js": 100,
        "./preprocess-class": 101,
        "./utils": 104
    }],
    81: [(function(t, e, i) {
        function n(t) {
            if ("__enums__" in t) return t;
            r.value(t, "__enums__", null, !0);
            for (var e = -1, i = Object.keys(t), n = 0; n < i.length; n++) {
                var s = i[n],
                    o = t[s];
                if (-1 === o) o = ++e, t[s] = o;
                else if ("number" == typeof o) e = o;
                else if ("string" == typeof o && Number.isInteger(parseFloat(s))) continue;
                var c = "" + o;
                s !== c && r.value(t, c, s)
            }
            return t
        }
        var r = t("./js");
        n.isEnum = function(t) {
            return t && t.hasOwnProperty("__enums__")
        }, n.getList = function(t) {
            if (t.__enums__) return t.__enums__;
            var e = t.__enums__ = [];
            for (var i in t) {
                var n = t[i];
                Number.isInteger(n) && e.push({
                    name: i,
                    value: n
                })
            }
            return e.sort((function(t, e) {
                return t.value - e.value
            })), e
        };
        e.exports = cc.Enum = n
    }), {
        "./js": 100
    }],
    82: [(function(t, e, i) {
        cc.ClassManager || t("./_CCClass");
        var n = t("../event-manager"),
            r = t("./CCInputManager");
        r.__instanceId = cc.ClassManager.getNewInstanceId();
        var s;
        r.setAccelerometerEnabled = function(t) {
            if (this._accelEnabled !== t) {
                this._accelEnabled = t;
                var e = cc.director.getScheduler();
                this._accelEnabled, this._accelCurTime = 0, e.scheduleUpdate(this)
            }
        }, r.setAccelerometerInterval = function(t) {
            this._accelInterval !== t && (this._accelInterval = t)
        }, r._registerKeyboardEvent = function() {
            cc.game.canvas.addEventListener("keydown", (function(t) {
                n.dispatchEvent(new cc.Event.EventKeyboard(t.keyCode, !0)), t.stopPropagation(), t.preventDefault()
            }), !1), cc.game.canvas.addEventListener("keyup", (function(t) {
                n.dispatchEvent(new cc.Event.EventKeyboard(t.keyCode, !1)), t.stopPropagation(), t.preventDefault()
            }), !1)
        }, r._registerAccelerometerEvent = function() {
            var t = window;
            this._acceleration = new cc.Acceleration, this._accelDeviceEvent = t.DeviceMotionEvent || t.DeviceOrientationEvent, cc.sys.browserType === cc.sys.BROWSER_TYPE_MOBILE_QQ && (this._accelDeviceEvent = window.DeviceOrientationEvent);
            var e = this._accelDeviceEvent === t.DeviceMotionEvent ? "x_devicemotion_x" : "x_deviceorientation_x",
                i = navigator.userAgent;
            (/Android/.test(i) || /Adr/.test(i) && cc.sys.browserType === cc.BROWSER_TYPE_UC) && (this._minus = -1), s = this.didAccelerate.bind(this), t.addEventListener(e, s, !1)
        }, r._unregisterAccelerometerEvent = function() {
            var t = window,
                e = this._accelDeviceEvent === t.DeviceMotionEvent ? "x_devicemotion_x" : "x_deviceorientation_x";
            s && t.removeEventListener(e, s, !1)
        }, r.didAccelerate = function(t) {
            var e = window;
            if (this._accelEnabled) {
                var i, n, r, s = this._acceleration;
                if (this._accelDeviceEvent === window.DeviceMotionEvent) {
                    var o = t.accelerationIncludingGravity;
                    i = this._accelMinus * o.x * .1, n = this._accelMinus * o.y * .1, r = .1 * o.z
                } else i = t.gamma / 90 * .981, n = -t.beta / 90 * .981, r = t.alpha / 90 * .981;
                s.x = i, s.y = n, s.z = r, s.timestamp = t.timeStamp || Date.now();
                var c = s.x;
                e.orientation === cc.macro.WEB_ORIENTATION_LANDSCAPE_RIGHT ? (s.x = -s.y, s.y = c) : e.orientation === cc.macro.WEB_ORIENTATION_LANDSCAPE_LEFT ? (s.x = s.y, s.y = -c) : e.orientation === cc.macro.WEB_ORIENTATION_PORTRAIT_UPSIDE_DOWN && (s.x = -s.x, s.y = -s.y), cc.sys.os === cc.sys.OS_ANDROID && cc.sys.browserType !== cc.sys.BROWSER_TYPE_MOBILE_QQ && (s.x = -s.x, s.y = -s.y)
            }
        }
    }), {
        "../event-manager": 52,
        "./CCInputManager": 83,
        "./_CCClass": 91
    }],
    83: [(function(t, e, i) {
        var n = t("../platform/js"),
            r = t("./CCMacro"),
            s = t("./CCSys"),
            o = t("../event-manager"),
            c = r.TOUCH_TIMEOUT,
            a = {
                _mousePressed: !1,
                _isRegisterEvent: !1,
                _preTouchPoint: cc.p(0, 0),
                _prevMousePoint: cc.p(0, 0),
                _preTouchPool: [],
                _preTouchPoolPointer: 0,
                _touches: [],
                _touchesIntegerDict: {},
                _indexBitsUsed: 0,
                _maxTouches: 5,
                _accelEnabled: !1,
                _accelInterval: 1 / 30,
                _accelMinus: 1,
                _accelCurTime: 0,
                _acceleration: null,
                _accelDeviceEvent: null,
                _getUnUsedIndex: function() {
                    for (var t = this._indexBitsUsed, e = cc.sys.now(), i = 0; i < this._maxTouches; i++) {
                        if (!(1 & t)) return this._indexBitsUsed |= 1 << i, i;
                        var n = this._touches[i];
                        if (e - n._lastModified > c) return this._removeUsedIndexBit(i), delete this._touchesIntegerDict[n.getID()], i;
                        t >>= 1
                    }
                    return -1
                },
                _removeUsedIndexBit: function(t) {
                    if (!(t < 0 || t >= this._maxTouches)) {
                        var e = 1 << t;
                        e = ~e, this._indexBitsUsed &= e
                    }
                },
                _glView: null,
                handleTouchesBegin: function(t) {
                    for (var e, i, n, r = [], c = this._touchesIntegerDict, a = s.now(), h = 0, l = t.length; h < l; h++)
                        if (e = t[h], n = e.getID(), null == c[n]) {
                            var u = this._getUnUsedIndex();
                            if (-1 === u) {
                                cc.logID(2300, u);
                                continue
                            }(i = this._touches[u] = new cc.Touch(e._point.x, e._point.y, e.getID()))._lastModified = a, i._setPrevPoint(e._prevPoint), c[n] = u, r.push(i)
                        }
                    if (r.length > 0) {
                        this._glView._convertTouchesWithScale(r);
                        var _ = new cc.Event.EventTouch(r);
                        _._eventCode = cc.Event.EventTouch.BEGAN, o.dispatchEvent(_)
                    }
                },
                handleTouchesMove: function(t) {
                    for (var e, i, n, r = [], c = this._touches, a = s.now(), h = 0, l = t.length; h < l; h++) n = (e = t[h]).getID(), null != (i = this._touchesIntegerDict[n]) && c[i] && (c[i]._setPoint(e._point), c[i]._setPrevPoint(e._prevPoint), c[i]._lastModified = a, r.push(c[i]));
                    if (r.length > 0) {
                        this._glView._convertTouchesWithScale(r);
                        var u = new cc.Event.EventTouch(r);
                        u._eventCode = cc.Event.EventTouch.MOVED, o.dispatchEvent(u)
                    }
                },
                handleTouchesEnd: function(t) {
                    var e = this.getSetOfTouchesEndOrCancel(t);
                    if (e.length > 0) {
                        this._glView._convertTouchesWithScale(e);
                        var i = new cc.Event.EventTouch(e);
                        i._eventCode = cc.Event.EventTouch.ENDED, o.dispatchEvent(i)
                    }
                },
                handleTouchesCancel: function(t) {
                    var e = this.getSetOfTouchesEndOrCancel(t);
                    if (e.length > 0) {
                        this._glView._convertTouchesWithScale(e);
                        var i = new cc.Event.EventTouch(e);
                        i._eventCode = cc.Event.EventTouch.CANCELLED, o.dispatchEvent(i)
                    }
                },
                getSetOfTouchesEndOrCancel: function(t) {
                    for (var e, i, n, r = [], s = this._touches, o = this._touchesIntegerDict, c = 0, a = t.length; c < a; c++) null != (i = o[n = (e = t[c]).getID()]) && s[i] && (s[i]._setPoint(e._point), s[i]._setPrevPoint(e._prevPoint), r.push(s[i]), this._removeUsedIndexBit(i), delete o[n]);
                    return r
                },
                getHTMLElementPosition: function(t) {
                    if (s.platform === s.WECHAT_GAME) return {
                        left: 0,
                        top: 0,
                        width: window.innerWidth,
                        height: window.innerHeight
                    };
                    var e = document.documentElement,
                        i = window.pageXOffset - e.clientLeft,
                        n = window.pageYOffset - e.clientTop;
                    if ("function" == typeof t.getBoundingClientRect) {
                        var r = t.getBoundingClientRect();
                        return {
                            left: r.left + i,
                            top: r.top + n,
                            width: r.width,
                            height: r.height
                        }
                    }
                    return t instanceof HTMLCanvasElement ? {
                        left: i,
                        top: n,
                        width: t.width,
                        height: t.height
                    } : {
                        left: i,
                        top: n,
                        width: parseInt(t.style.width),
                        height: parseInt(t.style.height)
                    }
                },
                getPreTouch: function(t) {
                    for (var e = null, i = this._preTouchPool, n = t.getID(), r = i.length - 1; r >= 0; r--)
                        if (i[r].getID() === n) {
                            e = i[r];
                            break
                        }
                    return e || (e = t), e
                },
                setPreTouch: function(t) {
                    for (var e = !1, i = this._preTouchPool, n = t.getID(), r = i.length - 1; r >= 0; r--)
                        if (i[r].getID() === n) {
                            i[r] = t, e = !0;
                            break
                        }
                    e || (i.length <= 50 ? i.push(t) : (i[this._preTouchPoolPointer] = t, this._preTouchPoolPointer = (this._preTouchPoolPointer + 1) % 50))
                },
                getTouchByXY: function(t, e, i) {
                    var n = this._preTouchPoint,
                        r = this._glView.convertToLocationInView(t, e, i),
                        s = new cc.Touch(r.x, r.y);
                    return s._setPrevPoint(n.x, n.y), n.x = r.x, n.y = r.y, s
                },
                getMouseEvent: function(t, e, i) {
                    var n = this._prevMousePoint,
                        r = new cc.Event.EventMouse(i);
                    return r._setPrevCursor(n.x, n.y), n.x = t.x, n.y = t.y, this._glView._convertMouseToLocationInView(n, e), r.setLocation(n.x, n.y), r
                },
                getPointByEvent: function(t, e) {
                    return null != t.pageX ? {
                        x: t.pageX,
                        y: t.pageY
                    } : (s.platform === s.WECHAT_GAME ? (e.left = 0, e.top = 0) : (e.left -= document.body.scrollLeft, e.top -= document.body.scrollTop), {
                        x: t.clientX,
                        y: t.clientY
                    })
                },
                getTouchesByEvent: function(t, e) {
                    for (var i, n, r, o = [], c = this._glView, a = this._preTouchPoint, h = t.changedTouches.length, l = 0; l < h; l++)
                        if (i = t.changedTouches[l]) {
                            var u;
                            u = s.BROWSER_TYPE_FIREFOX === s.browserType ? c.convertToLocationInView(i.pageX, i.pageY, e) : c.convertToLocationInView(i.clientX, i.clientY, e), null != i.identifier ? (n = new cc.Touch(u.x, u.y, i.identifier), r = this.getPreTouch(n).getLocation(), n._setPrevPoint(r.x, r.y), this.setPreTouch(n)) : (n = new cc.Touch(u.x, u.y))._setPrevPoint(a.x, a.y), a.x = u.x, a.y = u.y, o.push(n)
                        }
                    return o
                },
                registerSystemEvent: function(t) {
                    if (!this._isRegisterEvent) {
                        this._glView = cc.view;
                        var e = this,
                            i = s.isMobile,
                            n = "mouse" in s.capabilities,
                            r = "touches" in s.capabilities;
                        if (s.platform === s.WECHAT_GAME && (i = !1, r = !0, n = !1), n) {
                            i || (window.addEventListener("mousedown", (function() {
                                e._mousePressed = !0
                            }), !1), window.addEventListener("mouseup", (function(i) {
                                if (e._mousePressed) {
                                    e._mousePressed = !1;
                                    var n = e.getHTMLElementPosition(t),
                                        r = e.getPointByEvent(i, n);
                                    if (!cc.rectContainsPoint(new cc.Rect(n.left, n.top, n.width, n.height), r)) {
                                        e.handleTouchesEnd([e.getTouchByXY(r.x, r.y, n)]);
                                        var s = e.getMouseEvent(r, n, cc.Event.EventMouse.UP);
                                        s.setButton(i.button), o.dispatchEvent(s)
                                    }
                                }
                            }), !1));
                            for (var c = cc.Event.EventMouse, a = [!i && ["mousedown", c.DOWN, function(i, n, r, s) {
                                        e._mousePressed = !0, e.handleTouchesBegin([e.getTouchByXY(r.x, r.y, s)]), t.focus()
                                    }], !i && ["mouseup", c.UP, function(t, i, n, r) {
                                        e._mousePressed = !1, e.handleTouchesEnd([e.getTouchByXY(n.x, n.y, r)])
                                    }], !i && ["mousemove", c.MOVE, function(t, i, n, r) {
                                        e.handleTouchesMove([e.getTouchByXY(n.x, n.y, r)]), e._mousePressed || i.setButton(null)
                                    }],
                                    ["mousewheel", c.SCROLL, function(t, e) {
                                        e.setScrollData(0, t.wheelDelta)
                                    }],
                                    ["DOMMouseScroll", c.SCROLL, function(t, e) {
                                        e.setScrollData(0, -120 * t.detail)
                                    }]
                                ], h = 0; h < a.length; ++h) {
                                var l = a[h];
                                l && (function() {
                                    var i = l[0],
                                        n = l[1],
                                        r = l[2];
                                    t.addEventListener(i, (function(i) {
                                        var s = e.getHTMLElementPosition(t),
                                            c = e.getPointByEvent(i, s),
                                            a = e.getMouseEvent(c, s, n);
                                        a.setButton(i.button), r(i, a, c, s), o.dispatchEvent(a), i.stopPropagation(), i.preventDefault()
                                    }), !1)
                                })()
                            }
                        }
                        if (window.navigator.msPointerEnabled) {
                            var u = {
                                    MSPointerDown: e.handleTouchesBegin,
                                    MSPointerMove: e.handleTouchesMove,
                                    MSPointerUp: e.handleTouchesEnd,
                                    MSPointerCancel: e.handleTouchesCancel
                                },
                                _ = function(i) {
                                    var n = u[i];
                                    t.addEventListener(i, (function(i) {
                                        var r = e.getHTMLElementPosition(t);
                                        r.left -= document.documentElement.scrollLeft, r.top -= document.documentElement.scrollTop, n.call(e, [e.getTouchByXY(i.clientX, i.clientY, r)]), i.stopPropagation()
                                    }), !1)
                                };
                            for (var d in u) _(d)
                        }
                        if (r) {
                            var f, p = {
                                touchstart: function(i) {
                                    e.handleTouchesBegin(i), s.platform !== s.WECHAT_GAME && t.focus()
                                },
                                touchmove: function(t) {
                                    e.handleTouchesMove(t)
                                },
                                touchend: function(t) {
                                    e.handleTouchesEnd(t)
                                },
                                touchcancel: function(t) {
                                    e.handleTouchesCancel(t)
                                }
                            };
                            cc.sys.browserType === cc.sys.BROWSER_TYPE_WECHAT_GAME_SUB ? (p = {
                                onTouchStart: p.touchstart,
                                onTouchMove: p.touchmove,
                                onTouchEnd: p.touchend,
                                onTouchCancel: p.touchcancel
                            }, f = function(i) {
                                var n = p[i];
                                wx[i]((function(i) {
                                    if (i.changedTouches) {
                                        var r = e.getHTMLElementPosition(t),
                                            s = document.body;
                                        r.left -= s.scrollLeft || 0, r.top -= s.scrollTop || 0, n(e.getTouchesByEvent(i, r))
                                    }
                                }))
                            }) : f = function(i) {
                                var n = p[i];
                                t.addEventListener(i, (function(i) {
                                    if (i.changedTouches) {
                                        var r = e.getHTMLElementPosition(t),
                                            s = document.body;
                                        r.left -= s.scrollLeft || 0, r.top -= s.scrollTop || 0, n(e.getTouchesByEvent(i, r)), i.stopPropagation(), i.preventDefault()
                                    }
                                }), !1)
                            };
                            for (var g in p) f(g)
                        }
                        cc.sys.browserType !== cc.sys.BROWSER_TYPE_WECHAT_GAME_SUB && (this._registerKeyboardEvent(), this._registerAccelerometerEvent()), this._isRegisterEvent = !0
                    }
                },
                _registerKeyboardEvent: function() {},
                _registerAccelerometerEvent: function() {},
                update: function(t) {
                    this._accelCurTime > this._accelInterval && (this._accelCurTime -= this._accelInterval, o.dispatchEvent(new cc.Event.EventAcceleration(this._acceleration))), this._accelCurTime += t
                }
            };
        n.get(cc, "inputManager", (function() {
            return cc.warnID(1405, "cc.inputManager", "cc.systemEvent"), a
        })), e.exports = _cc.inputManager = a
    }), {
        "../event-manager": 52,
        "../platform/js": 100,
        "./CCMacro": 84,
        "./CCSys": 88
    }],
    84: [(function(t, e, i) {
        t("./_CCClass"), cc.KEY = {
            none: 0,
            back: 6,
            menu: 18,
            backspace: 8,
            tab: 9,
            enter: 13,
            shift: 16,
            ctrl: 17,
            alt: 18,
            pause: 19,
            capslock: 20,
            escape: 27,
            space: 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36,
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            select: 41,
            insert: 45,
            Delete: 46,
            0: 48,
            1: 49,
            2: 50,
            3: 51,
            4: 52,
            5: 53,
            6: 54,
            7: 55,
            8: 56,
            9: 57,
            a: 65,
            b: 66,
            c: 67,
            d: 68,
            e: 69,
            f: 70,
            g: 71,
            h: 72,
            i: 73,
            j: 74,
            k: 75,
            l: 76,
            m: 77,
            n: 78,
            o: 79,
            p: 80,
            q: 81,
            r: 82,
            s: 83,
            t: 84,
            u: 85,
            v: 86,
            w: 87,
            x: 88,
            y: 89,
            z: 90,
            num0: 96,
            num1: 97,
            num2: 98,
            num3: 99,
            num4: 100,
            num5: 101,
            num6: 102,
            num7: 103,
            num8: 104,
            num9: 105,
            "*": 106,
            "+": 107,
            "-": 109,
            numdel: 110,
            "/": 111,
            f1: 112,
            f2: 113,
            f3: 114,
            f4: 115,
            f5: 116,
            f6: 117,
            f7: 118,
            f8: 119,
            f9: 120,
            f10: 121,
            f11: 122,
            f12: 123,
            numlock: 144,
            scrolllock: 145,
            ";": 186,
            semicolon: 186,
            equal: 187,
            "=": 187,
            ",": 188,
            comma: 188,
            dash: 189,
            ".": 190,
            period: 190,
            forwardslash: 191,
            grave: 192,
            "[": 219,
            openbracket: 219,
            backslash: 220,
            "]": 221,
            closebracket: 221,
            quote: 222,
            dpadLeft: 1e3,
            dpadRight: 1001,
            dpadUp: 1003,
            dpadDown: 1004,
            dpadCenter: 1005
        }, cc.ImageFormat = cc.Enum({
            JPG: 0,
            PNG: 1,
            TIFF: 2,
            WEBP: 3,
            PVR: 4,
            ETC: 5,
            S3TC: 6,
            ATITC: 7,
            TGA: 8,
            RAWDATA: 9,
            UNKNOWN: 10
        }), cc.getImageFormatByData = function(t) {
            return t.length > 8 && 137 === t[0] && 80 === t[1] && 78 === t[2] && 71 === t[3] && 13 === t[4] && 10 === t[5] && 26 === t[6] && 10 === t[7] ? cc.ImageFormat.PNG : t.length > 2 && (73 === t[0] && 73 === t[1] || 77 === t[0] && 77 === t[1] || 255 === t[0] && 216 === t[1]) ? cc.ImageFormat.TIFF : cc.ImageFormat.UNKNOWN
        }, cc.macro = {
            INVALID_INDEX: -1,
            NODE_TAG_INVALID: -1,
            PI: Math.PI,
            PI2: 2 * Math.PI,
            FLT_MAX: parseFloat("3.402823466e+38F"),
            FLT_MIN: parseFloat("1.175494351e-38F"),
            RAD: Math.PI / 180,
            DEG: 180 / Math.PI,
            UINT_MAX: 4294967295,
            REPEAT_FOREVER: Number.MAX_VALUE - 1,
            FLT_EPSILON: 1.192092896e-7,
            ONE: 1,
            ZERO: 0,
            SRC_ALPHA: 770,
            SRC_ALPHA_SATURATE: 776,
            SRC_COLOR: 768,
            DST_ALPHA: 772,
            DST_COLOR: 774,
            ONE_MINUS_SRC_ALPHA: 771,
            ONE_MINUS_SRC_COLOR: 769,
            ONE_MINUS_DST_ALPHA: 773,
            ONE_MINUS_DST_COLOR: 775,
            ONE_MINUS_CONSTANT_ALPHA: 32772,
            ONE_MINUS_CONSTANT_COLOR: 32770,
            LINEAR: 9729,
            BLEND_DST: 771,
            WEB_ORIENTATION_PORTRAIT: 0,
            WEB_ORIENTATION_LANDSCAPE_LEFT: -90,
            WEB_ORIENTATION_PORTRAIT_UPSIDE_DOWN: 180,
            WEB_ORIENTATION_LANDSCAPE_RIGHT: 90,
            ORIENTATION_PORTRAIT: 1,
            ORIENTATION_LANDSCAPE: 2,
            ORIENTATION_AUTO: 3,
            DENSITYDPI_DEVICE: "device-dpi",
            DENSITYDPI_HIGH: "high-dpi",
            DENSITYDPI_MEDIUM: "medium-dpi",
            DENSITYDPI_LOW: "low-dpi",
            VERTEX_ATTRIB_FLAG_NONE: 0,
            VERTEX_ATTRIB_FLAG_POSITION: 1,
            VERTEX_ATTRIB_FLAG_COLOR: 2,
            VERTEX_ATTRIB_FLAG_TEX_COORDS: 4,
            VERTEX_ATTRIB_FLAG_POS_COLOR_TEX: 7,
            GL_ALL: 0,
            VERTEX_ATTRIB_POSITION: 0,
            VERTEX_ATTRIB_COLOR: 1,
            VERTEX_ATTRIB_TEX_COORDS: 2,
            VERTEX_ATTRIB_MAX: 3,
            UNIFORM_PMATRIX: 0,
            UNIFORM_MVMATRIX: 1,
            UNIFORM_MVPMATRIX: 2,
            UNIFORM_TIME: 3,
            UNIFORM_SINTIME: 4,
            UNIFORM_COSTIME: 5,
            UNIFORM_RANDOM01: 6,
            UNIFORM_SAMPLER: 7,
            UNIFORM_MAX: 8,
            SHADER_POSITION_TEXTURECOLOR: "ShaderPositionTextureColor",
            SHADER_SPRITE_POSITION_TEXTURECOLOR: "ShaderSpritePositionTextureColor",
            SHADER_POSITION_TEXTURECOLORALPHATEST: "ShaderPositionTextureColorAlphaTest",
            SHADER_SPRITE_POSITION_TEXTURECOLORALPHATEST: "ShaderSpritePositionTextureColorAlphaTest",
            SHADER_POSITION_COLOR: "ShaderPositionColor",
            SHADER_SPRITE_POSITION_COLOR: "ShaderSpritePositionColor",
            SHADER_POSITION_TEXTURE: "ShaderPositionTexture",
            SHADER_POSITION_TEXTURE_UCOLOR: "ShaderPositionTexture_uColor",
            SHADER_POSITION_TEXTUREA8COLOR: "ShaderPositionTextureA8Color",
            SHADER_POSITION_UCOLOR: "ShaderPosition_uColor",
            SHADER_POSITION_LENGTHTEXTURECOLOR: "ShaderPositionLengthTextureColor",
            UNIFORM_PMATRIX_S: "CC_PMatrix",
            UNIFORM_MVMATRIX_S: "CC_MVMatrix",
            UNIFORM_MVPMATRIX_S: "CC_MVPMatrix",
            UNIFORM_TIME_S: "CC_Time",
            UNIFORM_SINTIME_S: "CC_SinTime",
            UNIFORM_COSTIME_S: "CC_CosTime",
            UNIFORM_RANDOM01_S: "CC_Random01",
            UNIFORM_SAMPLER_S: "CC_Texture0",
            UNIFORM_ALPHA_TEST_VALUE_S: "CC_alpha_value",
            ATTRIBUTE_NAME_COLOR: "a_color",
            ATTRIBUTE_NAME_POSITION: "a_position",
            ATTRIBUTE_NAME_TEX_COORD: "a_texCoord",
            ITEM_SIZE: 32,
            CURRENT_ITEM: 3233828865,
            ZOOM_ACTION_TAG: 3233828866,
            NORMAL_TAG: 8801,
            SELECTED_TAG: 8802,
            DISABLE_TAG: 8803,
            FIX_ARTIFACTS_BY_STRECHING_TEXEL: 0,
            FIX_ARTIFACTS_BY_STRECHING_TEXEL_TMX: 1,
            DIRECTOR_STATS_POSITION: cc.p(0, 0),
            DIRECTOR_FPS_INTERVAL: .5,
            COCOSNODE_RENDER_SUBPIXEL: 1,
            SPRITEBATCHNODE_RENDER_SUBPIXEL: 1,
            AUTO_PREMULTIPLIED_ALPHA_FOR_PNG: 0,
            OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA: 0,
            TEXTURE_NPOT_SUPPORT: 0,
            USE_LA88_LABELS: 1,
            SPRITE_DEBUG_DRAW: 0,
            LABELBMFONT_DEBUG_DRAW: 0,
            LABELATLAS_DEBUG_DRAW: 0,
            ENABLE_STACKABLE_ACTIONS: 1,
            ENABLE_GL_STATE_CACHE: 1,
            TOUCH_TIMEOUT: 5e3,
            BATCH_VERTEX_COUNT: 2e4,
            ENABLE_GC_FOR_NATIVE_OBJECTS: !0,
            ENABLE_TILEDMAP_CULLING: !0,
            DOWNLOAD_MAX_CONCURRENT: 64,
            ENABLE_TRANSPARENT_CANVAS: !1,
            ENABLE_WEBGL_ANTIALIAS: !1
        };
        var n = !0;
        cc.defineGetterSetter(cc.macro, "ENABLE_CULLING", (function() {
            return n
        }), (function(t) {
            n = t;
            var e = cc.director.getScene();
            e && (e._sgNode._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.cullingDirty), cc.renderer.childrenOrderDirty = !0)
        })), cc.defineGetterSetter(cc.macro, "BLEND_SRC", (function() {
            return cc._renderType === cc.game.RENDER_TYPE_WEBGL && cc.macro.OPTIMIZE_BLEND_FUNC_FOR_PREMULTIPLIED_ALPHA ? cc.macro.ONE : cc.macro.SRC_ALPHA
        })), cc.lerp = function(t, e, i) {
            return t + (e - t) * i
        }, cc.rand = function() {
            return 16777215 * Math.random()
        }, cc.randomMinus1To1 = function() {
            return 2 * (Math.random() - .5)
        }, cc.random0To1 = Math.random, cc.degreesToRadians = function(t) {
            return t * cc.macro.RAD
        }, cc.radiansToDegrees = function(t) {
            return t * cc.macro.DEG
        }, cc.nodeDrawSetup = function(t) {
            t._shaderProgram && (t._shaderProgram.use(), t._shaderProgram.setUniformForModelViewAndProjectionMatrixWithMat4())
        }, cc.incrementGLDraws = function(t) {
            cc.g_NumberOfDraws += t
        }, cc.checkGLErrorDebug = function() {
            if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
                var t = cc._renderContext.getError();
                t && cc.logID(2400, t)
            }
        }, e.exports = cc.macro
    }), {
        "./_CCClass": 91
    }],
    85: [(function(t, e, i) {
        function n() {
            this._name = "", this._objFlags = 0
        }

        function r() {
            for (var t = a.length, e = 0; e < t; ++e) {
                var i = a[e];
                i._objFlags & c || i._destroyImmediate()
            }
            t === a.length ? a.length = 0 : a.splice(0, t)
        }
        var s = t("./js"),
            o = t("./CCClass"),
            c = 1;
        o.fastDefine("cc.Object", n, {
            _name: "",
            _objFlags: 0
        }), s.value(n, "Flags", {
            Destroyed: c,
            DontSave: 8,
            EditorOnly: 16,
            Dirty: 32,
            DontDestroy: 64,
            PersistentMask: -4192741,
            Destroying: 128,
            Deactivating: 256,
            IsPreloadStarted: 8192,
            IsOnLoadStarted: 32768,
            IsOnLoadCalled: 16384,
            IsOnEnableCalled: 2048,
            IsStartCalled: 65536,
            IsEditorOnEnableCalled: 4096,
            IsPositionLocked: 1 << 21,
            IsRotationLocked: 1 << 17,
            IsScaleLocked: 1 << 18,
            IsAnchorLocked: 1 << 19,
            IsSizeLocked: 1 << 20
        });
        var a = [];
        s.value(n, "_deferredDestroy", r);
        var h = n.prototype;
        s.getset(h, "name", (function() {
            return this._name
        }), (function(t) {
            this._name = t
        })), s.get(h, "isValid", (function() {
            return !(this._objFlags & c)
        }));
        h.destroy = function() {
            return this._objFlags & c ? (cc.warnID(5e3), !1) : !(4 & this._objFlags) && (this._objFlags |= 4, a.push(this), !0)
        }, h._destruct = function() {
            var t = this.constructor,
                e = t.__destruct__;
            e || (e = (function(t, e) {
                var i, n = {};
                for (i in t)
                    if (t.hasOwnProperty(i)) switch (typeof t[i]) {
                        case "string":
                            n[i] = "";
                            break;
                        case "object":
                        case "function":
                            n[i] = null
                    }
                if (cc.Class._isCCClass(e))
                    for (var r = cc.Class.Attr.getClassAttrs(e), s = e.__props__, c = 0; c < s.length; c++) {
                        var a = (i = s[c]) + cc.Class.Attr.DELIMETER + "default";
                        if (a in r) switch (typeof r[a]) {
                            case "string":
                                n[i] = "";
                                break;
                            case "object":
                            case "function":
                                n[i] = null;
                                break;
                            case "undefined":
                                n[i] = void 0
                        }
                    }
                var h = t instanceof cc._BaseNode || t instanceof cc.Component,
                    l = "";
                for (i in n)
                    if (!h || "_id" !== i) {
                        var u;
                        u = o.IDENTIFIER_RE.test(i) ? "o." + i + "=" : "o[" + o.escapeForJS(i) + "]=";
                        var _ = n[i];
                        "" === _ && (_ = '""'), l += u + _ + ";\n"
                    }
                return Function("o", l)
            })(this, t), s.value(t, "__destruct__", e, !0)), e(this)
        }, h._onPreDestroy = null, h._destroyImmediate = function() {
            this._objFlags & c ? cc.errorID(5e3) : (this._onPreDestroy && this._onPreDestroy(), this._destruct(), this._objFlags |= c)
        }, h._deserialize = null, cc.isValid = function(t, e) {
            return "object" == typeof t ? !(!t || t._objFlags & (e ? 4 | c : c)) : void 0 !== t
        }, cc.Object = e.exports = n
    }), {
        "./CCClass": 79,
        "./js": 100
    }],
    86: [(function(t, e, i) {
        cc.SAXParser = cc._Class.extend({
            ctor: function() {
                window.DOMParser ? (this._isSupportDOMParser = !0, this._parser = new DOMParser) : (this._isSupportDOMParser = !1, this._parser = null)
            },
            parse: function(t) {
                return this._parseXML(t)
            },
            _parseXML: function(t) {
                var e;
                return this._isSupportDOMParser ? e = this._parser.parseFromString(t, "text/xml") : ((e = new ActiveXObject("Microsoft.XMLDOM")).async = "false", e.loadXML(t)), e
            }
        }), cc.PlistParser = cc.SAXParser.extend({
            parse: function(t) {
                var e = this._parseXML(t),
                    i = e.documentElement;
                if ("plist" !== i.tagName) return cc.warnID(5100), {};
                for (var n = null, r = 0, s = i.childNodes.length; r < s && 1 !== (n = i.childNodes[r]).nodeType; r++);
                return e = null, this._parseNode(n)
            },
            _parseNode: function(t) {
                var e = null,
                    i = t.tagName;
                if ("dict" === i) e = this._parseDict(t);
                else if ("array" === i) e = this._parseArray(t);
                else if ("string" === i)
                    if (1 === t.childNodes.length) e = t.firstChild.nodeValue;
                    else {
                        e = "";
                        for (var n = 0; n < t.childNodes.length; n++) e += t.childNodes[n].nodeValue
                    }
                else "false" === i ? e = !1 : "true" === i ? e = !0 : "real" === i ? e = parseFloat(t.firstChild.nodeValue) : "integer" === i && (e = parseInt(t.firstChild.nodeValue, 10));
                return e
            },
            _parseArray: function(t) {
                for (var e = [], i = 0, n = t.childNodes.length; i < n; i++) {
                    var r = t.childNodes[i];
                    1 === r.nodeType && e.push(this._parseNode(r))
                }
                return e
            },
            _parseDict: function(t) {
                for (var e = {}, i = null, n = 0, r = t.childNodes.length; n < r; n++) {
                    var s = t.childNodes[n];
                    1 === s.nodeType && ("key" === s.tagName ? i = s.firstChild.nodeValue : e[i] = this._parseNode(s))
                }
                return e
            }
        }), cc.saxParser = new cc.SAXParser, cc.plistParser = new cc.PlistParser
    }), {}],
    87: [(function(t, e, i) {
        cc.screen = {
            _supportsFullScreen: !1,
            _preOnFullScreenChange: null,
            _touchEvent: "",
            _fn: null,
            _fnMap: [
                ["requestFullscreen", "exitFullscreen", "fullscreenchange", "fullscreenEnabled", "fullscreenElement"],
                ["requestFullScreen", "exitFullScreen", "fullScreenchange", "fullScreenEnabled", "fullScreenElement"],
                ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitIsFullScreen", "webkitCurrentFullScreenElement"],
                ["mozRequestFullScreen", "mozCancelFullScreen", "mozfullscreenchange", "mozFullScreen", "mozFullScreenElement"],
                ["msRequestFullscreen", "msExitFullscreen", "MSFullscreenChange", "msFullscreenEnabled", "msFullscreenElement"]
            ],
            init: function() {
                this._fn = {};
                var t, e, i, n, r = this._fnMap;
                for (t = 0, e = r.length; t < e; t++)
                    if ((i = r[t]) && void 0 !== document[i[1]]) {
                        for (t = 0, n = i.length; t < n; t++) this._fn[r[0][t]] = i[t];
                        break
                    }
                this._supportsFullScreen = void 0 !== this._fn.requestFullscreen, this._touchEvent = "ontouchstart" in window ? "touchstart" : "mousedown"
            },
            fullScreen: function() {
                return !!this._supportsFullScreen && (void 0 !== document[this._fn.fullscreenElement] && null !== document[this._fn.fullscreenElement])
            },
            requestFullScreen: function(t, e) {
                if (this._supportsFullScreen) {
                    if (t = t || document.documentElement, e) {
                        var i = this._fn.fullscreenchange;
                        this._preOnFullScreenChange && document.removeEventListener(i, this._preOnFullScreenChange), this._preOnFullScreenChange = e, document.addEventListener(i, e, !1)
                    }
                    return t[this._fn.requestFullscreen]()
                }
            },
            exitFullScreen: function() {
                return !this._supportsFullScreen || document[this._fn.exitFullscreen]()
            },
            autoFullScreen: function(t, e) {
                function i() {
                    n.removeEventListener(r._touchEvent, i), r.requestFullScreen(t, e)
                }
                t = t || document.body;
                var n = cc.game.canvas || t,
                    r = this;
                this.requestFullScreen(t, e), n.addEventListener(this._touchEvent, i)
            }
        }, cc.screen.init()
    }), {}],
    88: [(function(t, e, i) {
        if (!cc.sys) {
            cc.sys = {};
            var n = cc.sys;
            n.LANGUAGE_ENGLISH = "en", n.LANGUAGE_CHINESE = "zh", n.LANGUAGE_FRENCH = "fr", n.LANGUAGE_ITALIAN = "it", n.LANGUAGE_GERMAN = "de", n.LANGUAGE_SPANISH = "es", n.LANGUAGE_DUTCH = "du", n.LANGUAGE_RUSSIAN = "ru", n.LANGUAGE_KOREAN = "ko", n.LANGUAGE_JAPANESE = "ja", n.LANGUAGE_HUNGARIAN = "hu", n.LANGUAGE_PORTUGUESE = "pt", n.LANGUAGE_ARABIC = "ar", n.LANGUAGE_NORWEGIAN = "no", n.LANGUAGE_POLISH = "pl", n.LANGUAGE_TURKISH = "tr", n.LANGUAGE_UKRAINIAN = "uk", n.LANGUAGE_ROMANIAN = "ro", n.LANGUAGE_BULGARIAN = "bg", n.LANGUAGE_UNKNOWN = "unknown", n.OS_IOS = "iOS", n.OS_ANDROID = "Android", n.OS_WINDOWS = "Windows", n.OS_MARMALADE = "Marmalade", n.OS_LINUX = "Linux", n.OS_BADA = "Bada", n.OS_BLACKBERRY = "Blackberry", n.OS_OSX = "OS X", n.OS_WP8 = "WP8", n.OS_WINRT = "WINRT", n.OS_UNKNOWN = "Unknown", n.UNKNOWN = -1, n.WIN32 = 0, n.LINUX = 1, n.MACOS = 2, n.ANDROID = 3, n.IPHONE = 4, n.IPAD = 5, n.BLACKBERRY = 6, n.NACL = 7, n.EMSCRIPTEN = 8, n.TIZEN = 9, n.WINRT = 10, n.WP8 = 11, n.MOBILE_BROWSER = 100, n.DESKTOP_BROWSER = 101, n.EDITOR_PAGE = 102, n.EDITOR_CORE = 103, n.WECHAT_GAME = 104, n.QQ_PLAY = 105, n.BROWSER_TYPE_WECHAT = "wechat", n.BROWSER_TYPE_WECHAT_GAME = "wechatgame", n.BROWSER_TYPE_WECHAT_GAME_SUB = "wechatgamesub", n.BROWSER_TYPE_QQ_PLAY = "qqplay", n.BROWSER_TYPE_ANDROID = "androidbrowser", n.BROWSER_TYPE_IE = "ie", n.BROWSER_TYPE_QQ = "qqbrowser", n.BROWSER_TYPE_MOBILE_QQ = "mqqbrowser", n.BROWSER_TYPE_UC = "ucbrowser", n.BROWSER_TYPE_360 = "360browser", n.BROWSER_TYPE_BAIDU_APP = "baiduboxapp", n.BROWSER_TYPE_BAIDU = "baidubrowser", n.BROWSER_TYPE_MAXTHON = "maxthon", n.BROWSER_TYPE_OPERA = "opera", n.BROWSER_TYPE_OUPENG = "oupeng", n.BROWSER_TYPE_MIUI = "miuibrowser", n.BROWSER_TYPE_FIREFOX = "firefox", n.BROWSER_TYPE_SAFARI = "safari", n.BROWSER_TYPE_CHROME = "chrome", n.BROWSER_TYPE_LIEBAO = "liebao", n.BROWSER_TYPE_QZONE = "qzone", n.BROWSER_TYPE_SOUGOU = "sogou", n.BROWSER_TYPE_UNKNOWN = "unknown", n.isNative = !1, n.isBrowser = "object" == typeof window && "object" == typeof document && !0, cc.create3DContext = function(t, e, i) {
                if (!i) return cc.create3DContext(t, e, "webgl") || cc.create3DContext(t, e, "experimental-webgl") || cc.create3DContext(t, e, "webkit-3d") || cc.create3DContext(t, e, "moz-webgl") || null;
                try {
                    return t.getContext(i, e)
                } catch (t) {
                    return null
                }
            };
            var r = window,
                s = r.navigator,
                o = document,
                c = o.documentElement,
                a = s.userAgent.toLowerCase();
            n.isMobile = /mobile|android|iphone|ipad/.test(a), n.platform = n.isMobile ? n.MOBILE_BROWSER : n.DESKTOP_BROWSER;
            var h = s.language;
            h = (h = h || s.browserLanguage) ? h.split("-")[0] : n.LANGUAGE_ENGLISH, n.language = h;
            var l = !1,
                u = !1,
                _ = "",
                d = 0,
                f = /android (\d+(?:\.\d+)+)/i.exec(a) || /android (\d+(?:\.\d+)+)/i.exec(s.platform);
            f && (l = !0, _ = f[1] || "", d = parseInt(_) || 0), (f = /(iPad|iPhone|iPod).*OS ((\d+_?){2,3})/i.exec(a)) ? (u = !0, _ = f[2] || "", d = parseInt(_) || 0) : /(iPhone|iPad|iPod)/.exec(s.platform) && (u = !0, _ = "", d = 0);
            var p = n.OS_UNKNOWN; - 1 !== s.appVersion.indexOf("Win") ? p = n.OS_WINDOWS : u ? p = n.OS_IOS : -1 !== s.appVersion.indexOf("Mac") ? p = n.OS_OSX : -1 !== s.appVersion.indexOf("X11") && -1 === s.appVersion.indexOf("Linux") ? p = n.OS_UNIX : l ? p = n.OS_ANDROID : -1 === s.appVersion.indexOf("Linux") && -1 === a.indexOf("ubuntu") || (p = n.OS_LINUX), n.os = p, n.osVersion = _, n.osMainVersion = d, n.browserType = n.BROWSER_TYPE_UNKNOWN, (function() {
                var t = /mqqbrowser|micromessenger|qq|sogou|qzone|liebao|maxthon|ucbrowser|360 aphone|360browser|baiduboxapp|baidubrowser|maxthon|mxbrowser|miuibrowser/i.exec(a);
                t || (t = /qqbrowser|chrome|safari|firefox|trident|opera|opr\/|oupeng/i.exec(a));
                var e = t ? t[0].toLowerCase() : n.BROWSER_TYPE_UNKNOWN;
                "micromessenger" === e ? e = n.BROWSER_TYPE_WECHAT : "safari" === e && l ? e = n.BROWSER_TYPE_ANDROID : "qq" === e && a.match(/android.*applewebkit/i) ? e = n.BROWSER_TYPE_ANDROID : "trident" === e ? e = n.BROWSER_TYPE_IE : "360 aphone" === e ? e = n.BROWSER_TYPE_360 : "mxbrowser" === e ? e = n.BROWSER_TYPE_MAXTHON : "opr/" === e && (e = n.BROWSER_TYPE_OPERA), n.browserType = e
            })(), n.browserVersion = "", (function() {
                var t = a.match(/(mqqbrowser|micromessenger|qq|sogou|qzone|liebao|maxthon|uc|360 aphone|360|baiduboxapp|baidu|maxthon|mxbrowser|miui)(mobile)?(browser)?\/?([\d.]+)/i);
                t || (t = a.match(/(qqbrowser|chrome|safari|firefox|trident|opera|opr\/|oupeng)(mobile)?(browser)?\/?([\d.]+)/i)), n.browserVersion = t ? t[4] : ""
            })();
            var g = window.innerWidth || document.documentElement.clientWidth,
                m = window.innerHeight || document.documentElement.clientHeight,
                v = window.devicePixelRatio || 1;
            n.windowPixelResolution = {
                width: v * g,
                height: v * m
            }, n._checkWebGLRenderMode = function() {
                if (cc._renderType !== cc.game.RENDER_TYPE_WEBGL) throw new Error("This feature supports WebGL render mode only.")
            };
            var y = document.createElement("canvas"),
                C = document.createElement("canvas");
            if (n._supportCanvasNewBlendModes = (function() {
                    var t = y;
                    t.width = 1, t.height = 1;
                    var e = t.getContext("2d");
                    e.fillStyle = "#000", e.fillRect(0, 0, 1, 1), e.globalCompositeOperation = "multiply";
                    var i = C;
                    i.width = 1, i.height = 1;
                    var n = i.getContext("2d");
                    return n.fillStyle = "#fff", n.fillRect(0, 0, 1, 1), e.drawImage(i, 0, 0, 1, 1), 0 === e.getImageData(0, 0, 1, 1).data[0]
                })(), cc.sys.isMobile) {
                var T = document.createElement("style");
                T.type = "text/css", document.body.appendChild(T), T.textContent = "body,canvas,div{ -moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;-khtml-user-select: none;-webkit-tap-highlight-color:rgba(0,0,0,0);}"
            }
            try {
                var E = n.localStorage = r.localStorage;
                E.setItem("storage", ""), E.removeItem("storage"), E = null
            } catch (t) {
                var x = function() {
                    cc.warnID(5200)
                };
                n.localStorage = {
                    getItem: x,
                    setItem: x,
                    removeItem: x,
                    clear: x
                }
            }
            var R = y.toDataURL("image/webp").startsWith("data:image/webp"),
                S = !!y.getContext("2d"),
                w = !1;
            if (r.WebGLRenderingContext && (cc.create3DContext(document.createElement("CANVAS")) && (w = !0), w && n.os === n.OS_ANDROID)) {
                var A = parseFloat(n.browserVersion);
                switch (n.browserType) {
                    case n.BROWSER_TYPE_MOBILE_QQ:
                    case n.BROWSER_TYPE_BAIDU:
                    case n.BROWSER_TYPE_BAIDU_APP:
                        w = A >= 6.2;
                        break;
                    case n.BROWSER_TYPE_ANDROID:
                        n.osMainVersion && n.osMainVersion >= 5 && (w = !0);
                        break;
                    case n.BROWSER_TYPE_CHROME:
                        w = A >= 30;
                        break;
                    case n.BROWSER_TYPE_UC:
                        w = A > 11;
                    case n.BROWSER_TYPE_360:
                        w = !1
                }
            }
            var b = n.capabilities = {
                canvas: S,
                opengl: w,
                webp: R
            };
            (void 0 !== c.ontouchstart || void 0 !== o.ontouchstart || s.msPointerEnabled) && (b.touches = !0), void 0 !== c.onmouseup && (b.mouse = !0), void 0 !== c.onkeyup && (b.keyboard = !0), (r.DeviceMotionEvent || r.DeviceOrientationEvent) && (b.accelerometer = !0);
            var I;
            (function() {
                n.browserVersion;
                var t = !!(window.AudioContext || window.webkitAudioContext || window.mozAudioContext);
                I = {
                    ONLY_ONE: !1,
                    WEB_AUDIO: t,
                    DELAY_CREATE_CTX: !1
                }, n.os === n.OS_IOS && (I.USE_LOADER_EVENT = "loadedmetadata"), n.browserType === n.BROWSER_TYPE_FIREFOX && (I.DELAY_CREATE_CTX = !0, I.USE_LOADER_EVENT = "canplay"), n.os === n.OS_ANDROID && n.browserType === n.BROWSER_TYPE_UC && (I.ONE_SOURCE = !0)
            })();
            try {
                I.WEB_AUDIO && (I.context = new(window.AudioContext || window.webkitAudioContext || window.mozAudioContext), I.DELAY_CREATE_CTX && setTimeout((function() {
                    I.context = new(window.AudioContext || window.webkitAudioContext || window.mozAudioContext)
                }), 0))
            } catch (t) {
                I.WEB_AUDIO = !1, cc.logID(5201)
            }
            I.format = (function() {
                var t = [],
                    e = document.createElement("audio");
                e.canPlayType && (e.canPlayType('audio/ogg; codecs="vorbis"') && t.push(".ogg"), e.canPlayType("audio/mpeg") && t.push(".mp3"), e.canPlayType('audio/wav; codecs="1"') && t.push(".wav"), e.canPlayType("audio/mp4") && t.push(".mp4"), e.canPlayType("audio/x-m4a") && t.push(".m4a"));
                return t
            })(), n.__audioSupport = I;
            n.garbageCollect = function() {}, n.dumpRoot = function() {}, n.restartVM = function() {}, n.cleanScript = function(t) {}, n.isObjectValid = function(t) {
                return !!t
            }, n.dump = function() {
                var t = "";
                t += "isMobile : " + this.isMobile + "\r\n", t += "language : " + this.language + "\r\n", t += "browserType : " + this.browserType + "\r\n", t += "browserVersion : " + this.browserVersion + "\r\n", t += "capabilities : " + JSON.stringify(this.capabilities) + "\r\n", t += "os : " + this.os + "\r\n", t += "osVersion : " + this.osVersion + "\r\n", t += "platform : " + this.platform + "\r\n", t += "Using " + (cc._renderType === cc.game.RENDER_TYPE_WEBGL ? "WEBGL" : "CANVAS") + " renderer.\r\n", cc.log(t)
            }, n.openURL = function(t) {
                window.open(t)
            }, n.now = function() {
                return Date.now ? Date.now() : +new Date
            }, e.exports = n
        }
    }), {}],
    89: [(function(t, e, i) {
        var n = t("../event-manager"),
            r = {
                init: function() {
                    this.html = document.getElementsByTagName("html")[0]
                },
                availWidth: function(t) {
                    return t && t !== this.html ? t.clientWidth : window.innerWidth
                },
                availHeight: function(t) {
                    return t && t !== this.html ? t.clientHeight : window.innerHeight
                },
                meta: {
                    width: "device-width"
                },
                adaptationType: cc.sys.browserType
            };
        switch (cc.sys.os === cc.sys.OS_IOS && (r.adaptationType = cc.sys.BROWSER_TYPE_SAFARI), r.adaptationType) {
            case cc.sys.BROWSER_TYPE_SAFARI:
                r.meta["minimal-ui"] = "true", r.availWidth = function(t) {
                    return t.clientWidth
                }, r.availHeight = function(t) {
                    return t.clientHeight
                };
                break;
            case cc.sys.BROWSER_TYPE_CHROME:
                r.__defineGetter__("target-densitydpi", (function() {
                    return cc.view._targetDensityDPI
                }));
                break;
            case cc.sys.BROWSER_TYPE_SOUGOU:
            case cc.sys.BROWSER_TYPE_UC:
                r.availWidth = function(t) {
                    return t.clientWidth
                }, r.availHeight = function(t) {
                    return t.clientHeight
                };
                break;
            case cc.sys.BROWSER_TYPE_MIUI:
                r.init = function(t) {
                    if (!t.__resizeWithBrowserSize) {
                        var e = function() {
                            t.setDesignResolutionSize(t._designResolutionSize.width, t._designResolutionSize.height, t._resolutionPolicy), window.removeEventListener("resize", e, !1)
                        };
                        window.addEventListener("resize", e, !1)
                    }
                };
                break;
            case cc.sys.BROWSER_TYPE_WECHAT_GAME:
                r.availWidth = function() {
                    return window.innerWidth
                }, r.availHeight = function() {
                    return window.innerHeight
                };
                break;
            case cc.sys.BROWSER_TYPE_WECHAT_GAME_SUB:
                var s = wx.getSharedCanvas();
                r.availWidth = function() {
                    return s.width
                }, r.availHeight = function() {
                    return s.height
                }
        }
        var o = null,
            c = cc._Class.extend({
                ctor: function() {
                    var t = cc.ContainerStrategy,
                        e = cc.ContentStrategy;
                    r.init(this), this._frameSize = cc.size(0, 0), this._initFrameSize();
                    var i = cc.game.canvas.width,
                        n = cc.game.canvas.height;
                    this._designResolutionSize = cc.size(i, n), this._originalDesignResolutionSize = cc.size(i, n), this._viewPortRect = cc.rect(0, 0, i, n), this._visibleRect = cc.rect(0, 0, i, n), this._contentTranslateLeftTop = {
                        left: 0,
                        top: 0
                    }, this._autoFullScreen = !1, this._devicePixelRatio = 1, this._viewName = "Cocos2dHTML5", this._resizeCallback = null, this._orientationChanging = !0, this._resizing = !1, this._scaleX = 1, this._originalScaleX = 1, this._scaleY = 1, this._originalScaleY = 1, this._isRotated = !1, this._orientation = 3;
                    var s = cc.sys;
                    this.enableRetina(s.os === s.OS_IOS || s.os === s.OS_OSX), cc.visibleRect && cc.visibleRect.init(this._visibleRect), this._resolutionPolicy = null, this._rpExactFit = new cc.ResolutionPolicy(t.EQUAL_TO_FRAME, e.EXACT_FIT), this._rpShowAll = new cc.ResolutionPolicy(t.PROPORTION_TO_FRAME, e.SHOW_ALL), this._rpNoBorder = new cc.ResolutionPolicy(t.EQUAL_TO_FRAME, e.NO_BORDER), this._rpFixedHeight = new cc.ResolutionPolicy(t.EQUAL_TO_FRAME, e.FIXED_HEIGHT), this._rpFixedWidth = new cc.ResolutionPolicy(t.EQUAL_TO_FRAME, e.FIXED_WIDTH), this._initialized = !1, this._contentTranslateLeftTop = null, this._frameZoomFactor = 1, this.__resizeWithBrowserSize = !1, this._isAdjustViewPort = !0, this._targetDensityDPI = cc.macro.DENSITYDPI_HIGH, this.enableAntiAlias(!0)
                },
                _resizeEvent: function() {
                    var t, e = (t = this.setDesignResolutionSize ? this : cc.view)._frameSize.width,
                        i = t._frameSize.height,
                        r = t._isRotated;
                    if (cc.sys.isMobile) {
                        var s = cc.game.container.style,
                            o = s.margin;
                        s.margin = "0", s.display = "none", t._initFrameSize(), s.margin = o, s.display = "block"
                    } else t._initFrameSize();
                    if (t._isRotated !== r || t._frameSize.width !== e || t._frameSize.height !== i) {
                        var c = t._originalDesignResolutionSize.width,
                            a = t._originalDesignResolutionSize.height;
                        t._resizing = !0, c > 0 && t.setDesignResolutionSize(c, a, t._resolutionPolicy), t._resizing = !1, n.dispatchCustomEvent("canvas-resize"), t._resizeCallback && t._resizeCallback.call()
                    }
                },
                _orientationChange: function() {
                    cc.view._orientationChanging = !0, cc.view._resizeEvent()
                },
                setTargetDensityDPI: function(t) {
                    this._targetDensityDPI = t, this._adjustViewportMeta()
                },
                getTargetDensityDPI: function() {
                    return this._targetDensityDPI
                },
                resizeWithBrowserSize: function(t) {
                    t ? this.__resizeWithBrowserSize || (this.__resizeWithBrowserSize = !0, window.addEventListener("resize", this._resizeEvent), window.addEventListener("orientationchange", this._orientationChange)) : this.__resizeWithBrowserSize && (this.__resizeWithBrowserSize = !1, window.removeEventListener("resize", this._resizeEvent), window.removeEventListener("orientationchange", this._orientationChange))
                },
                setResizeCallback: function(t) {
                    "function" != typeof t && null != t || (this._resizeCallback = t)
                },
                setOrientation: function(t) {
                    if ((t &= cc.macro.ORIENTATION_AUTO) && this._orientation !== t) {
                        this._orientation = t;
                        var e = this._originalDesignResolutionSize.width,
                            i = this._originalDesignResolutionSize.height;
                        this.setDesignResolutionSize(e, i, this._resolutionPolicy)
                    }
                },
                _initFrameSize: function() {
                    var t = this._frameSize,
                        e = r.availWidth(cc.game.frame),
                        i = r.availHeight(cc.game.frame),
                        n = e >= i;
                    !cc.sys.isMobile || n && this._orientation & cc.macro.ORIENTATION_LANDSCAPE || !n && this._orientation & cc.macro.ORIENTATION_PORTRAIT ? (t.width = e, t.height = i, cc.container.style["-webkit-transform"] = "rotate(0deg)", cc.container.style.transform = "rotate(0deg)", this._isRotated = !1) : (t.width = i, t.height = e, cc.container.style["-webkit-transform"] = "rotate(90deg)", cc.container.style.transform = "rotate(90deg)", cc.container.style["-webkit-transform-origin"] = "0px 0px 0px", cc.container.style.transformOrigin = "0px 0px 0px", this._isRotated = !0), this._orientationChanging && setTimeout((function() {
                        cc.view._orientationChanging = !1
                    }), 1e3)
                },
                _adjustSizeKeepCanvasSize: function() {
                    var t = this._originalDesignResolutionSize.width,
                        e = this._originalDesignResolutionSize.height;
                    t > 0 && this.setDesignResolutionSize(t, e, this._resolutionPolicy)
                },
                _setViewportMeta: function(t, e) {
                    var i = document.getElementById("cocosMetaElement");
                    i && e && document.head.removeChild(i);
                    var n, r, s, o = document.getElementsByName("viewport"),
                        c = o ? o[0] : null;
                    n = c ? c.content : "", (i = i || document.createElement("meta")).id = "cocosMetaElement", i.name = "viewport", i.content = "";
                    for (r in t) - 1 == n.indexOf(r) ? n += "," + r + "=" + t[r] : e && (s = new RegExp(r + "s*=s*[^,]+"), n.replace(s, r + "=" + t[r]));
                    /^,/.test(n) && (n = n.substr(1)), i.content = n, c && (c.content = n), document.head.appendChild(i)
                },
                _adjustViewportMeta: function() {
                    this._isAdjustViewPort && (this._setViewportMeta(r.meta, !1), this._isAdjustViewPort = !1)
                },
                _resetScale: function() {
                    this._scaleX = this._originalScaleX, this._scaleY = this._originalScaleY
                },
                _adjustSizeToBrowser: function() {},
                initialize: function() {
                    this._initialized = !0
                },
                adjustViewPort: function(t) {
                    this._isAdjustViewPort = t
                },
                enableRetina: function(t) {
                    this._retinaEnabled = !!t
                },
                isRetinaEnabled: function() {
                    return this._retinaEnabled
                },
                enableAntiAlias: function(t) {
                    if (this._antiAliasEnabled !== t)
                        if (this._antiAliasEnabled = t, cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
                            var e = cc.loader._cache;
                            for (var i in e) {
                                var n = e[i],
                                    r = n && n.content instanceof cc.Texture2D ? n.content : null;
                                r && (t ? r.setAntiAliasTexParameters() : r.setAliasTexParameters())
                            }
                        } else if (cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
                        var s = cc._canvas.getContext("2d");
                        s.imageSmoothingEnabled = t, s.mozImageSmoothingEnabled = t;
                        var o = cc.rendererCanvas._dirtyRegion;
                        if (o) {
                            var c = new cc.Region;
                            c.setTo(0, 0, cc.visibleRect.width, cc.visibleRect.height), o.addRegion(c)
                        }
                    }
                },
                isAntiAliasEnabled: function() {
                    return this._antiAliasEnabled
                },
                enableAutoFullScreen: function(t) {
                    t && t !== this._autoFullScreen && cc.sys.isMobile && cc.sys.browserType !== cc.sys.BROWSER_TYPE_WECHAT ? (this._autoFullScreen = !0, cc.screen.autoFullScreen(cc.game.frame)) : this._autoFullScreen = !1
                },
                isAutoFullScreenEnabled: function() {
                    return this._autoFullScreen
                },
                isViewReady: function() {
                    return cc.game.canvas && cc._renderContext
                },
                setFrameZoomFactor: function(t) {
                    this._frameZoomFactor = t, cc.director.setProjection(cc.director.getProjection())
                },
                setContentTranslateLeftTop: function(t, e) {
                    this._contentTranslateLeftTop = {
                        left: t,
                        top: e
                    }
                },
                getContentTranslateLeftTop: function() {
                    return this._contentTranslateLeftTop
                },
                setCanvasSize: function(t, e) {
                    var i = cc.game.canvas,
                        n = cc.game.container;
                    i.width = t * this._devicePixelRatio, i.height = e * this._devicePixelRatio, i.style.width = t + "px", i.style.height = e + "px", n.style.width = t + "px", n.style.height = e + "px", this._resizeEvent()
                },
                getCanvasSize: function() {
                    return cc.size(cc.game.canvas.width, cc.game.canvas.height)
                },
                getFrameSize: function() {
                    return cc.size(this._frameSize.width, this._frameSize.height)
                },
                setFrameSize: function(t, e) {
                    this._frameSize.width = t, this._frameSize.height = e, cc.game.frame.style.width = t + "px", cc.game.frame.style.height = e + "px", this._resizeEvent(), cc.director.setProjection(cc.director.getProjection())
                },
                getVisibleSize: function() {
                    return cc.size(this._visibleRect.width, this._visibleRect.height)
                },
                getVisibleSizeInPixel: function() {
                    return cc.size(this._visibleRect.width * this._scaleX, this._visibleRect.height * this._scaleY)
                },
                getVisibleOrigin: function() {
                    return cc.p(this._visibleRect.x, this._visibleRect.y)
                },
                getVisibleOriginInPixel: function() {
                    return cc.p(this._visibleRect.x * this._scaleX, this._visibleRect.y * this._scaleY)
                },
                canSetContentScaleFactor: function() {
                    return !0
                },
                getResolutionPolicy: function() {
                    return this._resolutionPolicy
                },
                setResolutionPolicy: function(t) {
                    if (t instanceof cc.ResolutionPolicy) this._resolutionPolicy = t;
                    else {
                        var e = cc.ResolutionPolicy;
                        t === e.EXACT_FIT && (this._resolutionPolicy = this._rpExactFit), t === e.SHOW_ALL && (this._resolutionPolicy = this._rpShowAll), t === e.NO_BORDER && (this._resolutionPolicy = this._rpNoBorder), t === e.FIXED_HEIGHT && (this._resolutionPolicy = this._rpFixedHeight), t === e.FIXED_WIDTH && (this._resolutionPolicy = this._rpFixedWidth)
                    }
                },
                setDesignResolutionSize: function(t, e, i) {
                    if (t > 0 || e > 0) {
                        this.setResolutionPolicy(i);
                        var n = this._resolutionPolicy;
                        if (n && n.preApply(this), cc.sys.isMobile && this._adjustViewportMeta(), this._orientationChanging = !0, this._resizing || this._initFrameSize(), n) {
                            this._originalDesignResolutionSize.width = this._designResolutionSize.width = t, this._originalDesignResolutionSize.height = this._designResolutionSize.height = e;
                            var r = n.apply(this, this._designResolutionSize);
                            if (r.scale && 2 === r.scale.length && (this._scaleX = r.scale[0], this._scaleY = r.scale[1]), r.viewport) {
                                var s = this._viewPortRect,
                                    o = this._visibleRect,
                                    c = r.viewport;
                                s.x = c.x, s.y = c.y, s.width = c.width, s.height = c.height, o.x = -s.x / this._scaleX, o.y = -s.y / this._scaleY, o.width = cc.game.canvas.width / this._scaleX, o.height = cc.game.canvas.height / this._scaleY, cc._renderContext.setOffset && cc._renderContext.setOffset(s.x, -s.y)
                            }
                            var a = cc.director;
                            a._winSizeInPoints.width = this._designResolutionSize.width, a._winSizeInPoints.height = this._designResolutionSize.height, n.postApply(this), cc.winSize.width = a._winSizeInPoints.width, cc.winSize.height = a._winSizeInPoints.height, cc._renderType === cc.game.RENDER_TYPE_WEBGL ? a.setGLDefaultValues() : cc._renderType === cc.game.RENDER_TYPE_CANVAS && (cc.renderer._allNeedDraw = !0), this._originalScaleX = this._scaleX, this._originalScaleY = this._scaleY, cc.visibleRect && cc.visibleRect.init(this._visibleRect)
                        } else cc.logID(2201)
                    } else cc.logID(2200)
                },
                getDesignResolutionSize: function() {
                    return cc.size(this._designResolutionSize.width, this._designResolutionSize.height)
                },
                setRealPixelResolution: function(t, e, i) {
                    this._setViewportMeta({
                        width: t
                    }, !0), document.documentElement.style.width = t + "px", document.body.style.width = t + "px", document.body.style.left = "0px", document.body.style.top = "0px", this.setDesignResolutionSize(t, e, i)
                },
                setViewPortInPoints: function(t, e, i, n) {
                    var r = this._frameZoomFactor,
                        s = this._scaleX,
                        o = this._scaleY;
                    cc._renderContext.viewport(t * s * r + this._viewPortRect.x * r, e * o * r + this._viewPortRect.y * r, i * s * r, n * o * r)
                },
                setScissorInPoints: function(t, e, i, n) {
                    var r = this._frameZoomFactor,
                        s = this._scaleX,
                        c = this._scaleY,
                        a = Math.ceil(t * s * r + this._viewPortRect.x * r),
                        h = Math.ceil(e * c * r + this._viewPortRect.y * r),
                        l = Math.ceil(i * s * r),
                        u = Math.ceil(n * c * r);
                    if (!o) {
                        var _ = gl.getParameter(gl.SCISSOR_BOX);
                        o = cc.rect(_[0], _[1], _[2], _[3])
                    }
                    o.x === a && o.y === h && o.width === l && o.height === u || (o.x = a, o.y = h, o.width = l, o.height = u, cc._renderContext.scissor(a, h, l, u))
                },
                isScissorEnabled: function() {
                    return cc._renderContext.isEnabled(gl.SCISSOR_TEST)
                },
                getScissorRect: function() {
                    if (!o) {
                        var t = gl.getParameter(gl.SCISSOR_BOX);
                        o = cc.rect(t[0], t[1], t[2], t[3])
                    }
                    var e = 1 / this._scaleX,
                        i = 1 / this._scaleY;
                    return cc.rect((o.x - this._viewPortRect.x) * e, (o.y - this._viewPortRect.y) * i, o.width * e, o.height * i)
                },
                setViewName: function(t) {
                    null != t && t.length > 0 && (this._viewName = t)
                },
                getViewName: function() {
                    return this._viewName
                },
                getViewPortRect: function() {
                    return this._viewPortRect
                },
                getScaleX: function() {
                    return this._scaleX
                },
                getScaleY: function() {
                    return this._scaleY
                },
                getDevicePixelRatio: function() {
                    return this._devicePixelRatio
                },
                convertToLocationInView: function(t, e, i) {
                    var n = this._devicePixelRatio * (t - i.left),
                        r = this._devicePixelRatio * (i.top + i.height - e);
                    return this._isRotated ? {
                        x: this._viewPortRect.width - r,
                        y: n
                    } : {
                        x: n,
                        y: r
                    }
                },
                _convertMouseToLocationInView: function(t, e) {
                    var i = this._viewPortRect;
                    t.x = (this._devicePixelRatio * (t.x - e.left) - i.x) / this._scaleX, t.y = (this._devicePixelRatio * (e.top + e.height - t.y) - i.y) / this._scaleY
                },
                _convertPointWithScale: function(t) {
                    var e = this._viewPortRect;
                    t.x = (t.x - e.x) / this._scaleX, t.y = (t.y - e.y) / this._scaleY
                },
                _convertTouchesWithScale: function(t) {
                    for (var e, i, n, r = this._viewPortRect, s = this._scaleX, o = this._scaleY, c = 0; c < t.length; c++) i = (e = t[c])._point, n = e._prevPoint, i.x = (i.x - r.x) / s, i.y = (i.y - r.y) / o, n.x = (n.x - r.x) / s, n.y = (n.y - r.y) / o
                }
            });
        c._getInstance = function() {
            return this._instance || (this._instance = this._instance || new c, this._instance.initialize()), this._instance
        }, cc.ContainerStrategy = cc._Class.extend({
            preApply: function(t) {},
            apply: function(t, e) {},
            postApply: function(t) {},
            _setupContainer: function(t, e, i) {
                var n = cc.game.canvas,
                    r = cc.game.container;
                cc.sys.platform !== cc.sys.WECHAT_GAME && (cc.sys.os === cc.sys.OS_ANDROID && (document.body.style.width = (t._isRotated ? i : e) + "px", document.body.style.height = (t._isRotated ? e : i) + "px"), r.style.width = n.style.width = e + "px", r.style.height = n.style.height = i + "px");
                var s = t._devicePixelRatio = 1;
                if (t.isRetinaEnabled() && (s = t._devicePixelRatio = Math.min(2, window.devicePixelRatio || 1)), n.width = e * s, n.height = i * s, cc.sys.browserType === cc.sys.BROWSER_TYPE_WECHAT_GAME && wx && wx.getOpenDataContext) {
                    var o = wx.getOpenDataContext().canvas;
                    o && (o.width = n.width, o.height = n.height)
                }
                cc._renderContext.resetCache && cc._renderContext.resetCache()
            },
            _fixContainer: function() {
                document.body.insertBefore(cc.container, document.body.firstChild);
                var t = document.body.style;
                t.width = window.innerWidth + "px", t.height = window.innerHeight + "px", t.overflow = "hidden";
                var e = cc.container.style;
                e.position = "fixed", e.left = e.top = "0px", document.body.scrollTop = 0
            }
        }), cc.ContentStrategy = cc._Class.extend({
            _result: {
                scale: [1, 1],
                viewport: null
            },
            _buildResult: function(t, e, i, n, r, s) {
                Math.abs(t - i) < 2 && (i = t), Math.abs(e - n) < 2 && (n = e);
                var o = cc.rect(Math.round((t - i) / 2), Math.round((e - n) / 2), i, n);
                return cc._renderType, cc.game.RENDER_TYPE_CANVAS, this._result.scale = [r, s], this._result.viewport = o, this._result
            },
            preApply: function(t) {},
            apply: function(t, e) {
                return {
                    scale: [1, 1]
                }
            },
            postApply: function(t) {}
        }), (function() {
            var t = cc.ContainerStrategy.extend({
                    apply: function(t) {
                        var e = t._frameSize.height,
                            i = cc.container.style;
                        this._setupContainer(t, t._frameSize.width, t._frameSize.height), t._isRotated ? i.margin = "0 0 0 " + e + "px" : i.margin = "0px", i.padding = "0px"
                    }
                }),
                e = cc.ContainerStrategy.extend({
                    apply: function(t, e) {
                        var i, n, r = t._frameSize.width,
                            s = t._frameSize.height,
                            o = cc.container.style,
                            c = e.width,
                            a = e.height,
                            h = r / c,
                            l = s / a;
                        h < l ? (i = r, n = a * h) : (i = c * l, n = s);
                        var u = Math.round((r - i) / 2),
                            _ = Math.round((s - n) / 2);
                        i = r - 2 * u, n = s - 2 * _, this._setupContainer(t, i, n), t._isRotated ? o.margin = "0 0 0 " + s + "px" : o.margin = "0px", o.paddingLeft = u + "px", o.paddingRight = u + "px", o.paddingTop = _ + "px", o.paddingBottom = _ + "px"
                    }
                }),
                i = (t.extend({
                    preApply: function(t) {
                        this._super(t), cc.game.frame = document.documentElement
                    },
                    apply: function(t) {
                        this._super(t), this._fixContainer()
                    }
                }), e.extend({
                    preApply: function(t) {
                        this._super(t), cc.game.frame = document.documentElement
                    },
                    apply: function(t, e) {
                        this._super(t, e), this._fixContainer()
                    }
                }), cc.ContainerStrategy.extend({
                    apply: function(t) {
                        this._setupContainer(t, cc.game.canvas.width, cc.game.canvas.height)
                    }
                }));
            cc.ContainerStrategy.EQUAL_TO_FRAME = new t, cc.ContainerStrategy.PROPORTION_TO_FRAME = new e, cc.ContainerStrategy.ORIGINAL_CONTAINER = new i;
            var n = cc.ContentStrategy.extend({
                    apply: function(t, e) {
                        var i = cc.game.canvas.width,
                            n = cc.game.canvas.height,
                            r = i / e.width,
                            s = n / e.height;
                        return this._buildResult(i, n, i, n, r, s)
                    }
                }),
                r = cc.ContentStrategy.extend({
                    apply: function(t, e) {
                        var i, n, r = cc.game.canvas.width,
                            s = cc.game.canvas.height,
                            o = e.width,
                            c = e.height,
                            a = r / o,
                            h = s / c,
                            l = 0;
                        return a < h ? (l = a, i = r, n = c * l) : (l = h, i = o * l, n = s), this._buildResult(r, s, i, n, l, l)
                    }
                }),
                s = cc.ContentStrategy.extend({
                    apply: function(t, e) {
                        var i, n, r, s = cc.game.canvas.width,
                            o = cc.game.canvas.height,
                            c = e.width,
                            a = e.height,
                            h = s / c,
                            l = o / a;
                        return h < l ? (i = l, n = c * i, r = o) : (i = h, n = s, r = a * i), this._buildResult(s, o, n, r, i, i)
                    }
                }),
                o = cc.ContentStrategy.extend({
                    apply: function(t, e) {
                        var i = cc.game.canvas.width,
                            n = cc.game.canvas.height,
                            r = n / e.height,
                            s = i,
                            o = n;
                        return this._buildResult(i, n, s, o, r, r)
                    },
                    postApply: function(t) {
                        cc.director._winSizeInPoints = t.getVisibleSize()
                    }
                }),
                c = cc.ContentStrategy.extend({
                    apply: function(t, e) {
                        var i = cc.game.canvas.width,
                            n = cc.game.canvas.height,
                            r = i / e.width,
                            s = i,
                            o = n;
                        return this._buildResult(i, n, s, o, r, r)
                    },
                    postApply: function(t) {
                        cc.director._winSizeInPoints = t.getVisibleSize()
                    }
                });
            cc.ContentStrategy.EXACT_FIT = new n, cc.ContentStrategy.SHOW_ALL = new r, cc.ContentStrategy.NO_BORDER = new s, cc.ContentStrategy.FIXED_HEIGHT = new o, cc.ContentStrategy.FIXED_WIDTH = new c
        })(), cc.ResolutionPolicy = cc._Class.extend({
            _containerStrategy: null,
            _contentStrategy: null,
            ctor: function(t, e) {
                this.setContainerStrategy(t), this.setContentStrategy(e)
            },
            preApply: function(t) {
                this._containerStrategy.preApply(t), this._contentStrategy.preApply(t)
            },
            apply: function(t, e) {
                return this._containerStrategy.apply(t, e), this._contentStrategy.apply(t, e)
            },
            postApply: function(t) {
                this._containerStrategy.postApply(t), this._contentStrategy.postApply(t)
            },
            setContainerStrategy: function(t) {
                t instanceof cc.ContainerStrategy && (this._containerStrategy = t)
            },
            setContentStrategy: function(t) {
                t instanceof cc.ContentStrategy && (this._contentStrategy = t)
            }
        }), cc.js.get(cc.ResolutionPolicy.prototype, "canvasSize", (function() {
            return cc.v2(cc.game.canvas.width, cc.game.canvas.height)
        })), cc.ResolutionPolicy.EXACT_FIT = 0, cc.ResolutionPolicy.NO_BORDER = 1, cc.ResolutionPolicy.SHOW_ALL = 2, cc.ResolutionPolicy.FIXED_HEIGHT = 3, cc.ResolutionPolicy.FIXED_WIDTH = 4, cc.ResolutionPolicy.UNKNOWN = 5, e.exports = c
    }), {
        "../event-manager": 52
    }],
    90: [(function(t, e, i) {
        cc.visibleRect = {
            topLeft: cc.p(0, 0),
            topRight: cc.p(0, 0),
            top: cc.p(0, 0),
            bottomLeft: cc.p(0, 0),
            bottomRight: cc.p(0, 0),
            bottom: cc.p(0, 0),
            center: cc.p(0, 0),
            left: cc.p(0, 0),
            right: cc.p(0, 0),
            width: 0,
            height: 0,
            init: function(t) {
                var e = this.width = t.width,
                    i = this.height = t.height,
                    n = t.x,
                    r = t.y,
                    s = r + i,
                    o = n + e;
                this.topLeft.x = n, this.topLeft.y = s, this.topRight.x = o, this.topRight.y = s, this.top.x = n + e / 2, this.top.y = s, this.bottomLeft.x = n, this.bottomLeft.y = r, this.bottomRight.x = o, this.bottomRight.y = r, this.bottom.x = n + e / 2, this.bottom.y = r, this.center.x = n + e / 2, this.center.y = r + i / 2, this.left.x = n, this.left.y = r + i / 2, this.right.x = o, this.right.y = r + i / 2
            }
        }
    }), {}],
    91: [(function(t, e, i) {
        var n = cc.ClassManager = {
                instanceId: 0 | 998 * Math.random(),
                getNewInstanceId: function() {
                    return this.instanceId++
                }
            },
            r = /\b_super\b/,
            s = function() {};
        s.extend = function(t) {
            var e, i = this.prototype,
                o = Object.create(i),
                c = {
                    writable: !0,
                    enumerable: !1,
                    configurable: !0
                };
            if (cc.game && cc.game.config && cc.game.config[cc.game.CONFIG_KEY.exposeClassName]) {
                var a = "return (function " + (t._className || "Class") + "(arg0,arg1,arg2,arg3,arg4) {\nthis.__instanceId = cc.ClassManager.getNewInstanceId();\nif (this.ctor) {\nswitch (arguments.length) {\ncase 0: this.ctor(); break;\ncase 1: this.ctor(arg0); break;\ncase 2: this.ctor(arg0,arg1); break;\ncase 3: this.ctor(arg0,arg1,arg2); break;\ncase 4: this.ctor(arg0,arg1,arg2,arg3); break;\ncase 5: this.ctor(arg0,arg1,arg2,arg3,arg4); break;\ndefault: this.ctor.apply(this, arguments);\n}\n}\n});";
                e = Function(a)()
            } else e = function(t, e, i, r, s) {
                if (this.__instanceId = n.getNewInstanceId(), this.ctor) switch (arguments.length) {
                    case 0:
                        this.ctor();
                        break;
                    case 1:
                        this.ctor(t);
                        break;
                    case 2:
                        this.ctor(t, e);
                        break;
                    case 3:
                        this.ctor(t, e, i);
                        break;
                    case 4:
                        this.ctor(t, e, i, r);
                        break;
                    case 5:
                        this.ctor(t, e, i, r, s);
                        break;
                    default:
                        this.ctor.apply(this, arguments)
                }
            };
            e.prototype = o, c.value = e, Object.defineProperty(o, "constructor", c);
            for (var h in t) {
                var l = "function" == typeof t[h];
                l && "function" == typeof i[h] && r.test(t[h]) ? (c.value = (function(t, e) {
                    return function() {
                        var n = this._super;
                        this._super = i[t];
                        var r = e.apply(this, arguments);
                        return this._super = n, r
                    }
                })(h, t[h]), Object.defineProperty(o, h, c)) : l ? (c.value = t[h], Object.defineProperty(o, h, c)) : o[h] = t[h]
            }
            return e.extend = s.extend, e.implement = function(t) {
                for (var e in t) o[e] = t[e]
            }, e
        }, cc.defineGetterSetter = function(t, e, i, n, r, s) {
            if (t.__defineGetter__) i && t.__defineGetter__(e, i), n && t.__defineSetter__(e, n);
            else {
                if (!Object.defineProperty) throw new Error("browser does not support getters");
                var o = {
                    configurable: !0
                };
                i && (o.get = i), n && (o.set = n), Object.defineProperty(t, e, o)
            }
        }, cc.clone = function(t) {
            var e = t.constructor ? new t.constructor : {};
            for (var i in t) {
                var n = t[i];
                "object" != typeof n || !n || n instanceof _ccsg.Node || n instanceof HTMLElement ? e[i] = n : e[i] = cc.clone(n)
            }
            return e
        }, cc._Class = e.exports = s
    }), {}],
    92: [(function(t, e, i) {
        function n(t, e, i) {
            var n;
            n = function() {}, i && a.extend(n, i.constructor);
            var r = new n;
            return a.value(t, "__attrs__", r), r
        }

        function r(t, e, i) {
            var r, o, c;
            if ("function" == typeof t) o = (r = s(t)).constructor.prototype;
            else {
                var a = t;
                if (!(r = a.__attrs__)) {
                    r = n(a, 0, s(t = a.constructor))
                }
                o = r
            }
            if (void 0 === i) {
                var l = e + h,
                    u = {};
                for (c in r) c.startsWith(l) && (u[c.slice(l.length)] = r[c]);
                return u
            }
            if ("object" == typeof i)
                for (c in i) 95 !== c.charCodeAt(0) && (o[e + h + c] = i[c]);
            else 0
        }

        function s(t) {
            return t.hasOwnProperty("__attrs__") && t.__attrs__ || (function(t) {
                for (var e, i = cc.Class.getInheritanceChain(t), r = i.length - 1; r >= 0; r--) {
                    var s = i[r];
                    s.hasOwnProperty("__attrs__") && s.__attrs__ || n(s, 0, (e = i[r + 1]) && e.__attrs__)
                }
                return e = i[0], n(t, 0, e && e.__attrs__), t.__attrs__
            })(t)
        }

        function o(t) {
            return s(t).constructor.prototype
        }

        function c(t, e) {
            0
        }
        var a = t("./js"),
            h = (t("./utils").isPlainEmptyObj_DEV, "$_$");
        cc.Integer = "Integer", cc.Float = "Float", cc.Boolean = "Boolean", cc.String = "String", e.exports = {
            attr: r,
            getClassAttrs: s,
            getClassAttrsProto: o,
            setClassAttr: function(t, e, i, n) {
                o(t)[e + h + i] = n
            },
            DELIMETER: h,
            getTypeChecker: c,
            ObjectType: function(t) {
                return {
                    type: "Object",
                    ctor: t,
                    _onAfterProp: !1
                }
            },
            ScriptUuid: {}
        }
    }), {
        "./CCClass": 79,
        "./js": 100,
        "./utils": 104
    }],
    93: [(function(t, e, i) {
        function n() {
            this.callbacks = [], this.targets = [], this.isInvoking = !1, this.containCanceled = !1
        }

        function r() {
            this._callbackTable = s.createMap(!0)
        }
        var s = t("./js"),
            o = s.array.fastRemoveAt,
            c = n.prototype;
        c.removeBy = function(t, e) {
            for (var i = this.callbacks, n = this.targets, r = 0; r < t.length; ++r) t[r] === e && (o(i, r), o(n, r), --r)
        }, c.cancel = function(t) {
            this.callbacks[t] = this.targets[t] = null, this.containCanceled = !0
        }, c.cancelAll = function() {
            for (var t = this.callbacks, e = this.targets, i = 0; i < t.length; i++) t[i] = e[i] = null;
            this.containCanceled = !0
        }, c.purgeCanceled = function() {
            this.removeBy(this.callbacks, null), this.containCanceled = !1
        };
        var a = new s.Pool(function(t) {
            t.callbacks.length = 0, t.targets.length = 0, t.isInvoking = !1, t.containCanceled = !1
        }, 16);
        a.get = function() {
            return this._get() || new n
        }, (c = r.prototype).add = function(t, e, i) {
            var n = this._callbackTable[t];
            n || (n = this._callbackTable[t] = a.get()), n.callbacks.push(e), n.targets.push(i || null)
        }, c.has = function(t, e, i) {
            var n = this._callbackTable[t];
            if (!n) return !1;
            var r = n.callbacks;
            if (!e) {
                for (var s = 0; s < r.length; s++)
                    if (r[s]) return !0;
                return !1
            }
            i = i || null;
            for (var o = n.targets, c = 0; c < r.length; ++c)
                if (r[c] === e && o[c] === i) return !0;
            return !1
        }, c.removeAll = function(t) {
            if ("string" == typeof t) {
                var e = this._callbackTable[t];
                e && (e.isInvoking ? e.cancelAll() : (a.put(e), delete this._callbackTable[t]))
            } else if (t)
                for (var i in this._callbackTable) {
                    var n = this._callbackTable[i];
                    if (n.isInvoking)
                        for (var r = n.targets, s = 0; s < r.length; ++s) r[s] === t && n.cancel(s);
                    else n.removeBy(n.targets, t)
                }
        }, c.remove = function(t, e, i) {
            var n = this._callbackTable[t];
            if (n) {
                i = i || null;
                for (var r = n.callbacks, s = n.targets, c = 0; c < r.length; ++c)
                    if (r[c] === e && s[c] === i) {
                        n.isInvoking ? n.cancel(c) : (o(r, c), o(s, c));
                        break
                    }
            }
        };
        var h = function() {
            r.call(this)
        };
        s.extend(h, r), h.prototype.invoke = function(t, e, i, n, r, s) {
            var o = this._callbackTable[t];
            if (o) {
                var c = !o.isInvoking;
                o.isInvoking = !0;
                for (var a = o.callbacks, h = o.targets, l = 0, u = a.length; l < u; ++l) {
                    var _ = a[l];
                    if (_) {
                        var d = h[l];
                        d ? _.call(d, e, i, n, r, s) : _(e, i, n, r, s)
                    }
                }
                c && (o.isInvoking = !1, o.containCanceled && o.purgeCanceled())
            }
        }, h.CallbacksHandler = r, e.exports = h
    }), {
        "./js": 100
    }],
    94: [(function(t, e, i) {
        function n(t, e) {
            for (var i = 0; i < e.length; i++) {
                var r = e[i];
                Array.isArray(r) ? n(t, r) : t.push(r)
            }
        }
        e.exports = {
            flattenCodeArray: function(t) {
                var e = [];
                return n(e, t), e.join("")
            }
        }
    }), {}],
    95: [(function(t, e, i) {
        var n = t("./js"),
            r = (t("./CCObject"), t("./attribute")),
            s = t("./CCClass"),
            o = t("../utils/misc"),
            c = function() {
                this.uuidList = [], this.uuidObjList = [], this.uuidPropList = [], this.rawProp = ""
            };
        c.prototype.reset = function() {
            this.uuidList.length = 0, this.uuidObjList.length = 0, this.uuidPropList.length = 0, this.rawProp = ""
        }, c.prototype.getUuidOf = function(t, e) {
            for (var i = 0; i < this.uuidObjList.length; i++)
                if (this.uuidObjList[i] === t && this.uuidPropList[i] === e) return this.uuidList[i];
            return ""
        }, c.prototype.push = function(t, e, i) {
            this.uuidList.push(i), this.uuidObjList.push(t), this.uuidPropList.push(e)
        }, (c.pool = new n.Pool(function(t) {
            t.reset()
        }, 10)).get = function() {
            return this._get() || new c
        };
        var a = (function() {
            function t(t, e, i, n, r) {
                this.result = t, this.customEnv = n, this.deserializedList = [], this.deserializedData = null, this._classFinder = i, this._idList = [], this._idObjList = [], this._idPropList = []
            }

            function e(t, e, i, r, s) {
                var o;
                r.hasOwnProperty("__deserialize__") ? o = r.__deserialize__ : (o = a(t, r), n.value(r, "__deserialize__", o, !0)), o(t, e, i, r, s)
            }
            var i = t.prototype;
            i.deserialize = function(t) {
                if (Array.isArray(t)) {
                    var e = t,
                        i = e.length;
                    this.deserializedList.length = i;
                    for (var n = 0; n < i; n++)
                        if (e[n]) {
                            this.deserializedList[n] = this._deserializeObject(e[n])
                        }
                    this.deserializedData = i > 0 ? this.deserializedList[0] : []
                } else this.deserializedList.length = 1, this.deserializedData = t ? this._deserializeObject(t) : null, this.deserializedList[0] = this.deserializedData;
                return (function(t) {
                    var e, i, n, r = t.deserializedList,
                        s = t._idPropList,
                        o = t._idList,
                        c = t._idObjList;
                    for (t._classFinder && t._classFinder.onDereferenced, e = 0; e < o.length; e++) i = s[e], n = o[e], c[e][i] = r[n]
                })(this), this.deserializedData
            }, i._deserializeObject = function(t, i, r, s) {
                var o, c = null,
                    a = null,
                    h = t.__type__;
                if (h) {
                    if (!(a = this._classFinder(h, t, r, s))) {
                        return this._classFinder === n._getClassById && cc.deserialize.reportMissingClass(h), null
                    }
                    if ((c = new a)._deserialize) return c._deserialize(t.content, this), c;
                    cc.Class._isCCClass(a) ? e(this, c, t, a, i) : this._deserializeTypedObject(c, t, a)
                } else if (Array.isArray(t)) {
                    c = new Array(t.length);
                    for (var l = 0; l < t.length; l++) "object" == typeof(o = t[l]) && o ? this._deserializeObjField(c, o, "" + l) : c[l] = o
                } else c = {}, this._deserializePrimitiveObject(c, t);
                return c
            }, i._deserializeObjField = function(t, e, i, n) {
                var r = e.__id__;
                if (void 0 === r) {
                    var s = e.__uuid__;
                    s ? (this.result.uuidList.push(s), this.result.uuidObjList.push(t), this.result.uuidPropList.push(i)) : t[i] = this._deserializeObject(e)
                } else {
                    var o = this.deserializedList[r];
                    o ? t[i] = o : (this._idList.push(r), this._idObjList.push(t), this._idPropList.push(i))
                }
            }, i._deserializePrimitiveObject = function(t, e) {
                for (var i in e)
                    if (e.hasOwnProperty(i)) {
                        var n = e[i];
                        "object" != typeof n ? "__type__" !== i && (t[i] = n) : n ? this._deserializeObjField(t, n, i) : t[i] = null
                    }
            }, i._deserializeTypedObject = function(t, e, i) {
                if (i === cc.Vec2) return t.x = e.x || 0, void(t.y = e.y || 0);
                if (i !== cc.Color) {
                    if (i === cc.Size) return t.width = e.width || 0, void(t.height = e.height || 0);
                    var n = i.__props__;
                    n || (n = Object.keys(t));
                    for (var r = 0; r < n.length; r++) {
                        var s = n[r],
                            o = e[s];
                        void 0 !== o && e.hasOwnProperty(s) && ("object" != typeof o ? t[s] = o : o ? this._deserializeObjField(t, o, s) : t[s] = null)
                    }
                } else {
                    t.r = e.r || 0, t.g = e.g || 0, t.b = e.b || 0;
                    var c = e.a;
                    t.a = void 0 === c ? 255 : c
                }
            };
            var c = function(t, e, i, r, s) {
                    if (e instanceof cc.ValueType) {
                        s || t.push("if(prop){");
                        var o = n.getClassName(e);
                        t.push("s._deserializeTypedObject(o" + i + ",prop," + o + ");"), s || t.push("}else o" + i + "=null;")
                    } else t.push("if(prop){"), t.push("s._deserializeObjField(o,prop," + r + ");"), t.push("}else o" + i + "=null;")
                },
                a = function(t, e) {
                    for (var i = r.DELIMETER + "type", a = r.DELIMETER + "rawType", h = (r.DELIMETER, r.DELIMETER + "serializable"), l = r.DELIMETER + "default", u = r.DELIMETER + "saveUrlAsAsset", _ = r.DELIMETER + "formerlySerializedAs", d = r.getClassAttrs(e), f = e.__props__, p = ["var prop;"], g = o.BUILTIN_CLASSID_RE.test(n._getClassId(e)), m = 0; m < f.length; m++) {
                        var v, y = f[m];
                        if (d[y + a]) v = s.IDENTIFIER_RE.test(y) ? '"' + y + '"' : s.escapeForJS(y), p.push('if(s.result.rawProp)\ncc.error("not support multi raw object in a file");'), p.push("s.result.rawProp=" + v + ";");
                        else {
                            if (!1 === d[y + h]) continue;
                            var C;
                            s.IDENTIFIER_RE.test(y) ? (v = '"' + y + '"', C = "." + y) : C = "[" + (v = s.escapeForJS(y)) + "]";
                            var T = C;
                            if (d[y + _]) {
                                var E = d[y + _];
                                T = s.IDENTIFIER_RE.test(E) ? "." + E : "[" + s.escapeForJS(E) + "]"
                            }
                            p.push("prop=d" + T + ";"), p.push('if(typeof prop!=="undefined"){');
                            var x = s.getDefault(d[y + l]);
                            if (g) {
                                var R, S = d[y + i];
                                if (void 0 === x && S) R = S === cc.String || S === cc.Integer || S === cc.Float || S === cc.Boolean;
                                else {
                                    var w = typeof x;
                                    R = "string" === w && !d[y + u] || "number" === w || "boolean" === w
                                }
                                R ? p.push("o" + C + "=prop;") : c(p, x, C, v, !0)
                            } else p.push('if(typeof prop!=="object"){o' + C + "=prop;}else{"), c(p, x, C, v, !1), p.push("}");
                            p.push("}")
                        }
                    }
                    return "_$erialized" === f[f.length - 1] && (p.push("o._$erialized=JSON.parse(JSON.stringify(d));"), p.push("s._deserializePrimitiveObject(o._$erialized,d);")), Function("s", "o", "d", "k", "t", p.join(""))
                };
            return t.pool = new n.Pool(function(t) {
                t.result = null, t.customEnv = null, t.deserializedList.length = 0, t.deserializedData = null, t._classFinder = null, t._idList.length = 0, t._idObjList.length = 0, t._idPropList.length = 0
            }, 1), t.pool.get = function(e, i, n, r, s) {
                var o = this._get();
                return o ? (o.result = e, o.customEnv = r, o._classFinder = n, o) : new t(e, i, n, r, s)
            }, t
        })();
        cc.deserialize = function(t, e, i) {
            var r = (i = i || {}).classFinder || n._getClassById,
                s = i.createAssetRefs || cc.sys.platform === cc.sys.EDITOR_CORE,
                o = i.customEnv,
                h = i.ignoreEditorOnly;
            "string" == typeof t && (t = JSON.parse(t));
            var l = !e;
            e = e || c.pool.get();
            var u = a.pool.get(e, !1, r, o, h);
            cc.game._isCloning = !0;
            var _ = u.deserialize(t);
            return cc.game._isCloning = !1, a.pool.put(u), s && e.assignAssetsBy(Editor.serialize.asAsset), l && c.pool.put(e), _
        }, cc.deserialize.Details = c, cc.deserialize.reportMissingClass = function(t) {
            cc.warnID(5302, t)
        }
    }), {
        "../utils/misc": 128,
        "./CCClass": 79,
        "./CCObject": 85,
        "./attribute": 92,
        "./js": 100
    }],
    96: [(function(t, e, i) {
        function n(t) {
            this.id = 0 | 998 * Math.random(), this.prefix = t ? t + r : ""
        }
        var r = ".";
        n.prototype.getNewId = function() {
            return this.prefix + ++this.id
        }, n.global = new n("global"), e.exports = n
    }), {}],
    97: [(function(t, e, i) {
        t("./js"), t("./CCClass"), t("./CCClassDecorator"), t("./CCEnum"), t("./CCObject"), t("./callbacks-invoker"), t("./url"), t("./deserialize"), t("./instantiate"), t("./instantiate-jit"), t("./requiring-frame"), t("./CCSys"), t("./CCMacro"), t("./CCAssetLibrary"), t("./CCVisibleRect")
    }), {
        "./CCAssetLibrary": 78,
        "./CCClass": 79,
        "./CCClassDecorator": 80,
        "./CCEnum": 81,
        "./CCMacro": 84,
        "./CCObject": 85,
        "./CCSys": 88,
        "./CCVisibleRect": 90,
        "./callbacks-invoker": 93,
        "./deserialize": 95,
        "./instantiate": 99,
        "./instantiate-jit": 98,
        "./js": 100,
        "./requiring-frame": 102,
        "./url": 103
    }],
    98: [(function(t, e, i) {
        function n(t, e) {
            this.varName = t, this.expression = e
        }

        function r(t, e) {
            return e instanceof n ? new n(e.varName, t + e.expression) : t + e
        }

        function s(t, e, i) {
            Array.isArray(i) ? (i[0] = r(e, i[0]), t.push(i)) : t.push(r(e, i) + ";")
        }

        function o(t) {
            this._exps = [], this._targetExp = t
        }

        function c(t, e) {
            if ("function" == typeof t) try {
                t = t()
            } catch (t) {
                return !1
            }
            if (t === e) return !0;
            if (t && e) {
                if (t instanceof cc.ValueType && t.equals(e)) return !0;
                if (Array.isArray(t) && Array.isArray(e) || t.constructor === Object && e.constructor === Object) try {
                    return JSON.stringify(t) === JSON.stringify(e)
                } catch (t) {}
            }
            return !1
        }

        function a(t) {
            return y.test(t) ? "." + t : "[" + C(t) + "]"
        }

        function h(t, e) {
            this.parent = e, this.objsToClear_iN$t = [], this.codeArray = [], this.objs = [], this.funcs = [], this.funcModuleCache = f.createMap(), f.mixin(this.funcModuleCache, R), this.globalVariables = [], this.globalVariableId = 0, this.localVariableId = 0, this.codeArray.push(T + E + "," + x + ";", "if(R){", E + "=R;", "}else{", E + "=R=new " + this.getFuncModule(t.constructor, !0) + "();", "}"), t._iN$t = {
                globalVar: "R"
            }, this.objsToClear_iN$t.push(t), this.enumerateObject(this.codeArray, t);
            var i;
            this.globalVariables.length > 0 && (i = T + this.globalVariables.join(",") + ";");
            var n = g.flattenCodeArray(["return (function(R){", i || [], this.codeArray, "return o;", "})"]);
            this.result = Function("O", "F", n)(this.objs, this.funcs);
            for (var r = 0, s = this.objsToClear_iN$t.length; r < s; ++r) this.objsToClear_iN$t[r]._iN$t = null;
            this.objsToClear_iN$t.length = 0
        }
        var l = t("./CCObject"),
            u = l.Flags.Destroyed,
            _ = l.Flags.PersistentMask,
            d = t("./attribute"),
            f = t("./js"),
            p = t("./CCClass"),
            g = t("./compiler"),
            m = d.DELIMETER + "serializable",
            v = d.DELIMETER + "default",
            y = p.IDENTIFIER_RE,
            C = p.escapeForJS,
            T = "var ",
            E = "o",
            x = "t",
            R = {
                "cc.Node": "cc.Node",
                "cc.Sprite": "cc.Sprite",
                "cc.Label": "cc.Label",
                "cc.Button": "cc.Button",
                "cc.Widget": "cc.Widget",
                "cc.Animation": "cc.Animation",
                "cc.ClickEvent": !1,
                "cc.PrefabInfo": !1
            };
        n.prototype.toString = function() {
            return T + this.varName + "=" + this.expression + ";"
        }, o.prototype.append = function(t, e) {
            this._exps.push([t, e])
        }, o.prototype.writeCode = function(t) {
            var e;
            if (this._exps.length > 1) t.push(x + "=" + this._targetExp + ";"), e = x;
            else {
                if (1 !== this._exps.length) return;
                e = this._targetExp
            }
            for (var i = 0; i < this._exps.length; i++) {
                var n = this._exps[i];
                s(t, e + a(n[0]) + "=", n[1])
            }
        }, (o.pool = new f.Pool(function(t) {
            t._exps.length = 0, t._targetExp = null
        }, 1)).get = function(t) {
            var e = this._get() || new o;
            return e._targetExp = t, e
        };
        var S = h.prototype;
        S.getFuncModule = function(t, e) {
            var i = f.getClassName(t);
            if (i) {
                var n = this.funcModuleCache[i];
                if (n) return n;
                if (void 0 === n) {
                    var r = -1 !== i.indexOf(".");
                    if (r) try {
                        if (r = t === Function("return " + i)()) return this.funcModuleCache[i] = i, i
                    } catch (t) {}
                }
            }
            var s = this.funcs.indexOf(t);
            s < 0 && (s = this.funcs.length, this.funcs.push(t));
            var o = "F[" + s + "]";
            return e && (o = "(" + o + ")"), this.funcModuleCache[i] = o, o
        }, S.getObjRef = function(t) {
            var e = this.objs.indexOf(t);
            return e < 0 && (e = this.objs.length, this.objs.push(t)), "O[" + e + "]"
        }, S.setValueType = function(t, e, i, n) {
            var r = o.pool.get(n),
                s = e.constructor.__props__;
            s || (s = Object.keys(e));
            for (var c = 0; c < s.length; c++) {
                var a = s[c],
                    h = i[a];
                if (e[a] !== h) {
                    var l = this.enumerateField(i, a, h);
                    r.append(a, l)
                }
            }
            r.writeCode(t), o.pool.put(r)
        }, S.enumerateCCClass = function(t, e, i) {
            for (var n = i.__props__, r = d.getClassAttrs(i), s = 0; s < n.length; s++) {
                var o = n[s];
                if (!1 !== r[o + m]) {
                    var h = e[o];
                    if (c(l = r[o + v], h)) continue;
                    if ("object" == typeof h && h instanceof cc.ValueType) {
                        var l;
                        if (((l = p.getDefault(l)) && l.constructor) === h.constructor) {
                            var u = E + a(o);
                            this.setValueType(t, l, h, u);
                            continue
                        }
                    }
                    this.setObjProp(t, e, o, h)
                }
            }
        }, S.instantiateArray = function(t) {
            if (0 === t.length) return "[]";
            var e = "a" + ++this.localVariableId,
                i = [new n(e, "new Array(" + t.length + ")")];
            t._iN$t = {
                globalVar: "",
                source: i
            }, this.objsToClear_iN$t.push(t);
            for (var r = 0; r < t.length; ++r) {
                s(i, e + "[" + r + "]=", this.enumerateField(t, r, t[r]))
            }
            return i
        }, S.enumerateField = function(t, e, i) {
            if ("object" == typeof i && i) {
                var n = i._iN$t;
                if (n) {
                    var s = n.globalVar;
                    if (!s) {
                        s = n.globalVar = "v" + ++this.globalVariableId, this.globalVariables.push(s);
                        var o = n.source[0];
                        n.source[0] = r(s + "=", o)
                    }
                    return s
                }
                return Array.isArray(i) ? this.instantiateArray(i) : this.instantiateObj(i)
            }
            return "function" == typeof i ? this.getFuncModule(i) : "string" == typeof i ? C(i) : ("_objFlags" === e && t instanceof l && (i &= _), i)
        }, S.setObjProp = function(t, e, i, n) {
            s(t, E + a(i) + "=", this.enumerateField(e, i, n))
        }, S.enumerateObject = function(t, e) {
            var i = e.constructor;
            if (cc.Class._isCCClass(i)) this.enumerateCCClass(t, e, i);
            else
                for (var n in e)
                    if (e.hasOwnProperty(n) && (95 !== n.charCodeAt(0) || 95 !== n.charCodeAt(1) || "__type__" === n)) {
                        var r = e[n];
                        "object" == typeof r && r && r === e._iN$t || this.setObjProp(t, e, n, r)
                    }
        }, S.instantiateObj = function(t) {
            if (t instanceof cc.ValueType) return p.getNewValueTypeCode(t);
            if (t instanceof cc.Asset) return this.getObjRef(t);
            if (t._objFlags & u) return null;
            var e, i = t.constructor;
            if (cc.Class._isCCClass(i)) {
                if (this.parent)
                    if (this.parent instanceof cc.Component) {
                        if (t instanceof cc._BaseNode || t instanceof cc.Component) return this.getObjRef(t)
                    } else if (this.parent instanceof cc._BaseNode)
                    if (t instanceof cc._BaseNode) {
                        if (!t.isChildOf(this.parent)) return this.getObjRef(t)
                    } else if (t instanceof cc.Component && !t.node.isChildOf(this.parent)) return this.getObjRef(t);
                e = new n(E, "new " + this.getFuncModule(i, !0) + "()")
            } else if (i === Object) e = new n(E, "{}");
            else {
                if (i) return this.getObjRef(t);
                e = new n(E, "Object.create(null)")
            }
            var r = [e];
            return t._iN$t = {
                globalVar: "",
                source: r
            }, this.objsToClear_iN$t.push(t), this.enumerateObject(r, t), ["(function(){", r, "return o;})();"]
        }, e.exports = {
            compile: function(t) {
                return new h(t, t instanceof cc._BaseNode && t).result
            },
            equalsToDefault: c
        }
    }), {
        "./CCClass": 79,
        "./CCObject": 85,
        "./attribute": 92,
        "./compiler": 94,
        "./js": 100
    }],
    99: [(function(t, e, i) {
        function n(t, e) {
            if (!e) {
                if ("object" != typeof t || Array.isArray(t)) return null;
                if (!t) return null;
                if (!cc.isValid(t)) return null;
                0
            }
            var i;
            if (t instanceof c) {
                if (t._instantiate) return cc.game._isCloning = !0, i = t._instantiate(), cc.game._isCloning = !1, i;
                if (t instanceof cc.Asset) return null
            }
            return cc.game._isCloning = !0, i = r(t), cc.game._isCloning = !1, i
        }

        function r(t, e) {
            if (Array.isArray(t)) return null;
            if (u && u(t)) return null;
            var i;
            if (t._iN$t) i = t._iN$t;
            else if (t.constructor) {
                i = new(0, t.constructor)
            } else i = Object.create(null);
            s(t, i, e);
            for (var n = 0, r = _.length; n < r; ++n) _[n]._iN$t = null;
            return _.length = 0, i
        }

        function s(t, e, i) {
            t._iN$t = e, _.push(t);
            var n = t.constructor;
            if (cc.Class._isCCClass(n))(function(t, e, i, n) {
                for (var r = t.__props__, s = l.getClassAttrs(t), c = 0; c < r.length; c++) {
                    var a = r[c];
                    if (!1 !== s[a + d]) {
                        var h = e[a];
                        i[a] = "object" == typeof h && h ? h._iN$t || o(h, n) : h
                    }
                }
            })(n, t, e, i);
            else
                for (var r in t)
                    if (t.hasOwnProperty(r) && (95 !== r.charCodeAt(0) || 95 !== r.charCodeAt(1) || "__type__" === r)) {
                        var s = t[r];
                        if ("object" == typeof s && s) {
                            if (s === e) continue;
                            e[r] = s._iN$t || o(s, i)
                        } else e[r] = s
                    }
            t instanceof c && (e._objFlags &= h)
        }

        function o(t, e) {
            if (t instanceof cc.ValueType) return t.clone();
            if (t instanceof cc.Asset) return t;
            var i;
            if (Array.isArray(t)) {
                var n = t.length;
                i = new Array(n), t._iN$t = i;
                for (var r = 0; r < n; ++r) {
                    var c = t[r];
                    i[r] = "object" == typeof c && c ? c._iN$t || o(c, e) : c
                }
                return _.push(t), i
            }
            if (t._objFlags & a) return null;
            var h = t.constructor;
            if (cc.Class._isCCClass(h)) {
                if (e)
                    if (e instanceof cc.Component) {
                        if (t instanceof cc._BaseNode || t instanceof cc.Component) return t
                    } else if (e instanceof cc._BaseNode)
                    if (t instanceof cc._BaseNode) {
                        if (!t.isChildOf(e)) return t
                    } else if (t instanceof cc.Component && !t.node.isChildOf(e)) return t;
                i = new h
            } else if (h === Object) i = {};
            else {
                if (h) return t;
                i = Object.create(null)
            }
            return s(t, i, e), i
        }
        var c = t("./CCObject"),
            a = c.Flags.Destroyed,
            h = c.Flags.PersistentMask,
            l = t("./attribute"),
            u = t("./utils").isDomNode,
            _ = [],
            d = l.DELIMETER + "serializable";
        n._clone = r, cc.instantiate = n, e.exports = n
    }), {
        "./CCObject": 85,
        "./attribute": 92,
        "./utils": 104
    }],
    100: [(function(t, e, i) {
        function n(t, e) {
            for (; t;) {
                var i = Object.getOwnPropertyDescriptor(t, e);
                if (i) return i;
                t = Object.getPrototypeOf(t)
            }
            return null
        }

        function r(t, e, i) {
            var r = n(e, t);
            Object.defineProperty(i, t, r)
        }

        function s(t, e) {
            t.splice(e, 1)
        }

        function o(t, e) {
            var i = t.indexOf(e);
            return i >= 0 && (s(t, i), !0)
        }

        function c(t, e) {
            "number" == typeof t && (e = t, t = null), this.get = null, this.count = 0, this._pool = new Array(e), this._cleanup = t
        }
        var a = new(t("./id-generater"))("TmpCId."),
            h = {
                isNumber: function(t) {
                    return "number" == typeof t || t instanceof Number
                },
                isString: function(t) {
                    return "string" == typeof t || t instanceof String
                },
                addon: function(t) {
                    "use strict";
                    t = t || {};
                    for (var e = 1, i = arguments.length; e < i; e++) {
                        var n = arguments[e];
                        if (n) {
                            if ("object" != typeof n) {
                                cc.errorID(5402, n);
                                continue
                            }
                            for (var s in n) s in t || r(s, n, t)
                        }
                    }
                    return t
                },
                mixin: function(t) {
                    "use strict";
                    t = t || {};
                    for (var e = 1, i = arguments.length; e < i; e++) {
                        var n = arguments[e];
                        if (n) {
                            if ("object" != typeof n) {
                                cc.errorID(5403, n);
                                continue
                            }
                            for (var s in n) r(s, n, t)
                        }
                    }
                    return t
                },
                extend: function(t, e) {
                    for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
                    return t.prototype = Object.create(e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), t
                },
                getSuper: function(t) {
                    var e = t.prototype,
                        i = e && Object.getPrototypeOf(e);
                    return i && i.constructor
                },
                clear: function(t) {
                    for (var e = Object.keys(t), i = 0; i < e.length; i++) delete t[e[i]]
                },
                getPropertyDescriptor: n
            },
            l = {
                value: void 0,
                enumerable: !1,
                writable: !1,
                configurable: !0
            };
        h.value = function(t, e, i, n, r) {
            l.value = i, l.writable = n, l.enumerable = r, Object.defineProperty(t, e, l), l.value = void 0
        };
        var u = {
            get: null,
            set: null,
            enumerable: !1
        };
        h.getset = function(t, e, i, n, r) {
            "function" != typeof n && (r = n, n = void 0), u.get = i, u.set = n, u.enumerable = r, Object.defineProperty(t, e, u), u.get = null, u.set = null
        };
        var _ = {
            get: null,
            enumerable: !1,
            configurable: !1
        };
        h.get = function(t, e, i, n, r) {
            _.get = i, _.enumerable = n, _.configurable = r, Object.defineProperty(t, e, _), _.get = null
        };
        var d = {
            set: null,
            enumerable: !1,
            configurable: !1
        };
        h.set = function(t, e, i, n, r) {
            d.set = i, d.enumerable = n, d.configurable = r, Object.defineProperty(t, e, d), d.set = null
        }, h.getClassName = function(t) {
            if ("function" == typeof t) {
                var e = t.prototype;
                if (e && e.hasOwnProperty("__classname__") && e.__classname__) return e.__classname__;
                var i = "";
                if (t.name && (i = t.name), t.toString) {
                    var n, r = t.toString();
                    (n = "[" === r.charAt(0) ? r.match(/\[\w+\s*(\w+)\]/) : r.match(/function\s*(\w+)/)) && 2 === n.length && (i = n[1])
                }
                return "Object" !== i ? i : ""
            }
            return t && t.constructor ? h.getClassName(t.constructor) : ""
        }, (function() {
            function t(t, e) {
                return function(i, n) {
                    if (n.prototype.hasOwnProperty(t) && delete e[n.prototype[t]], h.value(n.prototype, t, i), i) {
                        var r = e[i];
                        if (r && r !== n) {
                            var s = "A Class already exists with the same " + t + ' : "' + i + '".';
                            0, cc.error(s)
                        } else e[i] = n
                    }
                }
            }
            var e = {},
                i = {};
            h._setClassId = t("__cid__", e);
            var n = t("__classname__", i);
            h.setClassName = function(t, e) {
                if (n(t, e), !e.prototype.hasOwnProperty("__cid__")) {
                    var i = t || a.getNewId();
                    i && h._setClassId(i, e)
                }
            }, h.unregisterClass = function() {
                for (var t = 0; t < arguments.length; t++) {
                    var n = arguments[t].prototype,
                        r = n.__cid__;
                    r && delete e[r];
                    var s = n.__classname__;
                    s && delete i[s]
                }
            }, h._getClassById = function(t) {
                return e[t]
            }, h.getClassByName = function(t) {
                return i[t]
            }, h._getClassId = function(t, e) {
                e = void 0 === e || e;
                if ("function" == typeof t && t.prototype.hasOwnProperty("__cid__")) return t.prototype.__cid__;
                if (t && t.constructor) {
                    var i = t.constructor.prototype;
                    if (i && i.hasOwnProperty("__cid__")) return t.__cid__
                }
                return ""
            }
        })(), h.obsolete = function(t, e, i, n) {
            function r() {
                return this[i]
            }
            var s = /([^.]+)$/.exec(e)[0];
            n ? h.getset(t, s, r, (function(t) {
                this[i] = t
            })) : h.get(t, s, r)
        }, h.obsoletes = function(t, e, i, n) {
            for (var r in i) {
                var s = i[r];
                h.obsolete(t, e + "." + r, s, n)
            }
        };
        var f = /(%d)|(%s)/,
            p = /%s/;
        h.formatStr = function() {
            var t = arguments.length;
            if (0 === t) return "";
            var e = arguments[0];
            if (1 === t) return "" + e;
            if ("string" == typeof e && f.test(e))
                for (var i = 1; i < t; ++i) {
                    var n = arguments[i],
                        r = "number" == typeof n ? f : p;
                    r.test(e) ? e = e.replace(r, n) : e += " " + n
                } else
                    for (var s = 1; s < t; ++s) e += " " + arguments[s];
            return e
        }, h.shiftArguments = function() {
            for (var t = arguments.length - 1, e = new Array(t), i = 0; i < t; ++i) e[i] = arguments[i + 1];
            return e
        }, h.createMap = function(t) {
            var e = Object.create(null);
            if (t) {
                e["."] = !0, e["/"] = !0, delete e["."], delete e["/"]
            }
            return e
        };
        var g = Array.prototype.indexOf;
        h.array = {
            remove: o,
            fastRemove: function(t, e) {
                var i = t.indexOf(e);
                i >= 0 && (t[i] = t[t.length - 1], --t.length)
            },
            removeAt: s,
            fastRemoveAt: function(t, e) {
                var i = t.length;
                e < 0 || e >= i || (t[e] = t[i - 1], t.length = i - 1)
            },
            contains: function(t, e) {
                return t.indexOf(e) >= 0
            },
            verifyType: function(t, e) {
                if (t && t.length > 0)
                    for (var i = 0; i < t.length; i++)
                        if (!(t[i] instanceof e)) return cc.logID(1300), !1;
                return !0
            },
            removeArray: function(t, e) {
                for (var i = 0, n = e.length; i < n; i++) o(t, e[i])
            },
            appendObjectsAt: function(t, e, i) {
                return t.splice.apply(t, [i, 0].concat(e)), t
            },
            copy: function(t) {
                var e, i = t.length,
                    n = new Array(i);
                for (e = 0; e < i; e += 1) n[e] = t[e];
                return n
            },
            indexOf: g,
            MutableForwardIterator: t("../utils/mutable-forward-iterator")
        }, c.prototype._get = function() {
            if (this.count > 0) {
                --this.count;
                var t = this._pool[this.count];
                return this._pool[this.count] = null, t
            }
            return null
        }, c.prototype.put = function(t) {
            var e = this._pool;
            if (this.count < e.length) {
                if (this._cleanup && !1 === this._cleanup(t)) return;
                e[this.count] = t, ++this.count
            }
        }, c.prototype.resize = function(t) {
            t >= 0 && (this._pool.length = t, this.count > t && (this.count = t))
        }, h.Pool = c, cc.js = h, e.exports = h
    }), {
        "../utils/mutable-forward-iterator": 129,
        "./id-generater": 96
    }],
    101: [(function(t, e, i) {
        function n(t, e, i, n) {
            if (!t.get && !t.set)
                if (t.hasOwnProperty("default")) {
                    var r = "_N$" + e;
                    t.get = function() {
                        return this[r]
                    }, t.set = function(t) {
                        var e = this[r];
                        this[r] = t, i.call(this, e)
                    };
                    var s = {};
                    n[r] = s;
                    for (var o in c) {
                        var a = c[o];
                        t.hasOwnProperty(o) && (s[o] = t[o], a.canUsedInGet || delete t[o])
                    }
                } else 0
        }

        function r(t, e, i, n) {
            Array.isArray(n) && n.length > 0 && (n = n[0]), t.type = n
        }

        function s(t, e, i, n) {
            if (Array.isArray(e)) {
                if (!(e.length > 0)) return cc.errorID(5508, i, n);
                if (cc.RawAsset.isRawAssetType(e[0])) return t.url = e[0], void delete t.type;
                t.type = e = e[0]
            }
        }

        function o(t, e, i, n) {
            0
        }
        var c = {
            url: {
                canUsedInGet: !0
            },
            default: {},
            serializable: {},
            editorOnly: {},
            rawType: {},
            formerlySerializedAs: {}
        };
        i.getFullFormOfProperty = function(t) {
            if (!(t && t.constructor === Object)) {
                if (Array.isArray(t) && t.length > 0) return {
                    default: [],
                    type: t,
                    _short: !0
                };
                if ("function" == typeof t) {
                    var e = t;
                    return cc.RawAsset.isRawAssetType(e) ? {
                        default: "",
                        url: e,
                        _short: !0
                    } : {
                        default: cc.isChildClassOf(e, cc.ValueType) ? new e : null,
                        type: e,
                        _short: !0
                    }
                }
                return {
                    default: t,
                    _short: !0
                }
            }
            return null
        }, i.preprocessAttrs = function(t, e, c, a) {
            for (var h in t) {
                var l = t[h],
                    u = i.getFullFormOfProperty(l);
                if (u && (l = t[h] = u), l) {
                    var _ = l.notify;
                    _ && n(l, h, _, t), "type" in l && s(l, l.type, e, h), "url" in l && r(l, 0, 0, l.url), "type" in l && o(0, l.type)
                }
            }
        }, i.validateMethodWithProps = function(t, e, i, n, r) {
            if ("function" != typeof t && null !== t) {
                return !1
            }
            return !0
        }
    }), {
        "./CCClass": 79
    }],
    102: [(function(t, e, i) {
        var n = [];
        cc._RF = {
            push: function(t, e, i) {
                void 0 === i && (i = e, e = ""), n.push({
                    uuid: e,
                    script: i,
                    module: t,
                    exports: t.exports,
                    beh: null
                })
            },
            pop: function() {
                var t = n.pop(),
                    e = t.module,
                    i = e.exports;
                if (i === t.exports) {
                    for (var r in i) return;
                    e.exports = i = t.cls
                }
            },
            peek: function() {
                return n[n.length - 1]
            }
        }
    }), {}],
    103: [(function(t, e, i) {
        var n = {};
        cc.url = {
            _rawAssets: "",
            _builtinRawAssets: "",
            normalize: function(t) {
                return 46 === t.charCodeAt(0) && 47 === t.charCodeAt(1) ? t = t.slice(2) : 47 === t.charCodeAt(0) && (t = t.slice(1)), t
            },
            raw: function(t) {
                return (t = this.normalize(t)).startsWith("resources/") || cc.errorID(7002, t), this._rawAssets + t
            },
            builtinRaw: !1,
            _init: function(t) {
                for (var e in t) {
                    var i = t[e];
                    i = cc.path.stripSep(i) + "/", n[e] = i
                }
                this._rawAssets = n.assets, this._builtinRawAssets = n.internal
            }
        }, e.exports = cc.url
    }), {}],
    104: [(function(t, e, i) {
        e.exports = {
            contains: function(t, e) {
                if ("function" == typeof t.contains) return t.contains(e);
                if ("function" == typeof t.compareDocumentPosition) return !!(16 & t.compareDocumentPosition(e));
                var i = e.parentNode;
                if (i)
                    do {
                        if (i === t) return !0;
                        i = i.parentNode
                    } while (null !== i);
                return !1
            },
            isDomNode: "object" == typeof window && ("function" == typeof Node ? function(t) {
                return t instanceof Node
            } : function(t) {
                return t && "object" == typeof t && "number" == typeof t.nodeType && "string" == typeof t.nodeName
            }),
            callInNextTick: function(t, e, i) {
                t && setTimeout((function() {
                    t(e, i)
                }), 0)
            }
        }
    }), {}],
    105: [(function(t, e, i) {
        t("./platform/js"), t("./value-types"), t("./utils"), t("./platform/CCInputManager"), t("./platform/CCInputExtension"), t("./event"), t("./platform/CCSys"), t("./platform/CCMacro"), t("./load-pipeline"), t("./textures"), t("./CCDirector"), t("./CCDirectorWebGL"), t("./CCDirectorCanvas"), t("./platform/CCSAXParser"), t("./platform/CCView"), t("./platform/CCScreen"), t("./CCScheduler"), t("./event-manager"), t("./renderer")
    }), {
        "./CCDirector": 9,
        "./CCDirectorCanvas": 10,
        "./CCDirectorWebGL": 11,
        "./CCScheduler": 18,
        "./event": 56,
        "./event-manager": 52,
        "./load-pipeline": 65,
        "./platform/CCInputExtension": 82,
        "./platform/CCInputManager": 83,
        "./platform/CCMacro": 84,
        "./platform/CCSAXParser": 86,
        "./platform/CCScreen": 87,
        "./platform/CCSys": 88,
        "./platform/CCView": 89,
        "./platform/js": 100,
        "./renderer": 109,
        "./textures": 121,
        "./utils": 127,
        "./value-types": 141
    }],
    106: [(function(t, e, i) {
        function n() {
            var t = a.pop();
            return t || (t = new o), t
        }

        function r(t) {
            a.push(t)
        }

        function s(t, e) {
            var i = t._minX < e._minX ? t._minX : e._minX,
                n = t._minY < e._minY ? t._minY : e._minY;
            return ((t._maxX > e._maxX ? t._maxX : e._maxX) - i) * ((t._maxY > e._maxY ? t._maxY : e._maxY) - n)
        }
        var o = function() {
                this._minX = 0, this._minY = 0, this._maxX = 0, this._maxY = 0, this._width = 0, this._height = 0, this._area = 0
            },
            c = o.prototype,
            a = [];
        c.setTo = function(t, e, i, n) {
            return this._minX = t, this._minY = e, this._maxX = i, this._maxY = n, this.updateArea(), this
        }, c.intValues = function() {
            this._minX = Math.floor(this._minX), this._minY = Math.floor(this._minY), this._maxX = Math.ceil(this._maxX), this._maxY = Math.ceil(this._maxY), this.updateArea()
        }, c.updateArea = function() {
            this._width = this._maxX - this._minX, this._height = this._maxY - this._minY, this._area = this._width * this._height
        }, c.union = function(t) {
            this.isEmpty() ? this.setTo(t._minX, t._minY, t._maxX, t._maxY) : (this._minX > t._minX && (this._minX = t._minX), this._minY > t._minY && (this._minY = t._minY), this._maxX < t._maxX && (this._maxX = t._maxX), this._maxY < t._maxY && (this._maxY = t._maxY), this.updateArea())
        }, c.setEmpty = function() {
            this._minX = 0, this._minY = 0, this._maxX = 0, this._maxY = 0, this._width = 0, this._height = 0, this._area = 0
        }, c.isEmpty = function() {
            return this._width <= 0 || this._height <= 0
        }, c.intersects = function(t) {
            if (this.isEmpty() || t.isEmpty()) return !1;
            var e = this._minX > t._minX ? this._minX : t._minX,
                i = this._maxX < t._maxX ? this._maxX : t._maxX;
            return !(e > i) && (e = this._minY > t._minY ? this._minY : t._minY, i = this._maxY < t._maxY ? this._maxY : t._maxY, e <= i)
        }, c.updateRegion = function(t, e) {
            if (0 !== t.width && 0 !== t.height) {
                var i, n, r, s, o = e,
                    c = o.a,
                    a = o.b,
                    h = o.c,
                    l = o.d,
                    u = o.tx,
                    _ = o.ty,
                    d = t.x,
                    f = t.y,
                    p = d + t.width,
                    g = f + t.height;
                if (1 === c && 0 === a && 0 === h && 1 === l) i = d + u - 1, n = f + _ - 1, r = p + u + 1, s = g + _ + 1;
                else {
                    var m = c * d + h * f + u,
                        v = a * d + l * f + _,
                        y = c * p + h * f + u,
                        C = a * p + l * f + _,
                        T = c * p + h * g + u,
                        E = a * p + l * g + _,
                        x = c * d + h * g + u,
                        R = a * d + l * g + _,
                        S = 0;
                    m > y && (S = m, m = y, y = S), T > x && (S = T, T = x, x = S), i = (m < T ? m : T) - 1, r = (y > x ? y : x) + 1, v > C && (S = v, v = C, C = S), E > R && (S = E, E = R, R = S), n = (v < E ? v : E) - 1, s = (C > R ? C : R) + 1
                }
                this._minX = i, this._minY = n, this._maxX = r, this._maxY = s, this._width = r - i, this._height = s - n, this._area = this._width * this._height
            } else this.setEmpty()
        };
        var h = function() {
                this.dirtyList = [], this.hasClipRect = !1, this.clipWidth = 0, this.clipHeight = 0, this.clipArea = 0, this.clipRectChanged = !1
            },
            l = h.prototype;
        l.setClipRect = function(t, e) {
            this.hasClipRect = !0, this.clipRectChanged = !0, this.clipWidth = Math.ceil(t), this.clipHeight = Math.ceil(e), this.clipArea = this.clipWidth * this.clipHeight
        }, l.addRegion = function(t) {
            var e = t._minX,
                i = t._minY,
                r = t._maxX,
                s = t._maxY;
            if (this.hasClipRect && (e < 0 && (e = 0), i < 0 && (i = 0), r > this.clipWidth && (r = this.clipWidth), s > this.clipHeight && (s = this.clipHeight)), e >= r || i >= s) return !1;
            if (this.clipRectChanged) return !0;
            var o = this.dirtyList,
                c = n();
            return o.push(c.setTo(e, i, r, s)), this.mergeDirtyList(o), !0
        }, l.clear = function() {
            for (var t = this.dirtyList, e = t.length, i = 0; i < e; i++) r(t[i]);
            t.length = 0
        }, l.getDirtyRegions = function() {
            var t = this.dirtyList;
            if (this.clipRectChanged) {
                this.clipRectChanged = !1, this.clear();
                var e = n();
                t.push(e.setTo(0, 0, this.clipWidth, this.clipHeight))
            } else
                for (; this.mergeDirtyList(t););
            var i = this.dirtyList.length;
            if (i > 0)
                for (var r = 0; r < i; r++) this.dirtyList[r].intValues();
            return this.dirtyList
        }, l.mergeDirtyList = function(t) {
            var e = t.length;
            if (e < 2) return !1;
            for (var i = this.hasClipRect, n = e > 3 ? Number.POSITIVE_INFINITY : 0, o = 0, c = 0, a = 0, h = 0; h < e - 1; h++) {
                var l = t[h];
                i && (a += l.area);
                for (var u = h + 1; u < e; u++) {
                    var _ = t[u],
                        d = s(l, _) - l.area - _.area;
                    n > d && (o = h, c = u, n = d)
                }
            }
            if (i && a / this.clipArea > .95 && (this.clipRectChanged = !0), o !== c) {
                var f = t[c];
                return t[o].union(f), r(f), t.splice(c, 1), !0
            }
            return !1
        }, cc.Region = o, cc.DirtyRegion = h
    }), {}],
    107: [(function(t, e, i) {
        cc.rendererCanvas = {
            childrenOrderDirty: !0,
            assignedZ: 0,
            assignedZStep: 1e-4,
            _transformNodePool: [],
            _renderCmds: [],
            _isCacheToCanvasOn: !1,
            _cacheToCanvasCmds: {},
            _cacheInstanceIds: [],
            _currentID: 0,
            _clearColor: cc.color(),
            _clearFillStyle: "rgb(0, 0, 0)",
            _dirtyRegion: null,
            _allNeedDraw: !0,
            _enableDirtyRegion: !1,
            _debugDirtyRegion: !1,
            _dirtyRegionCountThreshold: 10,
            init: function() {
                cc.sys.browserType !== cc.sys.BROWSER_TYPE_IE && cc.sys.browserType !== cc.sys.BROWSER_TYPE_UC || this.enableDirtyRegion(!1)
            },
            getRenderCmd: function(t) {
                return t._createRenderCmd()
            },
            enableDirtyRegion: function(t) {
                this._enableDirtyRegion = t
            },
            isDirtyRegionEnabled: function() {
                return this._enableDirtyRegion
            },
            setDirtyRegionCountThreshold: function(t) {
                this._dirtyRegionCountThreshold = t
            },
            _collectDirtyRegion: function() {
                var t, e, i = this._renderCmds,
                    n = this._dirtyRegion,
                    r = _ccsg.Node.CanvasRenderCmd.RegionStatus,
                    s = 0,
                    o = !0;
                for (t = 0, e = i.length; t < e; t++) {
                    var c = i[t],
                        a = c._regionFlag,
                        h = c._oldRegion,
                        l = c._currentRegion;
                    a > r.NotDirty && (++s > this._dirtyRegionCountThreshold && (o = !1), o && (!l.isEmpty() && n.addRegion(l), c._regionFlag > r.Dirty && !h.isEmpty() && n.addRegion(h)), c._regionFlag = r.NotDirty)
                }
                return o
            },
            _beginDrawDirtyRegion: function(t) {
                var e = t.getContext(),
                    i = this._dirtyRegion.getDirtyRegions();
                e.save(), t.setTransform({
                    a: 1,
                    b: 0,
                    c: 0,
                    d: 1,
                    tx: 0,
                    ty: 0
                }, 1, 1), e.beginPath();
                for (var n = 0, r = 0, s = 0, o = 0, c = t._scaleX, a = t._scaleY, h = 0, l = i.length; h < l; ++h) {
                    var u = i[h];
                    n = (u._minX * c | 0) - 1, r = (-u._maxY * c | 0) - 1, s = 2 + (u._width * c | 0), o = 2 + (u._height * a | 0), e.rect(n, r, s, o)
                }
                e.clip()
            },
            _endDrawDirtyRegion: function(t) {
                t.restore()
            },
            _debugDrawDirtyRegion: function(t) {
                if (this._debugDirtyRegion) {
                    var e = t.getContext(),
                        i = this._dirtyRegion.getDirtyRegions();
                    t.setTransform({
                        a: 1,
                        b: 0,
                        c: 0,
                        d: 1,
                        tx: 0,
                        ty: 0
                    }, 1, 1), e.beginPath();
                    for (var n = 0, r = 0, s = 0, o = 0, c = t._scaleX, a = t._scaleY, h = 0, l = i.length; h < l; ++h) {
                        var u = i[h];
                        n = (u._minX * c | 0) - 1, r = (-u._maxY * c | 0) - 1, s = 2 + (u._width * c | 0), o = 2 + (u._height * a | 0), e.rect(n, r, s, o)
                    }
                    var _ = e.fillStyle;
                    e.fillStyle = "green", e.fill(), e.fillStyle = _
                }
            },
            rendering: function(t) {
                var e = this._dirtyRegion = this._dirtyRegion || new cc.DirtyRegion,
                    i = cc._canvas,
                    n = t || cc._renderContext,
                    r = n.getContext(),
                    s = cc.view.getScaleX(),
                    o = cc.view.getScaleY();
                n.setViewScale(s, o), n.computeRealOffsetY();
                var c, a, h = this._dirtyRegion.getDirtyRegions(),
                    l = this._renderCmds,
                    u = this._allNeedDraw || !this._enableDirtyRegion;
                for (u || (u = u || !this._collectDirtyRegion()), u || this._beginDrawDirtyRegion(n), r.setTransform(1, 0, 0, 1, 0, 0), r.clearRect(0, 0, i.width, i.height), 0 === this._clearColor.r && 0 === this._clearColor.g && 0 === this._clearColor.b || (n.setFillStyle(this._clearFillStyle), n.setGlobalAlpha(this._clearColor.a), r.fillRect(0, 0, i.width, i.height)), c = 0, a = l.length; c < a; c++) {
                    var _ = l[c];
                    if (_._needDraw) {
                        var d = !1,
                            f = _._currentRegion;
                        if (!f || u) d = !0;
                        else
                            for (var p = 0, g = h.length; p < g; ++p)
                                if (h[p].intersects(f)) {
                                    d = !0;
                                    break
                                }
                        d && _.rendering(n, s, o)
                    }
                }
                u || (this._debugDrawDirtyRegion(n), this._endDrawDirtyRegion(r)), e.clear(), this._allNeedDraw = !1
            },
            _renderingToCacheCanvas: function(t, e, i, n) {
                t || cc.logID(7600), i = void 0 === i ? 1 : i, n = void 0 === n ? 1 : n, e = e || this._currentID;
                var r, s, o = this._cacheToCanvasCmds[e];
                for (t.computeRealOffsetY(), r = 0, s = o.length; r < s; r++) o[r].rendering(t, i, n);
                this._removeCache(e);
                var c = this._cacheInstanceIds;
                0 === c.length ? this._isCacheToCanvasOn = !1 : this._currentID = c[c.length - 1]
            },
            _turnToCacheMode: function(t) {
                this._isCacheToCanvasOn = !0, t = t || 0, this._cacheToCanvasCmds[t] = [], -1 === this._cacheInstanceIds.indexOf(t) && this._cacheInstanceIds.push(t), this._currentID = t
            },
            _turnToNormalMode: function() {
                this._isCacheToCanvasOn = !1
            },
            _removeCache: function(t) {
                t = t || this._currentID;
                var e = this._cacheToCanvasCmds[t];
                e && (e.length = 0, delete this._cacheToCanvasCmds[t]);
                var i = this._cacheInstanceIds;
                cc.js.array.remove(i, t)
            },
            resetFlag: function() {
                this.childrenOrderDirty = !1, this._transformNodePool.length = 0
            },
            transform: function() {
                var t = this._transformNodePool;
                t.sort(this._sortNodeByLevelAsc);
                for (var e = 0, i = t.length; e < i; e++) t[e].updateStatus();
                t.length = 0
            },
            transformDirty: function() {
                return this._transformNodePool.length > 0
            },
            _sortNodeByLevelAsc: function(t, e) {
                return t._curLevel - e._curLevel
            },
            pushDirtyNode: function(t) {
                this._transformNodePool.push(t)
            },
            clear: function() {},
            clearRenderCommands: function() {
                this._renderCmds.length = 0, this._cacheInstanceIds.length = 0, this._isCacheToCanvasOn = !1, this._allNeedDraw = !0
            },
            pushRenderCommand: function(t) {
                if (t.rendering)
                    if (this._isCacheToCanvasOn) {
                        var e = this._currentID,
                            i = this._cacheToCanvasCmds[e]; - 1 === i.indexOf(t) && i.push(t)
                    } else -1 === this._renderCmds.indexOf(t) && this._renderCmds.push(t)
            }
        }, (function() {
            cc.CanvasContextWrapper = function(t) {
                this._context = t, this._saveCount = 0, this._currentAlpha = t.globalAlpha, this._currentCompositeOperation = t.globalCompositeOperation, this._currentFillStyle = t.fillStyle, this._currentStrokeStyle = t.strokeStyle, this._offsetX = 0, this._offsetY = 0, this._realOffsetY = this.height, this._armatureMode = 0
            };
            var t = cc.CanvasContextWrapper.prototype;
            t.resetCache = function() {
                var t = this._context;
                this._currentAlpha = t.globalAlpha, this._currentCompositeOperation = t.globalCompositeOperation, this._currentFillStyle = t.fillStyle, this._currentStrokeStyle = t.strokeStyle, this._realOffsetY = this._context.canvas.height + this._offsetY
            }, t.setOffset = function(t, e) {
                this._offsetX = t, this._offsetY = e, this._realOffsetY = this._context.canvas.height + this._offsetY
            }, t.computeRealOffsetY = function() {
                this._realOffsetY = this._context.canvas.height + this._offsetY
            }, t.setViewScale = function(t, e) {
                this._scaleX = t, this._scaleY = e
            }, t.getContext = function() {
                return this._context
            }, t.save = function() {
                this._context.save(), this._saveCount++
            }, t.restore = function() {
                this._context.restore(), this._currentAlpha = this._context.globalAlpha, this._saveCount--
            }, t.setGlobalAlpha = function(t) {
                this._saveCount > 0 ? this._context.globalAlpha = t : this._currentAlpha !== t && (this._currentAlpha = t, this._context.globalAlpha = t)
            }, t.setCompositeOperation = function(t) {
                this._saveCount > 0 ? this._context.globalCompositeOperation = t : this._currentCompositeOperation !== t && (this._currentCompositeOperation = t, this._context.globalCompositeOperation = t)
            }, t.setFillStyle = function(t) {
                this._context.fillStyle = t
            }, t.setStrokeStyle = function(t) {
                this._saveCount > 0 ? this._context.strokeStyle = t : this._currentStrokeStyle !== t && (this._currentStrokeStyle = t, this._context.strokeStyle = t)
            }, t.setTransform = function(t, e, i) {
                this._armatureMode > 0 ? (this.restore(), this.save(), this._context.transform(t.a, -t.b, -t.c, t.d, t.tx * e, -t.ty * i)) : this._context.setTransform(t.a * e, -t.b * i, -t.c * e, t.d * i, this._offsetX + t.tx * e, this._realOffsetY - t.ty * i)
            }, t._switchToArmatureMode = function(t, e, i, n) {
                t ? (this._armatureMode++, this._context.setTransform(e.a, e.c, e.b, e.d, this._offsetX + e.tx * i, this._realOffsetY - e.ty * n), this.save()) : (this._armatureMode--, this.restore())
            }
        })()
    }), {}],
    108: [(function(t, e, i) {
        function n(t) {
            var e = cc._renderContext;
            null === o && (c = e.createBuffer(), o = e.createBuffer()), (function(t) {
                var e = cc._renderContext;
                if (o) {
                    var i = 6 * Math.ceil(t / 4);
                    e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, o), p = new Uint16Array(i);
                    for (var n = 0, r = 0, s = i; r < s; r += 6) p[r] = n + 0, p[r + 1] = n + 1, p[r + 2] = n + 2, p[r + 3] = n + 1, p[r + 4] = n + 2, p[r + 5] = n + 3, n += 4;
                    e.bufferData(e.ELEMENT_ARRAY_BUFFER, p, e.DYNAMIC_DRAW)
                }
                if (c) {
                    var h = 4 * (t * u);
                    _ = new ArrayBuffer(h), d = new Float32Array(_), f = new Uint32Array(_), e.bindBuffer(e.ARRAY_BUFFER, c), e.bufferData(e.ARRAY_BUFFER, d, e.DYNAMIC_DRAW)
                }
                a = t - 200
            })(t)
        }
        var r = {
                texture: null,
                blendSrc: null,
                blendDst: null,
                shader: null
            },
            s = !1,
            o = null,
            c = null,
            a = 0,
            h = 0,
            l = 0,
            u = 6,
            _ = null,
            d = null,
            f = null,
            p = null,
            g = 0,
            m = !0,
            v = cc.Enum({
                QUAD: 0,
                TRIANGLE: 1,
                CUSTOM: 2
            });
        cc.rendererWebGL = {
            mat4Identity: null,
            childrenOrderDirty: !0,
            assignedZ: 0,
            assignedZStep: .01,
            VertexType: v,
            _transformNodePool: [],
            _renderCmds: [],
            _isCacheToBufferOn: !1,
            _cacheToBufferCmds: {},
            _cacheInstanceIds: [],
            _currentID: 0,
            _clearColor: {
                r: 0,
                g: 0,
                b: 0,
                a: 1
            },
            init: function() {
                var t = cc._renderContext;
                t.disable(t.CULL_FACE), t.disable(t.DEPTH_TEST), this._initExtensions(["OES_element_index_uint"]), this.mat4Identity = new cc.math.Matrix4, this.mat4Identity.identity(), n(cc.macro.BATCH_VERTEX_COUNT), cc.sys.os === cc.sys.OS_IOS && !0
            },
            _initExtensions: function(t) {
                this._extensions = this._extensions || {};
                for (var e = 0; e < t.length; ++e) {
                    var i = t[e];
                    try {
                        var n = gl.getExtension(i);
                        n && (this._extensions[i] = n)
                    } catch (t) {
                        cc.error(t)
                    }
                }
            },
            getVertexSize: function() {
                return a
            },
            getRenderCmd: function(t) {
                return t._createRenderCmd()
            },
            _turnToCacheMode: function(t) {
                this._isCacheToBufferOn = !0, t = t || 0, this._cacheToBufferCmds[t] ? this._cacheToBufferCmds[t].length = 0 : this._cacheToBufferCmds[t] = [], -1 === this._cacheInstanceIds.indexOf(t) && this._cacheInstanceIds.push(t), this._currentID = t
            },
            _turnToNormalMode: function() {
                this._isCacheToBufferOn = !1
            },
            _removeCache: function(t) {
                t = t || this._currentID;
                var e = this._cacheToBufferCmds[t];
                e && (e.length = 0, delete this._cacheToBufferCmds[t]);
                var i = this._cacheInstanceIds;
                cc.js.array.remove(i, t)
            },
            _renderingToBuffer: function(t) {
                t = t || this._currentID;
                var e = this._cacheToBufferCmds[t],
                    i = cc._renderContext;
                this.rendering(i, e), this._removeCache(t);
                var n = this._cacheInstanceIds;
                0 === n.length ? this._isCacheToBufferOn = !1 : this._currentID = n[n.length - 1]
            },
            resetFlag: function() {
                this.childrenOrderDirty && (this.childrenOrderDirty = !1), this._transformNodePool.length = 0
            },
            transform: function() {
                var t = this._transformNodePool;
                t.sort(this._sortNodeByLevelAsc);
                var e, i;
                for (e = 0, i = t.length; e < i; e++) t[e].updateStatus();
                t.length = 0
            },
            transformDirty: function() {
                return this._transformNodePool.length > 0
            },
            _sortNodeByLevelAsc: function(t, e) {
                return t._curLevel - e._curLevel
            },
            pushDirtyNode: function(t) {
                this._transformNodePool.push(t)
            },
            clearRenderCommands: function() {
                this._renderCmds.length = 0
            },
            clear: function() {
                var t = cc._renderContext;
                t.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, this._clearColor.a), t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT)
            },
            setDepthTest: function(t) {
                var e = cc._renderContext;
                t ? (e.clearDepth(1), e.enable(e.DEPTH_TEST), e.depthFunc(e.LEQUAL)) : e.disable(e.DEPTH_TEST)
            },
            pushRenderCommand: function(t) {
                if (t.rendering || t.uploadData)
                    if (this._isCacheToBufferOn) {
                        var e = this._currentID,
                            i = this._cacheToBufferCmds[e]; - 1 === i.indexOf(t) && i.push(t)
                    } else this._renderCmds.push(t)
            },
            _increaseBatchingSize: function(t, e, i) {
                var n, r;
                switch (e = e || v.QUAD) {
                    case v.QUAD:
                        for (n = 0; n < t; n += 4) r = h + n, p[l++] = r + 0, p[l++] = r + 1, p[l++] = r + 2, p[l++] = r + 1, p[l++] = r + 2, p[l++] = r + 3;
                        break;
                    case v.TRIANGLE:
                        for (m = !1, n = 0; n < t; n += 3) r = h + n, p[l++] = r + 0, p[l++] = r + 1, p[l++] = r + 2;
                        break;
                    case v.CUSTOM:
                        m = !1;
                        var s = i.length;
                        for (n = 0; n < s; n++) p[l++] = h + i[n];
                        break;
                    default:
                        return
                }
                h += t
            },
            _updateBatchedInfo: function(t, e, i) {
                return (t !== r.texture || e.src !== r.blendSrc || e.dst !== r.blendDst || i !== r.shader) && (this._batchRendering(), r.texture = t, r.blendSrc = e.src, r.blendDst = e.dst, r.shader = i, !0)
            },
            _breakBatch: function() {
                s = !0
            },
            _uploadBufferData: function(t) {
                h >= a && this._batchRendering();
                var e = t._node,
                    i = t._texture || e._texture || e._spriteFrame && e._spriteFrame._texture,
                    n = e._blendFunc.src,
                    o = e._blendFunc.dst,
                    c = t._shaderProgram;
                (s || r.texture !== i || r.blendSrc !== n || r.blendDst !== o || r.shader !== c) && (this._batchRendering(), r.texture = i, r.blendSrc = n, r.blendDst = o, r.shader = c, s = !1);
                var _ = t.uploadData(d, f, h * u);
                if (_ > 0) {
                    var g, y;
                    switch (t.vertexType || v.QUAD) {
                        case v.QUAD:
                            for (g = 0; g < _; g += 4) y = h + g, p[l++] = y + 0, p[l++] = y + 1, p[l++] = y + 2, p[l++] = y + 1, p[l++] = y + 2, p[l++] = y + 3;
                            break;
                        case v.TRIANGLE:
                            for (m = !1, g = 0; g < _; g += 3) y = h + g, p[l++] = y + 0, p[l++] = y + 1, p[l++] = y + 2;
                            break;
                        case v.CUSTOM:
                            m = !1, t.uploadIndexData && (l += t.uploadIndexData(p, l, h));
                            break;
                        default:
                            return
                    }
                    h += _
                }
            },
            _batchRendering: function() {
                if (0 !== h && r.texture) {
                    var t = cc._renderContext,
                        e = r.texture,
                        i = r.shader,
                        n = h > .5 * a;
                    if (i && (i.use(), i._updateProjectionUniform()), cc.gl.blendFunc(r.blendSrc, r.blendDst), cc.gl.bindTexture2DN(0, e), t.bindBuffer(t.ARRAY_BUFFER, c), n) t.bufferData(t.ARRAY_BUFFER, d, t.DYNAMIC_DRAW);
                    else {
                        var s = d.subarray(0, h * u);
                        t.bufferData(t.ARRAY_BUFFER, s, t.DYNAMIC_DRAW)
                    }
                    t.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_POSITION), t.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_COLOR), t.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_TEX_COORDS), t.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_POSITION, 3, t.FLOAT, !1, 24, 0), t.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_COLOR, 4, t.UNSIGNED_BYTE, !0, 24, 12), t.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_TEX_COORDS, 2, t.FLOAT, !1, 24, 16), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, o), (!g || !m || l > g) && (n ? t.bufferData(t.ELEMENT_ARRAY_BUFFER, p, t.DYNAMIC_DRAW) : t.bufferData(t.ELEMENT_ARRAY_BUFFER, p.subarray(0, l), t.DYNAMIC_DRAW)), t.drawElements(t.TRIANGLES, l, t.UNSIGNED_SHORT, 0), cc.g_NumberOfDraws++, m ? g = l : (g = 0, m = !0), h = 0, l = 0
                }
            },
            rendering: function(t, e) {
                var i, n, s, o = e || this._renderCmds,
                    c = t || cc._renderContext;
                for (c.bindBuffer(c.ARRAY_BUFFER, null), cc.gl.bindTexture2DN(0, null), i = 0, n = o.length; i < n; ++i)(s = o[i])._needDraw && (s.uploadData ? this._uploadBufferData(s) : (h > 0 && this._batchRendering(), s.rendering(c)));
                this._batchRendering(), r.texture = null
            }
        }
    }), {}],
    109: [(function(t, e, i) {
        t("./RendererCanvas"), t("./RendererWebGL"), t("./DirtyRegion")
    }), {
        "./DirtyRegion": 106,
        "./RendererCanvas": 107,
        "./RendererWebGL": 108
    }],
    110: [(function(t, e, i) {
        _ccsg.Scene = _ccsg.Node.extend({
            _className: "Scene",
            ctor: function() {
                _ccsg.Node.prototype.ctor.call(this), this._ignoreAnchorPointForPosition = !0, this.setAnchorPoint(.5, .5), this.setContentSize(cc.director.getWinSize())
            }
        })
    }), {}],
    111: [(function(t, e, i) {
        var n = t("../event/event-target"),
            r = t("../utils/misc");
        _ccsg.Sprite = _ccsg.Node.extend({
            dirty: !1,
            _recursiveDirty: null,
            _shouldBeHidden: !1,
            _transformToBatch: null,
            _blendFunc: null,
            _texture: null,
            _rect: null,
            _rectRotated: !1,
            _offsetPosition: null,
            _unflippedOffsetPositionFromCenter: null,
            _opacityModifyRGB: !1,
            _flippedX: !1,
            _flippedY: !1,
            _textureLoaded: !1,
            _className: "Sprite",
            ctor: function(t, e, i) {
                _ccsg.Node.prototype.ctor.call(this), n.call(this), this._shouldBeHidden = !1, this._offsetPosition = cc.p(0, 0), this._unflippedOffsetPositionFromCenter = cc.p(0, 0), this._blendFunc = {
                    src: cc.macro.BLEND_SRC,
                    dst: cc.macro.BLEND_DST
                }, this._rect = cc.rect(0, 0, 0, 0), this._softInit(t, e, i)
            },
            textureLoaded: function() {
                return this._textureLoaded
            },
            addLoadedEventListener: function(t, e) {
                this.once("load", t, e)
            },
            isDirty: function() {
                return this.dirty
            },
            setDirty: function(t) {
                this.dirty = t
            },
            isTextureRectRotated: function() {
                return this._rectRotated
            },
            getTextureRect: function() {
                return cc.rect(this._rect)
            },
            getOffsetPosition: function() {
                return cc.p(this._offsetPosition)
            },
            _getOffsetX: function() {
                return this._offsetPosition.x
            },
            _getOffsetY: function() {
                return this._offsetPosition.y
            },
            getBlendFunc: function() {
                return this._blendFunc
            },
            initWithSpriteFrame: function(t) {
                cc.assertID(t, 2606), t.textureLoaded() || (this._textureLoaded = !1, t.once("load", this._renderCmd._spriteFrameLoadedCallback, this._renderCmd));
                var e = cc._renderType !== cc.game.RENDER_TYPE_CANVAS && t._rotated,
                    i = this.initWithTexture(t.getTexture(), t.getRect(), e);
                return this.setSpriteFrame(t), i
            },
            initWithSpriteFrameName: function() {
                cc.warnID(2608)
            },
            setVertexRect: function(t) {
                var e = this._rect;
                e.x = t.x, e.y = t.y, e.width = t.width, e.height = t.height
            },
            setFlippedX: function(t) {
                this._flippedX !== t && (this._flippedX = t, this.setTextureRect(this._rect, this._rectRotated, this._contentSize), this.setNodeDirty(!0))
            },
            setFlippedY: function(t) {
                this._flippedY !== t && (this._flippedY = t, this.setTextureRect(this._rect, this._rectRotated, this._contentSize), this.setNodeDirty(!0))
            },
            isFlippedX: function() {
                return this._flippedX
            },
            isFlippedY: function() {
                return this._flippedY
            },
            setOpacityModifyRGB: function(t) {
                this._opacityModifyRGB !== t && (this._opacityModifyRGB = t, this._renderCmd._setColorDirty())
            },
            isOpacityModifyRGB: function() {
                return this._opacityModifyRGB
            },
            setDisplayFrameWithAnimationName: function(t, e) {
                cc.assertID(t, 2610);
                var i = cc.spriteFrameAnimationCache.getAnimation(t);
                if (i) {
                    var n = i.getFrames()[e];
                    n ? this.setSpriteFrame(n.getSpriteFrame()) : cc.logID(2603)
                } else cc.logID(2602)
            },
            getTexture: function() {
                return this._texture
            },
            _softInit: function(t, e, i) {
                if (void 0 === t) _ccsg.Sprite.prototype.init.call(this);
                else if (cc.js.isString(t)) "#" === t[0] ? cc.logID(2728, t) : _ccsg.Sprite.prototype.init.call(this, t, e);
                else if ("object" == typeof t)
                    if (t instanceof cc.Texture2D) this.initWithTexture(t, e, i);
                    else if (t instanceof cc.SpriteFrame) this.initWithSpriteFrame(t);
                else if (t instanceof HTMLImageElement || t instanceof HTMLCanvasElement) {
                    var n = new cc.Texture2D;
                    n.initWithElement(t), n.handleLoadedTexture(), this.initWithTexture(n)
                }
            },
            getQuad: function() {
                return null
            },
            setBlendFunc: function(t, e) {
                var i = this._blendFunc;
                void 0 === e ? (i.src = t.src, i.dst = t.dst) : (i.src = t, i.dst = e), this._renderCmd.updateBlendFunc(i)
            },
            init: function() {
                return arguments.length > 0 ? this.initWithFile(arguments[0], arguments[1]) : (this.dirty = this._recursiveDirty = !1, this._blendFunc.src = cc.macro.BLEND_SRC, this._blendFunc.dst = cc.macro.BLEND_DST, this.texture = null, this._flippedX = this._flippedY = !1, this.anchorX = .5, this.anchorY = .5, this._offsetPosition.x = 0, this._offsetPosition.y = 0, this.setTextureRect(cc.rect(0, 0, 0, 0), !1, cc.size(0, 0)), !0)
            },
            initWithFile: function(t, e) {
                cc.assertID(t, 2609);
                var i = cc.textureCache.getTextureForKey(t);
                if (i) {
                    if (!e) {
                        var n = i.getContentSize();
                        e = cc.rect(0, 0, n.width, n.height)
                    }
                    return this.initWithTexture(i, e)
                }
                return i = cc.textureCache.addImage(t), this.initWithTexture(i, e || cc.rect(0, 0, i.width, i.height))
            },
            initWithTexture: function(t, e, i, n) {
                cc.assertID(0 !== arguments.length, 2710), i = i || !1, t = this._renderCmd._handleTextureForRotatedTexture(t, e, i, n), this._recursiveDirty = !1, this.dirty = !1, this._opacityModifyRGB = !0, this._blendFunc.src = cc.macro.BLEND_SRC, this._blendFunc.dst = cc.macro.BLEND_DST, this._flippedX = this._flippedY = !1, this.setAnchorPoint(.5, .5), this._offsetPosition.x = 0, this._offsetPosition.y = 0;
                var r = t.loaded;
                return this._textureLoaded = r, r ? (e || (e = cc.rect(0, 0, t.width, t.height)), this._renderCmd._checkTextureBoundary(t, e, i), this.setTexture(t), this.setTextureRect(e, i), this.emit("load"), !0) : (this._rectRotated = i, e && (this._rect.x = e.x, this._rect.y = e.y, this._rect.width = e.width, this._rect.height = e.height), this.texture && this.texture.off("load", this._renderCmd._textureLoadedCallback, this._renderCmd), t.once("load", this._renderCmd._textureLoadedCallback, this._renderCmd), this.setTexture(t), !0)
            },
            setTextureRect: function(t, e, i, n) {
                this._rectRotated = e || !1, this.setContentSize(i || t), this.setVertexRect(t), this._renderCmd._setTextureCoords(t, n);
                var r = this._unflippedOffsetPositionFromCenter.x,
                    s = this._unflippedOffsetPositionFromCenter.y;
                this._flippedX && (r = -r), this._flippedY && (s = -s);
                var o = this._rect;
                this._offsetPosition.x = r + (this._contentSize.width - o.width) / 2, this._offsetPosition.y = s + (this._contentSize.height - o.height) / 2
            },
            setSpriteFrame: function(t) {
                var e = this;
                cc.assertID(t, 2712), this.setNodeDirty(!0);
                var i = t.getOffset();
                e._unflippedOffsetPositionFromCenter.x = i.x, e._unflippedOffsetPositionFromCenter.y = i.y;
                var n = t.getTexture();
                t.textureLoaded() ? (e._textureLoaded = !0, n !== e._texture && (e._setTexture(n), e.setColor(e._realColor)), e.setTextureRect(t.getRect(), t.isRotated(), t.getOriginalSize())) : (e._textureLoaded = !1, t.once("load", (function(t) {
                    var i = t.currentTarget;
                    e._textureLoaded = !0;
                    var n = i.getTexture();
                    n !== e._texture && e._setTexture(n), e.setTextureRect(i.getRect(), i.isRotated(), i.getOriginalSize()), e.emit("load"), e.setColor(e._realColor)
                }), e)), this._renderCmd._updateForSetSpriteFrame(n)
            },
            setDisplayFrame: function(t) {
                cc.logID(2604), this.setSpriteFrame(t)
            },
            isFrameDisplayed: function(t) {
                return this._renderCmd.isFrameDisplayed(t)
            },
            displayFrame: function() {
                return this.getSpriteFrame()
            },
            getSpriteFrame: function() {
                return new cc.SpriteFrame(this._texture, this._rect, this._rectRotated, this._unflippedOffsetPositionFromCenter, this._contentSize)
            },
            setTexture: function(t) {
                if (!t) return this._renderCmd._setTexture(null);
                var e = cc.js.isString(t);
                e && (t = cc.textureCache.addImage(t)), t.loaded ? (this._setTexture(t, e), this.setColor(this._realColor), this._textureLoaded = !0, this.emit("load")) : (this._renderCmd._setTexture(t), t.once("load", (function(i) {
                    this._setTexture(t, e), this.setColor(this._realColor), this._textureLoaded = !0, this.emit("load")
                }), this))
            },
            _setTexture: function(t, e) {
                this._renderCmd._setTexture(t), e && this._changeRectWithTexture(t)
            },
            _changeRectWithTexture: function(t) {
                var e = cc.rect(0, 0, t.width, t.height);
                this.setTextureRect(e)
            },
            _createRenderCmd: function() {
                return cc._renderType === cc.game.RENDER_TYPE_CANVAS ? new _ccsg.Sprite.CanvasRenderCmd(this) : new _ccsg.Sprite.WebGLRenderCmd(this)
            }
        }), cc.js.addon(_ccsg.Sprite.prototype, n.prototype);
        r.propertyDefine(_ccsg.Sprite, ["opacity", "color", "texture", "quad"], {
            opacityModifyRGB: ["isOpacityModifyRGB", "setOpacityModifyRGB"],
            flippedX: ["isFlippedX", "setFlippedX"],
            flippedY: ["isFlippedY", "setFlippedY"],
            offsetX: ["_getOffsetX"],
            offsetY: ["_getOffsetY"],
            textureRectRotated: ["isTextureRectRotated"]
        })
    }), {
        "../event/event-target": 54,
        "../utils/misc": 128
    }],
    112: [(function(t, e, i) {
        _ccsg.Sprite.CanvasRenderCmd = function(t) {
            this._rootCtor(t), this._needDraw = !0, this._textureCoord = {
                renderX: 0,
                renderY: 0,
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                validRect: !1
            }, this._blendFuncStr = "source-over", this._colorized = !1, this._textureToRender = null
        };
        var n = _ccsg.Sprite.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
        n.constructor = _ccsg.Sprite.CanvasRenderCmd, n.setDirtyRecursively = function(t) {}, n._setTexture = function(t) {
            var e = this._node;
            if (e._texture !== t) {
                e._textureLoaded = !!t && t.loaded, e._texture = t;
                var i = cc.rect(0, 0, t.width, t.height);
                e.setTextureRect(i), this._updateColor()
            }
        }, n._setColorDirty = function() {
            this.setDirtyFlag(_ccsg.Node._dirtyFlags.colorDirty | _ccsg.Node._dirtyFlags.opacityDirty)
        }, n.isFrameDisplayed = function(t) {
            var e = this._node;
            return t.getTexture() === e._texture && cc.rectEqualToRect(t.getRect(), e._rect)
        }, n.updateBlendFunc = function(t) {
            this._blendFuncStr = _ccsg.Node.CanvasRenderCmd._getCompositeOperationByBlendFunc(t)
        }, n._handleTextureForRotatedTexture = function(t, e, i, n) {
            if (i && t.isLoaded()) {
                var r = t.getHtmlElementObj();
                r = _ccsg.Sprite.CanvasRenderCmd._cutRotateImageToCanvas(r, e, n);
                var s = new cc.Texture2D;
                s.initWithElement(r), s.handleLoadedTexture(), t = s, e.x = e.y = 0, this._node._rect = cc.rect(0, 0, e.width, e.height)
            }
            return t
        }, n._checkTextureBoundary = function(t, e, i) {
            if (t && t.url) {
                var n = e.x + e.width,
                    r = e.y + e.height;
                n > t.width && cc.errorID(3300, t.url), r > t.height && cc.errorID(3400, t.url)
            }
        }, n.rendering = function(t, e, i) {
            var n = this._node,
                r = this._textureCoord,
                s = this._displayedOpacity / 255,
                o = this._textureToRender || n._texture;
            if ((!o || 0 !== r.width && 0 !== r.height && o.loaded) && 0 !== s) {
                var c, a = t || cc._renderContext,
                    h = a.getContext(),
                    l = n._offsetPosition.x,
                    u = n._rect.height,
                    _ = n._rect.width,
                    d = -n._offsetPosition.y - u;
                a.setTransform(this._worldTransform, e, i), a.setCompositeOperation(this._blendFuncStr), a.setGlobalAlpha(s), (n._flippedX || n._flippedY) && a.save(), n._flippedX && (l = -l - _, h.scale(-1, 1)), n._flippedY && (d = n._offsetPosition.y, h.scale(1, -1));
                var f, p, g, m, v, y, C, T;
                if (this._colorized ? (f = 0, p = 0) : (f = r.renderX, p = r.renderY), g = r.width, m = r.height, v = l, y = d, C = _, T = u, o && o._image) c = o._image, "" !== o._pattern ? (a.setFillStyle(h.createPattern(c, o._pattern)), h.fillRect(v, y, C, T)) : h.drawImage(c, f, p, g, m, v, y, C, T);
                else {
                    var E = n._contentSize;
                    if (r.validRect) {
                        var x = this._displayedColor;
                        a.setFillStyle("rgba(" + x.r + "," + x.g + "," + x.b + ",1)"), h.fillRect(v, y, E.width, E.height)
                    }
                }(n._flippedX || n._flippedY) && a.restore(), cc.g_NumberOfDraws++
            }
        }, n._updateColor = function() {
            var t = this._node._texture,
                e = this._textureCoord,
                i = this._displayedColor;
            t && (255 !== i.r || 255 !== i.g || 255 !== i.b ? (this._textureToRender = t._generateColorTexture(i.r, i.g, i.b, e), this._colorized = !0) : t && (this._textureToRender = t, this._colorized = !1))
        }, n._updateForSetSpriteFrame = function(t, e) {
            if (this._colorized = !1, this._textureCoord.renderX = this._textureCoord.x, this._textureCoord.renderY = this._textureCoord.y, e = e || t.loaded) {
                var i = this._node.getColor();
                255 === i.r && 255 === i.g && 255 === i.b || this._updateColor()
            }
        }, n._spriteFrameLoadedCallback = function(t) {
            var e = this._node,
                i = t.currentTarget;
            e.setTextureRect(i.getRect(), i.isRotated(), i.getOriginalSize()), this._updateColor(), e.emit("load")
        }, n._textureLoadedCallback = function(t) {
            var e = this._node,
                i = t.currentTarget;
            if (!e._textureLoaded) {
                e._textureLoaded = !0;
                var n = e._rect;
                n ? cc._rectEqualToZero(n) && (n.width = i.width, n.height = i.height) : n = cc.rect(0, 0, i.width, i.height), e.texture = i, e.setTextureRect(n, e._rectRotated);
                var r = this._displayedColor;
                255 === r.r && 255 === r.g && 255 === r.b || this._updateColor(), e.emit("load")
            }
        }, n._setTextureCoords = function(t) {
            var e = this._textureCoord;
            e.renderX = e.x = 0 | t.x, e.renderY = e.y = 0 | t.y, e.width = 0 | t.width, e.height = 0 | t.height, e.validRect = !(0 === e.width || 0 === e.height || e.x < 0 || e.y < 0)
        }, _ccsg.Sprite.CanvasRenderCmd._cutRotateImageToCanvas = function(t, e, i) {
            if (!t) return null;
            if (!e) return t;
            i = null == i || i;
            var n = document.createElement("canvas");
            n.width = e.width, n.height = e.height;
            var r = n.getContext("2d");
            return r.translate(n.width / 2, n.height / 2), i ? r.rotate(-1.5707963267948966) : r.rotate(1.5707963267948966), r.drawImage(t, e.x, e.y, e.height, e.width, -e.height / 2, -e.width / 2, e.height, e.width), n
        }
    }), {}],
    113: [(function(t, e, i) {
        var n = cc.macro;
        _ccsg.Sprite.WebGLRenderCmd = function(t) {
            this._rootCtor(t), this._needDraw = !0, this._vertices = [{
                x: 0,
                y: 0,
                u: 0,
                v: 0
            }, {
                x: 0,
                y: 0,
                u: 0,
                v: 0
            }, {
                x: 0,
                y: 0,
                u: 0,
                v: 0
            }, {
                x: 0,
                y: 0,
                u: 0,
                v: 0
            }], this._dirty = !1, this._recursiveDirty = !1, this._shaderProgram = cc.shaderCache.programForKey(n.SHADER_SPRITE_POSITION_TEXTURECOLOR)
        };
        var r = _ccsg.Sprite.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
        r.constructor = _ccsg.Sprite.WebGLRenderCmd, r.updateBlendFunc = function(t) {}, r.setDirtyFlag = function(t) {
            _ccsg.Node.WebGLRenderCmd.prototype.setDirtyFlag.call(this, t), this._dirty = !0
        }, r.setDirtyRecursively = function(t) {
            this._recursiveDirty = t, this._dirty = t;
            for (var e, i = this._node._children, n = i ? i.length : 0, r = 0; r < n; r++)(e = i[r]) instanceof _ccsg.Sprite && e._renderCmd.setDirtyRecursively(t)
        }, r._handleTextureForRotatedTexture = function(t) {
            return t
        }, r.isFrameDisplayed = function(t) {
            var e = this._node;
            return cc.rectEqualToRect(t.getRect(), e._rect) && t.getTexture().url === e._texture.url && cc.pointEqualToPoint(t.getOffset(), e._unflippedOffsetPositionFromCenter)
        }, r._updateForSetSpriteFrame = function() {}, r._spriteFrameLoadedCallback = function(t) {
            var e = t.currentTarget;
            this._node.setTextureRect(e.getRect(), e.isRotated(), e.getOriginalSize()), this._node.emit("load")
        }, r._textureLoadedCallback = function(t) {
            var e = this._node,
                i = t.currentTarget;
            if (!e._textureLoaded) {
                e._textureLoaded = !0;
                var n = e._rect;
                n ? cc._rectEqualToZero(n) && (n.width = i.width, n.height = i.height) : n = cc.rect(0, 0, i.width, i.height), e.texture = i, e.setTextureRect(n, e._rectRotated), e.emit("load"), cc.renderer.childrenOrderDirty = !0
            }
        }, r._setTextureCoords = function(t) {
            var e = this._node,
                i = e._texture,
                r = this._vertices;
            if (i) {
                var s, o, c, a, h, l = i.pixelWidth,
                    u = i.pixelHeight;
                e._rectRotated ? (n.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? (o = (s = (2 * t.x + 1) / (2 * l)) + (2 * t.height - 2) / (2 * l), a = (c = (2 * t.y + 1) / (2 * u)) + (2 * t.width - 2) / (2 * u)) : (s = t.x / l, o = (t.x + t.height) / l, c = t.y / u, a = (t.y + t.width) / u), e._flippedX && (h = c, c = a, a = h), e._flippedY && (h = s, s = o, o = h), r[0].u = o, r[0].v = c, r[1].u = s, r[1].v = c, r[2].u = o, r[2].v = a, r[3].u = s, r[3].v = a) : (n.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? (o = (s = (2 * t.x + 1) / (2 * l)) + (2 * t.width - 2) / (2 * l), a = (c = (2 * t.y + 1) / (2 * u)) + (2 * t.height - 2) / (2 * u)) : (s = t.x / l, o = (t.x + t.width) / l, c = t.y / u, a = (t.y + t.height) / u), e._flippedX && (h = s, s = o, o = h), e._flippedY && (h = c, c = a, a = h), r[0].u = s, r[0].v = c, r[1].u = s, r[1].v = a, r[2].u = o, r[2].v = c, r[3].u = o, r[3].v = a)
            }
        }, r._setColorDirty = function() {}, r._updateBlendFunc = function() {
            var t = this._node;
            t._texture && t._texture.hasPremultipliedAlpha() ? (t._blendFunc.src = n.BLEND_SRC, t._blendFunc.dst = n.BLEND_DST, t.opacityModifyRGB = !0) : (t._blendFunc.src = n.SRC_ALPHA, t._blendFunc.dst = n.ONE_MINUS_SRC_ALPHA, t.opacityModifyRGB = !1)
        }, r._setTexture = function(t) {
            var e = this._node;
            e._texture !== t && (e._textureLoaded = !!t && t.loaded, e._texture = t, this._updateBlendFunc(), e._textureLoaded && (cc.renderer.childrenOrderDirty = !0))
        }, r._checkTextureBoundary = function(t, e, i) {
            if (t && t.url) {
                var n, r;
                i ? (n = e.x + e.height, r = e.y + e.width) : (n = e.x + e.width, r = e.y + e.height), n > t.width && cc.errorID(3300, t.url), r > t.height && cc.errorID(3400, t.url)
            }
        }, r.transform = function(t, e) {
            this.originTransform(t, e);
            var i = this._node,
                n = i._offsetPosition.x,
                r = n + i._rect.width,
                s = i._offsetPosition.y,
                o = s + i._rect.height,
                c = this._worldTransform,
                a = this._vertices;
            a[0].x = n * c.a + o * c.c + c.tx, a[0].y = n * c.b + o * c.d + c.ty, a[1].x = n * c.a + s * c.c + c.tx, a[1].y = n * c.b + s * c.d + c.ty, a[2].x = r * c.a + o * c.c + c.tx, a[2].y = r * c.b + o * c.d + c.ty, a[3].x = r * c.a + s * c.c + c.tx, a[3].y = r * c.b + s * c.d + c.ty
        }, r.needDraw = function() {
            var t = this._node._texture;
            return this._needDraw && t
        }, r.uploadData = function(t, e, i) {
            var n = this._node,
                r = n._texture;
            if (!(r && r.loaded && n._rect.width && n._rect.height && this._displayedOpacity)) return 0;
            var s, o = this._displayedOpacity,
                c = this._displayedColor._val;
            if (n._opacityModifyRGB) {
                var a = o / 255,
                    h = this._displayedColor.r * a,
                    l = this._displayedColor.g * a;
                s = (o << 24 >>> 0) + (this._displayedColor.b * a << 16) + (l << 8) + h
            } else s = (o << 24 >>> 0) + ((65280 & c) << 8) + ((16711680 & c) >> 8) + (c >>> 24);
            var u, _, d = n._vertexZ,
                f = this._vertices,
                p = f.length,
                g = i;
            for (u = 0; u < p; ++u) _ = f[u], t[g] = _.x, t[g + 1] = _.y, t[g + 2] = d, e[g + 3] = s, t[g + 4] = _.u, t[g + 5] = _.v, g += 6;
            return p
        }
    }), {}],
    114: [(function(t, e, i) {
        function n(t, e) {
            return t - e
        }
        var r, s = t("../event/event-target"),
            o = {
                _pool: {},
                _lengths: [],
                put: function(t) {
                    var e = t.length;
                    this._pool[e] ? this._pool[e].push(t) : (this._pool[e] = [t], this._lengths.push(e), this._lengths.sort(n))
                },
                get: function(t) {
                    for (var e, i = 0; i < this._lengths.length; i++)
                        if (this._lengths[i] >= t) {
                            e = this._lengths[i];
                            break
                        }
                    return e ? this._pool[e].pop() : void 0
                }
            },
            c = cc.macro,
            a = {
                _rebuildQuads_base: function(t) {
                    var e, i, n, s, c = t._spriteFrame,
                        a = t._contentSize,
                        h = t._isTrimmedContentSize,
                        l = t._vertices,
                        u = t._corner;
                    if (h) e = 0, i = 0, n = a.width, s = a.height;
                    else {
                        var _ = c._originalSize,
                            d = c._rect,
                            f = c._offset,
                            p = a.width,
                            g = a.height,
                            m = _.width,
                            v = _.height,
                            y = d.width,
                            C = d.height,
                            T = p / m,
                            E = g / v,
                            x = f.x + (m - y) / 2,
                            R = f.x - (m - y) / 2;
                        e = x * T, i = (f.y + (v - C) / 2) * E, n = p + R * T, s = g + (f.y - (v - C) / 2) * E
                    }
                    if (l.length < 8 && (o.put(l), l = o.get(8) || new Float32Array(8), t._vertices = l), r) {
                        var S = t._renderCmd._worldTransform,
                            w = S.a,
                            A = S.b,
                            b = S.c,
                            I = S.d,
                            O = S.tx,
                            N = S.ty,
                            P = e * w,
                            L = e * A,
                            D = n * w,
                            F = n * A,
                            M = s * b + O,
                            B = s * I + N,
                            U = i * b + O,
                            z = i * I + N;
                        l[0] = P + U, l[1] = L + z, l[2] = D + U, l[3] = F + z, l[4] = P + M, l[5] = L + B, l[6] = D + M, l[7] = F + B
                    } else l[0] = e, l[1] = i, l[2] = n, l[3] = i, l[4] = e, l[5] = s, l[6] = n, l[7] = s;
                    u[0] = 0, u[1] = 2, u[2] = 4, u[3] = 6, t._uvsDirty && this._calculateUVs(t, c), t._vertCount = 4
                },
                _calculateUVs: function(t, e) {
                    var i = t._uvs,
                        n = e._texture.width,
                        r = e._texture.height,
                        s = e._rect;
                    i.length < 8 && (o.put(i), i = o.get(8) || new Float32Array(8), t._uvs = i);
                    var a, h, l, u, _ = c.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? .5 : 0;
                    e._rotated ? (a = (s.x + _) / n, h = (s.y + s.width - _) / r, l = (s.x + s.height - _) / n, u = (s.y + _) / r, i[0] = a, i[1] = u, i[2] = a, i[3] = h, i[4] = l, i[5] = u, i[6] = l, i[7] = h) : (a = (s.x + _) / n, h = (s.y + s.height - _) / r, l = (s.x + s.width - _) / n, u = (s.y + _) / r, i[0] = a, i[1] = h, i[2] = l, i[3] = h, i[4] = a, i[5] = u, i[6] = l, i[7] = u)
                }
            },
            h = {
                x: new Array(4),
                y: new Array(4),
                _rebuildQuads_base: function(t) {
                    var e, i, n, s, c = t._spriteFrame,
                        a = t._contentSize,
                        h = t._insetLeft,
                        l = t._insetRight,
                        u = t._insetTop,
                        _ = t._insetBottom,
                        d = t._vertices,
                        f = t._renderCmd._worldTransform,
                        p = c._rect,
                        g = t._corner;
                    e = h, i = l, p.width, n = u, s = _, p.height;
                    var m = a,
                        v = m.width - e - i,
                        y = m.height - n - s,
                        C = m.width / (e + i),
                        T = m.height / (n + s);
                    C = isNaN(C) || C > 1 ? 1 : C, T = isNaN(T) || T > 1 ? 1 : T, v = v < 0 ? 0 : v, y = y < 0 ? 0 : y;
                    var E = this.x,
                        x = this.y;
                    E[0] = 0, E[1] = e * C, E[2] = E[1] + v, E[3] = m.width, x[0] = 0, x[1] = s * T, x[2] = x[1] + y, x[3] = m.height, d.length < 32 && (o.put(d), d = o.get(32) || new Float32Array(32), t._vertices = d);
                    var R, S, w = 0;
                    if (r)
                        for (R = 0; R < 4; R++)
                            for (S = 0; S < 4; S++) d[w] = E[S] * f.a + x[R] * f.c + f.tx, d[w + 1] = E[S] * f.b + x[R] * f.d + f.ty, w += 2;
                    else
                        for (R = 0; R < 4; R++)
                            for (S = 0; S < 4; S++) d[w] = E[S], d[w + 1] = x[R], w += 2;
                    g[0] = 0, g[1] = 6, g[2] = 24, g[3] = 30, t._uvsDirty && this._calculateUVs(t, c, h, l, u, _)
                },
                _calculateUVs: function(t, e, i, n, r, s) {
                    var a, h, l, u, _, d, f = t._uvs,
                        p = e._rect,
                        g = e._texture.width,
                        m = e._texture.height,
                        v = e._rect;
                    a = i, l = n, h = p.width - a - l, u = r, d = s, _ = p.height - u - d, f.length < 32 && (o.put(f), f = o.get(32) || new Float32Array(32), t._uvs = f);
                    var y, C, T = this.x,
                        E = this.y,
                        x = c.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? .5 : 0,
                        R = 0;
                    if (e._rotated)
                        for (T[0] = (v.x + x) / g, T[1] = (d + v.x) / g, T[2] = (d + _ + v.x) / g, T[3] = (v.x + v.height - x) / g, E[3] = (v.y + x) / m, E[2] = (a + v.y) / m, E[1] = (a + h + v.y) / m, E[0] = (v.y + v.width - x) / m, y = 0; y < 4; y++)
                            for (C = 0; C < 4; C++) f[R] = T[y], f[R + 1] = E[3 - C], R += 2;
                    else
                        for (T[0] = (v.x + x) / g, T[1] = (a + v.x) / g, T[2] = (a + h + v.x) / g, T[3] = (v.x + v.width - x) / g, E[3] = (v.y + x) / m, E[2] = (u + v.y) / m, E[1] = (u + _ + v.y) / m, E[0] = (v.y + v.height - x) / m, y = 0; y < 4; y++)
                            for (C = 0; C < 4; C++) f[R] = T[C], f[R + 1] = E[y], R += 2
                }
            },
            l = {
                _rebuildQuads_base: function(t, e, i) {
                    e = t._spriteFrame, i = t._contentSize;
                    var n, s, a, h, l = t._vertices,
                        u = t._corner,
                        _ = t._renderCmd._worldTransform,
                        d = t._uvs,
                        f = e._texture.width,
                        p = e._texture.height,
                        g = e._rect,
                        m = c.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? .5 : 0;
                    e._rotated ? (n = (g.x + m) / f, a = (g.x + g.height - m) / f, s = (g.y + g.width - m) / p, h = (g.y + m) / p) : (n = (g.x + m) / f, a = (g.x + g.width - m) / f, s = (g.y + g.height - m) / p, h = (g.y + m) / p);
                    var v = g.width,
                        y = g.height,
                        C = i.width / v,
                        T = i.height / y,
                        E = Math.ceil(T),
                        x = Math.ceil(C);
                    E * x > 16384 && cc.errorID(2625);
                    var R = E * x * 4 * 2;
                    l.length < R && (o.put(l), l = o.get(R) || new Float32Array(R), t._vertices = l), d.length < R && (o.put(d), d = o.get(R) || new Float32Array(R), t._uvs = d);
                    var S, w, A, b, I = 0;
                    t._vertCount = 0;
                    for (var O = 0; O < E; ++O)
                        for (var N = 0; N < x; ++N) {
                            if (S = v * N, w = y * O, A = v * Math.min(N + 1, C), b = y * Math.min(O + 1, T), r) {
                                var P = S * _.a,
                                    L = S * _.b,
                                    D = A * _.a,
                                    F = A * _.b,
                                    M = b * _.c + _.tx,
                                    B = b * _.d + _.ty,
                                    U = w * _.c + _.tx,
                                    z = w * _.d + _.ty;
                                l[I] = P + U, l[I + 1] = L + z, l[I + 2] = D + U, l[I + 3] = F + z, l[I + 4] = P + M, l[I + 5] = L + B, l[I + 6] = D + M, l[I + 7] = F + B
                            } else l[I] = S, l[I + 1] = w, l[I + 2] = A, l[I + 3] = w, l[I + 4] = S, l[I + 5] = b, l[I + 6] = A, l[I + 7] = b;
                            if (e._rotated ? (d[I] = n, d[I + 1] = h, d[I + 2] = n, d[I + 3] = b = h + (s - h) * Math.min(1, C - N), d[I + 4] = A = n + (a - n) * Math.min(1, T - O), d[I + 5] = h, d[I + 6] = A, d[I + 7] = b) : (d[I] = n, d[I + 1] = s, d[I + 2] = A = n + (a - n) * Math.min(1, C - N), d[I + 3] = s, d[I + 4] = n, d[I + 5] = b = s + (h - s) * Math.min(1, T - O), d[I + 6] = A, d[I + 7] = b), I += 8, t._vertCount += 4, I > R) return
                        }
                    u[0] = 0, u[1] = 8 * (x - 1) + 2, u[2] = (E - 1) * x * 8 + 4, u[3] = R - 2
                }
            },
            u = {
                _rebuildQuads_base: function(t) {
                    var e = t._spriteFrame,
                        i = t._contentSize,
                        n = t._fillStart,
                        s = t._fillRange;
                    s < 0 && (n += s, s = -s), s = n + s, n = (n = n > 1 ? 1 : n) < 0 ? 0 : n, s = (s = s > 1 ? 1 : s) < 0 ? 0 : s, s -= n;
                    var a, h, l, u, _, d = t._fillType,
                        f = t._vertices,
                        p = t._corner,
                        m = t._renderCmd._worldTransform,
                        v = t._uvs,
                        y = 0,
                        C = 0,
                        T = i.width,
                        E = i.height,
                        x = e._texture.width,
                        R = e._texture.height,
                        S = e._rect,
                        w = c.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? .5 : 0;
                    e._rotated ? (h = (S.x + w) / x, l = (S.y + S.width - w) / R, u = (S.x + S.height - w) / x, _ = (S.y + w) / R) : (h = (S.x + w) / x, l = (S.y + S.height - w) / R, u = (S.x + S.width - w) / x, _ = (S.y + w) / R), f.length < 8 && (o.put(f), f = o.get(8) || new Float32Array(8), t._vertices = f), v.length < 8 && (o.put(v), v = o.get(8) || new Float32Array(8), t._uvs = v);
                    var A = new Array(8);
                    e._rotated ? (A[0] = A[2] = h, A[4] = A[6] = u, A[3] = A[7] = l, A[1] = A[5] = _) : (A[0] = A[4] = h, A[2] = A[6] = u, A[1] = A[3] = l, A[5] = A[7] = _), a = (a = (n = (n = n > 1 ? 1 : n) < 0 ? 0 : n) + (s = s < 0 ? 0 : s)) > 1 ? 1 : a;
                    var b;
                    switch (d) {
                        case g.HORIZONTAL:
                            b = y + (T - y) * a, y = y + (T - y) * n, T = b, v[0] = A[0] + (A[2] - A[0]) * n, v[1] = A[1], v[2] = A[0] + (A[2] - A[0]) * a, v[3] = A[3], v[4] = A[4] + (A[6] - A[4]) * n, v[5] = A[5], v[6] = A[4] + (A[6] - A[4]) * a, v[7] = A[7];
                            break;
                        case g.VERTICAL:
                            b = C + (E - C) * a, C = C + (E - C) * n, E = b, v[0] = A[0], v[1] = A[1] + (A[5] - A[1]) * n, v[2] = A[2], v[3] = A[3] + (A[7] - A[3]) * n, v[4] = A[4], v[5] = A[1] + (A[5] - A[1]) * a, v[6] = A[6], v[7] = A[3] + (A[7] - A[3]) * a;
                            break;
                        default:
                            cc.errorID(2626)
                    }
                    if (r) {
                        var I = y * m.a,
                            O = y * m.b,
                            N = T * m.a,
                            P = T * m.b,
                            L = E * m.c + m.tx,
                            D = E * m.d + m.ty,
                            F = C * m.c + m.tx,
                            M = C * m.d + m.ty;
                        f[0] = I + F, f[1] = O + M, f[2] = N + F, f[3] = P + M, f[4] = I + L, f[5] = O + D, f[6] = N + L, f[7] = P + D
                    } else f[0] = y, f[1] = C, f[2] = T, f[3] = C, f[4] = y, f[5] = E, f[6] = T, f[7] = E;
                    t._vertCount = 4, p[0] = 0, p[1] = 2, p[2] = 4, p[3] = 6
                }
            },
            _ = {
                _vertPos: [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)],
                _vertices: [cc.v2(0, 0), cc.v2(0, 0)],
                _uvs: [cc.v2(0, 0), cc.v2(0, 0)],
                _intersectPoint_1: [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)],
                _intersectPoint_2: [cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0), cc.v2(0, 0)],
                outVerts: null,
                outUvs: null,
                rawVerts: null,
                rawUvs: null,
                _rebuildQuads_base: function(t) {
                    var e = t._spriteFrame,
                        i = t._contentSize,
                        n = t._fillStart,
                        r = t._fillRange;
                    r < 0 && (n += r, r = -r), t._isTriangle = !0, t._rawVerts || (t._rawVerts = o.get(8) || new Float32Array(8), t._rawUvs = o.get(8) || new Float32Array(8));
                    for (var s = t._fillCenter, c = t._vertices, a = t._corner, h = t._uvs, l = t._rawVerts, u = t._rawUvs, _ = t._renderCmd._worldTransform; n >= 1;) n -= 1;
                    for (; n < 0;) n += 1;
                    var d = s.x * i.width,
                        f = s.y * i.height,
                        p = cc.v2(d, f),
                        g = (n *= 2 * Math.PI) + (r *= 2 * Math.PI);
                    this.outVerts = c, this.outUvs = h, this.rawVerts = l, this.rawUvs = u, this._calculateVertices(_, e, i), this._calculateUVs(e);
                    var m = this._vertPos,
                        v = this._vertices;
                    m[0].x = m[3].x = v[0].x, m[1].x = m[2].x = v[1].x, m[0].y = m[1].y = v[0].y, m[2].y = m[3].y = v[1].y, p.x > v[1].x && (p.x = v[1].x), p.x < v[0].x && (p.x = v[0].x), p.y < v[0].y && (p.y = v[0].y), p.y > v[1].y && (p.y = v[1].y), l[0] = l[4] = this._vertices[0].x, l[2] = l[6] = this._vertices[1].x, l[1] = l[3] = this._vertices[0].y, l[5] = l[7] = this._vertices[1].y, e._rotated ? (u[0] = u[2] = this._uvs[0].x, u[4] = u[6] = this._uvs[1].x, u[3] = u[7] = this._uvs[0].y, u[1] = u[5] = this._uvs[1].y) : (u[0] = u[4] = this._uvs[0].x, u[2] = u[6] = this._uvs[1].x, u[1] = u[3] = this._uvs[0].y, u[5] = u[7] = this._uvs[1].y);
                    var y = [null, null, null, null];
                    p.x !== this._vertices[0].x && (y[0] = [3, 0]), p.x !== this._vertices[1].x && (y[2] = [1, 2]), p.y !== this._vertices[0].y && (y[1] = [0, 1]), p.y !== this._vertices[1].y && (y[3] = [2, 3]), this._getInsectedPoints(this._vertices[0].x, this._vertices[1].x, this._vertices[0].y, this._vertices[1].y, p, n, this._intersectPoint_1), this._getInsectedPoints(this._vertices[0].x, this._vertices[1].x, this._vertices[0].y, this._vertices[1].y, p, n + r, this._intersectPoint_2);
                    c.length < 30 && (o.put(c), c = o.get(30) || new Float32Array(30), this.outVerts = t._vertices = c), h.length < 30 && (o.put(h), h = o.get(30) || new Float32Array(30), this.outUvs = t._uvs = h);
                    for (var C = 0, T = 0, E = 0; E < 4; ++E) {
                        var x = y[E];
                        if (null !== x)
                            if (r >= 2 * Math.PI) this._generateTriangle(_, C, p, this._vertPos[x[0]], this._vertPos[x[1]]), C += 6, T += 3;
                            else {
                                var R = this._getVertAngle(p, this._vertPos[x[0]]),
                                    S = this._getVertAngle(p, this._vertPos[x[1]]);
                                S < R && (S += 2 * Math.PI), R -= 2 * Math.PI, S -= 2 * Math.PI;
                                for (var w = 0; w < 3; ++w) R >= g || (R >= n ? (S >= g ? this._generateTriangle(_, C, p, this._vertPos[x[0]], this._intersectPoint_2[E]) : this._generateTriangle(_, C, p, this._vertPos[x[0]], this._vertPos[x[1]]), C += 6, T += 3) : S <= n || (S <= g ? (this._generateTriangle(_, C, p, this._intersectPoint_1[E], this._vertPos[x[1]]), C += 6, T += 3) : (this._generateTriangle(_, C, p, this._intersectPoint_1[E], this._intersectPoint_2[E]), C += 6, T += 3))), R += 2 * Math.PI, S += 2 * Math.PI
                            }
                    }
                    t._vertCount = T;
                    for (var A, b, I = 1 / 0, O = 1 / 0, N = -1 / 0, P = -1 / 0, L = 0, D = C; L < D; L += 2) A = c[L], b = c[L + 1], A <= I ? (I = A, a[0] = L) : A >= N && (N = A, a[1] = L), b <= O ? (O = b, a[2] = L) : b >= P && (P = b, a[3] = L)
                },
                _generateTriangle: function(t, e, i, n, s) {
                    var o, c, a = this.rawVerts,
                        h = this.rawUvs,
                        l = this.outVerts,
                        u = a[0],
                        _ = a[1],
                        d = a[6],
                        f = a[7];
                    r ? (l[e] = i.x * t.a + i.y * t.c + t.tx, l[e + 1] = i.x * t.b + i.y * t.d + t.ty, l[e + 2] = n.x * t.a + n.y * t.c + t.tx, l[e + 3] = n.x * t.b + n.y * t.d + t.ty, l[e + 4] = s.x * t.a + s.y * t.c + t.tx, l[e + 5] = s.x * t.b + s.y * t.d + t.ty) : (l[e] = i.x, l[e + 1] = i.y, l[e + 2] = n.x, l[e + 3] = n.y, l[e + 4] = s.x, l[e + 5] = s.y), o = (i.x - u) / (d - u), c = (i.y - _) / (f - _), this._generateUV(o, c, h, e), o = (n.x - u) / (d - u), c = (n.y - _) / (f - _), this._generateUV(o, c, h, e + 2), o = (s.x - u) / (d - u), c = (s.y - _) / (f - _), this._generateUV(o, c, h, e + 4)
                },
                _generateUV: function(t, e, i, n) {
                    var r = this.outUvs,
                        s = i[0] + (i[2] - i[0]) * t,
                        o = i[4] + (i[6] - i[4]) * t,
                        c = i[1] + (i[3] - i[1]) * t,
                        a = i[5] + (i[7] - i[5]) * t;
                    r[n] = s + (o - s) * e, r[n + 1] = c + (a - c) * e
                },
                _isAngleIn: function(t, e, i) {
                    for (var n = 2 * Math.PI; t < e || t >= e + n;) t < e && (t += n), t >= e + n && (t -= n);
                    return t <= e + i
                },
                _getVertAngle: function(t, e) {
                    var i, n;
                    if (i = e.x - t.x, n = e.y - t.y, 0 !== i || 0 !== n) {
                        if (0 === i) return n > 0 ? .5 * Math.PI : 1.5 * Math.PI;
                        var r = Math.atan(n / i);
                        return i < 0 && (r += Math.PI), r
                    }
                },
                _getInsectedPoints: function(t, e, i, n, r, s, o) {
                    var c, a, h = Math.sin(s),
                        l = Math.cos(s);
                    if (0 !== Math.cos(s)) {
                        if (c = h / l, (t - r.x) * l > 0) {
                            var u = r.y + c * (t - r.x);
                            o[0].x = t, o[0].y = u
                        }
                        if ((e - r.x) * l > 0) {
                            var _ = r.y + c * (e - r.x);
                            o[2].x = e, o[2].y = _
                        }
                    }
                    if (0 !== Math.sin(s)) {
                        if (a = l / h, (n - r.y) * h > 0) {
                            var d = r.x + a * (n - r.y);
                            o[3].x = d, o[3].y = n
                        }
                        if ((i - r.y) * h > 0) {
                            var f = r.x + a * (i - r.y);
                            o[1].x = f, o[1].y = i
                        }
                    }
                    return [null, null, null, null]
                },
                _calculateVertices: function(t, e, i) {
                    var n, r;
                    n = i.width, r = i.height, this._vertices[0].x = 0, this._vertices[0].y = 0, this._vertices[1].x = n, this._vertices[1].y = r
                },
                _calculateUVs: function(t) {
                    var e, i, n, r, s = t._texture.width,
                        o = t._texture.height,
                        a = t._rect,
                        h = c.FIX_ARTIFACTS_BY_STRECHING_TEXEL ? .5 : 0;
                    t._rotated ? (e = (a.x + h) / s, i = (a.x + a.height - h) / s, n = (a.y + h) / o, r = (a.y + a.width - h) / o) : (e = (a.x + h) / s, i = (a.x + a.width - h) / s, n = (a.y + h) / o, r = (a.y + a.height - h) / o), this._uvs[0].x = e, this._uvs[0].y = r, this._uvs[1].x = i, this._uvs[1].y = n
                }
            },
            d = {
                _rebuildQuads_base: function(t, e, i) {
                    if (cc._renderType !== cc.game.RENDER_TYPE_CANVAS) {
                        t._spriteFrame;
                        if (i = t._meshPolygonInfo) {
                            var n = t._renderCmd._worldTransform,
                                r = i.triangles.verts,
                                s = t._vertices,
                                c = t._uvs,
                                a = r.length,
                                h = t._corner,
                                l = 2 * a;
                            s.length < l && (o.put(s), s = o.get(l) || new Float32Array(l), t._vertices = s), c.length < l && (o.put(c), c = o.get(l) || new Float32Array(l), t._uvs = c);
                            for (var u = 1 / 0, _ = 1 / 0, d = -1 / 0, f = -1 / 0, p = 0; p < a; p++) {
                                var g = r[p].x * n.a + r[p].y * n.c + n.tx,
                                    m = r[p].x * n.b + r[p].y * n.d + n.ty;
                                s[2 * p] = g, s[2 * p + 1] = m, c[2 * p] = r[p].u, c[2 * p + 1] = r[p].v, g < u && (u = g, h[0] = 2 * p), g > d && (d = g, h[1] = 2 * p), m < _ && (_ = m, h[2] = 2 * p), m > f && (f = m, h[3] = 2 * p)
                            }
                            t._vertCount = a
                        }
                    }
                }
            };
        cc.Scale9Sprite = _ccsg.Node.extend({
            _spriteFrame: null,
            _insetLeft: 0,
            _insetRight: 0,
            _insetTop: 0,
            _insetBottom: 0,
            _blendFunc: null,
            _renderingType: 1,
            _brightState: 0,
            _rawVerts: null,
            _rawUvs: null,
            _vertices: null,
            _uvs: null,
            _vertCount: 0,
            _quadsDirty: !0,
            _uvsDirty: !0,
            _isTriangle: !1,
            _isTrimmedContentSize: !0,
            _fillType: 0,
            _fillCenter: null,
            _fillStart: 0,
            _fillRange: 2 * Math.PI,
            _distortionOffset: null,
            _distortionTiling: null,
            _meshPolygonInfo: null,
            ctor: function(t) {
                _ccsg.Node.prototype.ctor.call(this), this._renderCmd.setState(this._brightState), this._blendFunc = cc.BlendFunc._alphaNonPremultiplied(), this._fillCenter = cc.v2(0, 0), this.setAnchorPoint(cc.p(.5, .5)), this._rawVerts = null, this._rawUvs = null, this._vertices = o.get(8) || new Float32Array(8), this._uvs = o.get(8) || new Float32Array(8), "string" == typeof t || t instanceof cc.Texture2D ? this.initWithTexture(t) : t instanceof cc.SpriteFrame && this.initWithSpriteFrame(t), void 0 === r && (r = cc._renderType === cc.game.RENDER_TYPE_WEBGL), this._corner = []
            },
            loaded: function() {
                return null !== this._spriteFrame && this._spriteFrame.textureLoaded()
            },
            initWithTexture: function(t) {
                this.setTexture(t)
            },
            initWithSpriteFrame: function(t) {
                this.setSpriteFrame(t)
            },
            setTexture: function(t) {
                var e = new cc.SpriteFrame(t);
                this.setSpriteFrame(e)
            },
            setSpriteFrame: function(t) {
                if (t) {
                    this._spriteFrame = t, this._quadsDirty = !0, this._uvsDirty = !0, this._renderCmd._needDraw = !1;
                    var e = this,
                        i = function() {
                            e._spriteFrame && cc.sizeEqualToSize(e._contentSize, cc.size(0, 0)) && e.setContentSize(e._spriteFrame._rect), e._renderCmd._needDraw = !0, e._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty)
                        };
                    t.textureLoaded() ? i() : t.once("load", i, this)
                }
            },
            setBlendFunc: function(t, e) {
                void 0 === e ? (this._blendFunc.src = t.src, this._blendFunc.dst = t.dst) : (this._blendFunc.src = t, this._blendFunc.dst = e), this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty)
            },
            getBlendFunc: function() {
                return new cc.BlendFunc(this._blendFunc.src, this._blendFunc.dst)
            },
            setContentSize: function(t, e) {
                void 0 === e && (e = t.height, t = t.width), t === this._contentSize.width && e === this._contentSize.height || (_ccsg.Node.prototype.setContentSize.call(this, t, e), this._quadsDirty = !0)
            },
            enableTrimmedContentSize: function(t) {
                this._isTrimmedContentSize !== t && (this._isTrimmedContentSize = t, this._quadsDirty = !0, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty))
            },
            isTrimmedContentSizeEnabled: function() {
                return this._isTrimmedContentSize
            },
            setState: function(t) {
                this._brightState = t, this._renderCmd.setState(t), this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty)
            },
            getState: function() {
                return this._brightState
            },
            setRenderingType: function(t) {
                this._renderingType !== t && (this._renderingType = t, this._quadsDirty = !0, this._uvsDirty = !0, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty))
            },
            getRenderingType: function() {
                return this._renderingType
            },
            setInsetLeft: function(t) {
                this._insetLeft = t, this._quadsDirty = !0, this._uvsDirty = !0, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty)
            },
            getInsetLeft: function() {
                return this._insetLeft
            },
            setInsetTop: function(t) {
                this._insetTop = t, this._quadsDirty = !0, this._uvsDirty = !0, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty)
            },
            getInsetTop: function() {
                return this._insetTop
            },
            setInsetRight: function(t) {
                this._insetRight = t, this._quadsDirty = !0, this._uvsDirty = !0, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty)
            },
            getInsetRight: function() {
                return this._insetRight
            },
            setInsetBottom: function(t) {
                this._insetBottom = t, this._quadsDirty = !0, this._uvsDirty = !0, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty)
            },
            getInsetBottom: function() {
                return this._insetBottom
            },
            setFillType: function(t) {
                this._fillType !== t && (this._fillType = t, this._renderingType === p.FILLED && (this._quadsDirty = !0, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty)))
            },
            getFillType: function() {
                return this._fillType
            },
            setFillCenter: function(t, e) {
                this._fillCenter = cc.v2(t, e), this._renderingType === p.FILLED && this._fillType === g.RADIAL && (this._quadsDirty = !0, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty))
            },
            setDistortionTiling: function(t, e) {
                void 0 === e && (e = t.y, t = t.x), this._distortionTiling = this._distortionTiling || cc.v2(0, 0), this._distortionTiling.x = t, this._distortionTiling.y = e
            },
            setDistortionOffset: function(t, e) {
                void 0 === e && (e = t.y, t = t.x), this._distortionOffset = this._distortionOffset || cc.v2(0, 0), this._distortionOffset.x = t, this._distortionOffset.y = e
            },
            getFillCenter: function() {
                return cc.v2(this._fillCenter)
            },
            setFillStart: function(t) {
                this._fillStart !== t && (this._fillStart = t, this._renderingType === p.FILLED && (this._quadsDirty = !0, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty)))
            },
            getFillStart: function() {
                return this._fillStart
            },
            setFillRange: function(t) {
                this._fillRange !== t && (this._fillRange = t, this._renderingType === p.FILLED && (this._quadsDirty = !0, this._renderCmd.setDirtyFlag(_ccsg.Node._dirtyFlags.contentDirty)))
            },
            getFillRange: function() {
                return this._fillRange
            },
            _rebuildQuads: function() {
                if (this._spriteFrame && this._spriteFrame._textureLoaded) {
                    this._isTriangle = !1;
                    var t;
                    switch (this._renderingType) {
                        case p.SIMPLE:
                            t = a;
                            break;
                        case p.SLICED:
                            t = h;
                            break;
                        case p.TILED:
                            t = l;
                            break;
                        case p.FILLED:
                            t = this._fillType === g.RADIAL ? _ : u;
                            break;
                        case p.MESH:
                            t = d
                    }
                    t ? t._rebuildQuads_base(this) : (this._quadsDirty = !1, this._uvsDirty = !1, this._renderCmd._needDraw = !1, cc.errorID(2627)), this._quadsDirty = !1, this._uvsDirty = !1
                } else this._renderCmd._needDraw = !1
            },
            _createRenderCmd: function() {
                return cc._renderType === cc.game.RENDER_TYPE_CANVAS ? new cc.Scale9Sprite.CanvasRenderCmd(this) : new cc.Scale9Sprite.WebGLRenderCmd(this)
            },
            setMeshPolygonInfo: function(t) {
                this.setRenderingType(p.MESH), this._meshPolygonInfo = t, this._quadsDirty = !0, this._uvsDirty = !0
            },
            getMeshPolygonInfo: function() {
                return this._meshPolygonInfo
            }
        });
        var f = cc.Scale9Sprite.prototype;
        cc.js.addon(f, s.prototype), cc.defineGetterSetter(f, "insetLeft", f.getInsetLeft, f.setInsetLeft), cc.defineGetterSetter(f, "insetTop", f.getInsetTop, f.setInsetTop), cc.defineGetterSetter(f, "insetRight", f.getInsetRight, f.setInsetRight), cc.defineGetterSetter(f, "insetBottom", f.getInsetBottom, f.setInsetBottom), cc.Scale9Sprite.state = {
            NORMAL: 0,
            GRAY: 1,
            DISTORTION: 2
        };
        var p = cc.Scale9Sprite.RenderingType = cc.Enum({
                SIMPLE: 0,
                SLICED: 1,
                TILED: 2,
                FILLED: 3,
                MESH: 4
            }),
            g = cc.Scale9Sprite.FillType = cc.Enum({
                HORIZONTAL: 0,
                VERTICAL: 1,
                RADIAL: 2
            })
    }), {
        "../event/event-target": 54
    }],
    115: [(function(t, e, i) {
        cc.Scale9Sprite.CanvasRenderCmd = function(t) {
            this._rootCtor(t), this._node.loaded() ? this._needDraw = !0 : this._needDraw = !1, this._state = cc.Scale9Sprite.state.NORMAL, this._originalTexture = this._textureToRender = null
        };
        var n = cc.Scale9Sprite.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
        n.constructor = cc.Scale9Sprite.CanvasRenderCmd, n.updateTransform = function(t) {
            this.originUpdateTransform(t), this._node._rebuildQuads()
        }, n._doCulling = function() {
            var t = cc.visibleRect,
                e = this._currentRegion,
                i = e._minX,
                n = e._maxX,
                r = e._minY,
                s = e._maxY,
                o = t.left.x,
                c = t.right.x,
                a = t.top.y,
                h = t.bottom.y;
            this._needDraw = !(n < o || i > c || s < h || r > a)
        }, n._updateDisplayColor = function(t) {
            _ccsg.Node.WebGLRenderCmd.prototype._updateDisplayColor.call(this, t), this._originalTexture = this._textureToRender = null
        }, n._syncDisplayColor = function(t) {
            _ccsg.Node.WebGLRenderCmd.prototype._syncDisplayColor.call(this, t), this._originalTexture = this._textureToRender = null
        }, n.setState = function(t) {
            this._state !== t && (this._state = t, this._originalTexture = this._textureToRender = null)
        }, n.rendering = function(t, e, i) {
            var n = this._node,
                r = this._displayedOpacity,
                s = r / 255,
                o = null;
            if (n._spriteFrame && (o = n._spriteFrame._texture), n.loaded() && 0 !== r) {
                if ((null === this._textureToRender || this._originalTexture !== o) && (this._textureToRender = this._originalTexture = o, cc.Scale9Sprite.state.GRAY === this._state && (this._textureToRender = this._textureToRender._generateGrayTexture()), cc.sys.browserType !== cc.sys.BROWSER_TYPE_WECHAT_GAME_SUB)) {
                    var c = n.getDisplayedColor();
                    !o || 255 === c.r && 255 === c.g && 255 === c.b || (this._textureToRender = this._textureToRender._generateColorTexture(c.r, c.g, c.b))
                }
                var a = t || cc._renderContext,
                    h = a.getContext();
                if (a.setTransform(this._worldTransform, e, i), a.setCompositeOperation(_ccsg.Node.CanvasRenderCmd._getCompositeOperationByBlendFunc(n._blendFunc)), a.setGlobalAlpha(s), this._textureToRender) {
                    n._quadsDirty && n._rebuildQuads();
                    var l, u, _, d, f, p, g, m, v = this._textureToRender.width,
                        y = this._textureToRender.height,
                        C = this._textureToRender._image,
                        T = n._vertices,
                        E = n._uvs,
                        x = 0,
                        R = 0;
                    if (n._isTriangle) {
                        var S = n._rawVerts,
                            w = n._rawUvs;
                        f = S[0], p = S[1], g = S[6] - f, p = -p - (m = S[7] - p), l = w[4] * v, u = w[5] * y, _ = (w[6] - w[0]) * v, d = (w[1] - w[7]) * y, a.save(), h.beginPath();
                        var A = Math.floor(n._vertCount / 3);
                        for (x = 0, R = 0; x < A; x++) h.moveTo(T[R++], -T[R++]), h.lineTo(T[R++], -T[R++]), h.lineTo(T[R++], -T[R++]);
                        h.clip(), "" !== this._textureToRender._pattern ? (a.setFillStyle(h.createPattern(C, this._textureToRender._pattern)), h.fillRect(f, p, g, m)) : _ > 0 && d > 0 && g > 0 && m > 0 && h.drawImage(C, l, u, _, d, f, p, g, m), a.restore(), cc.g_NumberOfDraws += A
                    } else if (n._renderingType === cc.Scale9Sprite.RenderingType.SLICED) {
                        for (var b = 0; b < 3; ++b)
                            for (var I = 0; I < 3; ++I) f = T[R = 8 * b + 2 * I], p = T[R + 1], g = T[R + 10] - f, p = -p - (m = T[R + 11] - p), l = E[R] * v, u = E[R + 11] * y, _ = (E[R + 10] - E[R]) * v, d = (E[R + 1] - E[R + 11]) * y, _ > 0 && d > 0 && g > 0 && m > 0 && h.drawImage(C, l, u, _, d, f, p, g, m);
                        cc.g_NumberOfDraws += 9
                    } else {
                        var O = Math.floor(n._vertCount / 4);
                        for (x = 0, R = 0; x < O; x++) f = T[R], p = T[R + 1], g = T[R + 6] - f, p = -p - (m = T[R + 7] - p), l = E[R] * v, u = E[R + 7] * y, _ = (E[R + 6] - E[R]) * v, d = (E[R + 1] - E[R + 7]) * y, "" !== this._textureToRender._pattern ? (a.setFillStyle(h.createPattern(C, this._textureToRender._pattern)), h.fillRect(f, p, g, m)) : _ > 0 && d > 0 && g > 0 && m > 0 && h.drawImage(C, l, u, _, d, f, p, g, m), R += 8;
                        cc.g_NumberOfDraws += O
                    }
                }
            }
        }
    }), {}],
    116: [(function(t, e, i) {
        cc.gl;
        cc.Scale9Sprite.WebGLRenderCmd = function(t) {
            this._rootCtor(t), this._node.loaded() ? this._needDraw = !0 : this._needDraw = !1, this.vertexType = cc.renderer.VertexType.QUAD, this._dirty = !1, this._shaderProgram = cc.shaderCache.programForKey(cc.macro.SHADER_SPRITE_POSITION_TEXTURECOLOR)
        };
        var n = cc.Scale9Sprite,
            r = n.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype);
        r.constructor = n.WebGLRenderCmd, r._uploadSliced = function(t, e, i, n, r, s, o) {
            for (var c, a = 0; a < 3; ++a)
                for (var h = 0; h < 3; ++h) c = 8 * a + 2 * h, r[o] = t[c], r[o + 1] = t[c + 1], r[o + 2] = n, s[o + 3] = i, r[o + 4] = e[c], r[o + 5] = e[c + 1], r[o += 6] = t[c + 2], r[o + 1] = t[c + 3], r[o + 2] = n, s[o + 3] = i, r[o + 4] = e[c + 2], r[o + 5] = e[c + 3], r[o += 6] = t[c + 8], r[o + 1] = t[c + 9], r[o + 2] = n, s[o + 3] = i, r[o + 4] = e[c + 8], r[o + 5] = e[c + 9], r[o += 6] = t[c + 10], r[o + 1] = t[c + 11], r[o + 2] = n, s[o + 3] = i, r[o + 4] = e[c + 10], r[o + 5] = e[c + 11], o += 6;
            return 36
        }, r.updateTransform = function(t) {
            this.originUpdateTransform(t), this._node._rebuildQuads()
        }, r._doCulling = function() {
            var t = this._node,
                e = cc.visibleRect;
            this._cameraFlag > 0 && (e = cc.Camera.main.visibleRect);
            var i = e.left.x,
                n = e.right.x,
                r = e.top.y,
                s = e.bottom.y,
                o = t._vertices,
                c = t._corner,
                a = c[0],
                h = c[1],
                l = c[2],
                u = c[3],
                _ = o[a],
                d = o[h],
                f = o[l],
                p = o[u],
                g = o[a + 1],
                m = o[h + 1],
                v = o[l + 1],
                y = o[u + 1];
            this._needDraw = !((_ - i & d - i & f - i & p - i) >> 31 || (n - _ & n - d & n - f & n - p) >> 31 || (g - s & m - s & v - s & y - s) >> 31 || (r - g & r - m & r - v & r - y) >> 31)
        }, r.uploadData = function(t, e, i) {
            var r = this._node;
            if (0 === this._displayedOpacity) return 0;
            r._quadsDirty && r._rebuildQuads(), r._distortionOffset && this._shaderProgram === n.WebGLRenderCmd._distortionProgram && (this._shaderProgram.use(), this._shaderProgram.setUniformLocationWith2f(n.WebGLRenderCmd._distortionOffset, r._distortionOffset.x, r._distortionOffset.y), this._shaderProgram.setUniformLocationWith2f(n.WebGLRenderCmd._distortionTiling, r._distortionTiling.x, r._distortionTiling.y), cc.renderer._breakBatch());
            var s, o = this._displayedOpacity,
                c = this._displayedColor._val;
            if (r._opacityModifyRGB) {
                var a = o / 255,
                    h = this._displayedColor.r * a,
                    l = this._displayedColor.g * a;
                s = (o << 24 >>> 0) + (this._displayedColor.b * a << 16) + (l << 8) + h
            } else s = (o << 24 >>> 0) + ((65280 & c) << 8) + ((16711680 & c) >> 8) + (c >>> 24);
            var u = r._vertexZ,
                _ = r._vertices,
                d = r._uvs,
                f = n.RenderingType,
                p = i,
                g = 0;
            switch (r._renderingType) {
                case f.SIMPLE:
                case f.TILED:
                case f.FILLED:
                case f.MESH:
                    g = this._node._vertCount;
                    for (var m = 0, v = 0; m < g; m++, v += 2) t[p] = _[v], t[p + 1] = _[v + 1], t[p + 2] = u, e[p + 3] = s, t[p + 4] = d[v], t[p + 5] = d[v + 1], p += 6;
                    break;
                case f.SLICED:
                    g = this._uploadSliced(_, d, s, u, t, e, p)
            }
            return r._renderingType === f.MESH ? this.vertexType = cc.renderer.VertexType.CUSTOM : r._renderingType === f.FILLED && r._fillType === n.FillType.RADIAL ? this.vertexType = cc.renderer.VertexType.TRIANGLE : this.vertexType = cc.renderer.VertexType.QUAD, g
        }, r.uploadIndexData = function(t, e, i) {
            var n = this._node._meshPolygonInfo;
            if (!n) return 0;
            for (var r = n.triangles.indices, s = r.length, o = 0; o < s; o++) t[e + o] = i + r[o];
            return s
        }, r.setState = function(t) {
            t === n.state.NORMAL ? this._shaderProgram = cc.shaderCache.programForKey(cc.macro.SHADER_SPRITE_POSITION_TEXTURECOLOR) : t === n.state.GRAY ? this._shaderProgram = cc.Scale9Sprite.WebGLRenderCmd._getGrayShaderProgram() : t === n.state.DISTORTION && (this._shaderProgram = cc.Scale9Sprite.WebGLRenderCmd._getDistortionProgram())
        }, n.WebGLRenderCmd._grayShaderProgram = null, n.WebGLRenderCmd._getGrayShaderProgram = function() {
            var t = n.WebGLRenderCmd._grayShaderProgram;
            return t || ((t = new cc.GLProgram).initWithVertexShaderByteArray(cc.PresetShaders.SPRITE_POSITION_TEXTURE_COLOR_VERT, cc.Scale9Sprite.WebGLRenderCmd._grayShaderFragment), t.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION), t.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR), t.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS), t.link(), t.updateUniforms(), n.WebGLRenderCmd._grayShaderProgram = t, t)
        }, n.WebGLRenderCmd._grayShaderFragment = "precision lowp float;\nvarying vec4 v_fragmentColor;\nvarying vec2 v_texCoord;\nvoid main()\n{\nvec4 c = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\nfloat gray = 0.2126*c.r + 0.7152*c.g + 0.0722*c.b;\ngl_FragColor = vec4(gray, gray, gray, c.a);\n}", n.WebGLRenderCmd._distortionProgram = null, n.WebGLRenderCmd._getDistortionProgram = function() {
            var t = n.WebGLRenderCmd._distortionProgram;
            return t || ((t = new cc.GLProgram).initWithVertexShaderByteArray(cc.PresetShaders.SPRITE_POSITION_TEXTURE_COLOR_VERT, s.fShader), t.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION), t.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR), t.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS), t.link(), t.updateUniforms(), n.WebGLRenderCmd._distortionProgram = t, n.WebGLRenderCmd._distortionOffset = t.getUniformLocationForName("u_offset"), n.WebGLRenderCmd._distortionTiling = t.getUniformLocationForName("u_offset_tiling"), t)
        };
        var s = {
            shaderKey: "cc.Sprite.Shader.Distortion",
            fShader: "precision lowp float;\nvarying vec4 v_fragmentColor;\nvarying vec2 v_texCoord;\nuniform vec2 u_offset;\nuniform vec2 u_offset_tiling;\nconst float PI = 3.14159265359;\nvoid main()\n{\nfloat halfPI = 0.5 * PI;\nfloat maxFactor = sin(halfPI);\nvec2 uv = v_texCoord;\nvec2 xy = 2.0 * uv.xy - 1.0;\nfloat d = length(xy);\nif (d < (2.0-maxFactor)) {\nd = length(xy * maxFactor);\nfloat z = sqrt(1.0 - d * d);\nfloat r = atan(d, z) / PI;\nfloat phi = atan(xy.y, xy.x);\nuv.x = r * cos(phi) + 0.5;\nuv.y = r * sin(phi) + 0.5;\n} else {\ndiscard;\n}\nuv = uv * u_offset_tiling + u_offset;\nuv = fract(uv);\ngl_FragColor = v_fragmentColor * texture2D(CC_Texture0, uv);\n}"
        }
    }), {}],
    117: [(function(t, e, i) {
        cc.SpriteBatchNode = _ccsg.Node.extend({
            _blendFunc: null,
            _texture: null,
            _className: "SpriteBatchNode",
            ctor: function(t) {
                _ccsg.Node.prototype.ctor.call(this), this._blendFunc = new cc.BlendFunc(cc.macro.BLEND_SRC, cc.macro.BLEND_DST);
                var e;
                cc.js.isString(t) ? (e = cc.textureCache.getTextureForKey(t)) || (e = cc.textureCache.addImage(t)) : t instanceof cc.Texture2D && (e = t), e && this.initWithTexture(e)
            },
            initWithFile: function(t) {
                var e = cc.textureCache.getTextureForKey(t) || cc.textureCache.addImage(t);
                return this.initWithTexture(e)
            },
            removeChildAtIndex: function(t, e) {
                this.removeChild(this._children[t], e)
            },
            setBlendFunc: function(t, e) {
                this._blendFunc = void 0 === e ? t : {
                    src: t,
                    dst: e
                }
            },
            getBlendFunc: function() {
                return new cc.BlendFunc(this._blendFunc.src, this._blendFunc.dst)
            },
            updateQuadFromSprite: function(t, e) {
                cc.assertID(t, 2623), t instanceof _ccsg.Sprite ? (t.dirty = !0, t._renderCmd.transform(this._renderCmd, !0)) : cc.log(2616)
            },
            appendChild: function(t) {
                this.sortAllChildren();
                this._children[this._children.length - 1]._localZOrder;
                this.addChild(t.lastLocalZOrder + 1)
            },
            initWithTexture: function(t) {
                return this.setTexture(t), !0
            },
            getTexture: function() {
                return this._texture
            },
            setTexture: function(t) {
                if (this._texture = t, t.loaded) {
                    var e, i = this._children,
                        n = i.length;
                    for (e = 0; e < n; ++e) i[e].setTexture(t)
                } else t.addEventListener("load", (function() {
                    var e, i = this._children,
                        n = i.length;
                    for (e = 0; e < n; ++e) i[e].setTexture(t)
                }), this)
            },
            setShaderProgram: function(t) {
                this._renderCmd.setShaderProgram(t);
                var e, i = this._children,
                    n = i.length;
                for (e = 0; e < n; ++e) i[e].setShaderProgram(t)
            },
            addChild: function(t, e, i) {
                cc.assertID(void 0 !== t, 2614), this._isValidChild(t) && (e = void 0 === e ? t.zIndex : e, i = void 0 === i ? t.tag : i, _ccsg.Node.prototype.addChild.call(this, t, e, i), this._renderCmd._shaderProgram && (t.shaderProgram = this._renderCmd._shaderProgram))
            },
            _isValidChild: function(t) {
                return t instanceof _ccsg.Sprite ? t.texture === this._texture || (cc.logID(2619), !1) : (cc.logID(2618), !1)
            }
        });
        var n = cc.SpriteBatchNode.prototype;
        cc.defineGetterSetter(n, "texture", n.getTexture, n.setTexture), cc.defineGetterSetter(n, "shaderProgram", n.getShaderProgram, n.setShaderProgram)
    }), {}],
    118: [(function(t, e, i) {
        var n = t("../event/event-target");
        cc.SpriteFrame = cc.Class({
            name: "cc.SpriteFrame",
            extends: t("../assets/CCAsset"),
            mixins: [n],
            properties: {
                _textureFilenameSetter: {
                    set: function(t) {
                        this._textureFilename = t, t && this._loadTexture()
                    }
                }
            },
            ctor: function() {
                var t = arguments[0],
                    e = arguments[1],
                    i = arguments[2],
                    n = arguments[3],
                    r = arguments[4];
                this._rect = null, this._offset = null, this._originalSize = null, this._rotated = !1, this.insetTop = 0, this.insetBottom = 0, this.insetLeft = 0, this.insetRight = 0, this._texture = null, this._textureFilename = "", this._textureLoaded = !1, void 0 !== t && this.initWithTexture(t, e, i, n, r)
            },
            textureLoaded: function() {
                return this._textureLoaded
            },
            addLoadedEventListener: function(t, e) {
                this.once("load", t, e)
            },
            isRotated: function() {
                return this._rotated
            },
            setRotated: function(t) {
                this._rotated = t
            },
            getRect: function() {
                return cc.rect(this._rect)
            },
            setRect: function(t) {
                this._rect = t
            },
            getOriginalSize: function() {
                return cc.size(this._originalSize)
            },
            setOriginalSize: function(t) {
                this._originalSize ? (this._originalSize.width = t.width, this._originalSize.height = t.height) : this._originalSize = cc.size(t)
            },
            getTexture: function() {
                return this._texture
            },
            _refreshTexture: function(t) {
                var e = this;
                if (e._texture !== t) {
                    var i = t.loaded;
                    this._textureLoaded = i, this._texture = t;

                    function n() {
                        if (e._texture) {
                            e._textureLoaded = !0;
                            var i = t.width,
                                n = t.height;
                            if (e._rotated && cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
                                var r = t.getHtmlElementObj();
                                r = _ccsg.Sprite.CanvasRenderCmd._cutRotateImageToCanvas(r, e.getRect());
                                var s = new cc.Texture2D;
                                s.initWithElement(r), s.handleLoadedTexture(), e._texture = s, e._rotated = !1, i = e._texture.width, n = e._texture.height, e.setRect(cc.rect(0, 0, i, n))
                            }
                            e._rect ? e._checkRect(e._texture) : e.setRect(cc.rect(0, 0, i, n)), e._originalSize || e.setOriginalSize(cc.size(i, n)), e._offset || e.setOffset(cc.v2(0, 0)), e.emit("load")
                        }
                    }
                    i ? n() : t.once("load", n)
                }
            },
            getOffset: function() {
                return cc.v2(this._offset)
            },
            setOffset: function(t) {
                this._offset = cc.v2(t)
            },
            clone: function() {
                return new cc.SpriteFrame(this._texture || this._textureFilename, this._rect, this._rotated, this._offset, this._originalSize)
            },
            setTexture: function(t, e, i, n, r) {
                e ? this.setRect(e) : this._rect = null, n ? this.setOffset(n) : this._offset = null, r ? this.setOriginalSize(r) : this._originalSize = null, this._rotated = i || !1;
                var s = t;
                return cc.js.isString(s) ? (this._textureFilename = s, this._loadTexture()) : s instanceof cc.Texture2D && this._refreshTexture(s), !0
            },
            _loadTexture: function() {
                if (this._textureFilename) {
                    var t = cc.textureCache.addImage(this._textureFilename);
                    this._refreshTexture(t)
                }
            },
            ensureLoadTexture: function() {
                this._texture || this._loadTexture()
            },
            clearTexture: function() {
                this._textureLoaded = !1, this._texture = null
            },
            _checkRect: function(t) {
                var e = this._rect,
                    i = e.x,
                    n = e.y;
                this._rotated ? (i += e.height, n += e.width) : (i += e.width, n += e.height), i > t.getPixelWidth() && cc.errorID(3300, t.url + "/" + this.name), n > t.getPixelHeight() && cc.errorID(3400, t.url + "/" + this.name)
            },
            _serialize: !1,
            _deserialize: function(t, e) {
                var i = t.rect;
                i && this.setRect(new cc.Rect(i[0], i[1], i[2], i[3])), t.offset && this.setOffset(new cc.Vec2(t.offset[0], t.offset[1])), t.originalSize && this.setOriginalSize(new cc.Size(t.originalSize[0], t.originalSize[1])), this._rotated = 1 === t.rotated, this._name = t.name;
                var n = t.capInsets;
                n && (this.insetLeft = n[0], this.insetTop = n[1], this.insetRight = n[2], this.insetBottom = n[3]);
                var r = t.texture;
                if (r) {
                    var s = e.customEnv && e.customEnv.deferredLoadRaw ? "_textureFilename" : "_textureFilenameSetter";
                    e.result.push(this, s, r)
                }
            }
        });
        var r = cc.SpriteFrame.prototype;
        r.copyWithZone = r.clone, r.copy = r.clone, r.initWithTexture = r.setTexture
    }), {
        "../assets/CCAsset": 19,
        "../event/event-target": 54
    }],
    119: [(function(t, e, i) {
        var n = t("../event/event-target"),
            r = t("../platform/CCSys"),
            s = (t("../platform/js"), t("../utils/misc"), t("../CCGame"));
        t("../platform/_CCClass"), t("../platform/CCClass");
        var o = [{
                format: 6407,
                internalFormat: 6407,
                pixelType: 33635
            }, {
                format: 6408,
                internalFormat: 6408,
                pixelType: 32820
            }, {
                format: 6408,
                internalFormat: 6408,
                pixelType: 32819
            }, {
                format: 6407,
                internalFormat: 6407,
                pixelType: 5121
            }, {
                format: 6408,
                internalFormat: 6408,
                pixelType: 5121
            }, {
                format: 6406,
                internalFormat: 6406,
                pixelType: 5121
            }, {
                format: 6409,
                internalFormat: 6409,
                pixelType: 5121
            }, {
                format: 6410,
                internalFormat: 6410,
                pixelType: 5121
            }],
            c = cc.Enum({
                RGB565: 0,
                RGB5A1: 1,
                RGBA4444: 2,
                RGB888: 3,
                RGBA8888: 4,
                A8: 5,
                I8: 6,
                AI8: 7
            }),
            a = cc.Enum({
                REPEAT: 10497,
                CLAMP_TO_EDGE: 33071,
                MIRRORED_REPEAT: 33648
            }),
            h = cc.Enum({
                LINEAR: 9729,
                NEAREST: 9728
            }),
            l = cc.Class({
                name: "cc.Texture2D",
                extends: t("../assets/CCRawAsset"),
                mixins: [n],
                properties: {
                    _hasMipmap: !1,
                    _format: c.RGBA8888,
                    _compressed: !1,
                    _premultiplyAlpha: !1,
                    _minFilter: h.LINEAR,
                    _magFilter: h.LINEAR,
                    _wrapS: a.CLAMP_TO_EDGE,
                    _wrapT: a.CLAMP_TO_EDGE
                },
                statics: {
                    PixelFormat: c,
                    WrapMode: a,
                    Filter: h
                },
                ctor: function(t) {
                    this.url = null, this.loaded = !1, this.width = 0, this.height = 0, this._image = null, cc._renderType === s.RENDER_TYPE_CANVAS ? (this._pattern = "", this._grayElementObj = null, this._backupElement = null, this._isGray = !1) : cc._renderType === s.RENDER_TYPE_WEBGL && (this._gl = t || cc._renderContext, this._glID = null)
                },
                update: function(t) {},
                getPixelWidth: function() {
                    return this.width
                },
                getPixelHeight: function() {
                    return this.height
                },
                getContentSize: function() {
                    return cc.size(this.width, this.height)
                },
                getContentSizeInPixels: function() {
                    return this.getContentSize()
                },
                initWithElement: function(t) {
                    t && (this._image = t, this.width = t.width, this.height = t.height, this.loaded = !0)
                },
                initWithData: function(t, e, i, n, r) {
                    return !1
                },
                initWithImage: function(t) {
                    return !1
                },
                getHtmlElementObj: function() {
                    return this._image
                },
                isLoaded: function() {
                    return this.loaded
                },
                handleLoadedTexture: function() {
                    if (this._image && this._image.width && this._image.height) {
                        var t = this._image;
                        this.width = t.width, this.height = t.height, this.loaded = !0, this.emit("load")
                    }
                },
                description: function() {
                    return "<cc.Texture2D | Name = " + this.url + " | Dimensions = " + this.width + " x " + this.height + ">"
                },
                releaseTexture: function() {
                    this._gl && null !== this._glID && (this._gl.deleteTexture(this._glID), this._glID = null)
                },
                getPixelFormat: function() {
                    return this._format
                },
                hasPremultipliedAlpha: function() {
                    return this._premultiplyAlpha || !1
                },
                hasMipmaps: function() {
                    return this._hasMipmap || !1
                },
                setTexParameters: function(t, e, i, n) {
                    void 0 !== e && (t = {
                        minFilter: t,
                        magFilter: e,
                        wrapS: i,
                        wrapT: n
                    }), t.wrapS !== a.REPEAT || t.wrapT !== a.REPEAT ? t.wrapS !== a.REPEAT ? t.wrapT !== a.REPEAT ? this._pattern = "" : this._pattern = "repeat-y" : this._pattern = "repeat-x" : this._pattern = "repeat"
                },
                setAntiAliasTexParameters: function() {},
                setAliasTexParameters: function() {}
            }),
            u = l.prototype;
        u.pixelFormat, cc.defineGetterSetter(u, "pixelFormat", u.getPixelFormat), u.pixelWidth, cc.defineGetterSetter(u, "pixelWidth", u.getPixelWidth), u.pixelHeight, cc.defineGetterSetter(u, "pixelHeight", u.getPixelHeight), s.once(s.EVENT_RENDERER_INITED, (function() {
            if (cc._renderType === s.RENDER_TYPE_CANVAS) {
                var t = function(t, e, i) {
                    if (null === t) return null;
                    i = i || document.createElement("canvas"), e = e || cc.rect(0, 0, t.width, t.height), i.width = e.width, i.height = e.height;
                    var n = i.getContext("2d");
                    n.drawImage(t, e.x, e.y, e.width, e.height, 0, 0, e.width, e.height);
                    for (var r = n.getImageData(0, 0, e.width, e.height), s = r.data, o = 0, c = s.length; o < c; o += 4) s[o] = s[o + 1] = s[o + 2] = .34 * s[o] + .5 * s[o + 1] + .16 * s[o + 2];
                    return n.putImageData(r, 0, 0), i
                };
                u._generateTextureCacheForColor = function() {
                    if (this.channelCache) return this.channelCache;
                    var t = [document.createElement("canvas"), document.createElement("canvas"), document.createElement("canvas"), document.createElement("canvas")];
                    return (function(t, e) {
                        var i = t.width,
                            n = t.height;
                        e[0].width = i, e[0].height = n, e[1].width = i, e[1].height = n, e[2].width = i, e[2].height = n, e[3].width = i, e[3].height = n;
                        var r = e[3].getContext("2d");
                        r.drawImage(t, 0, 0);
                        for (var s, o = r.getImageData(0, 0, i, n).data, c = 0; c < 4; c++) {
                            for (var a = (s = e[c].getContext("2d")).getImageData(0, 0, i, n), h = a.data, l = 0; l < o.length; l += 4) h[l] = 0 === c ? o[l] : 0, h[l + 1] = 1 === c ? o[l + 1] : 0, h[l + 2] = 2 === c ? o[l + 2] : 0, h[l + 3] = o[l + 3];
                            s.putImageData(a, 0, 0)
                        }
                        t.onload = null
                    })(this._image, t), this.channelCache = t
                }, u._switchToGray = function(e) {
                    this.loaded && this._isGray !== e && (this._isGray = e, this._isGray ? (this._backupElement = this._image, this._grayElementObj || (this._grayElementObj = t(this._image)), this._image = this._grayElementObj) : null !== this._backupElement && (this._image = this._backupElement))
                }, u._generateGrayTexture = function() {
                    if (!this.loaded) return null;
                    var e = t(this._image),
                        i = new l;
                    return i.initWithElement(e), i.handleLoadedTexture(), i
                }, u._generateColorTexture = r._supportCanvasNewBlendModes ? function(t, e, i, n, r) {
                    var s = !1;
                    r ? s = !0 : r = document.createElement("canvas");
                    var o = this._image;
                    if (n || (n = cc.rect(0, 0, o.width, o.height)), r.width = n.width, r.height = n.height, n.width && n.height) {
                        var c = r.getContext("2d");
                        c.globalCompositeOperation = "source-over", c.fillStyle = "rgb(" + (0 | t) + "," + (0 | e) + "," + (0 | i) + ")", c.fillRect(0, 0, n.width, n.height), c.globalCompositeOperation = "multiply", c.drawImage(o, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height), c.globalCompositeOperation = "destination-atop", c.drawImage(o, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height)
                    }
                    if (s) return r;
                    var a = new l;
                    return a.initWithElement(r), a.handleLoadedTexture(), a
                } : function(t, e, i, n, r) {
                    var s = !1;
                    r ? s = !0 : r = document.createElement("canvas");
                    var o = this._image;
                    if (n || (n = cc.rect(0, 0, o.width, o.height)), r.width = n.width, r.height = n.height, n.width && n.height) {
                        var c = r.getContext("2d");
                        c.drawImage(o, n.x, n.y, n.width, n.height, 0, 0, n.width, n.height);
                        var a = c.getImageData(0, 0, r.width, r.height),
                            h = a.data;
                        t /= 255, e /= 255, i /= 255;
                        for (var u = 0; u < h.length; u += 4) h[u] = h[u] * t, h[u + 1] = h[u + 1] * e, h[u + 2] = h[u + 2] * i;
                        c.putImageData(a, 0, 0)
                    }
                    if (s) return r;
                    var _ = new l;
                    return _.initWithElement(r), _.handleLoadedTexture(), _
                }
            } else if (cc._renderType === s.RENDER_TYPE_WEBGL) {
                var e;
                (function() {
                    function t(t) {
                        return !(t & t - 1 || !t)
                    }

                    function i() {
                        for (var t in e) e[t] = void 0;
                        return e
                    }
                    e = {
                        width: void 0,
                        height: void 0,
                        minFilter: void 0,
                        magFilter: void 0,
                        wrapS: void 0,
                        wrapT: void 0,
                        format: void 0,
                        mipmap: void 0,
                        image: void 0,
                        premultiplyAlpha: void 0
                    }, u.update = function(e) {
                        var i = this._hasMipmap,
                            n = this._gl,
                            r = !1;
                        e && (void 0 !== e.width && (this.width = e.width), void 0 !== e.height && (this.height = e.height), void 0 !== e.minFilter && (this._minFilter = e.minFilter), void 0 !== e.magFilter && (this._magFilter = e.magFilter), void 0 !== e.wrapS && (this._wrapS = e.wrapS), void 0 !== e.wrapT && (this._wrapT = e.wrapT), void 0 !== e.format && (this._format = e.format, r = !0), void 0 !== e.premultiplyAlpha && (this._premultiplyAlpha = e.premultiplyAlpha, r = !0), void 0 !== e.image && (this._image = e.image, r = !0), void 0 !== e.mipmap && (i = this._hasMipmap = e.mipmap)), this._image && (r ? (this.releaseTexture(), this._glID = n.createTexture(), n.activeTexture(n.TEXTURE0), n.bindTexture(n.TEXTURE_2D, this._glID), this._setImage(this._image, this.width, this.height, (function(t) {
                            var e = o[t];
                            return cc.assertID(e, 3113), e
                        })(this._format), this._premultiplyAlpha)) : (n.activeTexture(n.TEXTURE0), n.bindTexture(n.TEXTURE_2D, this._glID)), this._setTexInfo(), i && (cc.assertID(t(this.width) && t(this.height), 3117), n.hint(n.GENERATE_MIPMAP_HINT, n.NICEST), n.generateMipmap(n.TEXTURE_2D)), n.bindTexture(n.TEXTURE_2D, null))
                    }, u._setImage = function(t, e, i, n, s) {
                        var o = this._gl;
                        o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL, s), r.platform === r.QQ_PLAY || t instanceof HTMLCanvasElement && !(t instanceof Uint8Array) || t instanceof HTMLImageElement || t instanceof HTMLVideoElement ? o.texImage2D(o.TEXTURE_2D, 0, n.internalFormat, n.format, n.pixelType, t) : o.texImage2D(o.TEXTURE_2D, 0, n.internalFormat, e, i, 0, n.format, n.pixelType, t)
                    }, u._setTexInfo = function() {
                        var e = this._gl;
                        t(this.width) && t(this.height) || this._wrapS === a.CLAMP_TO_EDGE && this._wrapT === a.CLAMP_TO_EDGE || (cc.warnID(3116), this._wrapS = a.CLAMP_TO_EDGE, this._wrapT = a.CLAMP_TO_EDGE), this._minFilter === h.LINEAR ? e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, this._hasMipmap ? e.LINEAR_MIPMAP_NEAREST : e.LINEAR) : e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, this._hasMipmap ? e.NEAREST_MIPMAP_NEAREST : e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, this._magFilter), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, this._wrapS), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, this._wrapT)
                    }, u.initWithData = function(t, e, n, r, s) {
                        s && cc.warnID(3118);
                        var o = i();
                        return o.image = t, o.format = e, o.width = n, o.height = r, this.update(o), this.width = n, this.height = r, this.loaded = !0, this.emit("load"), !0
                    }, u.initWithElement = function(t) {
                        if (t && 0 !== t.width && 0 !== t.height) return this._image = t, !0
                    }, u.handleLoadedTexture = function(t) {
                        if (this._image && this._image.width && this._image.height) {
                            var e = i();
                            e.image = this._image, e.format = c.RGBA8888, e.width = this._image.width, e.height = this._image.height, e.premultiplyAlpha = !!t;
                            var n = cc.view._antiAliasEnabled ? h.LINEAR : h.NEAREST;
                            e.minFilter = e.magFilter = n, this.update(e), this.loaded = !0, this.emit("load")
                        }
                    }, u.setTexParameters = function(t, e, i, n) {
                        void 0 !== e && (t = {
                            minFilter: t,
                            magFilter: e,
                            wrapS: i,
                            wrapT: n
                        }), this.update(t)
                    }, u.setAntiAliasTexParameters = function() {
                        var t = i();
                        t.minFilter = h.LINEAR, t.magFilter = h.LINEAR, this.update(t)
                    }, u.setAliasTexParameters = function() {
                        var t = i();
                        t.minFilter = h.NEAREST, t.magFilter = h.NEAREST, this.update(t)
                    }
                })()
            }
        })), cc.Texture2D = e.exports = l
    }), {
        "../CCGame": 15,
        "../assets/CCRawAsset": 25,
        "../event/event-target": 54,
        "../platform/CCClass": 79,
        "../platform/CCSys": 88,
        "../platform/_CCClass": 91,
        "../platform/js": 100,
        "../utils/misc": 128
    }],
    120: [(function(t, e, i) {
        var n = t("../CCGame"),
            r = t("./CCTexture2D"),
            s = {
                _textures: {},
                _textureColorsCache: {},
                _textureKeySeq: 0 | 1e3 * Math.random(),
                handleLoadedTexture: null,
                description: function() {
                    return "<TextureCache | Number of textures = " + this._textures.length + ">"
                },
                textureForKey: function(t) {
                    return cc.logID(3002), this.getTextureForKey(t)
                },
                getTextureForKey: function(t) {
                    return this._textures[t]
                },
                getKeyByTexture: function(t) {
                    for (var e in this._textures)
                        if (this._textures[e] === t) return e;
                    return null
                },
                _generalTextureKey: function(t) {
                    return "_textureKey_" + t
                },
                getTextureColors: function(t) {
                    var e = t._image,
                        i = this.getKeyByTexture(e);
                    return i || (i = e instanceof HTMLImageElement ? e.src : this._generalTextureKey(t.__instanceId)), this._textureColorsCache[i] || (this._textureColorsCache[i] = t._generateTextureCacheForColor()), this._textureColorsCache[i]
                },
                getAllTextures: function() {
                    var t = [];
                    for (var e in this._textures) {
                        var i = this._textures[e];
                        t.push(i)
                    }
                    return t
                },
                removeAllTextures: function() {
                    var t = this._textures;
                    for (var e in t) t[e] && t[e].releaseTexture();
                    this._textures = {}
                },
                removeTexture: function(t) {
                    if (t) {
                        var e = this._textures;
                        for (var i in e) e[i] === t && (e[i].releaseTexture(), delete e[i])
                    }
                },
                removeTextureForKey: function(t) {
                    if ("string" == typeof t) {
                        var e = this._textures;
                        e[t] && (e[t].releaseTexture(), delete e[t])
                    }
                },
                addImage: null,
                addImageAsync: null,
                cacheImage: function(t, e) {
                    if (cc.assertID(t, 3009), e instanceof r) this._textures[t] = e;
                    else {
                        var i = new r;
                        i.initWithElement(e), i.handleLoadedTexture(), this._textures[t] = i
                    }
                },
                dumpCachedTextureInfo: function() {
                    var t = 0,
                        e = 0,
                        i = this._textures;
                    for (var n in i) {
                        var r = i[n];
                        t++, r.getHtmlElementObj() instanceof HTMLImageElement ? cc.logID(3005, n, r.getHtmlElementObj().src, r.getPixelWidth(), r.getPixelHeight()) : cc.logID(3006, n, r.getPixelWidth(), r.getPixelHeight()), e += r.getPixelWidth() * r.getPixelHeight() * 4
                    }
                    var s = this._textureColorsCache;
                    for (n in s) {
                        var o = s[n];
                        for (var c in o) {
                            var a = o[c];
                            t++, cc.logID(3006, n, a.width, a.height), e += a.width * a.height * 4
                        }
                    }
                    cc.logID(3007, t, e / 1024, (e / 1048576).toFixed(2))
                },
                _clear: function() {
                    this._textures = {}, this._textureColorsCache = {}, this._textureKeySeq = 0 | 1e3 * Math.random()
                }
            };
        n.once(n.EVENT_RENDERER_INITED, (function() {
            var t = s;
            cc._renderType === n.RENDER_TYPE_CANVAS ? (t.handleLoadedTexture = function(t) {
                var e = this._textures,
                    i = e[t];
                i || (cc.assertID(t, 3009), (i = e[t] = new r).url = t), i.handleLoadedTexture()
            }, t.addImage = function(t, e, i) {
                cc.assertID(t, 3103);
                var n = this._textures,
                    o = n[t];
                return o ? o.isLoaded() ? (e && e.call(i, o), o) : (o.once("load", (function() {
                    e && e.call(i, o)
                }), i), o) : (o = n[t] = new r, o.url = t, cc.loader.load(t, (function(n, r) {
                    if (n) return e && e.call(i, n || new Error("Unknown error"));
                    s.handleLoadedTexture(t), e && e.call(i, o)
                })), o)
            }, t.addImageAsync = t.addImage) : cc._renderType === n.RENDER_TYPE_WEBGL && (t.handleLoadedTexture = function(t) {
                var e, i = this._textures;
                (e = i[t]) || (cc.assertID(t, 3009), (e = i[t] = new r).url = t), e.handleLoadedTexture()
            }, t.addImage = function(t, e, i) {
                cc.assertID(t, 3112);
                var n = this._textures,
                    o = n[t];
                return o ? o.isLoaded() ? (e && e.call(i, o), o) : (o.once("load", (function() {
                    e && e.call(i, o)
                }), i), o) : (o = n[t] = new r, o.url = t, cc.loader.load(t, (function(n, r) {
                    if (n) return e && e.call(i, n || new Error("Unknown error"));
                    s.handleLoadedTexture(t), e && e.call(i, o)
                })), o)
            }, t.addImageAsync = t.addImage)
        })), cc.textureCache = e.exports = s
    }), {
        "../CCGame": 15,
        "./CCTexture2D": 119
    }],
    121: [(function(t, e, i) {
        t("./CCTexture2D"), t("./CCTextureCache")
    }), {
        "./CCTexture2D": 119,
        "./CCTextureCache": 120
    }],
    122: [(function(t, e, i) {
        t("../platform/CCSys");
        var n = /(\.[^\.\/\?\\]*)(\?.*)?$/,
            r = /((.*)(\/|\\|\\\\))?(.*?\..*$)?/,
            s = /[^\.\/]+\/\.\.\//;
        cc.path = {
            join: function() {
                for (var t = arguments.length, e = "", i = 0; i < t; i++) e = (e + ("" === e ? "" : "/") + arguments[i]).replace(/(\/|\\\\)$/, "");
                return e
            },
            extname: function(t) {
                var e = n.exec(t);
                return e ? e[1] : ""
            },
            mainFileName: function(t) {
                if (t) {
                    var e = t.lastIndexOf(".");
                    if (-1 !== e) return t.substring(0, e)
                }
                return t
            },
            basename: function(t, e) {
                var i = t.indexOf("?");
                i > 0 && (t = t.substring(0, i));
                var n = /(\/|\\\\)([^(\/|\\\\)]+)$/g.exec(t.replace(/(\/|\\\\)$/, ""));
                if (!n) return null;
                var r = n[2];
                return e && t.substring(t.length - e.length).toLowerCase() === e.toLowerCase() ? r.substring(0, r.length - e.length) : r
            },
            dirname: function(t) {
                var e = r.exec(t);
                return e ? e[2] : ""
            },
            changeExtname: function(t, e) {
                e = e || "";
                var i = t.indexOf("?"),
                    n = "";
                return i > 0 && (n = t.substring(i), t = t.substring(0, i)), (i = t.lastIndexOf(".")) < 0 ? t + e + n : t.substring(0, i) + e + n
            },
            changeBasename: function(t, e, i) {
                if (0 === e.indexOf(".")) return this.changeExtname(t, e);
                var n = t.indexOf("?"),
                    r = "",
                    s = i ? this.extname(t) : "";
                return n > 0 && (r = t.substring(n), t = t.substring(0, n)), n = t.lastIndexOf("/"), n = n <= 0 ? 0 : n + 1, t.substring(0, n) + e + s + r
            },
            _normalize: function(t) {
                var e = t = String(t);
                do {
                    e = t, t = t.replace(s, "")
                } while (e.length !== t.length);
                return t
            },
            sep: cc.sys.os === cc.sys.OS_WINDOWS ? "\\" : "/",
            stripSep: function(t) {
                return t.replace(/[\/\\]$/, "")
            }
        }, e.exports = cc.path
    }), {
        "../platform/CCSys": 88
    }],
    123: [(function(t, e, i) {
        function n() {
            h("frame").start(), h("logic").start()
        }

        function r() {
            cc.director.isPaused() ? h("frame").start() : h("logic").end(), h("render").start()
        }

        function s() {
            h("render").end(), h("draws").value = cc.g_NumberOfDraws, h("frame").end(), h("fps").frame(), h().tick()
        }
        var o = t("../../../external/pstats/pstats"),
            c = t("../platform/CCMacro"),
            a = document.createElement("div");
        a.id = "fps";
        var h = null,
            l = !1;
        cc.profiler = e.exports = {
            isShowingStats: function() {
                return l
            },
            hideStats: function() {
                l && (a.parentElement === document.body && document.body.removeChild(a), cc.director.off(cc.Director.EVENT_BEFORE_UPDATE, n), cc.director.off(cc.Director.EVENT_AFTER_VISIT, r), cc.director.off(cc.Director.EVENT_AFTER_DRAW, s), l = !1)
            },
            showStats: function() {
                l || (h || (h = o.new(a, {
                    showGraph: !1,
                    values: {
                        frame: {
                            desc: "Frame time (ms)",
                            min: 0,
                            max: 50,
                            average: 500
                        },
                        fps: {
                            desc: "Framerate (FPS)",
                            below: 30,
                            average: 500
                        },
                        draws: {
                            desc: "Draw call"
                        },
                        logic: {
                            desc: "Game Logic (ms)",
                            min: 0,
                            max: 50,
                            average: 500,
                            color: "#080"
                        },
                        render: {
                            desc: "Renderer (ms)",
                            min: 0,
                            max: 50,
                            average: 500,
                            color: "#f90"
                        },
                        mode: {
                            desc: cc._renderType === cc.game.RENDER_TYPE_WEBGL ? "WebGL" : "Canvas",
                            min: 1
                        }
                    },
                    css: ".pstats {left: " + c.DIRECTOR_STATS_POSITION.x + "px; bottom: " + c.DIRECTOR_STATS_POSITION.y + "px;}"
                })), null === a.parentElement && document.body.appendChild(a), cc.director.on(cc.Director.EVENT_BEFORE_UPDATE, n), cc.director.on(cc.Director.EVENT_AFTER_VISIT, r), cc.director.on(cc.Director.EVENT_AFTER_DRAW, s), l = !0)
            }
        }
    }), {
        "../../../external/pstats/pstats": 168,
        "../platform/CCMacro": 84
    }],
    124: [(function(t, e, i) {
        function n(t) {
            return t ? "string" == typeof t ? _.getClassByName(t) : t : (cc.errorID(3804), null)
        }

        function r(t, e) {
            if (e._sealed)
                for (var i = 0; i < t._components.length; ++i) {
                    var n = t._components[i];
                    if (n.constructor === e) return n
                } else
                    for (var r = 0; r < t._components.length; ++r) {
                        var s = t._components[r];
                        if (s instanceof e) return s
                    }
            return null
        }

        function s(t, e, i) {
            if (e._sealed)
                for (var n = 0; n < t._components.length; ++n) {
                    var r = t._components[n];
                    r.constructor === e && i.push(r)
                } else
                    for (var s = 0; s < t._components.length; ++s) {
                        var o = t._components[s];
                        o instanceof e && i.push(o)
                    }
        }

        function o(t, e) {
            for (var i = 0; i < t.length; ++i) {
                var n = t[i],
                    s = r(n, e);
                if (s) return s;
                if (n._children.length > 0 && (s = o(n._children, e))) return s
            }
            return null
        }

        function c(t, e, i) {
            for (var n = 0; n < t.length; ++n) {
                var r = t[n];
                s(r, e, i), r._children.length > 0 && c(r._children, e, i)
            }
        }
        var a = t("../platform/CCObject").Flags,
            h = t("./misc"),
            l = t("../platform/id-generater"),
            u = t("../event-manager"),
            _ = cc.js,
            d = a.Destroying,
            f = a.DontDestroy,
            p = new l("Node"),
            g = cc.Class({
                name: "cc._BaseNode",
                extends: cc.Object,
                mixins: [cc.EventTarget],
                properties: {
                    _parent: null,
                    _children: [],
                    _tag: cc.macro.NODE_TAG_INVALID,
                    _active: !0,
                    _components: [],
                    _prefab: null,
                    _persistNode: {
                        get: function() {
                            return (this._objFlags & f) > 0
                        },
                        set: function(t) {
                            t ? this._objFlags |= f : this._objFlags &= ~f
                        }
                    },
                    name: {
                        get: function() {
                            return this._name
                        },
                        set: function(t) {
                            this._name = t
                        }
                    },
                    _id: {
                        default: "",
                        editorOnly: !0
                    },
                    uuid: {
                        get: function() {
                            var t = this._id;
                            return t || (t = this._id = p.getNewId()), t
                        }
                    },
                    children: {
                        get: function() {
                            return this._children
                        }
                    },
                    childrenCount: {
                        get: function() {
                            return this._children.length
                        }
                    },
                    active: {
                        get: function() {
                            return this._active
                        },
                        set: function(t) {
                            if (t = !!t, this._active !== t) {
                                this._active = t;
                                var e = this._parent;
                                if (e) {
                                    e._activeInHierarchy && cc.director._nodeActivator.activateNode(this, t)
                                }
                            }
                        }
                    },
                    activeInHierarchy: {
                        get: function() {
                            return this._activeInHierarchy
                        }
                    }
                },
                ctor: function(t) {
                    this._name = void 0 !== t ? t : "New Node", this._activeInHierarchy = !1, this.__instanceId = this._id || cc.ClassManager.getNewInstanceId(), this.__eventTargets = []
                },
                getTag: function() {
                    return this._tag
                },
                setTag: function(t) {
                    this._tag = t
                },
                getParent: function() {
                    return this._parent
                },
                setParent: function(t) {
                    if (this._parent !== t) {
                        0;
                        var e = this._parent;
                        if (this._parent = t || null, this._onSetParent(t), t && (u._setDirtyForNode(this), t._children.push(this), t.emit("child-added", this)), e) {
                            if (!(e._objFlags & d)) {
                                var i = e._children.indexOf(this);
                                0, e._children.splice(i, 1), e.emit("child-removed", this), this._onHierarchyChanged(e)
                            }
                        } else t && this._onHierarchyChanged(null)
                    }
                },
                init: function() {
                    return !0
                },
                attr: function(t) {
                    _.mixin(this, t)
                },
                getChildByTag: function(t) {
                    var e = this._children;
                    if (null !== e)
                        for (var i = 0; i < e.length; i++) {
                            var n = e[i];
                            if (n && n._tag === t) return n
                        }
                    return null
                },
                getChildByUuid: function(t) {
                    if (!t) return cc.log("Invalid uuid"), null;
                    for (var e = this._children, i = 0, n = e.length; i < n; i++)
                        if (e[i]._id === t) return e[i];
                    return null
                },
                getChildByName: function(t) {
                    if (!t) return cc.log("Invalid name"), null;
                    for (var e = this._children, i = 0, n = e.length; i < n; i++)
                        if (e[i]._name === t) return e[i];
                    return null
                },
                addChild: function(t) {
                    cc.assertID(t, 1606), cc.assertID(null === t._parent, 1605), t.setParent(this)
                },
                insertChild: function(t, e) {
                    t.parent = this, t.setSiblingIndex(e)
                },
                getSiblingIndex: function() {
                    return this._parent ? this._parent._children.indexOf(this) : 0
                },
                setSiblingIndex: function(t) {
                    if (this._parent) {
                        var e = this._parent._children;
                        t = -1 !== t ? t : e.length - 1;
                        var i = e.indexOf(this);
                        t !== i && (e.splice(i, 1), t < e.length ? e.splice(t, 0, this) : e.push(this), this._onSiblingIndexChanged && this._onSiblingIndexChanged(t))
                    }
                },
                cleanup: function() {},
                removeFromParent: function(t) {
                    this._parent && (void 0 === t && (t = !0), this._parent.removeChild(this, t))
                },
                removeChild: function(t, e) {
                    this._children.indexOf(t) > -1 && ((e || void 0 === e) && t.cleanup(), t.parent = null)
                },
                removeChildByTag: function(t, e) {
                    t === cc.macro.NODE_TAG_INVALID && cc.logID(1609);
                    var i = this.getChildByTag(t);
                    i ? this.removeChild(i, e) : cc.logID(1610, t)
                },
                removeAllChildren: function(t) {
                    var e = this._children;
                    void 0 === t && (t = !0);
                    for (var i = e.length - 1; i >= 0; i--) {
                        var n = e[i];
                        n && (t && n.cleanup(), n.parent = null)
                    }
                    this._children.length = 0
                },
                isChildOf: function(t) {
                    var e = this;
                    do {
                        if (e === t) return !0;
                        e = e._parent
                    } while (e);
                    return !1
                },
                getComponent: function(t) {
                    var e = n(t);
                    return e ? r(this, e) : null
                },
                getComponents: function(t) {
                    var e = n(t),
                        i = [];
                    return e && s(this, e, i), i
                },
                getComponentInChildren: function(t) {
                    var e = n(t);
                    return e ? o(this._children, e) : null
                },
                getComponentsInChildren: function(t) {
                    var e = n(t),
                        i = [];
                    return e && (s(this, e, i), c(this._children, e, i)), i
                },
                _checkMultipleComp: !1,
                addComponent: function(t) {
                    var e;
                    if ("string" == typeof t) {
                        if (!(e = _.getClassByName(t))) return cc.errorID(3807, t), cc._RFpeek() && cc.errorID(3808, t), null
                    } else {
                        if (!t) return cc.errorID(3804), null;
                        e = t
                    }
                    if ("function" != typeof e) return cc.errorID(3809), null;
                    if (!cc.isChildClassOf(e, cc.Component)) return cc.errorID(3810), null;
                    var i = e._requireComponent;
                    if (i && !this.getComponent(i)) {
                        if (!this.addComponent(i)) return null
                    }
                    var n = new e;
                    return n.node = this, this._components.push(n), this._activeInHierarchy && cc.director._nodeActivator.activateComp(n), n
                },
                _addComponentAt: !1,
                removeComponent: function(t) {
                    t ? (t instanceof cc.Component || (t = this.getComponent(t)), t && t.destroy()) : cc.errorID(3813)
                },
                _getDependComponent: !1,
                _removeComponent: function(t) {
                    if (t) {
                        if (!(this._objFlags & d)) {
                            var e = this._components.indexOf(t); - 1 !== e ? this._components.splice(e, 1) : t.node !== this && cc.errorID(3815)
                        }
                    } else cc.errorID(3814)
                },
                _disableChildComps: function() {
                    var t, e = this._components.length;
                    for (t = 0; t < e; ++t) {
                        var i = this._components[t];
                        i._enabled && cc.director._compScheduler.disableComp(i)
                    }
                    for (t = 0, e = this._children.length; t < e; ++t) {
                        var n = this._children[t];
                        n._active && n._disableChildComps()
                    }
                },
                destroy: function() {
                    cc.Object.prototype.destroy.call(this) && this._activeInHierarchy && this._disableChildComps()
                },
                destroyAllChildren: function() {
                    for (var t = this._children, e = 0; e < t.length; ++e) t[e].destroy()
                },
                _onSetParent: function(t) {},
                _onPostActivated: function() {},
                _onHierarchyChanged: function(t) {
                    var e = this._parent;
                    !this._persistNode || e instanceof cc.Scene || cc.game.removePersistRootNode(this);
                    var i = this._active && !(!e || !e._activeInHierarchy);
                    this._activeInHierarchy !== i && cc.director._nodeActivator.activateNode(this, i)
                },
                _onBatchCreated: function() {
                    var t = this._prefab;
                    t && t.sync && !t._synced && t.root === this && PrefabHelper.syncWithPrefab(this);
                    for (var e = this._children, i = 0, n = e.length; i < n; i++) e[i]._onBatchCreated()
                },
                _instantiate: function(t) {
                    t || (t = cc.instantiate._clone(this, this));
                    var e = this._prefab;
                    return e && this === e.root && e.sync && (t._prefab._synced = e._synced), t._parent = null, t._onBatchCreated(), t
                },
                _registerIfAttached: !1,
                _onPreDestroy: function() {
                    var t, e;
                    this._objFlags |= d;
                    var i = this._parent,
                        n = i && i._objFlags & d;
                    var r = this._children;
                    for (t = 0, e = r.length; t < e; ++t) r[t]._destroyImmediate();
                    for (t = 0, e = this._components.length; t < e; ++t) {
                        this._components[t]._destroyImmediate()
                    }
                    var s = this.__eventTargets;
                    for (t = 0, e = s.length; t < e; ++t) {
                        var o = s[t];
                        o && o.targetOff(this)
                    }
                    if (s.length = 0, this._persistNode && cc.game.removePersistRootNode(this), !n && i) {
                        var c = i._children.indexOf(this);
                        i._children.splice(c, 1), i.emit("child-removed", this)
                    }
                    return n
                },
                onRestore: !1
            });
        g.prototype._onPreDestroyBase = g.prototype._onPreDestroy, g.prototype._onHierarchyChangedBase = g.prototype._onHierarchyChanged;
        h.propertyDefine(g, ["name", "children", "childrenCount"], {}), cc._BaseNode = e.exports = g
    }), {
        "../event-manager": 52,
        "../platform/CCObject": 85,
        "../platform/id-generater": 96,
        "./misc": 128
    }],
    125: [(function(t, e, i) {
        var n = t("./misc").BASE64_VALUES,
            r = "0123456789abcdef".split(""),
            s = ["", "", "", ""],
            o = s.concat(s, "-", s, "-", s, "-", s, "-", s, s, s),
            c = o.map((function(t, e) {
                return "-" === t ? NaN : e
            })).filter(isFinite);
        e.exports = function(t) {
            if (22 !== t.length) return t;
            o[0] = t[0], o[1] = t[1];
            for (var e = 2, i = 2; e < 22; e += 2) {
                var s = n[t.charCodeAt(e)],
                    a = n[t.charCodeAt(e + 1)];
                o[c[i++]] = r[s >> 2], o[c[i++]] = r[(3 & s) << 2 | a >> 4], o[c[i++]] = r[15 & a]
            }
            return o.join("")
        }
    }), {
        "./misc": 128
    }],
    126: [(function(t, e, i) {
        cc.find = e.exports = function(t, e) {
            if (null == t) return cc.errorID(5600), null;
            if (e) 0;
            else {
                var i = cc.director.getScene();
                if (!i) return null;
                e = i
            }
            for (var n = e, r = "/" !== t[0] ? 0 : 1, s = t.split("/"), o = r; o < s.length; o++) {
                var c = s[o],
                    a = n._children;
                n = null;
                for (var h = 0, l = a.length; h < l; ++h) {
                    var u = a[h];
                    if (u.name === c) {
                        n = u;
                        break
                    }
                }
                if (!n) return null
            }
            return n
        }
    }), {}],
    127: [(function(t, e, i) {
        t("./CCPath"), t("./CCProfiler"), t("./find"), t("./mutable-forward-iterator")
    }), {
        "./CCPath": 122,
        "./CCProfiler": 123,
        "./find": 126,
        "./mutable-forward-iterator": 129
    }],
    128: [(function(t, e, i) {
        var n = t("../platform/js"),
            r = t("../platform/CCSys"),
            s = i;
        s.propertyDefine = function(t, e, i) {
            function n(t, e, i, n) {
                var r = Object.getOwnPropertyDescriptor(t, e);
                if (r) r.get && (t[i] = r.get), r.set && n && (t[n] = r.set);
                else {
                    var s = t[i];
                    cc.js.getset(t, e, s, t[n])
                }
            }
            for (var r, s = t.prototype, o = 0; o < e.length; o++) {
                var c = (r = e[o])[0].toUpperCase() + r.slice(1);
                n(s, r, "get" + c, "set" + c)
            }
            for (r in i) {
                var a = i[r];
                n(s, r, a[0], a[1])
            }
        }, s.NextPOT = function(t) {
            return t -= 1, t |= t >> 1, t |= t >> 2, t |= t >> 4, t |= t >> 8, (t |= t >> 16) + 1
        }, s.imagePool = new n.Pool(function(t) {
            return t instanceof HTMLImageElement && (t.src = this._smallImg, !0)
        }, 10), s.imagePool.get = function() {
            return this._get() || new Image
        }, s.imagePool._smallImg = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=", r.os !== r.OS_WINDOWS && r.os !== r.OS_LINUX || r.browserType === r.BROWSER_TYPE_CHROME || s.imagePool.resize(0), s.BUILTIN_CLASSID_RE = /^(?:cc|dragonBones|sp|ccsg)\..+/;
        for (var o = new Array(123), c = 0; c < 123; ++c) o[c] = 64;
        for (var a = 0; a < 64; ++a) o["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charCodeAt(a)] = a;
        s.BASE64_VALUES = o, s.pushToMap = function(t, e, i, n) {
            var r = t[e];
            r ? Array.isArray(r) ? n ? (r.push(r[0]), r[0] = i) : r.push(i) : t[e] = n ? [i, r] : [r, i] : t[e] = i
        }
    }), {
        "../platform/CCSys": 88,
        "../platform/js": 100
    }],
    129: [(function(t, e, i) {
        function n(t) {
            this.i = 0, this.array = t
        }
        var r = n.prototype;
        r.remove = function(t) {
            var e = this.array.indexOf(t);
            e >= 0 && this.removeAt(e)
        }, r.removeAt = function(t) {
            this.array.splice(t, 1), t <= this.i && --this.i
        }, r.fastRemove = function(t) {
            var e = this.array.indexOf(t);
            e >= 0 && this.fastRemoveAt(e)
        }, r.fastRemoveAt = function(t) {
            var e = this.array;
            e[t] = e[e.length - 1], --e.length, t <= this.i && --this.i
        }, r.push = function(t) {
            this.array.push(t)
        }, e.exports = n
    }), {}],
    130: [(function(t, e, i) {
        cc._PrefabInfo = cc.Class({
            name: "cc.PrefabInfo",
            properties: {
                root: null,
                asset: null,
                fileId: "",
                sync: !1,
                _synced: {
                    default: !1,
                    serializable: !1
                }
            }
        }), e.exports = {
            syncWithPrefab: function(t) {
                var e = t._prefab;
                if (e._synced = !0, !e.asset) return cc.errorID(3701, t.name), void(t._prefab = null);
                var i = t._objFlags,
                    n = t._parent,
                    r = t._id,
                    s = t._name,
                    o = t._active,
                    c = t._position.x,
                    a = t._position.y,
                    h = t._rotationX,
                    l = t._rotationY,
                    u = t._localZOrder,
                    _ = t._globalZOrder;
                cc.game._isCloning = !0;
                e.asset._doInstantiate(t), cc.game._isCloning = !1, t._objFlags = i, t._parent = n, t._id = r, t._prefab = e, t._name = s, t._active = o, t._position.x = c, t._position.y = a, t._rotationX = h, t._rotationY = l, t._localZOrder = u, t._globalZOrder = _
            }
        }
    }), {}],
    131: [(function(t, e, i) {
        var n = {
            removeSgNode: function() {
                var t = this._sgNode;
                if (t) {
                    var e = t._parent;
                    e ? e.removeChild(t) : t.performRecursive(_ccsg.Node.performType.cleanup), t._entity && (t._entity = null)
                }
            }
        };
        e.exports = n
    }), {}],
    132: [(function(t, e, i) {
        cc.AffineTransform = function(t, e, i, n, r, s) {
            this.a = t, this.b = e, this.c = i, this.d = n, this.tx = r, this.ty = s
        }, cc.affineTransformMake = function(t, e, i, n, r, s) {
            return {
                a: t,
                b: e,
                c: i,
                d: n,
                tx: r,
                ty: s
            }
        }, cc.affineTransformClone = function(t) {
            return {
                a: t.a,
                b: t.b,
                c: t.c,
                d: t.d,
                tx: t.tx,
                ty: t.ty
            }
        }, cc.pointApplyAffineTransform = function(t, e, i) {
            var n, r;
            return void 0 === i ? (i = e, n = t.x, r = t.y) : (n = t, r = e), {
                x: i.a * n + i.c * r + i.tx,
                y: i.b * n + i.d * r + i.ty
            }
        }, cc._pointApplyAffineTransformIn = function(t, e, i, n) {
            var r, s, o;
            void 0 === n ? (o = e, r = t.x, s = t.y, n = i) : (r = t, s = e, o = i), n.x = o.a * r + o.c * s + o.tx, n.y = o.b * r + o.d * s + o.ty
        }, cc._pointApplyAffineTransform = function(t, e, i) {
            return cc.pointApplyAffineTransform(t, e, i)
        }, cc.sizeApplyAffineTransform = function(t, e) {
            return {
                width: e.a * t.width + e.c * t.height,
                height: e.b * t.width + e.d * t.height
            }
        }, cc.affineTransformMakeIdentity = function() {
            return {
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                tx: 0,
                ty: 0
            }
        }, cc.affineTransformIdentity = function() {
            return {
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                tx: 0,
                ty: 0
            }
        }, cc.rectApplyAffineTransform = function(t, e) {
            var i = t.x,
                n = t.y,
                r = i + t.width,
                s = n + t.height,
                o = e.a * i + e.c * n + e.tx,
                c = e.b * i + e.d * n + e.ty,
                a = e.a * r + e.c * n + e.tx,
                h = e.b * r + e.d * n + e.ty,
                l = e.a * i + e.c * s + e.tx,
                u = e.b * i + e.d * s + e.ty,
                _ = e.a * r + e.c * s + e.tx,
                d = e.b * r + e.d * s + e.ty,
                f = Math.min(o, a, l, _),
                p = Math.max(o, a, l, _),
                g = Math.min(c, h, u, d),
                m = Math.max(c, h, u, d);
            return cc.rect(f, g, p - f, m - g)
        }, cc._rectApplyAffineTransformIn = function(t, e) {
            var i = t.x,
                n = t.y,
                r = i + t.width,
                s = n + t.height,
                o = e.a * i + e.c * n + e.tx,
                c = e.b * i + e.d * n + e.ty,
                a = e.a * r + e.c * n + e.tx,
                h = e.b * r + e.d * n + e.ty,
                l = e.a * i + e.c * s + e.tx,
                u = e.b * i + e.d * s + e.ty,
                _ = e.a * r + e.c * s + e.tx,
                d = e.b * r + e.d * s + e.ty,
                f = Math.min(o, a, l, _),
                p = Math.max(o, a, l, _),
                g = Math.min(c, h, u, d),
                m = Math.max(c, h, u, d);
            return t.x = f, t.y = g, t.width = p - f, t.height = m - g, t
        }, cc.obbApplyAffineTransform = function(t, e, i, n, r, s) {
            var o = t.x,
                c = t.y,
                a = t.width,
                h = t.height,
                l = e.a * o + e.c * c + e.tx,
                u = e.b * o + e.d * c + e.ty,
                _ = e.a * a,
                d = e.b * a,
                f = e.c * h,
                p = e.d * h;
            n.x = l, n.y = u, r.x = _ + l, r.y = d + u, i.x = f + l, i.y = p + u, s.x = _ + f + l, s.y = d + p + u
        }, cc.affineTransformTranslate = function(t, e, i) {
            return {
                a: t.a,
                b: t.b,
                c: t.c,
                d: t.d,
                tx: t.tx + t.a * e + t.c * i,
                ty: t.ty + t.b * e + t.d * i
            }
        }, cc.affineTransformScale = function(t, e, i) {
            return {
                a: t.a * e,
                b: t.b * e,
                c: t.c * i,
                d: t.d * i,
                tx: t.tx,
                ty: t.ty
            }
        }, cc.affineTransformRotate = function(t, e) {
            var i = Math.sin(e),
                n = Math.cos(e);
            return {
                a: t.a * n + t.c * i,
                b: t.b * n + t.d * i,
                c: t.c * n - t.a * i,
                d: t.d * n - t.b * i,
                tx: t.tx,
                ty: t.ty
            }
        }, cc.affineTransformConcat = function(t, e) {
            return {
                a: t.a * e.a + t.b * e.c,
                b: t.a * e.b + t.b * e.d,
                c: t.c * e.a + t.d * e.c,
                d: t.c * e.b + t.d * e.d,
                tx: t.tx * e.a + t.ty * e.c + e.tx,
                ty: t.tx * e.b + t.ty * e.d + e.ty
            }
        }, cc.affineTransformConcatIn = function(t, e) {
            var i = t.a,
                n = t.b,
                r = t.c,
                s = t.d,
                o = t.tx,
                c = t.ty;
            return t.a = i * e.a + n * e.c, t.b = i * e.b + n * e.d, t.c = r * e.a + s * e.c, t.d = r * e.b + s * e.d, t.tx = o * e.a + c * e.c + e.tx, t.ty = o * e.b + c * e.d + e.ty, t
        }, cc.affineTransformEqualToTransform = function(t, e) {
            return t.a === e.a && t.b === e.b && t.c === e.c && t.d === e.d && t.tx === e.tx && t.ty === e.ty
        }, cc.affineTransformInvert = function(t) {
            var e = 1 / (t.a * t.d - t.b * t.c);
            return {
                a: e * t.d,
                b: -e * t.b,
                c: -e * t.c,
                d: e * t.a,
                tx: e * (t.c * t.ty - t.d * t.tx),
                ty: e * (t.b * t.tx - t.a * t.ty)
            }
        }, cc.affineTransformInvertIn = function(t) {
            var e = t.a,
                i = t.b,
                n = t.c,
                r = t.d,
                s = 1 / (e * r - i * n),
                o = t.tx,
                c = t.ty;
            return t.a = s * r, t.b = -s * i, t.c = -s * n, t.d = s * e, t.tx = s * (n * c - r * o), t.ty = s * (i * o - e * c), t
        }, cc.affineTransformInvertOut = function(t, e) {
            var i = t.a,
                n = t.b,
                r = t.c,
                s = t.d,
                o = 1 / (i * s - n * r);
            e.a = o * s, e.b = -o * n, e.c = -o * r, e.d = o * i, e.tx = o * (r * t.ty - s * t.tx), e.ty = o * (n * t.tx - i * t.ty)
        }
    }), {}],
    133: [(function(t, e, i) {
        var n = t("./CCValueType"),
            r = t("../platform/js"),
            s = (function() {
                function e(t, e, i, n) {
                    "object" == typeof t && (e = t.g, i = t.b, n = t.a, t = t.r), t = t || 0, e = e || 0, i = i || 0, n = "number" == typeof n ? n : 255, this._val = (~~t << 24 >>> 0) + (~~e << 16) + (~~i << 8) + ~~n
                }
                r.extend(e, n), t("../platform/CCClass").fastDefine("cc.Color", e, {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 255
                });
                var i = {
                    WHITE: [255, 255, 255, 255],
                    BLACK: [0, 0, 0, 255],
                    TRANSPARENT: [0, 0, 0, 0],
                    GRAY: [127.5, 127.5, 127.5],
                    RED: [255, 0, 0],
                    GREEN: [0, 255, 0],
                    BLUE: [0, 0, 255],
                    YELLOW: [255, 235, 4],
                    ORANGE: [255, 127, 0],
                    CYAN: [0, 255, 255],
                    MAGENTA: [255, 0, 255]
                };
                for (var s in i) r.get(e, s, (function(t) {
                    return function() {
                        return new e(t[0], t[1], t[2], t[3])
                    }
                })(i[s]));
                var o = e.prototype;
                return o.clone = function() {
                    var t = new e;
                    return t._val = this._val, t
                }, o.equals = function(t) {
                    return t && this._val === t._val
                }, o.lerp = function(t, i, n) {
                    n = n || new e;
                    var r = this.r,
                        s = this.g,
                        o = this.b,
                        c = this.a;
                    return n.r = r + (t.r - r) * i, n.g = s + (t.g - s) * i, n.b = o + (t.b - o) * i, n.a = c + (t.a - c) * i, n
                }, o.toString = function() {
                    return "rgba(" + this.r.toFixed() + ", " + this.g.toFixed() + ", " + this.b.toFixed() + ", " + this.a.toFixed() + ")"
                }, o.getR = function() {
                    return (4278190080 & this._val) >>> 24
                }, o.setR = function(t) {
                    return this._val = (16777215 & this._val | ~~t << 24 >>> 0) >>> 0, this
                }, o.getG = function() {
                    return (16711680 & this._val) >> 16
                }, o.setG = function(t) {
                    return this._val = (4278255615 & this._val | ~~t << 16) >>> 0, this
                }, o.getB = function() {
                    return (65280 & this._val) >> 8
                }, o.setB = function(t) {
                    return this._val = (4294902015 & this._val | ~~t << 8) >>> 0, this
                }, o.getA = function() {
                    return 255 & this._val
                }, o.setA = function(t) {
                    return this._val = (4294967040 & this._val | ~~t) >>> 0, this
                }, r.getset(o, "r", o.getR, o.setR, !0), r.getset(o, "g", o.getG, o.setG, !0), r.getset(o, "b", o.getB, o.setB, !0), r.getset(o, "a", o.getA, o.setA, !0), o.toCSS = function(t) {
                    return "rgba" === t ? "rgba(" + (0 | this.r) + "," + (0 | this.g) + "," + (0 | this.b) + "," + (this.a / 255).toFixed(2) + ")" : "rgb" === t ? "rgb(" + (0 | this.r) + "," + (0 | this.g) + "," + (0 | this.b) + ")" : "#" + this.toHEX(t)
                }, o.clamp = function() {}, o.fromHEX = function(t) {
                    t.length < 8 && (t += "FF");
                    var e = parseInt(t.indexOf("#") > -1 ? t.substring(1) : t, 16);
                    return this._val = (0 & this._val | e) >>> 0, this
                }, o.toHEX = function(t) {
                    var e = [(0 | this.r).toString(16), (0 | this.g).toString(16), (0 | this.b).toString(16)],
                        i = -1;
                    if ("#rgb" === t)
                        for (i = 0; i < e.length; ++i) e[i].length > 1 && (e[i] = e[i][0]);
                    else if ("#rrggbb" === t)
                        for (i = 0; i < e.length; ++i) 1 === e[i].length && (e[i] = "0" + e[i]);
                    return e.join("")
                }, o.toRGBValue = function() {
                    return 16777215 & this._val
                }, o.fromHSV = function(t, i, n) {
                    var r = e.hsv2rgb(t, i, n);
                    return this._val = (r.r << 24 >>> 0) + (r.g << 16) + (r.b << 8) + this.a, this
                }, o.toHSV = function() {
                    return e.rgb2hsv(this.r, this.g, this.b)
                }, o.fromColor = function(t) {
                    t._val ? this._val = t._val : (this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a)
                }, e
            })();
        s.rgb2hsv = function(t, e, i) {
            t /= 255, e /= 255, i /= 255;
            var n = {
                    h: 0,
                    s: 0,
                    v: 0
                },
                r = Math.max(t, e, i),
                s = Math.min(t, e, i),
                o = 0;
            return n.v = r, n.s = r ? (r - s) / r : 0, n.s ? (o = r - s, n.h = t === r ? (e - i) / o : e === r ? 2 + (i - t) / o : 4 + (t - e) / o, n.h /= 6, n.h < 0 && (n.h += 1)) : n.h = 0, n
        }, s.hsv2rgb = function(t, e, i) {
            var n = {
                r: 0,
                g: 0,
                b: 0
            };
            if (0 === e) n.r = n.g = n.b = i;
            else if (0 === i) n.r = n.g = n.b = 0;
            else {
                1 === t && (t = 0), t *= 6, e = e, i = i;
                var r = Math.floor(t),
                    s = t - r,
                    o = i * (1 - e),
                    c = i * (1 - e * s),
                    a = i * (1 - e * (1 - s));
                switch (r) {
                    case 0:
                        n.r = i, n.g = a, n.b = o;
                        break;
                    case 1:
                        n.r = c, n.g = i, n.b = o;
                        break;
                    case 2:
                        n.r = o, n.g = i, n.b = a;
                        break;
                    case 3:
                        n.r = o, n.g = c, n.b = i;
                        break;
                    case 4:
                        n.r = a, n.g = o, n.b = i;
                        break;
                    case 5:
                        n.r = i, n.g = o, n.b = c
                }
            }
            return n.r *= 255, n.g *= 255, n.b *= 255, n
        }, cc.Color = s, cc.color = function(t, e, i, n) {
            if ("string" == typeof t) {
                return (new cc.Color).fromHEX(t)
            }
            return "object" == typeof t ? new cc.Color(t.r, t.g, t.b, t.a) : new cc.Color(t, e, i, n)
        }, cc.colorEqual = function(t, e) {
            return void 0 !== t._val && void 0 !== e._val ? t._val === e._val : t.r === e.r && t.g === e.g && t.b === e.b
        }, cc.hexToColor = function(t) {
            t = t.replace(/^#?/, "0x");
            var e = parseInt(t),
                i = e >> 16,
                n = (65280 & e) >> 8,
                r = 255 & e;
            return cc.color(i, n, r)
        }, cc.colorToHex = function(t) {
            var e = t.r.toString(16),
                i = t.g.toString(16),
                n = t.b.toString(16);
            return "#" + (t.r < 16 ? "0" + e : e) + (t.g < 16 ? "0" + i : i) + (t.b < 16 ? "0" + n : n)
        }, e.exports = cc.Color
    }), {
        "../platform/CCClass": 79,
        "../platform/js": 100,
        "./CCValueType": 139
    }],
    134: [(function(t, e, i) {
        var n = parseFloat("1.192092896e-07F");
        cc.pNeg = function(t) {
            return cc.p(-t.x, -t.y)
        }, cc.pAdd = function(t, e) {
            return cc.p(t.x + e.x, t.y + e.y)
        }, cc.pSub = function(t, e) {
            return cc.p(t.x - e.x, t.y - e.y)
        }, cc.pMult = function(t, e) {
            return cc.p(t.x * e, t.y * e)
        }, cc.pMidpoint = function(t, e) {
            return cc.pMult(cc.pAdd(t, e), .5)
        }, cc.pDot = function(t, e) {
            return t.x * e.x + t.y * e.y
        }, cc.pCross = function(t, e) {
            return t.x * e.y - t.y * e.x
        }, cc.pPerp = function(t) {
            return cc.p(-t.y, t.x)
        }, cc.pRPerp = function(t) {
            return cc.p(t.y, -t.x)
        }, cc.pProject = function(t, e) {
            return cc.pMult(e, cc.pDot(t, e) / cc.pDot(e, e))
        }, cc.pLengthSQ = function(t) {
            return cc.pDot(t, t)
        }, cc.pDistanceSQ = function(t, e) {
            return cc.pLengthSQ(cc.pSub(t, e))
        }, cc.pLength = function(t) {
            return Math.sqrt(cc.pLengthSQ(t))
        }, cc.pDistance = function(t, e) {
            return cc.pLength(cc.pSub(t, e))
        }, cc.pNormalize = function(t) {
            var e = cc.pLength(t);
            return 0 === e ? cc.p(t) : cc.pMult(t, 1 / e)
        }, cc.pForAngle = function(t) {
            return cc.p(Math.cos(t), Math.sin(t))
        }, cc.pToAngle = function(t) {
            return Math.atan2(t.y, t.x)
        }, cc.clampf = function(t, e, i) {
            if (e > i) {
                var n = e;
                e = i, i = n
            }
            return t < e ? e : t < i ? t : i
        }, cc.clamp01 = function(t) {
            return t < 0 ? 0 : t < 1 ? t : 1
        }, cc.pClamp = function(t, e, i) {
            return cc.p(cc.clampf(t.x, e.x, i.x), cc.clampf(t.y, e.y, i.y))
        }, cc.pFromSize = function(t) {
            return cc.p(t.width, t.height)
        }, cc.pCompOp = function(t, e) {
            return cc.p(e(t.x), e(t.y))
        }, cc.pLerp = function(t, e, i) {
            return cc.pAdd(cc.pMult(t, 1 - i), cc.pMult(e, i))
        }, cc.pFuzzyEqual = function(t, e, i) {
            return t.x - i <= e.x && e.x <= t.x + i && t.y - i <= e.y && e.y <= t.y + i
        }, cc.pCompMult = function(t, e) {
            return cc.p(t.x * e.x, t.y * e.y)
        }, cc.pAngleSigned = function(t, e) {
            var i = cc.pNormalize(t),
                r = cc.pNormalize(e),
                s = Math.atan2(i.x * r.y - i.y * r.x, cc.pDot(i, r));
            return Math.abs(s) < n ? 0 : s
        }, cc.pAngle = function(t, e) {
            var i = Math.acos(cc.pDot(cc.pNormalize(t), cc.pNormalize(e)));
            return Math.abs(i) < n ? 0 : i
        }, cc.pRotateByAngle = function(t, e, i) {
            var n = cc.pSub(t, e),
                r = Math.cos(i),
                s = Math.sin(i),
                o = n.x;
            return n.x = o * r - n.y * s + e.x, n.y = o * s + n.y * r + e.y, n
        }, cc.pLineIntersect = function(t, e, i, n, r) {
            if (t.x === e.x && t.y === e.y || i.x === n.x && i.y === n.y) return !1;
            var s = e.x - t.x,
                o = e.y - t.y,
                c = n.x - i.x,
                a = n.y - i.y,
                h = t.x - i.x,
                l = t.y - i.y,
                u = a * s - c * o;
            return r.x = c * l - a * h, r.y = s * l - o * h, 0 === u ? 0 === r.x || 0 === r.y : (r.x = r.x / u, r.y = r.y / u, !0)
        }, cc.pSegmentIntersect = function(t, e, i, n) {
            var r = cc.p(0, 0);
            return !!(cc.pLineIntersect(t, e, i, n, r) && r.x >= 0 && r.x <= 1 && r.y >= 0 && r.y <= 1)
        }, cc.pIntersectPoint = function(t, e, i, n) {
            var r = cc.p(0, 0);
            if (cc.pLineIntersect(t, e, i, n, r)) {
                var s = cc.p(0, 0);
                return s.x = t.x + r.x * (e.x - t.x), s.y = t.y + r.x * (e.y - t.y), s
            }
            return cc.p(0, 0)
        }, cc.pSameAs = function(t, e) {
            return null != t && null != e && (t.x === e.x && t.y === e.y)
        }, cc.pZeroIn = function(t) {
            t.x = 0, t.y = 0
        }, cc.pIn = function(t, e) {
            t.x = e.x, t.y = e.y
        }, cc.pMultIn = function(t, e) {
            t.x *= e, t.y *= e
        }, cc.pSubIn = function(t, e) {
            t.x -= e.x, t.y -= e.y
        }, cc.pAddIn = function(t, e) {
            t.x += e.x, t.y += e.y
        }, cc.pNormalizeIn = function(t) {
            cc.pMultIn(t, 1 / Math.sqrt(t.x * t.x + t.y * t.y))
        }
    }), {}],
    135: [(function(t, e, i) {
        function n(t, e, i, n) {
            t && "object" == typeof t && (e = t.y, i = t.width, n = t.height, t = t.x), this.x = t || 0, this.y = e || 0, this.width = i || 0, this.height = n || 0
        }
        var r = t("./CCValueType"),
            s = t("../platform/js");
        s.extend(n, r), t("../platform/CCClass").fastDefine("cc.Rect", n, {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }), n.fromMinMax = function(t, e) {
            var i = Math.min(t.x, e.x),
                r = Math.min(t.y, e.y);
            return new n(i, r, Math.max(t.x, e.x) - i, Math.max(t.y, e.y) - r)
        }, n.contain = function(t, e) {
            return t.x < e.x && t.x + t.width > e.x + e.width && t.y < e.y && t.y + t.height > e.y + e.height ? 1 : e.x < t.x && e.x + e.width > t.x + t.width && e.y < t.y && e.y + e.height > t.y + t.height ? -1 : 0
        };
        var o = n.prototype;
        o.clone = function() {
            return new n(this.x, this.y, this.width, this.height)
        }, o.equals = function(t) {
            return t && this.x === t.x && this.y === t.y && this.width === t.width && this.height === t.height
        }, o.lerp = function(t, e, i) {
            i = i || new n;
            var r = this.x,
                s = this.y,
                o = this.width,
                c = this.height;
            return i.x = r + (t.x - r) * e, i.y = s + (t.y - s) * e, i.width = o + (t.width - o) * e, i.height = c + (t.height - c) * e, i
        }, o.toString = function() {
            return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ", " + this.width.toFixed(2) + ", " + this.height.toFixed(2) + ")"
        }, s.getset(o, "xMin", (function() {
            return this.x
        }), (function(t) {
            this.width += this.x - t, this.x = t
        })), s.getset(o, "yMin", (function() {
            return this.y
        }), (function(t) {
            this.height += this.y - t, this.y = t
        })), s.getset(o, "xMax", (function() {
            return this.x + this.width
        }), (function(t) {
            this.width = t - this.x
        })), s.getset(o, "yMax", (function() {
            return this.y + this.height
        }), (function(t) {
            this.height = t - this.y
        })), s.getset(o, "center", (function() {
            return new cc.Vec2(this.x + .5 * this.width, this.y + .5 * this.height)
        }), (function(t) {
            this.x = t.x - .5 * this.width, this.y = t.y - .5 * this.height
        })), s.getset(o, "origin", (function() {
            return new cc.Vec2(this.x, this.y)
        }), (function(t) {
            this.x = t.x, this.y = t.y
        })), s.getset(o, "size", (function() {
            return new cc.Size(this.width, this.height)
        }), (function(t) {
            this.width = t.width, this.height = t.height
        })), o.intersects = function(t) {
            return cc.rectIntersectsRect(this, t)
        }, o.contains = function(t) {
            return this.x <= t.x && this.x + this.width >= t.x && this.y <= t.y && this.y + this.height >= t.y
        }, o.containsRect = function(t) {
            return this.x <= t.x && this.x + this.width >= t.x + t.width && this.y <= t.y && this.y + this.height >= t.y + t.height
        }, cc.Rect = n, cc.rect = function(t, e, i, r) {
            return new n(t, e, i, r)
        }, cc.rectEqualToRect = function(t, e) {
            return t && e && t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height
        }, cc._rectEqualToZero = function(t) {
            return t && 0 === t.x && 0 === t.y && 0 === t.width && 0 === t.height
        }, cc.rectContainsRect = function(t, e) {
            return !(!t || !e) && !(t.x >= e.x || t.y >= e.y || t.x + t.width <= e.x + e.width || t.y + t.height <= e.y + e.height)
        }, cc.rectGetMaxX = function(t) {
            return t.x + t.width
        }, cc.rectGetMidX = function(t) {
            return t.x + t.width / 2
        }, cc.rectGetMinX = function(t) {
            return t.x
        }, cc.rectGetMaxY = function(t) {
            return t.y + t.height
        }, cc.rectGetMidY = function(t) {
            return t.y + t.height / 2
        }, cc.rectGetMinY = function(t) {
            return t.y
        }, cc.rectContainsPoint = function(t, e) {
            return e.x >= cc.rectGetMinX(t) && e.x <= cc.rectGetMaxX(t) && e.y >= cc.rectGetMinY(t) && e.y <= cc.rectGetMaxY(t)
        }, cc.rectIntersectsRect = function(t, e) {
            var i = t.x + t.width,
                n = t.y + t.height,
                r = e.x + e.width,
                s = e.y + e.height;
            return !(i < e.x || r < t.x || n < e.y || s < t.y)
        }, cc.rectOverlapsRect = function(t, e) {
            return !(t.x + t.width < e.x || e.x + e.width < t.x || t.y + t.height < e.y || e.y + e.height < t.y)
        }, cc.rectUnion = function(t, e) {
            var i = cc.rect(0, 0, 0, 0);
            return i.x = Math.min(t.x, e.x), i.y = Math.min(t.y, e.y), i.width = Math.max(t.x + t.width, e.x + e.width) - i.x, i.height = Math.max(t.y + t.height, e.y + e.height) - i.y, i
        }, cc.rectIntersection = function(t, e) {
            var i = cc.rect(Math.max(cc.rectGetMinX(t), cc.rectGetMinX(e)), Math.max(cc.rectGetMinY(t), cc.rectGetMinY(e)), 0, 0);
            return i.width = Math.min(cc.rectGetMaxX(t), cc.rectGetMaxX(e)) - cc.rectGetMinX(i), i.height = Math.min(cc.rectGetMaxY(t), cc.rectGetMaxY(e)) - cc.rectGetMinY(i), i
        }, e.exports = cc.Rect
    }), {
        "../platform/CCClass": 79,
        "../platform/js": 100,
        "./CCValueType": 139
    }],
    136: [(function(t, e, i) {
        function n(t, e) {
            t && "object" == typeof t && (e = t.height, t = t.width), this.width = t || 0, this.height = e || 0
        }
        var r = t("./CCValueType"),
            s = t("../platform/js");
        s.extend(n, r), t("../platform/CCClass").fastDefine("cc.Size", n, {
            width: 0,
            height: 0
        }), s.get(n, "ZERO", (function() {
            return new n(0, 0)
        }));
        var o = n.prototype;
        o.clone = function() {
            return new n(this.width, this.height)
        }, o.equals = function(t) {
            return t && this.width === t.width && this.height === t.height
        }, o.lerp = function(t, e, i) {
            i = i || new n;
            var r = this.width,
                s = this.height;
            return i.width = r + (t.width - r) * e, i.height = s + (t.height - s) * e, i
        }, o.toString = function() {
            return "(" + this.width.toFixed(2) + ", " + this.height.toFixed(2) + ")"
        }, cc.size = function(t, e) {
            return new n(t, e)
        }, cc.sizeEqualToSize = function(t, e) {
            return t && e && t.width === e.width && t.height === e.height
        }, cc.Size = e.exports = n
    }), {
        "../platform/CCClass": 79,
        "../platform/js": 100,
        "./CCValueType": 139
    }],
    137: [(function(t, e, i) {
        cc.Acceleration = function(t, e, i, n) {
            this.x = t || 0, this.y = e || 0, this.z = i || 0, this.timestamp = n || 0
        }, cc.BlendFunc = function(t, e) {
            this.src = t, this.dst = e
        };
        var n = cc.Enum({
            ONE: 1,
            ZERO: 0,
            SRC_ALPHA: 770,
            SRC_COLOR: 768,
            DST_ALPHA: 772,
            DST_COLOR: 774,
            ONE_MINUS_SRC_ALPHA: 771,
            ONE_MINUS_SRC_COLOR: 769,
            ONE_MINUS_DST_ALPHA: 773,
            ONE_MINUS_DST_COLOR: 775
        });
        cc.BlendFunc._disable = function() {
            return new cc.BlendFunc(n.ONE, n.ZERO)
        }, cc.BlendFunc._alphaPremultiplied = function() {
            return new cc.BlendFunc(n.ONE, n.ONE_MINUS_SRC_ALPHA)
        }, cc.BlendFunc._alphaNonPremultiplied = function() {
            return new cc.BlendFunc(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA)
        }, cc.BlendFunc._additive = function() {
            return new cc.BlendFunc(n.SRC_ALPHA, n.ONE)
        }, cc.BlendFunc.BlendFactor = n, cc.BlendFunc.DISABLE, cc.js.get(cc.BlendFunc, "DISABLE", cc.BlendFunc._disable), cc.BlendFunc.ALPHA_PREMULTIPLIED, cc.js.get(cc.BlendFunc, "ALPHA_PREMULTIPLIED", cc.BlendFunc._alphaPremultiplied), cc.BlendFunc.ALPHA_NON_PREMULTIPLIED, cc.js.get(cc.BlendFunc, "ALPHA_NON_PREMULTIPLIED", cc.BlendFunc._alphaNonPremultiplied), cc.BlendFunc.ADDITIVE, cc.js.get(cc.BlendFunc, "ADDITIVE", cc.BlendFunc._additive), cc.blendFuncDisable = cc.BlendFunc._disable, cc.TextAlignment = cc.Enum({
            LEFT: 0,
            CENTER: 1,
            RIGHT: 2
        }), cc.VerticalTextAlignment = cc.Enum({
            TOP: 0,
            CENTER: 1,
            BOTTOM: 2
        })
    }), {}],
    138: [(function(t, e, i) {
        cc.WebGLColor = function(t, e, i, n, r, s) {
            this._arrayBuffer = r || new ArrayBuffer(cc.WebGLColor.BYTES_PER_ELEMENT), this._offset = s || 0;
            var o = this._arrayBuffer,
                c = this._offset;
            this._view = new Uint8Array(o, c, 4), this._view[0] = t || 0, this._view[1] = e || 0, this._view[2] = i || 0, "number" == typeof n ? this._view[3] = n : (this._view[3] = 255, this.a_undefined = !0)
        }, cc.WebGLColor.BYTES_PER_ELEMENT = 4;
        (n = cc.WebGLColor.prototype)._getR = function() {
            return this._view[0]
        }, n._setR = function(t) {
            this._view[0] = t < 0 ? 0 : t
        }, n._getG = function() {
            return this._view[1]
        }, n._setG = function(t) {
            this._view[1] = t < 0 ? 0 : t
        }, n._getB = function() {
            return this._view[2]
        }, n._setB = function(t) {
            this._view[2] = t < 0 ? 0 : t
        }, n._getA = function() {
            return this._view[3]
        }, n._setA = function(t) {
            this._view[3] = t < 0 ? 0 : t
        }, n.r, cc.js.getset(n, "r", n._getR, n._setR), n.g, cc.js.getset(n, "g", n._getG, n._setG), n.b, cc.js.getset(n, "b", n._getB, n._setB), n.a, cc.js.getset(n, "a", n._getA, n._setA), cc.Vertex2F = function(t, e, i, n) {
            this._arrayBuffer = i || new ArrayBuffer(cc.Vertex2F.BYTES_PER_ELEMENT), this._offset = n || 0, this._view = new Float32Array(this._arrayBuffer, this._offset, 2), this._view[0] = t || 0, this._view[1] = e || 0
        }, cc.Vertex2F.BYTES_PER_ELEMENT = 8;
        var n;
        (n = cc.Vertex2F.prototype)._getX = function() {
            return this._view[0]
        }, n._setX = function(t) {
            this._view[0] = t
        }, n._getY = function() {
            return this._view[1]
        }, n._setY = function(t) {
            this._view[1] = t
        }, cc.js.getset(n, "x", n._getX, n._setX), cc.js.getset(n, "y", n._getY, n._setY), cc.Vertex3F = function(t, e, i, n, r) {
            this._arrayBuffer = n || new ArrayBuffer(cc.Vertex3F.BYTES_PER_ELEMENT), this._offset = r || 0;
            var s = this._arrayBuffer,
                o = this._offset;
            this._view = new Float32Array(s, o, 3), this._view[0] = t || 0, this._view[1] = e || 0, this._view[2] = i || 0
        }, cc.Vertex3F.BYTES_PER_ELEMENT = 12, (n = cc.Vertex3F.prototype)._getX = function() {
            return this._view[0]
        }, n._setX = function(t) {
            this._view[0] = t
        }, n._getY = function() {
            return this._view[1]
        }, n._setY = function(t) {
            this._view[1] = t
        }, n._getZ = function() {
            return this._view[2]
        }, n._setZ = function(t) {
            this._view[2] = t
        }, cc.js.getset(n, "x", n._getX, n._setX), cc.js.getset(n, "y", n._getY, n._setY), cc.js.getset(n, "z", n._getZ, n._setZ), cc.Tex2F = function(t, e, i, n) {
            this._arrayBuffer = i || new ArrayBuffer(cc.Tex2F.BYTES_PER_ELEMENT), this._offset = n || 0, this._view = new Float32Array(this._arrayBuffer, this._offset, 2), this._view[0] = t || 0, this._view[1] = e || 0
        }, cc.Tex2F.BYTES_PER_ELEMENT = 8, (n = cc.Tex2F.prototype)._getU = function() {
            return this._view[0]
        }, n._setU = function(t) {
            this._view[0] = t
        }, n._getV = function() {
            return this._view[1]
        }, n._setV = function(t) {
            this._view[1] = t
        }, cc.js.getset(n, "u", n._getU, n._setU), cc.js.getset(n, "v", n._getV, n._setV), cc.Quad2 = function(t, e, i, n, r, s) {
            this._arrayBuffer = r || new ArrayBuffer(cc.Quad2.BYTES_PER_ELEMENT), this._offset = s || 0;
            var o = this._arrayBuffer,
                c = this._offset,
                a = cc.Vertex2F.BYTES_PER_ELEMENT;
            this._tl = t ? new cc.Vertex2F(t.x, t.y, o, c) : new cc.Vertex2F(0, 0, o, c), c += a, this._tr = e ? new cc.Vertex2F(e.x, e.y, o, c) : new cc.Vertex2F(0, 0, o, c), c += a, this._bl = i ? new cc.Vertex2F(i.x, i.y, o, c) : new cc.Vertex2F(0, 0, o, c), c += a, this._br = n ? new cc.Vertex2F(n.x, n.y, o, c) : new cc.Vertex2F(0, 0, o, c)
        }, cc.Quad2.BYTES_PER_ELEMENT = 32, (n = cc.Quad2.prototype)._getTL = function() {
            return this._tl
        }, n._setTL = function(t) {
            this._tl._view[0] = t.x, this._tl._view[1] = t.y
        }, n._getTR = function() {
            return this._tr
        }, n._setTR = function(t) {
            this._tr._view[0] = t.x, this._tr._view[1] = t.y
        }, n._getBL = function() {
            return this._bl
        }, n._setBL = function(t) {
            this._bl._view[0] = t.x, this._bl._view[1] = t.y
        }, n._getBR = function() {
            return this._br
        }, n._setBR = function(t) {
            this._br._view[0] = t.x, this._br._view[1] = t.y
        }, cc.js.getset(n, "tl", n._getTL, n._setTL), cc.js.getset(n, "tr", n._getTR, n._setTR), cc.js.getset(n, "bl", n._getBL, n._setBL), cc.js.getset(n, "br", n._getBR, n._setBR), cc.Quad3 = function(t, e, i, n, r, s) {
            this._arrayBuffer = r || new ArrayBuffer(cc.Quad3.BYTES_PER_ELEMENT), this._offset = s || 0;
            var o = this._arrayBuffer,
                c = this._offset,
                a = cc.Vertex3F.BYTES_PER_ELEMENT;
            this.bl = bl ? new cc.Vertex3F(bl.x, bl.y, bl.z, o, c) : new cc.Vertex3F(0, 0, 0, o, c), c += a, this.br = br ? new cc.Vertex3F(br.x, br.y, br.z, o, c) : new cc.Vertex3F(0, 0, 0, o, c), c += a, this.tl = tl ? new cc.Vertex3F(tl.x, tl.y, tl.z, o, c) : new cc.Vertex3F(0, 0, 0, o, c), c += a, this.tr = tr ? new cc.Vertex3F(tr.x, tr.y, tr.z, o, c) : new cc.Vertex3F(0, 0, 0, o, c)
        }, cc.Quad3.BYTES_PER_ELEMENT = 48, cc.V3F_C4B_T2F = function(t, e, i, n, r) {
            this._arrayBuffer = n || new ArrayBuffer(cc.V3F_C4B_T2F.BYTES_PER_ELEMENT), this._offset = r || 0;
            var s = this._arrayBuffer,
                o = this._offset;
            this._vertices = t ? new cc.Vertex3F(t.x, t.y, t.z, s, o) : new cc.Vertex3F(0, 0, 0, s, o), o += cc.Vertex3F.BYTES_PER_ELEMENT, this._colors = e ? new cc.WebGLColor(e.r, e.g, e.b, e.a, s, o) : new cc.WebGLColor(0, 0, 0, 0, s, o), o += cc.WebGLColor.BYTES_PER_ELEMENT, this._texCoords = i ? new cc.Tex2F(i.u, i.v, s, o) : new cc.Tex2F(0, 0, s, o)
        }, cc.V3F_C4B_T2F.BYTES_PER_ELEMENT = 24, (n = cc.V3F_C4B_T2F.prototype)._getVertices = function() {
            return this._vertices
        }, n._setVertices = function(t) {
            var e = this._vertices;
            e._view[0] = t.x, e._view[1] = t.y, e._view[2] = t.z
        }, n._getColor = function() {
            return this._colors
        }, n._setColor = function(t) {
            var e = this._colors;
            e._view[0] = t.r, e._view[1] = t.g, e._view[2] = t.b, e._view[3] = t.a
        }, n._getTexCoords = function() {
            return this._texCoords
        }, n._setTexCoords = function(t) {
            this._texCoords._view[0] = t.u, this._texCoords._view[1] = t.v
        }, cc.js.getset(n, "vertices", n._getVertices, n._setVertices), cc.js.getset(n, "colors", n._getColor, n._setColor), cc.js.getset(n, "texCoords", n._getTexCoords, n._setTexCoords), cc.V3F_C4B_T2F_Quad = function(t, e, i, n, r, s) {
            this._arrayBuffer = r || new ArrayBuffer(cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT), this._offset = s || 0;
            var o = this._arrayBuffer,
                c = this._offset,
                a = cc.V3F_C4B_T2F.BYTES_PER_ELEMENT;
            this._tl = t ? new cc.V3F_C4B_T2F(t.vertices, t.colors, t.texCoords, o, c) : new cc.V3F_C4B_T2F(null, null, null, o, c), c += a, this._bl = e ? new cc.V3F_C4B_T2F(e.vertices, e.colors, e.texCoords, o, c) : new cc.V3F_C4B_T2F(null, null, null, o, c), c += a, this._tr = i ? new cc.V3F_C4B_T2F(i.vertices, i.colors, i.texCoords, o, c) : new cc.V3F_C4B_T2F(null, null, null, o, c), c += a, this._br = n ? new cc.V3F_C4B_T2F(n.vertices, n.colors, n.texCoords, o, c) : new cc.V3F_C4B_T2F(null, null, null, o, c)
        }, cc.V3F_C4B_T2F_Quad.BYTES_PER_ELEMENT = 96, (n = cc.V3F_C4B_T2F_Quad.prototype)._getTL = function() {
            return this._tl
        }, n._setTL = function(t) {
            var e = this._tl;
            e.vertices = t.vertices, e.colors = t.colors, e.texCoords = t.texCoords
        }, n._getBL = function() {
            return this._bl
        }, n._setBL = function(t) {
            var e = this._bl;
            e.vertices = t.vertices, e.colors = t.colors, e.texCoords = t.texCoords
        }, n._getTR = function() {
            return this._tr
        }, n._setTR = function(t) {
            var e = this._tr;
            e.vertices = t.vertices, e.colors = t.colors, e.texCoords = t.texCoords
        }, n._getBR = function() {
            return this._br
        }, n._setBR = function(t) {
            var e = this._br;
            e.vertices = t.vertices, e.colors = t.colors, e.texCoords = t.texCoords
        }, n._getArrayBuffer = function() {
            return this._arrayBuffer
        }, cc.js.getset(n, "tl", n._getTL, n._setTL), cc.js.getset(n, "tr", n._getTR, n._setTR), cc.js.getset(n, "bl", n._getBL, n._setBL), cc.js.getset(n, "br", n._getBR, n._setBR), cc.js.get(n, "arrayBuffer", n._getArrayBuffer), cc.V3F_C4B_T2F_QuadZero = function() {
            return new cc.V3F_C4B_T2F_Quad
        }, cc.V3F_C4B_T2F_QuadCopy = function(t) {
            if (!t) return cc.V3F_C4B_T2F_QuadZero();
            var e = t.tl,
                i = t.bl,
                n = t.tr,
                r = t.br;
            return {
                tl: {
                    vertices: {
                        x: e.vertices.x,
                        y: e.vertices.y,
                        z: e.vertices.z
                    },
                    colors: {
                        r: e.colors.r,
                        g: e.colors.g,
                        b: e.colors.b,
                        a: e.colors.a
                    },
                    texCoords: {
                        u: e.texCoords.u,
                        v: e.texCoords.v
                    }
                },
                bl: {
                    vertices: {
                        x: i.vertices.x,
                        y: i.vertices.y,
                        z: i.vertices.z
                    },
                    colors: {
                        r: i.colors.r,
                        g: i.colors.g,
                        b: i.colors.b,
                        a: i.colors.a
                    },
                    texCoords: {
                        u: i.texCoords.u,
                        v: i.texCoords.v
                    }
                },
                tr: {
                    vertices: {
                        x: n.vertices.x,
                        y: n.vertices.y,
                        z: n.vertices.z
                    },
                    colors: {
                        r: n.colors.r,
                        g: n.colors.g,
                        b: n.colors.b,
                        a: n.colors.a
                    },
                    texCoords: {
                        u: n.texCoords.u,
                        v: n.texCoords.v
                    }
                },
                br: {
                    vertices: {
                        x: r.vertices.x,
                        y: r.vertices.y,
                        z: r.vertices.z
                    },
                    colors: {
                        r: r.colors.r,
                        g: r.colors.g,
                        b: r.colors.b,
                        a: r.colors.a
                    },
                    texCoords: {
                        u: r.texCoords.u,
                        v: r.texCoords.v
                    }
                }
            }
        }, cc.V3F_C4B_T2F_QuadsCopy = function(t) {
            if (!t) return [];
            for (var e = [], i = 0; i < t.length; i++) e.push(cc.V3F_C4B_T2F_QuadCopy(t[i]));
            return e
        }, cc.V2F_C4B_T2F = function(t, e, i, n, r) {
            this._arrayBuffer = n || new ArrayBuffer(cc.V2F_C4B_T2F.BYTES_PER_ELEMENT), this._offset = r || 0;
            var s = this._arrayBuffer,
                o = this._offset;
            this._vertices = t ? new cc.Vertex2F(t.x, t.y, s, o) : new cc.Vertex2F(0, 0, s, o), o += cc.Vertex2F.BYTES_PER_ELEMENT, this._colors = e ? new cc.WebGLColor(e.r, e.g, e.b, e.a, s, o) : new cc.WebGLColor(0, 0, 0, 0, s, o), o += cc.WebGLColor.BYTES_PER_ELEMENT, this._texCoords = i ? new cc.Tex2F(i.u, i.v, s, o) : new cc.Tex2F(0, 0, s, o)
        }, cc.V2F_C4B_T2F.BYTES_PER_ELEMENT = 20, (n = cc.V2F_C4B_T2F.prototype)._getVertices = function() {
            return this._vertices
        }, n._setVertices = function(t) {
            this._vertices._view[0] = t.x, this._vertices._view[1] = t.y
        }, n._getColor = function() {
            return this._colors
        }, n._setColor = function(t) {
            var e = this._colors;
            e._view[0] = t.r, e._view[1] = t.g, e._view[2] = t.b, e._view[3] = t.a
        }, n._getTexCoords = function() {
            return this._texCoords
        }, n._setTexCoords = function(t) {
            this._texCoords._view[0] = t.u, this._texCoords._view[1] = t.v
        }, cc.js.getset(n, "vertices", n._getVertices, n._setVertices), cc.js.getset(n, "colors", n._getColor, n._setColor), cc.js.getset(n, "texCoords", n._getTexCoords, n._setTexCoords), cc.V2F_C4B_T2F_Triangle = function(t, e, i, n, r) {
            this._arrayBuffer = n || new ArrayBuffer(cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT), this._offset = r || 0;
            var s = this._arrayBuffer,
                o = this._offset,
                c = cc.V2F_C4B_T2F.BYTES_PER_ELEMENT;
            this._a = t ? new cc.V2F_C4B_T2F(t.vertices, t.colors, t.texCoords, s, o) : new cc.V2F_C4B_T2F(null, null, null, s, o), o += c, this._b = e ? new cc.V2F_C4B_T2F(e.vertices, e.colors, e.texCoords, s, o) : new cc.V2F_C4B_T2F(null, null, null, s, o), o += c, this._c = i ? new cc.V2F_C4B_T2F(i.vertices, i.colors, i.texCoords, s, o) : new cc.V2F_C4B_T2F(null, null, null, s, o)
        }, cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT = 60, (n = cc.V2F_C4B_T2F_Triangle.prototype)._getA = function() {
            return this._a
        }, n._setA = function(t) {
            var e = this._a;
            e.vertices = t.vertices, e.colors = t.colors, e.texCoords = t.texCoords
        }, n._getB = function() {
            return this._b
        }, n._setB = function(t) {
            var e = this._b;
            e.vertices = t.vertices, e.colors = t.colors, e.texCoords = t.texCoords
        }, n._getC = function() {
            return this._c
        }, n._setC = function(t) {
            var e = this._c;
            e.vertices = t.vertices, e.colors = t.colors, e.texCoords = t.texCoords
        }, cc.js.getset(n, "a", n._getA, n._setA), cc.js.getset(n, "b", n._getB, n._setB), cc.js.getset(n, "c", n._getC, n._setC)
    }), {}],
    139: [(function(t, e, i) {
        function n() {}
        var r = t("../platform/js");
        r.setClassName("cc.ValueType", n);
        var s = n.prototype;
        s.toString = function() {
            return "" + {}
        }, cc.ValueType = n, e.exports = n
    }), {
        "../platform/js": 100
    }],
    140: [(function(t, e, i) {
        function n(t, e) {
            t && "object" == typeof t && (e = t.y, t = t.x), this.x = t || 0, this.y = e || 0
        }
        var r = t("./CCValueType"),
            s = t("../platform/js"),
            o = t("../platform/CCClass");
        s.extend(n, r), o.fastDefine("cc.Vec2", n, {
            x: 0,
            y: 0
        });
        var c = n.prototype;
        c.clone = function() {
            return new n(this.x, this.y)
        }, c.set = function(t) {
            return this.x = t.x, this.y = t.y, this
        }, c.equals = function(t) {
            return t && this.x === t.x && this.y === t.y
        }, c.toString = function() {
            return "(" + this.x.toFixed(2) + ", " + this.y.toFixed(2) + ")"
        }, c.lerp = function(t, e, i) {
            i = i || new n;
            var r = this.x,
                s = this.y;
            return i.x = r + (t.x - r) * e, i.y = s + (t.y - s) * e, i
        }, c.addSelf = function(t) {
            return this.x += t.x, this.y += t.y, this
        }, c.add = function(t, e) {
            return e = e || new n, e.x = this.x + t.x, e.y = this.y + t.y, e
        }, c.subSelf = function(t) {
            return this.x -= t.x, this.y -= t.y, this
        }, c.sub = function(t, e) {
            return e = e || new n, e.x = this.x - t.x, e.y = this.y - t.y, e
        }, c.mulSelf = function(t) {
            return this.x *= t, this.y *= t, this
        }, c.mul = function(t, e) {
            return e = e || new n, e.x = this.x * t, e.y = this.y * t, e
        }, c.scaleSelf = function(t) {
            return this.x *= t.x, this.y *= t.y, this
        }, c.scale = function(t, e) {
            return e = e || new n, e.x = this.x * t.x, e.y = this.y * t.y, e
        }, c.divSelf = function(t) {
            return this.x /= t, this.y /= t, this
        }, c.div = function(t, e) {
            return e = e || new n, e.x = this.x / t, e.y = this.y / t, e
        }, c.negSelf = function() {
            return this.x = -this.x, this.y = -this.y, this
        }, c.neg = function(t) {
            return t = t || new n, t.x = -this.x, t.y = -this.y, t
        }, c.dot = function(t) {
            return this.x * t.x + this.y * t.y
        }, c.cross = function(t) {
            return this.y * t.x - this.x * t.y
        }, c.mag = function() {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        }, c.magSqr = function() {
            return this.x * this.x + this.y * this.y
        }, c.normalizeSelf = function() {
            var t = this.x * this.x + this.y * this.y;
            if (1 === t) return this;
            if (0 === t) return console.warn("Can't normalize zero vector"), this;
            var e = 1 / Math.sqrt(t);
            return this.x *= e, this.y *= e, this
        }, c.normalize = function(t) {
            return t = t || new n, t.x = this.x, t.y = this.y, t.normalizeSelf(), t
        }, c.angle = function(t) {
            var e = this.magSqr(),
                i = t.magSqr();
            if (0 === e || 0 === i) return console.warn("Can't get angle between zero vector"), 0;
            var n = this.dot(t) / Math.sqrt(e * i);
            return n = cc.clampf(n, -1, 1), Math.acos(n)
        }, c.signAngle = function(t) {
            return Math.atan2(this.y, this.x) - Math.atan2(t.y, t.x)
        }, c.rotate = function(t, e) {
            return e = e || new n, e.x = this.x, e.y = this.y, e.rotateSelf(t)
        }, c.rotateSelf = function(t) {
            var e = Math.sin(t),
                i = Math.cos(t),
                n = this.x;
            return this.x = i * n - e * this.y, this.y = e * n + i * this.y, this
        }, s.get(n, "ONE", (function() {
            return new n(1, 1)
        })), s.get(n, "ZERO", (function() {
            return new n(0, 0)
        })), s.get(n, "UP", (function() {
            return new n(0, 1)
        })), s.get(n, "RIGHT", (function() {
            return new n(1, 0)
        })), cc.Vec2 = n, cc.v2 = function(t, e) {
            return new n(t, e)
        }, cc.p = cc.v2, cc.pointEqualToPoint = function(t, e) {
            return t && e && t.x === e.x && t.y === e.y
        }, e.exports = cc.Vec2
    }), {
        "../platform/CCClass": 79,
        "../platform/js": 100,
        "./CCValueType": 139
    }],
    141: [(function(t, e, i) {
        t("./CCValueType"), t("./CCVec2"), t("./CCPointExtension"), t("./CCSize"), t("./CCRect"), t("./CCColor"), t("./CCTypes"), t("./CCAffineTransform"), t("./CCTypesWebGL")
    }), {
        "./CCAffineTransform": 132,
        "./CCColor": 133,
        "./CCPointExtension": 134,
        "./CCRect": 135,
        "./CCSize": 136,
        "./CCTypes": 137,
        "./CCTypesWebGL": 138,
        "./CCValueType": 139,
        "./CCVec2": 140
    }],
    142: [(function(t, e, i) {
        cc.js
    }), {}],
    143: [(function(t, e, i) {
        t("./core/CCGame"), t("./actions"), t("./core/base-nodes/CCSGNode"), t("./core/base-nodes/CCSGNodeBaseRenderCmd"), t("./core/base-nodes/CCSGNodeCanvasRenderCmd"), t("./core/base-nodes/CCSGNodeWebGLRenderCmd"), t("./core/scenes/CCSGScene"), t("./core/CCConfiguration"), t("./core/sprites/CCSGSprite"), t("./core/sprites/CCSGSpriteCanvasRenderCmd"), t("./core/sprites/CCSGSpriteWebGLRenderCmd"), t("./core/sprites/CCScale9Sprite"), t("./core/sprites/CCScale9SpriteCanvasRenderCmd"), t("./core/sprites/CCScale9SpriteWebGLRenderCmd"), t("./core/sprites/CCSpriteBatchNode"), t("./render-texture/CCRenderTexture"), t("./render-texture/CCRenderTextureCanvasRenderCmd"), t("./render-texture/CCRenderTextureWebGLRenderCmd")
    }), {
        "./actions": 1,
        "./core/CCConfiguration": 8,
        "./core/CCGame": 15,
        "./core/base-nodes/CCSGNode": 31,
        "./core/base-nodes/CCSGNodeBaseRenderCmd": 32,
        "./core/base-nodes/CCSGNodeCanvasRenderCmd": 33,
        "./core/base-nodes/CCSGNodeWebGLRenderCmd": 34,
        "./core/scenes/CCSGScene": 110,
        "./core/sprites/CCSGSprite": 111,
        "./core/sprites/CCSGSpriteCanvasRenderCmd": 112,
        "./core/sprites/CCSGSpriteWebGLRenderCmd": 113,
        "./core/sprites/CCScale9Sprite": 114,
        "./core/sprites/CCScale9SpriteCanvasRenderCmd": 115,
        "./core/sprites/CCScale9SpriteWebGLRenderCmd": 116,
        "./core/sprites/CCSpriteBatchNode": 117,
        "./render-texture/CCRenderTexture": 1,
        "./render-texture/CCRenderTextureCanvasRenderCmd": 1,
        "./render-texture/CCRenderTextureWebGLRenderCmd": 1
    }],
    144: [(function(t, e, i) {
        cc.math.AABB = function(t, e) {
            this.min = t || new cc.math.Vec3, this.max = e || new cc.math.Vec3
        }, cc.math.AABB.prototype.containsPoint = function(t) {
            return t.x >= this.min.x && t.x <= this.max.x && t.y >= this.min.y && t.y <= this.max.y && t.z >= this.min.z && t.z <= this.max.z
        }, cc.math.AABB.containsPoint = function(t, e) {
            return t.x >= e.min.x && t.x <= e.max.x && t.y >= e.min.y && t.y <= e.max.y && t.z >= e.min.z && t.z <= e.max.z
        }, cc.math.AABB.prototype.assignFrom = function(t) {
            this.min.assignFrom(t.min), this.max.assignFrom(t.max)
        }, cc.math.AABB.assign = function(t, e) {
            return t.min.assignFrom(e.min), t.max.assignFrom(e.max), t
        }
    }), {}],
    145: [(function(t, e, i) {
        cc.math.Matrix4Stack = function(t, e) {
            this.top = t, this.stack = e || [], this.lastUpdated = 0
        };
        var n = cc.math.Matrix4Stack.prototype;
        n.initialize = function() {
            this.stack.length = 0, this.top = null
        }, n.push = function(t) {
            t = t || this.top, this.stack.push(this.top), this.top = new cc.math.Matrix4(t), this.update()
        }, n.pop = function() {
            this.top = this.stack.pop(), this.update()
        }, n.update = function() {
            this.lastUpdated++
        }, n.release = function() {
            this.stack = null, this.top = null, this._matrixPool = null
        }, n._getFromPool = function(t) {
            var e = this._matrixPool;
            if (0 === e.length) return new cc.math.Matrix4(t);
            var i = e.pop();
            return i.assignFrom(t), i
        }, n._putInPool = function(t) {
            this._matrixPool.push(t)
        }
    }), {}],
    146: [(function(t, e, i) {
        var n = cc.math;
        n.KM_GL_MODELVIEW = 5888, n.KM_GL_PROJECTION = 5889, n.KM_GL_TEXTURE = 5890, n.modelview_matrix_stack = new n.Matrix4Stack, n.projection_matrix_stack = new n.Matrix4Stack, n.texture_matrix_stack = new n.Matrix4Stack, cc.current_stack = null;
        var r = !1;
        (function() {
            if (!r) {
                var t = new n.Matrix4;
                n.modelview_matrix_stack.initialize(), n.projection_matrix_stack.initialize(), n.texture_matrix_stack.initialize(), cc.current_stack = n.modelview_matrix_stack, r = !0, t.identity(), n.modelview_matrix_stack.push(t), n.projection_matrix_stack.push(t), n.texture_matrix_stack.push(t)
            }
        })(), n.glFreeAll = function() {
            n.modelview_matrix_stack.release(), n.modelview_matrix_stack = null, n.projection_matrix_stack.release(), n.projection_matrix_stack = null, n.texture_matrix_stack.release(), n.texture_matrix_stack = null, r = !1, cc.current_stack = null
        }, n.glPushMatrix = function() {
            cc.current_stack.push(cc.current_stack.top), cc.current_stack.update()
        }, n.glPushMatrixWitMat4 = function(t) {
            cc.current_stack.stack.push(cc.current_stack.top), t.assignFrom(cc.current_stack.top), cc.current_stack.top = t, cc.current_stack.update()
        }, n.glPopMatrix = function() {
            cc.current_stack.top = cc.current_stack.stack.pop(), cc.current_stack.update()
        }, n.glMatrixMode = function(t) {
            switch (t) {
                case n.KM_GL_MODELVIEW:
                    cc.current_stack = n.modelview_matrix_stack;
                    break;
                case n.KM_GL_PROJECTION:
                    cc.current_stack = n.projection_matrix_stack;
                    break;
                case n.KM_GL_TEXTURE:
                    cc.current_stack = n.texture_matrix_stack;
                    break;
                default:
                    throw new Error("Invalid matrix mode specified")
            }
        }, n.glLoadIdentity = function() {
            cc.current_stack.top.identity(), cc.current_stack.update()
        }, n.glLoadMatrix = function(t) {
            cc.current_stack.top.assignFrom(t), cc.current_stack.update()
        }, n.glMultMatrix = function(t) {
            cc.current_stack.top.multiply(t), cc.current_stack.update()
        };
        var s = new n.Matrix4;
        n.glTranslatef = function(t, e, i) {
            var r = n.Matrix4.createByTranslation(t, e, i, s);
            cc.current_stack.top.multiply(r), cc.current_stack.update()
        };
        var o = new n.Vec3;
        n.glRotatef = function(t, e, i, r) {
            o.fill(e, i, r);
            var c = n.Matrix4.createByAxisAndAngle(o, cc.degreesToRadians(t), s);
            cc.current_stack.top.multiply(c), cc.current_stack.update()
        }, n.glScalef = function(t, e, i) {
            var r = n.Matrix4.createByScale(t, e, i, s);
            cc.current_stack.top.multiply(r), cc.current_stack.update()
        }, n.glGetMatrix = function(t, e) {
            switch (t) {
                case n.KM_GL_MODELVIEW:
                    e.assignFrom(n.modelview_matrix_stack.top);
                    break;
                case n.KM_GL_PROJECTION:
                    e.assignFrom(n.projection_matrix_stack.top);
                    break;
                case n.KM_GL_TEXTURE:
                    e.assignFrom(n.texture_matrix_stack.top);
                    break;
                default:
                    throw new Error("Invalid matrix mode specified")
            }
        }
    }), {}],
    147: [(function(t, e, i) {
        t("./utility"), t("./vec2"), t("./vec3"), t("./vec4"), t("./ray2"), t("./mat3"), t("./mat4"), t("./plane"), t("./quaternion"), t("./aabb"), t("./gl/mat4stack"), t("./gl/matrix")
    }), {
        "./aabb": 144,
        "./gl/mat4stack": 145,
        "./gl/matrix": 146,
        "./mat3": 148,
        "./mat4": 149,
        "./plane": 150,
        "./quaternion": 151,
        "./ray2": 152,
        "./utility": 153,
        "./vec2": 154,
        "./vec3": 155,
        "./vec4": 156
    }],
    148: [(function(t, e, i) {
        window.Uint16Array = window.Uint16Array || window.Array, window.Float32Array = window.Float32Array || window.Array, cc.math.Matrix3 = function(t) {
            t && t.mat ? this.mat = new Float32Array(t.mat) : this.mat = new Float32Array(9)
        };
        var n = cc.math.Matrix3.prototype;
        n.fill = function(t) {
            var e = this.mat,
                i = t.mat;
            return e[0] = i[0], e[1] = i[1], e[2] = i[2], e[3] = i[3], e[4] = i[4], e[5] = i[5], e[6] = i[6], e[7] = i[7], e[8] = i[8], this
        }, n.adjugate = function() {
            var t = this.mat,
                e = t[0],
                i = t[1],
                n = t[2],
                r = t[3],
                s = t[4],
                o = t[5],
                c = t[6],
                a = t[7],
                h = t[8];
            return t[0] = s * h - o * a, t[1] = n * a - i * h, t[2] = i * o - n * s, t[3] = o * c - r * h, t[4] = e * h - n * c, t[5] = n * r - e * o, t[6] = r * a - s * c, t[8] = e * s - i * r, this
        }, n.identity = function() {
            var t = this.mat;
            return t[1] = t[2] = t[3] = t[5] = t[6] = t[7] = 0, t[0] = t[4] = t[8] = 1, this
        };
        var r = new cc.math.Matrix3;
        n.inverse = function(t) {
            if (0 === t) return this;
            r.assignFrom(this);
            var e = 1 / t;
            return this.adjugate(), this.multiplyScalar(e), this
        }, n.isIdentity = function() {
            var t = this.mat;
            return 1 === t[0] && 0 === t[1] && 0 === t[2] && 0 === t[3] && 1 === t[4] && 0 === t[5] && 0 === t[6] && 0 === t[7] && 1 === t[8]
        }, n.transpose = function() {
            var t = this.mat,
                e = t[1],
                i = t[2],
                n = t[3],
                r = t[5],
                s = t[6],
                o = t[7];
            return t[1] = n, t[2] = s, t[3] = e, t[5] = o, t[6] = i, t[7] = r, this
        }, n.determinant = function() {
            var t = this.mat,
                e = t[0] * t[4] * t[8] + t[1] * t[5] * t[6] + t[2] * t[3] * t[7];
            return e -= t[2] * t[4] * t[6] + t[0] * t[5] * t[7] + t[1] * t[3] * t[8]
        }, n.multiply = function(t) {
            var e = this.mat,
                i = t.mat,
                n = e[0],
                r = e[1],
                s = e[2],
                o = e[3],
                c = e[4],
                a = e[5],
                h = e[6],
                l = e[7],
                u = e[8],
                _ = i[0],
                d = i[1],
                f = i[2],
                p = i[3],
                g = i[4],
                m = i[5],
                v = i[6],
                y = i[7],
                C = i[8];
            return e[0] = n * _ + o * d + h * f, e[1] = r * _ + c * d + l * f, e[2] = s * _ + a * d + u * f, e[3] = s * _ + a * d + u * f, e[4] = r * p + c * g + l * m, e[5] = s * p + a * g + u * m, e[6] = n * v + o * y + h * C, e[7] = r * v + c * y + l * C, e[8] = s * v + a * y + u * C, this
        }, n.multiplyScalar = function(t) {
            var e = this.mat;
            return e[0] *= t, e[1] *= t, e[2] *= t, e[3] *= t, e[4] *= t, e[5] *= t, e[6] *= t, e[7] *= t, e[8] *= t, this
        }, cc.math.Matrix3.rotationAxisAngle = function(t, e) {
            var i = Math.cos(e),
                n = Math.sin(e),
                r = new cc.math.Matrix3,
                s = r.mat;
            return s[0] = i + t.x * t.x * (1 - i), s[1] = t.z * n + t.y * t.x * (1 - i), s[2] = -t.y * n + t.z * t.x * (1 - i), s[3] = -t.z * n + t.x * t.y * (1 - i), s[4] = i + t.y * t.y * (1 - i), s[5] = t.x * n + t.z * t.y * (1 - i), s[6] = t.y * n + t.x * t.z * (1 - i), s[7] = -t.x * n + t.y * t.z * (1 - i), s[8] = i + t.z * t.z * (1 - i), r
        }, n.assignFrom = function(t) {
            if (this === t) return cc.logID(7900), this;
            var e = this.mat,
                i = t.mat;
            return e[0] = i[0], e[1] = i[1], e[2] = i[2], e[3] = i[3], e[4] = i[4], e[5] = i[5], e[6] = i[6], e[7] = i[7], e[8] = i[8], this
        }, n.equals = function(t) {
            if (this === t) return !0;
            for (var e = cc.math.EPSILON, i = this.mat, n = t.mat, r = 0; r < 9; ++r)
                if (!(i[r] + e > n[r] && i[r] - e < n[r])) return !1;
            return !0
        }, cc.math.Matrix3.createByRotationX = function(t) {
            var e = new cc.math.Matrix3,
                i = e.mat;
            return i[0] = 1, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = Math.cos(t), i[5] = Math.sin(t), i[6] = 0, i[7] = -Math.sin(t), i[8] = Math.cos(t), e
        }, cc.math.Matrix3.createByRotationY = function(t) {
            var e = new cc.math.Matrix3,
                i = e.mat;
            return i[0] = Math.cos(t), i[1] = 0, i[2] = -Math.sin(t), i[3] = 0, i[4] = 1, i[5] = 0, i[6] = Math.sin(t), i[7] = 0, i[8] = Math.cos(t), e
        }, cc.math.Matrix3.createByRotationZ = function(t) {
            var e = new cc.math.Matrix3,
                i = e.mat;
            return i[0] = Math.cos(t), i[1] = -Math.sin(t), i[2] = 0, i[3] = Math.sin(t), i[4] = Math.cos(t), i[5] = 0, i[6] = 0, i[7] = 0, i[8] = 1, e
        }, cc.math.Matrix3.createByRotation = function(t) {
            var e = new cc.math.Matrix3,
                i = e.mat;
            return i[0] = Math.cos(t), i[1] = Math.sin(t), i[2] = 0, i[3] = -Math.sin(t), i[4] = Math.cos(t), i[5] = 0, i[6] = 0, i[7] = 0, i[8] = 1, e
        }, cc.math.Matrix3.createByScale = function(t, e) {
            var i = new cc.math.Matrix3;
            return i.identity(), i.mat[0] = t, i.mat[4] = e, i
        }, cc.math.Matrix3.createByTranslation = function(t, e) {
            var i = new cc.math.Matrix3;
            return i.identity(), i.mat[6] = t, i.mat[7] = e, i
        }, cc.math.Matrix3.createByQuaternion = function(t) {
            if (!t) return null;
            var e = new cc.math.Matrix3,
                i = e.mat;
            return i[0] = 1 - 2 * (t.y * t.y + t.z * t.z), i[1] = 2 * (t.x * t.y - t.w * t.z), i[2] = 2 * (t.x * t.z + t.w * t.y), i[3] = 2 * (t.x * t.y + t.w * t.z), i[4] = 1 - 2 * (t.x * t.x + t.z * t.z), i[5] = 2 * (t.y * t.z - t.w * t.x), i[6] = 2 * (t.x * t.z - t.w * t.y), i[7] = 2 * (t.y * t.z + t.w * t.x), i[8] = 1 - 2 * (t.x * t.x + t.y * t.y), e
        }, n.rotationToAxisAngle = function() {
            return cc.math.Quaternion.rotationMatrix(this).toAxisAndAngle()
        }
    }), {}],
    149: [(function(t, e, i) {
        cc.math.Matrix4 = function(t) {
            t && t.mat ? this.mat = new Float32Array(t.mat) : this.mat = new Float32Array(16)
        };
        var n = cc.math.Matrix4.prototype;
        n.fill = function(t) {
            for (var e = this.mat, i = 0; i < 16; i++) e[i] = t[i];
            return this
        }, cc.math.mat4Identity = function(t) {
            var e = t.mat;
            return e[1] = e[2] = e[3] = e[4] = e[6] = e[7] = e[8] = e[9] = e[11] = e[12] = e[13] = e[14] = 0, e[0] = e[5] = e[10] = e[15] = 1, t
        }, n.identity = function() {
            var t = this.mat;
            return t[1] = t[2] = t[3] = t[4] = t[6] = t[7] = t[8] = t[9] = t[11] = t[12] = t[13] = t[14] = 0, t[0] = t[5] = t[10] = t[15] = 1, this
        }, n.get = function(t, e) {
            return this.mat[t + 4 * e]
        }, n.set = function(t, e, i) {
            this.mat[t + 4 * e] = i
        }, n.swap = function(t, e, i, n) {
            var r = this.mat,
                s = r[t + 4 * e];
            r[t + 4 * e] = r[i + 4 * n], r[i + 4 * n] = s
        }, cc.math.Matrix4._gaussj = function(t, e) {
            var i, n, r, s, o, c, a, h, l, u = 0,
                _ = 0,
                d = [0, 0, 0, 0],
                f = [0, 0, 0, 0],
                p = [0, 0, 0, 0];
            for (i = 0; i < 4; i++) {
                for (a = 0, n = 0; n < 4; n++)
                    if (1 !== p[n])
                        for (r = 0; r < 4; r++) 0 === p[r] && (c = Math.abs(t.get(n, r))) >= a && (a = c, _ = n, u = r);
                if (++p[u], _ !== u) {
                    for (s = 0; s < 4; s++) t.swap(_, s, u, s);
                    for (s = 0; s < 4; s++) e.swap(_, s, u, s)
                }
                if (f[i] = _, d[i] = u, 0 === t.get(u, u)) return !1;
                for (l = 1 / t.get(u, u), t.set(u, u, 1), s = 0; s < 4; s++) t.set(u, s, t.get(u, s) * l);
                for (s = 0; s < 4; s++) e.set(u, s, e.get(u, s) * l);
                for (o = 0; o < 4; o++)
                    if (o !== u) {
                        for (h = t.get(o, u), t.set(o, u, 0), s = 0; s < 4; s++) t.set(o, s, t.get(o, s) - t.get(u, s) * h);
                        for (s = 0; s < 4; s++) e.set(o, s, t.get(o, s) - e.get(u, s) * h)
                    }
            }
            for (s = 3; s >= 0; s--)
                if (f[s] !== d[s])
                    for (r = 0; r < 4; r++) t.swap(r, f[s], r, d[s]);
            return !0
        };
        var r = (new cc.math.Matrix4).identity();
        cc.math.mat4Inverse = function(t, e) {
            var i = new cc.math.Matrix4(e),
                n = new cc.math.Matrix4(r);
            return !1 === cc.math.Matrix4._gaussj(i, n) ? null : (t.assignFrom(i), t)
        }, n.inverse = function() {
            var t = new cc.math.Matrix4(this),
                e = new cc.math.Matrix4(r);
            return !1 === cc.math.Matrix4._gaussj(t, e) ? null : t
        }, n.isIdentity = function() {
            var t = this.mat;
            return 1 === t[0] && 0 === t[1] && 0 === t[2] && 0 === t[3] && 0 === t[4] && 1 === t[5] && 0 === t[6] && 0 === t[7] && 0 === t[8] && 0 === t[9] && 1 === t[10] && 0 === t[11] && 0 === t[12] && 0 === t[13] && 0 === t[14] && 1 === t[15]
        }, n.transpose = function() {
            var t = this.mat,
                e = t[1],
                i = t[2],
                n = t[3],
                r = t[4],
                s = t[6],
                o = t[7],
                c = t[8],
                a = t[9],
                h = t[11],
                l = t[12],
                u = t[13],
                _ = t[14];
            return t[1] = r, t[2] = c, t[3] = l, t[4] = e, t[6] = a, t[7] = u, t[8] = i, t[9] = s, t[11] = _, t[12] = n, t[13] = o, t[14] = h, this
        }, cc.math.mat4Multiply = function(t, e, i) {
            var n = t.mat,
                r = e.mat,
                s = i.mat,
                o = r[0],
                c = r[1],
                a = r[2],
                h = r[3],
                l = r[4],
                u = r[5],
                _ = r[6],
                d = r[7],
                f = r[8],
                p = r[9],
                g = r[10],
                m = r[11],
                v = r[12],
                y = r[13],
                C = r[14],
                T = r[15],
                E = s[0],
                x = s[1],
                R = s[2],
                S = s[3],
                w = s[4],
                A = s[5],
                b = s[6],
                I = s[7],
                O = s[8],
                N = s[9],
                P = s[10],
                L = s[11],
                D = s[12],
                F = s[13],
                M = s[14],
                B = s[15];
            return n[0] = E * o + x * l + R * f + S * v, n[1] = E * c + x * u + R * p + S * y, n[2] = E * a + x * _ + R * g + S * C, n[3] = E * h + x * d + R * m + S * T, n[4] = w * o + A * l + b * f + I * v, n[5] = w * c + A * u + b * p + I * y, n[6] = w * a + A * _ + b * g + I * C, n[7] = w * h + A * d + b * m + I * T, n[8] = O * o + N * l + P * f + L * v, n[9] = O * c + N * u + P * p + L * y, n[10] = O * a + N * _ + P * g + L * C, n[11] = O * h + N * d + P * m + L * T, n[12] = D * o + F * l + M * f + B * v, n[13] = D * c + F * u + M * p + B * y, n[14] = D * a + F * _ + M * g + B * C, n[15] = D * h + F * d + M * m + B * T, t
        }, n.multiply = function(t) {
            var e = this.mat,
                i = t.mat,
                n = e[0],
                r = e[1],
                s = e[2],
                o = e[3],
                c = e[4],
                a = e[5],
                h = e[6],
                l = e[7],
                u = e[8],
                _ = e[9],
                d = e[10],
                f = e[11],
                p = e[12],
                g = e[13],
                m = e[14],
                v = e[15],
                y = i[0],
                C = i[1],
                T = i[2],
                E = i[3],
                x = i[4],
                R = i[5],
                S = i[6],
                w = i[7],
                A = i[8],
                b = i[9],
                I = i[10],
                O = i[11],
                N = i[12],
                P = i[13],
                L = i[14],
                D = i[15];
            return e[0] = y * n + C * c + T * u + E * p, e[1] = y * r + C * a + T * _ + E * g, e[2] = y * s + C * h + T * d + E * m, e[3] = y * o + C * l + T * f + E * v, e[4] = x * n + R * c + S * u + w * p, e[5] = x * r + R * a + S * _ + w * g, e[6] = x * s + R * h + S * d + w * m, e[7] = x * o + R * l + S * f + w * v, e[8] = A * n + b * c + I * u + O * p, e[9] = A * r + b * a + I * _ + O * g, e[10] = A * s + b * h + I * d + O * m, e[11] = A * o + b * l + I * f + O * v, e[12] = N * n + P * c + L * u + D * p, e[13] = N * r + P * a + L * _ + D * g, e[14] = N * s + P * h + L * d + D * m, e[15] = N * o + P * l + L * f + D * v, this
        }, cc.math.getMat4MultiplyValue = function(t, e) {
            var i = t.mat,
                n = e.mat,
                r = new Float32Array(16);
            return r[0] = i[0] * n[0] + i[4] * n[1] + i[8] * n[2] + i[12] * n[3], r[1] = i[1] * n[0] + i[5] * n[1] + i[9] * n[2] + i[13] * n[3], r[2] = i[2] * n[0] + i[6] * n[1] + i[10] * n[2] + i[14] * n[3], r[3] = i[3] * n[0] + i[7] * n[1] + i[11] * n[2] + i[15] * n[3], r[4] = i[0] * n[4] + i[4] * n[5] + i[8] * n[6] + i[12] * n[7], r[5] = i[1] * n[4] + i[5] * n[5] + i[9] * n[6] + i[13] * n[7], r[6] = i[2] * n[4] + i[6] * n[5] + i[10] * n[6] + i[14] * n[7], r[7] = i[3] * n[4] + i[7] * n[5] + i[11] * n[6] + i[15] * n[7], r[8] = i[0] * n[8] + i[4] * n[9] + i[8] * n[10] + i[12] * n[11], r[9] = i[1] * n[8] + i[5] * n[9] + i[9] * n[10] + i[13] * n[11], r[10] = i[2] * n[8] + i[6] * n[9] + i[10] * n[10] + i[14] * n[11], r[11] = i[3] * n[8] + i[7] * n[9] + i[11] * n[10] + i[15] * n[11], r[12] = i[0] * n[12] + i[4] * n[13] + i[8] * n[14] + i[12] * n[15], r[13] = i[1] * n[12] + i[5] * n[13] + i[9] * n[14] + i[13] * n[15], r[14] = i[2] * n[12] + i[6] * n[13] + i[10] * n[14] + i[14] * n[15], r[15] = i[3] * n[12] + i[7] * n[13] + i[11] * n[14] + i[15] * n[15], r
        }, cc.math.mat4Assign = function(t, e) {
            if (t === e) return cc.logID(7901), t;
            var i = t.mat,
                n = e.mat;
            return i[0] = n[0], i[1] = n[1], i[2] = n[2], i[3] = n[3], i[4] = n[4], i[5] = n[5], i[6] = n[6], i[7] = n[7], i[8] = n[8], i[9] = n[9], i[10] = n[10], i[11] = n[11], i[12] = n[12], i[13] = n[13], i[14] = n[14], i[15] = n[15], t
        }, n.assignFrom = function(t) {
            if (this === t) return cc.logID(7902), this;
            var e = this.mat,
                i = t.mat;
            return e[0] = i[0], e[1] = i[1], e[2] = i[2], e[3] = i[3], e[4] = i[4], e[5] = i[5], e[6] = i[6], e[7] = i[7], e[8] = i[8], e[9] = i[9], e[10] = i[10], e[11] = i[11], e[12] = i[12], e[13] = i[13], e[14] = i[14], e[15] = i[15], this
        }, n.equals = function(t) {
            if (this === t) return cc.logID(7903), !0;
            for (var e = this.mat, i = t.mat, n = cc.math.EPSILON, r = 0; r < 16; r++)
                if (!(e[r] + n > i[r] && e[r] - n < i[r])) return !1;
            return !0
        }, cc.math.Matrix4.createByRotationX = function(t, e) {
            var i = (e = e || new cc.math.Matrix4).mat;
            return i[0] = 1, i[3] = i[2] = i[1] = 0, i[4] = 0, i[5] = Math.cos(t), i[6] = Math.sin(t), i[7] = 0, i[8] = 0, i[9] = -Math.sin(t), i[10] = Math.cos(t), i[11] = 0, i[14] = i[13] = i[12] = 0, i[15] = 1, e
        }, cc.math.Matrix4.createByRotationY = function(t, e) {
            var i = (e = e || new cc.math.Matrix4).mat;
            return i[0] = Math.cos(t), i[1] = 0, i[2] = -Math.sin(t), i[3] = 0, i[7] = i[6] = i[4] = 0, i[5] = 1, i[8] = Math.sin(t), i[9] = 0, i[10] = Math.cos(t), i[11] = 0, i[14] = i[13] = i[12] = 0, i[15] = 1, e
        }, cc.math.Matrix4.createByRotationZ = function(t, e) {
            var i = (e = e || new cc.math.Matrix4).mat;
            return i[0] = Math.cos(t), i[1] = Math.sin(t), i[3] = i[2] = 0, i[4] = -Math.sin(t), i[5] = Math.cos(t), i[7] = i[6] = 0, i[11] = i[9] = i[8] = 0, i[10] = 1, i[14] = i[13] = i[12] = 0, i[15] = 1, e
        }, cc.math.Matrix4.createByPitchYawRoll = function(t, e, i, n) {
            n = n || new cc.math.Matrix4;
            var r = Math.cos(t),
                s = Math.sin(t),
                o = Math.cos(e),
                c = Math.sin(e),
                a = Math.cos(i),
                h = Math.sin(i),
                l = s * c,
                u = r * c,
                _ = n.mat;
            return _[0] = o * a, _[4] = o * h, _[8] = -c, _[1] = l * a - r * h, _[5] = l * h + r * a, _[9] = s * o, _[2] = u * a + s * h, _[6] = u * h - s * a, _[10] = r * o, _[3] = _[7] = _[11] = 0, _[15] = 1, n
        }, cc.math.Matrix4.createByQuaternion = function(t, e) {
            var i = (e = e || new cc.math.Matrix4).mat;
            return i[0] = 1 - 2 * (t.y * t.y + t.z * t.z), i[1] = 2 * (t.x * t.y + t.z * t.w), i[2] = 2 * (t.x * t.z - t.y * t.w), i[3] = 0, i[4] = 2 * (t.x * t.y - t.z * t.w), i[5] = 1 - 2 * (t.x * t.x + t.z * t.z), i[6] = 2 * (t.z * t.y + t.x * t.w), i[7] = 0, i[8] = 2 * (t.x * t.z + t.y * t.w), i[9] = 2 * (t.y * t.z - t.x * t.w), i[10] = 1 - 2 * (t.x * t.x + t.y * t.y), i[11] = 0, i[14] = i[13] = i[12] = 0, i[15] = 1, e
        }, cc.math.Matrix4.createByRotationTranslation = function(t, e, i) {
            var n = (i = i || new cc.math.Matrix4).mat,
                r = t.mat;
            return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = 0, n[4] = r[3], n[5] = r[4], n[6] = r[5], n[7] = 0, n[8] = r[6], n[9] = r[7], n[10] = r[8], n[11] = 0, n[12] = e.x, n[13] = e.y, n[14] = e.z, n[15] = 1, i
        }, cc.math.Matrix4.createByScale = function(t, e, i, n) {
            var r = (n = n || new cc.math.Matrix4).mat;
            return r[0] = t, r[5] = e, r[10] = i, r[15] = 1, r[1] = r[2] = r[3] = r[4] = r[6] = r[7] = r[8] = r[9] = r[11] = r[12] = r[13] = r[14] = 0, n
        }, cc.math.mat4Translation = function(t, e, i, n) {
            return t.mat[0] = t.mat[5] = t.mat[10] = t.mat[15] = 1, t.mat[1] = t.mat[2] = t.mat[3] = t.mat[4] = t.mat[6] = t.mat[7] = t.mat[8] = t.mat[9] = t.mat[11] = 0, t.mat[12] = e, t.mat[13] = i, t.mat[14] = n, t
        }, cc.math.Matrix4.createByTranslation = function(t, e, i, n) {
            return (n = n || new cc.math.Matrix4).identity(), n.mat[12] = t, n.mat[13] = e, n.mat[14] = i, n
        }, n.getUpVec3 = function() {
            var t = this.mat;
            return new cc.math.Vec3(t[4], t[5], t[6]).normalize()
        }, n.getRightVec3 = function() {
            var t = this.mat;
            return new cc.math.Vec3(t[0], t[1], t[2]).normalize()
        }, n.getForwardVec3 = function() {
            var t = this.mat;
            return new cc.math.Vec3(t[8], t[9], t[10]).normalize()
        }, cc.math.mat4PerspectiveProjection = function(t, e, i, n, r) {
            var s = cc.degreesToRadians(e / 2),
                o = r - n,
                c = Math.sin(s);
            if (0 === o || 0 === c || 0 === i) return null;
            var a = Math.cos(s) / c;
            return t.identity(), t.mat[0] = a / i, t.mat[5] = a, t.mat[10] = -(r + n) / o, t.mat[11] = -1, t.mat[14] = -2 * n * r / o, t.mat[15] = 0, t
        }, cc.math.Matrix4.createPerspectiveProjection = function(t, e, i, n) {
            var r = cc.degreesToRadians(t / 2),
                s = n - i,
                o = Math.sin(r);
            if (0 === s || 0 === o || 0 === e) return null;
            var c = Math.cos(r) / o,
                a = new cc.math.Matrix4,
                h = a.mat;
            return a.identity(), h[0] = c / e, h[5] = c, h[10] = -(n + i) / s, h[11] = -1, h[14] = -2 * i * n / s, h[15] = 0, a
        }, cc.math.mat4OrthographicProjection = function(t, e, i, n, r, s, o) {
            return t.identity(), t.mat[0] = 2 / (i - e), t.mat[5] = 2 / (r - n), t.mat[10] = -2 / (o - s), t.mat[12] = -(i + e) / (i - e), t.mat[13] = -(r + n) / (r - n), t.mat[14] = -(o + s) / (o - s), t
        }, cc.math.Matrix4.createOrthographicProjection = function(t, e, i, n, r, s) {
            var o = new cc.math.Matrix4,
                c = o.mat;
            return o.identity(), c[0] = 2 / (e - t), c[5] = 2 / (n - i), c[10] = -2 / (s - r), c[12] = -(e + t) / (e - t), c[13] = -(n + i) / (n - i), c[14] = -(s + r) / (s - r), o
        }, cc.math.mat4LookAt = function(t, e, i, n) {
            var r = new cc.math.Vec3(i),
                s = new cc.math.Vec3(n);
            r.subtract(e), r.normalize(), s.normalize();
            var o = new cc.math.Vec3(r);
            o.cross(s), o.normalize();
            var c = new cc.math.Vec3(o);
            c.cross(r), o.normalize(), t.identity(), t.mat[0] = o.x, t.mat[4] = o.y, t.mat[8] = o.z, t.mat[1] = c.x, t.mat[5] = c.y, t.mat[9] = c.z, t.mat[2] = -r.x, t.mat[6] = -r.y, t.mat[10] = -r.z;
            var a = cc.math.Matrix4.createByTranslation(-e.x, -e.y, -e.z);
            return t.multiply(a), t
        };
        var s = new cc.math.Matrix4;
        n.lookAt = function(t, e, i) {
            var n = new cc.math.Vec3(e),
                r = new cc.math.Vec3(i),
                o = this.mat;
            n.subtract(t), n.normalize(), r.normalize();
            var c = new cc.math.Vec3(n);
            c.cross(r), c.normalize();
            var a = new cc.math.Vec3(c);
            return a.cross(n), c.normalize(), this.identity(), o[0] = c.x, o[4] = c.y, o[8] = c.z, o[1] = a.x, o[5] = a.y, o[9] = a.z, o[2] = -n.x, o[6] = -n.y, o[10] = -n.z, s = cc.math.Matrix4.createByTranslation(-t.x, -t.y, -t.z, s), this.multiply(s), this
        }, cc.math.mat4RotationAxisAngle = function(t, e, i) {
            var n = Math.cos(i),
                r = Math.sin(i),
                s = new cc.math.Vec3(e);
            return s.normalize(), t.mat[0] = n + s.x * s.x * (1 - n), t.mat[1] = s.z * r + s.y * s.x * (1 - n), t.mat[2] = -s.y * r + s.z * s.x * (1 - n), t.mat[3] = 0, t.mat[4] = -s.z * r + s.x * s.y * (1 - n), t.mat[5] = n + s.y * s.y * (1 - n), t.mat[6] = s.x * r + s.z * s.y * (1 - n), t.mat[7] = 0, t.mat[8] = s.y * r + s.x * s.z * (1 - n), t.mat[9] = -s.x * r + s.y * s.z * (1 - n), t.mat[10] = n + s.z * s.z * (1 - n), t.mat[11] = 0, t.mat[12] = 0, t.mat[13] = 0, t.mat[14] = 0, t.mat[15] = 1, t
        }, cc.math.Matrix4.createByAxisAndAngle = function(t, e, i) {
            i = i || new cc.math.Matrix4;
            var n = this.mat,
                r = Math.cos(e),
                s = Math.sin(e),
                o = new cc.math.Vec3(t);
            return o.normalize(), n[0] = r + o.x * o.x * (1 - r), n[1] = o.z * s + o.y * o.x * (1 - r), n[2] = -o.y * s + o.z * o.x * (1 - r), n[3] = 0, n[4] = -o.z * s + o.x * o.y * (1 - r), n[5] = r + o.y * o.y * (1 - r), n[6] = o.x * s + o.z * o.y * (1 - r), n[7] = 0, n[8] = o.y * s + o.x * o.z * (1 - r), n[9] = -o.x * s + o.y * o.z * (1 - r), n[10] = r + o.z * o.z * (1 - r), n[11] = 0, n[12] = n[13] = n[14] = 0, n[15] = 1, i
        }, n.extractRotation = function() {
            var t = new cc.math.Matrix3,
                e = this.mat,
                i = t.mat;
            return i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[4], i[4] = e[5], i[5] = e[6], i[6] = e[8], i[7] = e[9], i[8] = e[10], t
        }, n.extractPlane = function(t) {
            var e = new cc.math.Plane,
                i = this.mat;
            switch (t) {
                case cc.math.Plane.RIGHT:
                    e.a = i[3] - i[0], e.b = i[7] - i[4], e.c = i[11] - i[8], e.d = i[15] - i[12];
                    break;
                case cc.math.Plane.LEFT:
                    e.a = i[3] + i[0], e.b = i[7] + i[4], e.c = i[11] + i[8], e.d = i[15] + i[12];
                    break;
                case cc.math.Plane.BOTTOM:
                    e.a = i[3] + i[1], e.b = i[7] + i[5], e.c = i[11] + i[9], e.d = i[15] + i[13];
                    break;
                case cc.math.Plane.TOP:
                    e.a = i[3] - i[1], e.b = i[7] - i[5], e.c = i[11] - i[9], e.d = i[15] - i[13];
                    break;
                case cc.math.Plane.FAR:
                    e.a = i[3] - i[2], e.b = i[7] - i[6], e.c = i[11] - i[10], e.d = i[15] - i[14];
                    break;
                case cc.math.Plane.NEAR:
                    e.a = i[3] + i[2], e.b = i[7] + i[6], e.c = i[11] + i[10], e.d = i[15] + i[14];
                    break;
                default:
                    cc.logID(7904)
            }
            var n = Math.sqrt(e.a * e.a + e.b * e.b + e.c * e.c);
            return e.a /= n, e.b /= n, e.c /= n, e.d /= n, e
        }, n.toAxisAndAngle = function() {
            var t = this.extractRotation();
            return cc.math.Quaternion.rotationMatrix(t).toAxisAndAngle()
        }
    }), {}],
    150: [(function(t, e, i) {
        cc.math.Plane = function(t, e, i, n) {
            t && void 0 === e ? (this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d) : (this.a = t || 0, this.b = e || 0, this.c = i || 0, this.d = n || 0)
        };
        var n = cc.math.Plane.prototype;
        cc.math.Plane.LEFT = 0, cc.math.Plane.RIGHT = 1, cc.math.Plane.BOTTOM = 2, cc.math.Plane.TOP = 3, cc.math.Plane.NEAR = 4, cc.math.Plane.FAR = 5, cc.math.Plane.POINT_INFRONT_OF_PLANE = 0, cc.math.Plane.POINT_BEHIND_PLANE = 1, cc.math.Plane.POINT_ON_PLANE = 2, n.dot = function(t) {
            return this.a * t.x + this.b * t.y + this.c * t.z + this.d * t.w
        }, n.dotCoord = function(t) {
            return this.a * t.x + this.b * t.y + this.c * t.z + this.d
        }, n.dotNormal = function(t) {
            return this.a * t.x + this.b * t.y + this.c * t.z
        }, cc.math.Plane.fromPointNormal = function(t, e) {
            return new cc.math.Plane(e.x, e.y, e.z, -e.dot(t))
        }, cc.math.Plane.fromPoints = function(t, e, i) {
            var n = new cc.math.Vec3(e),
                r = new cc.math.Vec3(i),
                s = new cc.math.Plane;
            return n.subtract(t), r.subtract(t), n.cross(r), n.normalize(), s.a = n.x, s.b = n.y, s.c = n.z, s.d = n.scale(-1).dot(t), s
        }, n.normalize = function() {
            var t = new cc.math.Vec3(this.a, this.b, this.c),
                e = 1 / t.length();
            return t.normalize(), this.a = t.x, this.b = t.y, this.c = t.z, this.d = this.d * e, this
        }, n.classifyPoint = function(t) {
            var e = this.a * t.x + this.b * t.y + this.c * t.z + this.d;
            return e > .001 ? cc.math.Plane.POINT_INFRONT_OF_PLANE : e < -.001 ? cc.math.Plane.POINT_BEHIND_PLANE : cc.math.Plane.POINT_ON_PLANE
        }
    }), {}],
    151: [(function(t, e, i) {
        cc.math.Quaternion = function(t, e, i, n) {
            t && void 0 === e ? (this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w) : (this.x = t || 0, this.y = e || 0, this.z = i || 0, this.w = n || 0)
        };
        var n = cc.math.Quaternion.prototype;
        n.conjugate = function(t) {
            return this.x = -t.x, this.y = -t.y, this.z = -t.z, this.w = t.w, this
        }, n.dot = function(t) {
            return this.w * t.w + this.x * t.x + this.y * t.y + this.z * t.z
        }, n.exponential = function() {
            return this
        }, n.identity = function() {
            return this.x = 0, this.y = 0, this.z = 0, this.w = 1, this
        }, n.inverse = function() {
            var t = this.length();
            return Math.abs(t) > cc.math.EPSILON ? (this.x = 0, this.y = 0, this.z = 0, this.w = 0, this) : (this.conjugate(this).scale(1 / t), this)
        }, n.isIdentity = function() {
            return 0 === this.x && 0 === this.y && 0 === this.z && 1 === this.w
        }, n.length = function() {
            return Math.sqrt(this.lengthSq())
        }, n.lengthSq = function() {
            return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
        }, n.multiply = function(t) {
            var e = this.x,
                i = this.y,
                n = this.z,
                r = this.w;
            return this.w = r * t.w - e * t.x - i * t.y - n * t.z, this.x = r * t.x + e * t.w + i * t.z - n * t.y, this.y = r * t.y + i * t.w + n * t.x - e * t.z, this.z = r * t.z + n * t.w + e * t.y - i * t.x, this
        }, n.normalize = function() {
            var t = this.length();
            if (Math.abs(t) <= cc.math.EPSILON) throw new Error("current quaternion is an invalid value");
            return this.scale(1 / t), this
        }, n.rotationAxis = function(t, e) {
            var i = .5 * e,
                n = Math.sin(i);
            return this.w = Math.cos(i), this.x = t.x * n, this.y = t.y * n, this.z = t.z * n, this
        }, cc.math.Quaternion.rotationMatrix = function(t) {
            if (!t) return null;
            var e, i, n, r, s = [],
                o = t.mat,
                c = 0;
            s[0] = o[0], s[1] = o[3], s[2] = o[6], s[4] = o[1], s[5] = o[4], s[6] = o[7], s[8] = o[2], s[9] = o[5], s[10] = o[8], s[15] = 1;
            var a = s[0],
                h = a[0] + a[5] + a[10] + 1;
            return h > cc.math.EPSILON ? (c = 2 * Math.sqrt(h), e = (a[9] - a[6]) / c, i = (a[2] - a[8]) / c, n = (a[4] - a[1]) / c, r = .25 * c) : a[0] > a[5] && a[0] > a[10] ? (e = .25 * (c = 2 * Math.sqrt(1 + a[0] - a[5] - a[10])), i = (a[4] + a[1]) / c, n = (a[2] + a[8]) / c, r = (a[9] - a[6]) / c) : a[5] > a[10] ? (c = 2 * Math.sqrt(1 + a[5] - a[0] - a[10]), e = (a[4] + a[1]) / c, i = .25 * c, n = (a[9] + a[6]) / c, r = (a[2] - a[8]) / c) : (c = 2 * Math.sqrt(1 + a[10] - a[0] - a[5]), e = (a[2] + a[8]) / c, i = (a[9] + a[6]) / c, n = .25 * c, r = (a[4] - a[1]) / c), new cc.math.Quaternion(e, i, n, r)
        }, cc.math.Quaternion.rotationYawPitchRoll = function(t, e, i) {
            var n, r, s, o, c, a, h, l, u, _, d;
            n = cc.degreesToRadians(e) / 2, r = cc.degreesToRadians(t) / 2, s = cc.degreesToRadians(i) / 2, o = Math.cos(n), c = Math.cos(r), a = Math.cos(s), h = Math.sin(n), _ = c * a, d = (l = Math.sin(r)) * (u = Math.sin(s));
            var f = new cc.math.Quaternion;
            return f.w = o * _ + h * d, f.x = h * _ - o * d, f.y = o * l * a + h * c * u, f.z = o * c * u - h * l * a, f.normalize(), f
        }, n.slerp = function(t, e) {
            if (this.x === t.x && this.y === t.y && this.z === t.z && this.w === t.w) return this;
            var i = this.dot(t),
                n = Math.acos(i),
                r = Math.sqrt(1 - cc.math.square(i)),
                s = Math.sin(e * n) / r,
                o = Math.sin((1 - e) * n) / r,
                c = new cc.math.Quaternion(t);
            return this.scale(o), c.scale(s), this.add(c), this
        }, n.toAxisAndAngle = function() {
            var t, e, i, n = new cc.math.Vec3;
            return t = Math.acos(this.w), (e = Math.sqrt(cc.math.square(this.x) + cc.math.square(this.y) + cc.math.square(this.z))) > -cc.math.EPSILON && e < cc.math.EPSILON || e < 2 * Math.PI + cc.math.EPSILON && e > 2 * Math.PI - cc.math.EPSILON ? (i = 0, n.x = 0, n.y = 0, n.z = 1) : (i = 2 * t, n.x = this.x / e, n.y = this.y / e, n.z = this.z / e, n.normalize()), {
                axis: n,
                angle: i
            }
        }, n.scale = function(t) {
            return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this
        }, n.assignFrom = function(t) {
            return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w, this
        }, n.add = function(t) {
            return this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this
        }, cc.math.Quaternion.rotationBetweenVec3 = function(t, e, i) {
            var n = new cc.math.Vec3(t),
                r = new cc.math.Vec3(e);
            n.normalize(), r.normalize();
            var s = n.dot(r),
                o = new cc.math.Quaternion;
            if (s >= 1) return o.identity(), o;
            if (s < 1e-6 - 1)
                if (Math.abs(i.lengthSq()) < cc.math.EPSILON) o.rotationAxis(i, Math.PI);
                else {
                    var c = new cc.math.Vec3(1, 0, 0);
                    c.cross(t), Math.abs(c.lengthSq()) < cc.math.EPSILON && (c.fill(0, 1, 0), c.cross(t)), c.normalize(), o.rotationAxis(c, Math.PI)
                }
            else {
                var a = Math.sqrt(2 * (1 + s)),
                    h = 1 / a;
                n.cross(r), o.x = n.x * h, o.y = n.y * h, o.z = n.z * h, o.w = .5 * a, o.normalize()
            }
            return o
        }, n.multiplyVec3 = function(t) {
            var e = this.x,
                i = this.y,
                n = this.z,
                r = new cc.math.Vec3(t),
                s = new cc.math.Vec3(e, i, n),
                o = new cc.math.Vec3(e, i, n);
            return s.cross(t), o.cross(s), s.scale(2 * q.w), o.scale(2), r.add(s), r.add(o), r
        }
    }), {}],
    152: [(function(t, e, i) {
        function n(t, e, i) {
            var n = new cc.math.Vec2(e);
            n.subtract(t), i.x = -n.y, i.y = n.x, i.normalize()
        }
        cc.math.Ray2 = function(t, e) {
            this.start = t || new cc.math.Vec2, this.dir = e || new cc.math.Vec2
        }, cc.math.Ray2.prototype.fill = function(t, e, i, n) {
            this.start.x = t, this.start.y = e, this.dir.x = i, this.dir.y = n
        }, cc.math.Ray2.prototype.intersectLineSegment = function(t, e, i) {
            var n, r, s, o = this.start.x,
                c = this.start.y,
                a = this.start.x + this.dir.x,
                h = this.start.y + this.dir.y,
                l = t.x,
                u = t.y,
                _ = e.x,
                d = e.y,
                f = (d - u) * (a - o) - (_ - l) * (h - c);
            return !(f > -cc.math.EPSILON && f < cc.math.EPSILON) && (n = ((_ - l) * (c - u) - (d - u) * (o - l)) / f, r = o + n * (a - o), s = c + n * (h - c), !(r < Math.min(t.x, e.x) - cc.math.EPSILON || r > Math.max(t.x, e.x) + cc.math.EPSILON || s < Math.min(t.y, e.y) - cc.math.EPSILON || s > Math.max(t.y, e.y) + cc.math.EPSILON) && (!(r < Math.min(o, a) - cc.math.EPSILON || r > Math.max(o, a) + cc.math.EPSILON || s < Math.min(c, h) - cc.math.EPSILON || s > Math.max(c, h) + cc.math.EPSILON) && (i.x = r, i.y = s, !0)))
        }, cc.math.Ray2.prototype.intersectTriangle = function(t, e, i, r, s) {
            var o, c = new cc.math.Vec2,
                a = new cc.math.Vec2,
                h = new cc.math.Vec2,
                l = 1e4,
                u = !1;
            return this.intersectLineSegment(t, e, c) && (u = !0, (o = c.subtract(this.start).length()) < l && (a.x = c.x, a.y = c.y, l = o, n(t, e, h))), this.intersectLineSegment(e, i, c) && (u = !0, (o = c.subtract(this.start).length()) < l && (a.x = c.x, a.y = c.y, l = o, n(e, i, h))), this.intersectLineSegment(i, t, c) && (u = !0, (o = c.subtract(this.start).length()) < l && (a.x = c.x, a.y = c.y, l = o, n(i, t, h))), u && (r.x = a.x, r.y = a.y, s && (s.x = h.x, s.y = h.y)), u
        }
    }), {}],
    153: [(function(t, e, i) {
        cc.math = cc.math || {}, cc.math.EPSILON = 1 / 64, cc.math.square = function(t) {
            return t * t
        }, cc.math.almostEqual = function(t, e) {
            return t + cc.math.EPSILON > e && t - cc.math.EPSILON < e
        }
    }), {}],
    154: [(function(t, e, i) {
        cc.math.Vec2 = function(t, e) {
            void 0 === e ? (this.x = t.x, this.y = t.y) : (this.x = t || 0, this.y = e || 0)
        };
        var n = cc.math.Vec2.prototype;
        n.fill = function(t, e) {
            this.x = t, this.y = e
        }, n.length = function() {
            return Math.sqrt(cc.math.square(this.x) + cc.math.square(this.y))
        }, n.lengthSq = function() {
            return cc.math.square(this.x) + cc.math.square(this.y)
        }, n.normalize = function() {
            var t = 1 / this.length();
            return this.x *= t, this.y *= t, this
        }, cc.math.Vec2.add = function(t, e, i) {
            return t.x = e.x + i.x, t.y = e.y + i.y, t
        }, n.add = function(t) {
            return this.x += t.x, this.y += t.y, this
        }, n.dot = function(t) {
            return this.x * t.x + this.y * t.y
        }, cc.math.Vec2.subtract = function(t, e, i) {
            return t.x = e.x - i.x, t.y = e.y - i.y, t
        }, n.subtract = function(t) {
            return this.x -= t.x, this.y -= t.y, this
        }, n.transform = function(t) {
            var e = this.x,
                i = this.y;
            return this.x = e * t.mat[0] + i * t.mat[3] + t.mat[6], this.y = e * t.mat[1] + i * t.mat[4] + t.mat[7], this
        }, cc.math.Vec2.scale = function(t, e, i) {
            return t.x = e.x * i, t.y = e.y * i, t
        }, n.scale = function(t) {
            return this.x *= t, this.y *= t, this
        }, n.equals = function(t) {
            return this.x < t.x + cc.math.EPSILON && this.x > t.x - cc.math.EPSILON && this.y < t.y + cc.math.EPSILON && this.y > t.y - cc.math.EPSILON
        }
    }), {}],
    155: [(function(t, e, i) {
        cc.math.Vec3 = cc.math.Vec3 = function(t, e, i) {
            t && void 0 === e ? (this.x = t.x, this.y = t.y, this.z = t.z) : (this.x = t || 0, this.y = e || 0, this.z = i || 0)
        }, cc.math.vec3 = function(t, e, i) {
            return new cc.math.Vec3(t, e, i)
        };
        var n = cc.math.Vec3.prototype;
        n.fill = function(t, e, i) {
            return t && void 0 === e ? (this.x = t.x, this.y = t.y, this.z = t.z) : (this.x = t, this.y = e, this.z = i), this
        }, n.length = function() {
            return Math.sqrt(cc.math.square(this.x) + cc.math.square(this.y) + cc.math.square(this.z))
        }, n.lengthSq = function() {
            return cc.math.square(this.x) + cc.math.square(this.y) + cc.math.square(this.z)
        }, n.normalize = function() {
            var t = 1 / this.length();
            return this.x *= t, this.y *= t, this.z *= t, this
        }, n.cross = function(t) {
            var e = this.x,
                i = this.y,
                n = this.z;
            return this.x = i * t.z - n * t.y, this.y = n * t.x - e * t.z, this.z = e * t.y - i * t.x, this
        }, n.dot = function(t) {
            return this.x * t.x + this.y * t.y + this.z * t.z
        }, n.add = function(t) {
            return this.x += t.x, this.y += t.y, this.z += t.z, this
        }, n.subtract = function(t) {
            return this.x -= t.x, this.y -= t.y, this.z -= t.z, this
        }, n.transform = function(t) {
            var e = this.x,
                i = this.y,
                n = this.z,
                r = t.mat;
            return this.x = e * r[0] + i * r[4] + n * r[8] + r[12], this.y = e * r[1] + i * r[5] + n * r[9] + r[13], this.z = e * r[2] + i * r[6] + n * r[10] + r[14], this
        }, n.transformNormal = function(t) {
            var e = this.x,
                i = this.y,
                n = this.z,
                r = t.mat;
            return this.x = e * r[0] + i * r[4] + n * r[8], this.y = e * r[1] + i * r[5] + n * r[9], this.z = e * r[2] + i * r[6] + n * r[10], this
        }, n.transformCoord = function(t) {
            var e = new cc.math.Vec4(this.x, this.y, this.z, 1);
            return e.transform(t), this.x = e.x / e.w, this.y = e.y / e.w, this.z = e.z / e.w, this
        }, n.scale = function(t) {
            return this.x *= t, this.y *= t, this.z *= t, this
        }, n.equals = function(t) {
            var e = cc.math.EPSILON;
            return this.x < t.x + e && this.x > t.x - e && this.y < t.y + e && this.y > t.y - e && this.z < t.z + e && this.z > t.z - e
        }, n.inverseTransform = function(t) {
            var e = t.mat,
                i = new cc.math.Vec3(this.x - e[12], this.y - e[13], this.z - e[14]);
            return this.x = i.x * e[0] + i.y * e[1] + i.z * e[2], this.y = i.x * e[4] + i.y * e[5] + i.z * e[6], this.z = i.x * e[8] + i.y * e[9] + i.z * e[10], this
        }, n.inverseTransformNormal = function(t) {
            var e = this.x,
                i = this.y,
                n = this.z,
                r = t.mat;
            return this.x = e * r[0] + i * r[1] + n * r[2], this.y = e * r[4] + i * r[5] + n * r[6], this.z = e * r[8] + i * r[9] + n * r[10], this
        }, n.assignFrom = function(t) {
            return t ? (this.x = t.x, this.y = t.y, this.z = t.z, this) : this
        }, cc.math.Vec3.zero = function(t) {
            return t.x = t.y = t.z = 0, t
        }, n.toTypeArray = function() {
            var t = new Float32Array(3);
            return t[0] = this.x, t[1] = this.y, t[2] = this.z, t
        }
    }), {}],
    156: [(function(t, e, i) {
        cc.math.Vec4 = function(t, e, i, n) {
            t && void 0 === e ? (this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w) : (this.x = t || 0, this.y = e || 0, this.z = i || 0, this.w = n || 0)
        };
        var n = cc.math.Vec4.prototype;
        n.fill = function(t, e, i, n) {
            t && void 0 === e ? (this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w) : (this.x = t, this.y = e, this.z = i, this.w = n)
        }, n.add = function(t) {
            return t ? (this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this) : this
        }, n.dot = function(t) {
            return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w
        }, n.length = function() {
            return Math.sqrt(cc.math.square(this.x) + cc.math.square(this.y) + cc.math.square(this.z) + cc.math.square(this.w))
        }, n.lengthSq = function() {
            return cc.math.square(this.x) + cc.math.square(this.y) + cc.math.square(this.z) + cc.math.square(this.w)
        }, n.lerp = function(t, e) {
            return this
        }, n.normalize = function() {
            var t = 1 / this.length();
            return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this
        }, n.scale = function(t) {
            return this.normalize(), this.x *= t, this.y *= t, this.z *= t, this.w *= t, this
        }, n.subtract = function(t) {
            this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w
        }, n.transform = function(t) {
            var e = this.x,
                i = this.y,
                n = this.z,
                r = this.w,
                s = t.mat;
            return this.x = e * s[0] + i * s[4] + n * s[8] + r * s[12], this.y = e * s[1] + i * s[5] + n * s[9] + r * s[13], this.z = e * s[2] + i * s[6] + n * s[10] + r * s[14], this.w = e * s[3] + i * s[7] + n * s[11] + r * s[15], this
        }, cc.math.Vec4.transformArray = function(t, e) {
            for (var i = [], n = 0; n < t.length; n++) {
                var r = new cc.math.Vec4(t[n]);
                r.transform(e), i.push(r)
            }
            return i
        }, n.equals = function(t) {
            var e = cc.math.EPSILON;
            return this.x < t.x + e && this.x > t.x - e && this.y < t.y + e && this.y > t.y - e && this.z < t.z + e && this.z > t.z - e && this.w < t.w + e && this.w > t.w - e
        }, n.assignFrom = function(t) {
            return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w, this
        }, n.toTypeArray = function() {
            var t = new Float32Array(4);
            return t[0] = this.x, t[1] = this.y, t[2] = this.z, t[3] = this.w, t
        }
    }), {}],
    157: [(function(t, e, i) {
        var n = cc.macro,
            r = cc.math;
        cc.GLProgram = cc._Class.extend({
            _updateUniformLocation: function(t) {
                if (!t) return !1;
                var e, i = this._hashForUniforms[t];
                if (i) {
                    e = !1;
                    for (var n = arguments.length - 1, r = 0; r < n; ++r) arguments[r + 1] !== i[r] && (i[r] = arguments[r + 1], e = !0)
                } else i = [arguments[1], arguments[2], arguments[3], arguments[4]], this._hashForUniforms[t] = i, e = !0;
                return e
            },
            _description: function() {
                return "<CCGLProgram = " + this.toString() + " | Program = " + this._programObj.toString() + ", VertexShader = " + this._vertShader.toString() + ", FragmentShader = " + this._fragShader.toString() + ">"
            },
            _compileShader: function(t, e, i) {
                if (!i || !t) return !1;
                i = (cc.GLProgram._isHighpSupported() ? "precision highp float;\n" : "precision mediump float;\n") + "uniform mat4 CC_PMatrix;\nuniform mat4 CC_MVMatrix;\nuniform mat4 CC_MVPMatrix;\nuniform vec4 CC_Time;\nuniform vec4 CC_SinTime;\nuniform vec4 CC_CosTime;\nuniform vec4 CC_Random01;\nuniform sampler2D CC_Texture0;\n//CC INCLUDES END\n" + i, this._glContext.shaderSource(t, i), this._glContext.compileShader(t);
                var n = this._glContext.getShaderParameter(t, this._glContext.COMPILE_STATUS);
                return n || (cc.logID(8100, this._glContext.getShaderSource(t)), e === this._glContext.VERTEX_SHADER ? cc.log("cocos2d: \n" + this.vertexShaderLog()) : cc.log("cocos2d: \n" + this.fragmentShaderLog())), !!n
            },
            ctor: function(t, e, i) {
                this._uniforms = {}, this._hashForUniforms = {}, this._glContext = i || cc._renderContext, this._programObj = null, this._vertShader = null, this._fragShader = null, this._usesTime = !1, this._projectionUpdated = -1, t && e && this.init(t, e)
            },
            destroyProgram: function() {
                this._vertShader = null, this._fragShader = null, this._uniforms = null, this._hashForUniforms = null, this._glContext.deleteProgram(this._programObj)
            },
            initWithVertexShaderByteArray: function(t, e) {
                var i = this._glContext;
                this._programObj = i.createProgram(), this._projectionUpdated = -1, this._vertShader = null, this._fragShader = null, t && (this._vertShader = i.createShader(i.VERTEX_SHADER), this._compileShader(this._vertShader, i.VERTEX_SHADER, t) || cc.logID(8101)), e && (this._fragShader = i.createShader(i.FRAGMENT_SHADER), this._compileShader(this._fragShader, i.FRAGMENT_SHADER, e) || cc.logID(8102)), this._vertShader && i.attachShader(this._programObj, this._vertShader), this._fragShader && i.attachShader(this._programObj, this._fragShader);
                for (var n in this._hashForUniforms) delete this._hashForUniforms[n];
                return !0
            },
            initWithString: function(t, e) {
                return this.initWithVertexShaderByteArray(t, e)
            },
            initWithVertexShaderFilename: function(t, e) {
                var i = cc.loader.getRes(t);
                if (!i) throw new Error("Please load the resource firset : " + t);
                var n = cc.loader.getRes(e);
                if (!n) throw new Error("Please load the resource firset : " + e);
                return this.initWithVertexShaderByteArray(i, n)
            },
            init: function(t, e) {
                return this.initWithVertexShaderFilename(t, e)
            },
            addAttribute: function(t, e) {
                this._glContext.bindAttribLocation(this._programObj, e, t)
            },
            link: function() {
                if (!this._programObj) return cc.logID(8103), !1;
                if (this._glContext.linkProgram(this._programObj), this._vertShader && this._glContext.deleteShader(this._vertShader), this._fragShader && this._glContext.deleteShader(this._fragShader), this._vertShader = null, this._fragShader = null, cc.game.config[cc.game.CONFIG_KEY.debugMode]) {
                    if (!this._glContext.getProgramParameter(this._programObj, this._glContext.LINK_STATUS)) return cc.logID(8104, this._glContext.getProgramInfoLog(this._programObj)), cc.gl.deleteProgram(this._programObj), this._programObj = null, !1
                }
                return !0
            },
            use: function() {
                cc.gl.useProgram(this._programObj)
            },
            updateUniforms: function() {
                this._uniforms[n.UNIFORM_PMATRIX] = this._glContext.getUniformLocation(this._programObj, n.UNIFORM_PMATRIX_S), this._uniforms[n.UNIFORM_MVMATRIX] = this._glContext.getUniformLocation(this._programObj, n.UNIFORM_MVMATRIX_S), this._uniforms[n.UNIFORM_MVPMATRIX] = this._glContext.getUniformLocation(this._programObj, n.UNIFORM_MVPMATRIX_S), this._uniforms[n.UNIFORM_TIME] = this._glContext.getUniformLocation(this._programObj, n.UNIFORM_TIME_S), this._uniforms[n.UNIFORM_SINTIME] = this._glContext.getUniformLocation(this._programObj, n.UNIFORM_SINTIME_S), this._uniforms[n.UNIFORM_COSTIME] = this._glContext.getUniformLocation(this._programObj, n.UNIFORM_COSTIME_S), this._usesTime = null != this._uniforms[n.UNIFORM_TIME] || null != this._uniforms[n.UNIFORM_SINTIME] || null != this._uniforms[n.UNIFORM_COSTIME], this._uniforms[n.UNIFORM_RANDOM01] = this._glContext.getUniformLocation(this._programObj, n.UNIFORM_RANDOM01_S), this._uniforms[n.UNIFORM_SAMPLER] = this._glContext.getUniformLocation(this._programObj, n.UNIFORM_SAMPLER_S), this.use(), this.setUniformLocationWith1i(this._uniforms[n.UNIFORM_SAMPLER], 0)
            },
            _addUniformLocation: function(t) {
                var e = this._glContext.getUniformLocation(this._programObj, t);
                this._uniforms[t] = e
            },
            getUniformLocationForName: function(t) {
                if (!t) throw new Error("cc.GLProgram.getUniformLocationForName(): uniform name should be non-null");
                if (!this._programObj) throw new Error("cc.GLProgram.getUniformLocationForName(): Invalid operation. Cannot get uniform location when program is not initialized");
                return this._uniforms[t] || this._glContext.getUniformLocation(this._programObj, t)
            },
            getUniformMVPMatrix: function() {
                return this._uniforms[n.UNIFORM_MVPMATRIX]
            },
            getUniformSampler: function() {
                return this._uniforms[n.UNIFORM_SAMPLER]
            },
            setUniformLocationWith1i: function(t, e) {
                var i = this._glContext;
                if ("string" == typeof t) {
                    if (this._updateUniformLocation(t, e)) {
                        var n = this.getUniformLocationForName(t);
                        i.uniform1i(n, e)
                    }
                } else i.uniform1i(t, e)
            },
            setUniformLocationWith2i: function(t, e, i) {
                var n = this._glContext;
                if ("string" == typeof t) {
                    if (this._updateUniformLocation(t, e, i)) {
                        var r = this.getUniformLocationForName(t);
                        n.uniform2i(r, e, i)
                    }
                } else n.uniform2i(t, e, i)
            },
            setUniformLocationWith3i: function(t, e, i, n) {
                var r = this._glContext;
                if ("string" == typeof t) {
                    if (this._updateUniformLocation(t, e, i, n)) {
                        var s = this.getUniformLocationForName(t);
                        r.uniform3i(s, e, i, n)
                    }
                } else r.uniform3i(t, e, i, n)
            },
            setUniformLocationWith4i: function(t, e, i, n, r) {
                var s = this._glContext;
                if ("string" == typeof t) {
                    if (this._updateUniformLocation(t, e, i, n, r)) {
                        var o = this.getUniformLocationForName(t);
                        s.uniform4i(o, e, i, n, r)
                    }
                } else s.uniform4i(t, e, i, n, r)
            },
            setUniformLocationWith2iv: function(t, e) {
                var i = "string" == typeof t ? this.getUniformLocationForName(t) : t;
                this._glContext.uniform2iv(i, e)
            },
            setUniformLocationWith3iv: function(t, e) {
                var i = "string" == typeof t ? this.getUniformLocationForName(t) : t;
                this._glContext.uniform3iv(i, e)
            },
            setUniformLocationWith4iv: function(t, e) {
                var i = "string" == typeof t ? this.getUniformLocationForName(t) : t;
                this._glContext.uniform4iv(i, e)
            },
            setUniformLocationI32: function(t, e) {
                this.setUniformLocationWith1i(t, e)
            },
            setUniformLocationWith1f: function(t, e) {
                var i = this._glContext;
                if ("string" == typeof t) {
                    if (this._updateUniformLocation(t, e)) {
                        var n = this.getUniformLocationForName(t);
                        i.uniform1f(n, e)
                    }
                } else i.uniform1f(t, e)
            },
            setUniformLocationWith2f: function(t, e, i) {
                var n = this._glContext;
                if ("string" == typeof t) {
                    if (this._updateUniformLocation(t, e, i)) {
                        var r = this.getUniformLocationForName(t);
                        n.uniform2f(r, e, i)
                    }
                } else n.uniform2f(t, e, i)
            },
            setUniformLocationWith3f: function(t, e, i, n) {
                var r = this._glContext;
                if ("string" == typeof t) {
                    if (this._updateUniformLocation(t, e, i, n)) {
                        var s = this.getUniformLocationForName(t);
                        r.uniform3f(s, e, i, n)
                    }
                } else r.uniform3f(t, e, i, n)
            },
            setUniformLocationWith4f: function(t, e, i, n, r) {
                var s = this._glContext;
                if ("string" == typeof t) {
                    if (this._updateUniformLocation(t, e, i, n, r)) {
                        var o = this.getUniformLocationForName(t);
                        s.uniform4f(o, e, i, n, r)
                    }
                } else s.uniform4f(t, e, i, n, r)
            },
            setUniformLocationWith2fv: function(t, e) {
                var i = "string" == typeof t ? this.getUniformLocationForName(t) : t;
                this._glContext.uniform2fv(i, e)
            },
            setUniformLocationWith3fv: function(t, e) {
                var i = "string" == typeof t ? this.getUniformLocationForName(t) : t;
                this._glContext.uniform3fv(i, e)
            },
            setUniformLocationWith4fv: function(t, e) {
                var i = "string" == typeof t ? this.getUniformLocationForName(t) : t;
                this._glContext.uniform4fv(i, e)
            },
            setUniformLocationWithMatrix3fv: function(t, e) {
                var i = "string" == typeof t ? this.getUniformLocationForName(t) : t;
                this._glContext.uniformMatrix3fv(i, !1, e)
            },
            setUniformLocationWithMatrix4fv: function(t, e) {
                var i = "string" == typeof t ? this.getUniformLocationForName(t) : t;
                this._glContext.uniformMatrix4fv(i, !1, e)
            },
            setUniformLocationF32: function(t, e, i, n, r) {
                "use strict";
                switch (arguments.length) {
                    case 0:
                    case 1:
                        return;
                    case 2:
                        this.setUniformLocationWith1f(t, e);
                        break;
                    case 3:
                        this.setUniformLocationWith2f(t, e, i);
                        break;
                    case 4:
                        this.setUniformLocationWith3f(t, e, i, n);
                        break;
                    case 5:
                        this.setUniformLocationWith4f(t, e, i, n, r)
                }
            },
            setUniformsForBuiltins: function() {
                var t = new r.Matrix4,
                    e = new r.Matrix4,
                    i = new r.Matrix4;
                if (r.glGetMatrix(r.KM_GL_PROJECTION, t), r.glGetMatrix(r.KM_GL_MODELVIEW, e), r.mat4Multiply(i, t, e), this.setUniformLocationWithMatrix4fv(this._uniforms[n.UNIFORM_PMATRIX], t.mat, 1), this.setUniformLocationWithMatrix4fv(this._uniforms[n.UNIFORM_MVMATRIX], e.mat, 1), this.setUniformLocationWithMatrix4fv(this._uniforms[n.UNIFORM_MVPMATRIX], i.mat, 1), this._usesTime) {
                    var s = cc.director,
                        o = s.getTotalFrames() * s.getAnimationInterval();
                    this.setUniformLocationWith4f(this._uniforms[n.UNIFORM_TIME], o / 10, o, 2 * o, 4 * o), this.setUniformLocationWith4f(this._uniforms[n.UNIFORM_SINTIME], o / 8, o / 4, o / 2, Math.sin(o)), this.setUniformLocationWith4f(this._uniforms[n.UNIFORM_COSTIME], o / 8, o / 4, o / 2, Math.cos(o))
                } - 1 !== this._uniforms[n.UNIFORM_RANDOM01] && this.setUniformLocationWith4f(this._uniforms[n.UNIFORM_RANDOM01], Math.random(), Math.random(), Math.random(), Math.random())
            },
            _setUniformsForBuiltinsForRenderer: function(t) {
                if (t && t._renderCmd) {
                    var e = new r.Matrix4,
                        i = new r.Matrix4;
                    if (r.glGetMatrix(r.KM_GL_PROJECTION, e), r.mat4Multiply(i, e, t._renderCmd._stackMatrix), this.setUniformLocationWithMatrix4fv(this._uniforms[n.UNIFORM_PMATRIX], e.mat, 1), this.setUniformLocationWithMatrix4fv(this._uniforms[n.UNIFORM_MVMATRIX], t._renderCmd._stackMatrix.mat, 1), this.setUniformLocationWithMatrix4fv(this._uniforms[n.UNIFORM_MVPMATRIX], i.mat, 1), this._usesTime) {
                        var s = cc.director,
                            o = s.getTotalFrames() * s.getAnimationInterval();
                        this.setUniformLocationWith4f(this._uniforms[n.UNIFORM_TIME], o / 10, o, 2 * o, 4 * o), this.setUniformLocationWith4f(this._uniforms[n.UNIFORM_SINTIME], o / 8, o / 4, o / 2, Math.sin(o)), this.setUniformLocationWith4f(this._uniforms[n.UNIFORM_COSTIME], o / 8, o / 4, o / 2, Math.cos(o))
                    } - 1 !== this._uniforms[n.UNIFORM_RANDOM01] && this.setUniformLocationWith4f(this._uniforms[n.UNIFORM_RANDOM01], Math.random(), Math.random(), Math.random(), Math.random())
                }
            },
            setUniformForModelViewProjectionMatrix: function() {
                this._glContext.uniformMatrix4fv(this._uniforms[n.UNIFORM_MVPMATRIX], !1, r.getMat4MultiplyValue(r.projection_matrix_stack.top, r.modelview_matrix_stack.top))
            },
            setUniformForModelViewProjectionMatrixWithMat4: function(t) {
                r.mat4Multiply(t, r.projection_matrix_stack.top, r.modelview_matrix_stack.top), this._glContext.uniformMatrix4fv(this._uniforms[n.UNIFORM_MVPMATRIX], !1, t.mat)
            },
            setUniformForModelViewAndProjectionMatrixWithMat4: function() {
                this._glContext.uniformMatrix4fv(this._uniforms[n.UNIFORM_MVMATRIX], !1, r.modelview_matrix_stack.top.mat), this._glContext.uniformMatrix4fv(this._uniforms[n.UNIFORM_PMATRIX], !1, r.projection_matrix_stack.top.mat)
            },
            _setUniformForMVPMatrixWithMat4: function(t) {
                if (!t) throw new Error("modelView matrix is undefined.");
                this._glContext.uniformMatrix4fv(this._uniforms[n.UNIFORM_MVMATRIX], !1, t.mat), this._glContext.uniformMatrix4fv(this._uniforms[n.UNIFORM_PMATRIX], !1, r.projection_matrix_stack.top.mat)
            },
            _updateProjectionUniform: function() {
                var t = r.projection_matrix_stack;
                t.lastUpdated !== this._projectionUpdated && (this._glContext.uniformMatrix4fv(this._uniforms[n.UNIFORM_PMATRIX], !1, t.top.mat), this._projectionUpdated = t.lastUpdated)
            },
            vertexShaderLog: function() {
                return this._glContext.getShaderInfoLog(this._vertShader)
            },
            getVertexShaderLog: function() {
                return this._glContext.getShaderInfoLog(this._vertShader)
            },
            getFragmentShaderLog: function() {
                return this._glContext.getShaderInfoLog(this._vertShader)
            },
            fragmentShaderLog: function() {
                return this._glContext.getShaderInfoLog(this._fragShader)
            },
            programLog: function() {
                return this._glContext.getProgramInfoLog(this._programObj)
            },
            getProgramLog: function() {
                return this._glContext.getProgramInfoLog(this._programObj)
            },
            reset: function() {
                this._vertShader = null, this._fragShader = null, this._uniforms.length = 0, this._glContext.deleteProgram(this._programObj), this._programObj = null;
                for (var t in this._hashForUniforms) this._hashForUniforms[t].length = 0, delete this._hashForUniforms[t]
            },
            getProgram: function() {
                return this._programObj
            },
            retain: function() {},
            release: function() {}
        }), cc.GLProgram._highpSupported = null, cc.GLProgram._isHighpSupported = function() {
            var t = cc._renderContext;
            if (t.getShaderPrecisionFormat && null == cc.GLProgram._highpSupported) {
                var e = t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT);
                cc.GLProgram._highpSupported = 0 !== e.precision
            }
            return cc.GLProgram._highpSupported
        }
    }), {}],
    158: [(function(t, e, i) {
        var n = cc.macro.ENABLE_GL_STATE_CACHE,
            r = 0,
            s = 0,
            o = null,
            c = 0,
            a = 0;
        n && (r = 16, s = -1, o = new Array(r), c = -1, a = -1), cc.gl = {}, cc.gl.invalidateStateCache = function() {
            if (cc.math.glFreeAll(), -1, n) {
                s = -1;
                for (var t = 0; t < r; t++) o[t] = null;
                c = -1, a = -1, 0
            }
        }, cc.gl.useProgram = n ? function(t) {
            t !== s && (s = t, cc._renderContext.useProgram(t))
        } : function(t) {
            cc._renderContext.useProgram(t)
        }, cc.gl.deleteProgram = function(t) {
            n && t === s && (s = -1), gl.deleteProgram(t)
        }, cc.gl.setBlending = function(t, e) {
            var i = cc._renderContext;
            t === i.ONE && e === i.ZERO ? i.disable(i.BLEND) : (i.enable(i.BLEND), i.blendFunc(t, e))
        }, cc.gl.blendFunc = n ? function(t, e) {
            t === c && e === a || (c = t, a = e, cc.gl.setBlending(t, e))
        } : cc.gl.setBlending, cc.gl.blendFuncForParticle = function(t, e) {
            if (t !== c || e !== a) {
                c = t, a = e;
                var i = cc._renderContext;
                t === i.ONE && e === i.ZERO ? i.disable(i.BLEND) : (i.enable(i.BLEND), i.blendFuncSeparate(i.SRC_ALPHA, e, t, e))
            }
        }, cc.gl.blendResetToCache = function() {
            var t = cc._renderContext;
            t.blendEquation(t.FUNC_ADD), n ? cc.gl.setBlending(c, a) : cc.gl.setBlending(t.BLEND_SRC, t.BLEND_DST)
        }, cc.gl.setProjectionMatrixDirty = function() {
            -1
        }, cc.gl.bindTexture2D = function(t) {
            cc.gl.bindTexture2DN(0, t)
        }, cc.gl.bindTexture2DN = n ? function(t, e) {
            if (o[t] !== e) {
                o[t] = e;
                var i = cc._renderContext;
                i.activeTexture(i.TEXTURE0 + t), e ? i.bindTexture(i.TEXTURE_2D, e._glID) : i.bindTexture(i.TEXTURE_2D, null)
            }
        } : function(t, e) {
            var i = cc._renderContext;
            i.activeTexture(i.TEXTURE0 + t), e ? i.bindTexture(i.TEXTURE_2D, e._glID) : i.bindTexture(i.TEXTURE_2D, null)
        }, cc.gl.deleteTexture2D = function(t) {
            cc.gl.deleteTexture2DN(0, t)
        }, cc.gl.deleteTexture2DN = function(t, e) {
            n && e === o[t] && (o[t] = null), cc._renderContext.deleteTexture(e._glID)
        }, cc.gl.enable = function(t) {}
    }), {}],
    159: [(function(t, e, i) {
        var n = cc.PresetShaders,
            r = cc.macro;
        cc.shaderCache = {
            TYPE_POSITION_TEXTURECOLOR: 0,
            TYPE_POSITION_TEXTURECOLOR_ALPHATEST: 1,
            TYPE_POSITION_COLOR: 2,
            TYPE_POSITION_TEXTURE: 3,
            TYPE_POSITION_TEXTURE_UCOLOR: 4,
            TYPE_POSITION_TEXTURE_A8COLOR: 5,
            TYPE_POSITION_UCOLOR: 6,
            TYPE_POSITION_LENGTH_TEXTURECOLOR: 7,
            TYPE_SPRITE_POSITION_TEXTURECOLOR: 8,
            TYPE_SPRITE_POSITION_TEXTURECOLOR_ALPHATEST: 9,
            TYPE_SPRITE_POSITION_COLOR: 10,
            TYPE_MAX: 10,
            _programs: {},
            _init: function() {
                return this.loadDefaultShaders(), !0
            },
            _loadDefaultShader: function(t, e) {
                switch (e) {
                    case r.SHADER_POSITION_TEXTURECOLOR:
                        t.initWithVertexShaderByteArray(n.POSITION_TEXTURE_COLOR_VERT, n.POSITION_TEXTURE_COLOR_FRAG), t.addAttribute(r.ATTRIBUTE_NAME_POSITION, r.VERTEX_ATTRIB_POSITION), t.addAttribute(r.ATTRIBUTE_NAME_COLOR, r.VERTEX_ATTRIB_COLOR), t.addAttribute(r.ATTRIBUTE_NAME_TEX_COORD, r.VERTEX_ATTRIB_TEX_COORDS);
                        break;
                    case r.SHADER_SPRITE_POSITION_TEXTURECOLOR:
                        t.initWithVertexShaderByteArray(n.SPRITE_POSITION_TEXTURE_COLOR_VERT, n.POSITION_TEXTURE_COLOR_FRAG), t.addAttribute(r.ATTRIBUTE_NAME_POSITION, r.VERTEX_ATTRIB_POSITION), t.addAttribute(r.ATTRIBUTE_NAME_COLOR, r.VERTEX_ATTRIB_COLOR), t.addAttribute(r.ATTRIBUTE_NAME_TEX_COORD, r.VERTEX_ATTRIB_TEX_COORDS);
                        break;
                    case r.SHADER_POSITION_TEXTURECOLORALPHATEST:
                        t.initWithVertexShaderByteArray(n.POSITION_TEXTURE_COLOR_VERT, n.POSITION_TEXTURE_COLOR_ALPHATEST_FRAG), t.addAttribute(r.ATTRIBUTE_NAME_POSITION, r.VERTEX_ATTRIB_POSITION), t.addAttribute(r.ATTRIBUTE_NAME_COLOR, r.VERTEX_ATTRIB_COLOR), t.addAttribute(r.ATTRIBUTE_NAME_TEX_COORD, r.VERTEX_ATTRIB_TEX_COORDS);
                        break;
                    case r.SHADER_SPRITE_POSITION_TEXTURECOLORALPHATEST:
                        t.initWithVertexShaderByteArray(n.SPRITE_POSITION_TEXTURE_COLOR_VERT, n.POSITION_TEXTURE_COLOR_ALPHATEST_FRAG), t.addAttribute(r.ATTRIBUTE_NAME_POSITION, r.VERTEX_ATTRIB_POSITION), t.addAttribute(r.ATTRIBUTE_NAME_COLOR, r.VERTEX_ATTRIB_COLOR), t.addAttribute(r.ATTRIBUTE_NAME_TEX_COORD, r.VERTEX_ATTRIB_TEX_COORDS);
                        break;
                    case r.SHADER_POSITION_COLOR:
                        t.initWithVertexShaderByteArray(n.POSITION_COLOR_VERT, n.POSITION_COLOR_FRAG), t.addAttribute(r.ATTRIBUTE_NAME_POSITION, r.VERTEX_ATTRIB_POSITION), t.addAttribute(r.ATTRIBUTE_NAME_COLOR, r.VERTEX_ATTRIB_COLOR);
                        break;
                    case r.SHADER_SPRITE_POSITION_COLOR:
                        t.initWithVertexShaderByteArray(n.SPRITE_POSITION_COLOR_VERT, n.POSITION_COLOR_FRAG), t.addAttribute(r.ATTRIBUTE_NAME_POSITION, r.VERTEX_ATTRIB_POSITION), t.addAttribute(r.ATTRIBUTE_NAME_COLOR, r.VERTEX_ATTRIB_COLOR);
                        break;
                    case r.SHADER_POSITION_TEXTURE:
                        t.initWithVertexShaderByteArray(n.POSITION_TEXTURE_VERT, n.POSITION_TEXTURE_FRAG), t.addAttribute(r.ATTRIBUTE_NAME_POSITION, r.VERTEX_ATTRIB_POSITION), t.addAttribute(r.ATTRIBUTE_NAME_TEX_COORD, r.VERTEX_ATTRIB_TEX_COORDS);
                        break;
                    case r.SHADER_POSITION_TEXTURE_UCOLOR:
                        t.initWithVertexShaderByteArray(n.POSITION_TEXTURE_UCOLOR_VERT, n.POSITION_TEXTURE_UCOLOR_FRAG), t.addAttribute(r.ATTRIBUTE_NAME_POSITION, r.VERTEX_ATTRIB_POSITION), t.addAttribute(r.ATTRIBUTE_NAME_TEX_COORD, r.VERTEX_ATTRIB_TEX_COORDS);
                        break;
                    case r.SHADER_POSITION_TEXTUREA8COLOR:
                        t.initWithVertexShaderByteArray(n.POSITION_TEXTURE_A8COLOR_VERT, n.POSITION_TEXTURE_A8COLOR_FRAG), t.addAttribute(r.ATTRIBUTE_NAME_POSITION, r.VERTEX_ATTRIB_POSITION), t.addAttribute(r.ATTRIBUTE_NAME_COLOR, r.VERTEX_ATTRIB_COLOR), t.addAttribute(r.ATTRIBUTE_NAME_TEX_COORD, r.VERTEX_ATTRIB_TEX_COORDS);
                        break;
                    case r.SHADER_POSITION_UCOLOR:
                        t.initWithVertexShaderByteArray(n.POSITION_UCOLOR_VERT, n.POSITION_UCOLOR_FRAG), t.addAttribute("aVertex", r.VERTEX_ATTRIB_POSITION);
                        break;
                    case r.SHADER_POSITION_LENGTHTEXTURECOLOR:
                        t.initWithVertexShaderByteArray(n.POSITION_COLOR_LENGTH_TEXTURE_VERT, n.POSITION_COLOR_LENGTH_TEXTURE_FRAG), t.addAttribute(r.ATTRIBUTE_NAME_POSITION, r.VERTEX_ATTRIB_POSITION), t.addAttribute(r.ATTRIBUTE_NAME_TEX_COORD, r.VERTEX_ATTRIB_TEX_COORDS), t.addAttribute(r.ATTRIBUTE_NAME_COLOR, r.VERTEX_ATTRIB_COLOR);
                        break;
                    default:
                        return void cc.logID(8105)
                }
                t.link(), t.updateUniforms()
            },
            _reloadShader: function(t) {
                var e = this.programForKey(t);
                e.reset(), this._loadDefaultShader(e, t)
            },
            loadDefaultShaders: function() {},
            reloadDefaultShaders: function() {
                this._reloadShader(r.SHADER_POSITION_TEXTURECOLOR), this._reloadShader(r.SHADER_SPRITE_POSITION_TEXTURECOLOR), this._reloadShader(r.SHADER_POSITION_TEXTURECOLORALPHATEST), this._reloadShader(r.SHADER_SPRITE_POSITION_TEXTURECOLORALPHATEST), this._reloadShader(r.SHADER_POSITION_COLOR), this._reloadShader(r.SHADER_POSITION_TEXTURE), this._reloadShader(r.SHADER_POSITION_TEXTURE_UCOLOR), this._reloadShader(r.SHADER_POSITION_TEXTUREA8COLOR), this._reloadShader(r.SHADER_POSITION_UCOLOR)
            },
            programForKey: function(t) {
                if (!this._programs[t]) {
                    var e = new cc.GLProgram;
                    this._loadDefaultShader(e, t), this._programs[t] = e
                }
                return this._programs[t]
            },
            getProgram: function(t) {
                return this.programForKey(t)
            },
            addProgram: function(t, e) {
                this._programs[e] = t
            }
        }
    }), {}],
    160: [(function(t, e, i) {
        cc.PresetShaders = {
            POSITION_UCOLOR_FRAG: "precision lowp float;\nvarying vec4 v_fragmentColor;\nvoid main()\n{\ngl_FragColor = v_fragmentColor;\n}",
            POSITION_UCOLOR_VERT: "attribute vec4 a_position;\nuniform vec4 u_color;\nuniform float u_pointSize;\nvarying lowp vec4 v_fragmentColor;\nvoid main(void)\n{\ngl_Position = (CC_PMatrix * CC_MVMatrix) * floor(a_position);\ngl_PointSize = u_pointSize;\nv_fragmentColor = u_color;\n}",
            POSITION_COLOR_FRAG: "precision lowp float;\nvarying vec4 v_fragmentColor;\nvoid main()\n{\ngl_FragColor = v_fragmentColor;\n}",
            POSITION_COLOR_VERT: "attribute vec4 a_position;\nattribute vec4 a_color;\nvarying lowp vec4 v_fragmentColor;\nvoid main()\n{\ngl_Position = (CC_PMatrix * CC_MVMatrix) * floor(a_position);\nv_fragmentColor = a_color;\n}",
            SPRITE_POSITION_COLOR_VERT: "attribute vec4 a_position;\nattribute vec4 a_color;\nvarying lowp vec4 v_fragmentColor;\nvoid main()\n{\ngl_Position = CC_PMatrix * floor(a_position);\nv_fragmentColor = a_color;\n}",
            POSITION_COLOR_LENGTH_TEXTURE_FRAG: "//#extension GL_OES_standard_derivatives : enable\nvarying mediump vec4 v_color;\nvarying mediump vec2 v_texcoord;\nvoid main()\n{\n//#if defined GL_OES_standard_derivatives\n//gl_FragColor=v_color*smoothstep(0.0, length(fwidth(v_texcoord)), 1.0-length(v_texcoord));\n//#else\ngl_FragColor = v_color * step(0.0, 1.0 - length(v_texcoord));\n//#endif\n}",
            POSITION_COLOR_LENGTH_TEXTURE_VERT: "attribute mediump vec4 a_position;\nattribute mediump vec2 a_texcoord;\nattribute mediump vec4 a_color;\nvarying mediump vec4 v_color;\nvarying mediump vec2 v_texcoord;\nvoid main()\n{\nv_color = a_color;\nv_texcoord = a_texcoord;\ngl_Position = (CC_PMatrix * CC_MVMatrix) * floor(a_position);\n}",
            POSITION_TEXTURE_FRAG: "precision lowp float;\nvarying vec2 v_texCoord;\nvoid main()\n{\ngl_FragColor = texture2D(CC_Texture0, v_texCoord);\n}",
            POSITION_TEXTURE_VERT: "attribute vec4 a_position;\nattribute vec2 a_texCoord;\nvarying mediump vec2 v_texCoord;\nvoid main()\n{\ngl_Position = (CC_PMatrix * CC_MVMatrix) * floor(a_position);\nv_texCoord = a_texCoord;\n}",
            POSITION_TEXTURE_UCOLOR_FRAG: "precision lowp float;\nuniform vec4 u_color;\nvarying vec2 v_texCoord;\nvoid main()\n{\ngl_FragColor=texture2D(CC_Texture0, v_texCoord) * u_color;\n}",
            POSITION_TEXTURE_UCOLOR_VERT: "attribute vec4 a_position;\nattribute vec2 a_texCoord;\nvarying mediump vec2 v_texCoord;\nvoid main()\n{\ngl_Position = (CC_PMatrix * CC_MVMatrix) * floor(a_position);\nv_texCoord = a_texCoord;\n}",
            POSITION_TEXTURE_A8COLOR_FRAG: "precision lowp float;\nvarying vec4 v_fragmentColor;\nvarying vec2 v_texCoord;\nvoid main()\n{\ngl_FragColor = vec4(v_fragmentColor.rgb,\nv_fragmentColor.a * texture2D(CC_Texture0, v_texCoord).a);\n}",
            POSITION_TEXTURE_A8COLOR_VERT: "attribute vec4 a_position;\nattribute vec2 a_texCoord;\nattribute vec4 a_color;\nvarying lowp vec4 v_fragmentColor;\nvarying mediump vec2 v_texCoord;\nvoid main()\n{\ngl_Position = (CC_PMatrix * CC_MVMatrix) * floor(a_position);\nv_fragmentColor = a_color;\nv_texCoord = a_texCoord;\n}",
            POSITION_TEXTURE_COLOR_FRAG: "precision lowp float;\nvarying vec4 v_fragmentColor;\nvarying vec2 v_texCoord;\nvoid main()\n{\ngl_FragColor = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\n}",
            POSITION_TEXTURE_COLOR_VERT: "attribute vec4 a_position;\nattribute vec2 a_texCoord;\nattribute vec4 a_color;\nvarying lowp vec4 v_fragmentColor;\nvarying mediump vec2 v_texCoord;\nvoid main()\n{\ngl_Position = (CC_PMatrix * CC_MVMatrix) * floor(a_position);\nv_fragmentColor = a_color;\nv_texCoord = a_texCoord;\n}",
            SPRITE_POSITION_TEXTURE_COLOR_VERT: "attribute vec4 a_position;\nattribute vec2 a_texCoord;\nattribute vec4 a_color;\nvarying lowp vec4 v_fragmentColor;\nvarying mediump vec2 v_texCoord;\nvoid main()\n{\ngl_Position = CC_PMatrix * floor(a_position);\nv_fragmentColor = a_color;\nv_texCoord = a_texCoord;\n}",
            POSITION_TEXTURE_COLOR_ALPHATEST_FRAG: "precision lowp float;\nvarying vec4 v_fragmentColor;\nvarying vec2 v_texCoord;\nuniform float CC_alpha_value;\nvoid main()\n{\nvec4 texColor=texture2D(CC_Texture0, v_texCoord);\nif(texColor.a <= CC_alpha_value)\n discard; \ngl_FragColor=texColor*v_fragmentColor;\n}",
            EX_SWITCHMASK_FRAG: "precision lowp float;\nvarying vec4 v_fragmentColor;\nvarying vec2 v_texCoord;\nuniform sampler2D u_texture;\nuniform sampler2D u_mask;\nvoid main()\n{\nvec4 texColorc=texture2D(u_texture, v_texCoord);\nvec4 maskColor=texture2D(u_mask, v_texCoord);\nvec4 finalColor=vec4(texColor.r, texColor.g, texColor.b, maskColor.a*texColor.a);\ngl_FragColor=v_fragmentColor*finalColor;\n}"
        }
    }), {}],
    161: [(function(t, e, i) {
        t("./CCShaders"), t("./CCShaderCache"), t("./CCGLProgram"), t("./CCGLStateCache")
    }), {
        "./CCGLProgram": 157,
        "./CCGLStateCache": 158,
        "./CCShaderCache": 159,
        "./CCShaders": 160
    }],
    162: [(function(t, e, i) {
        var n = function(t) {
            return {
                u: t.x,
                v: t.y
            }
        };
        cc.DrawNode = _ccsg.Node.extend({
            _buffer: null,
            _blendFunc: null,
            _lineWidth: 1,
            _drawColor: null,
            getBlendFunc: function() {
                return this._blendFunc
            },
            setBlendFunc: function(t, e) {
                void 0 === e ? (this._blendFunc.src = t.src, this._blendFunc.dst = t.dst) : (this._blendFunc.src = t, this._blendFunc.dst = e)
            },
            setLineWidth: function(t) {
                this._lineWidth = t
            },
            getLineWidth: function() {
                return this._lineWidth
            },
            setDrawColor: function(t) {
                var e = this._drawColor;
                e.r = t.r, e.g = t.g, e.b = t.b, e.a = null == t.a ? 255 : t.a
            },
            getDrawColor: function() {
                return cc.color(this._drawColor.r, this._drawColor.g, this._drawColor.b, this._drawColor.a)
            }
        }), cc.DrawNode.TYPE_DOT = 0, cc.DrawNode.TYPE_SEGMENT = 1, cc.DrawNode.TYPE_POLY = 2, cc.game.once(cc.game.EVENT_RENDERER_INITED, (function() {
            var e = cc.DrawNode.prototype;
            cc._renderType === cc.game.RENDER_TYPE_CANVAS ? (cc._DrawNodeElement = function(t, e, i, n, r, s, o, c, a) {
                this.type = t, this.verts = e || null, this.fillColor = i || null, this.lineWidth = n || 0, this.lineColor = r || null, this.lineCap = s || "butt", this.isClosePolygon = o || !1, this.isFill = c || !1, this.isStroke = a || !1
            }, e._className = "DrawNodeCanvas", e.ctor = function() {
                _ccsg.Node.prototype.ctor.call(this);
                var t = this._renderCmd;
                t._buffer = this._buffer = [], t._drawColor = this._drawColor = cc.color(255, 255, 255, 255), t._blendFunc = this._blendFunc = new cc.BlendFunc(cc.macro.SRC_ALPHA, cc.macro.ONE_MINUS_SRC_ALPHA), this.init()
            }, e.drawRect = function(t, e, i, n, r) {
                n = null == n ? this._lineWidth : n, null == (r = r || this.getDrawColor()).a && (r.a = 255);
                var s = [t, cc.p(e.x, t.y), e, cc.p(t.x, e.y)],
                    o = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                o.verts = s, o.lineWidth = n, o.lineColor = r, o.isClosePolygon = !0, o.isStroke = !0, o.lineCap = "butt", o.fillColor = i, i && (null == i.a && (i.a = 255), o.isFill = !0), this._buffer.push(o)
            }, e.drawCircle = function(t, e, i, n, r, s, o) {
                s = s || this._lineWidth, null == (o = o || this.getDrawColor()).a && (o.a = 255);
                for (var c = 2 * Math.PI / n, a = [], h = 0; h <= n; h++) {
                    var l = h * c,
                        u = e * Math.cos(l + i) + t.x,
                        _ = e * Math.sin(l + i) + t.y;
                    a.push(cc.p(u, _))
                }
                r && a.push(cc.p(t.x, t.y));
                var d = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                d.verts = a, d.lineWidth = s, d.lineColor = o, d.isClosePolygon = !0, d.isStroke = !0, this._buffer.push(d)
            }, e.drawQuadBezier = function(t, e, i, n, r, s) {
                r = r || this._lineWidth, null == (s = s || this.getDrawColor()).a && (s.a = 255);
                for (var o = [], c = 0, a = 0; a < n; a++) {
                    var h = Math.pow(1 - c, 2) * t.x + 2 * (1 - c) * c * e.x + c * c * i.x,
                        l = Math.pow(1 - c, 2) * t.y + 2 * (1 - c) * c * e.y + c * c * i.y;
                    o.push(cc.p(h, l)), c += 1 / n
                }
                o.push(cc.p(i.x, i.y));
                var u = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                u.verts = o, u.lineWidth = r, u.lineColor = s, u.isStroke = !0, u.lineCap = "round", this._buffer.push(u)
            }, e.drawCubicBezier = function(t, e, i, n, r, s, o) {
                s = s || this._lineWidth, null == (o = o || this.getDrawColor()).a && (o.a = 255);
                for (var c = [], a = 0, h = 0; h < r; h++) {
                    var l = Math.pow(1 - a, 3) * t.x + 3 * Math.pow(1 - a, 2) * a * e.x + 3 * (1 - a) * a * a * i.x + a * a * a * n.x,
                        u = Math.pow(1 - a, 3) * t.y + 3 * Math.pow(1 - a, 2) * a * e.y + 3 * (1 - a) * a * a * i.y + a * a * a * n.y;
                    c.push(cc.p(l, u)), a += 1 / r
                }
                c.push(cc.p(n.x, n.y));
                var _ = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                _.verts = c, _.lineWidth = s, _.lineColor = o, _.isStroke = !0, _.lineCap = "round", this._buffer.push(_)
            }, e.drawCatmullRom = function(t, e, i, n) {
                this.drawCardinalSpline(t, .5, e, i, n)
            }, e.drawCardinalSpline = function(t, e, i, n, r) {
                n = n || this._lineWidth, null == (r = r || this.getDrawColor()).a && (r.a = 255);
                for (var s, o, c = [], a = 1 / t.length, h = 0; h < i + 1; h++) {
                    var l = h / i;
                    1 === l ? (s = t.length - 1, o = 1) : o = (l - a * (s = 0 | l / a)) / a;
                    var u = cc.cardinalSplineAt(cc.getControlPointAt(t, s - 1), cc.getControlPointAt(t, s - 0), cc.getControlPointAt(t, s + 1), cc.getControlPointAt(t, s + 2), e, o);
                    c.push(u)
                }
                var _ = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                _.verts = c, _.lineWidth = n, _.lineColor = r, _.isStroke = !0, _.lineCap = "round", this._buffer.push(_)
            }, e.drawDot = function(t, e, i) {
                null == (i = i || this.getDrawColor()).a && (i.a = 255);
                var n = new cc._DrawNodeElement(cc.DrawNode.TYPE_DOT);
                n.verts = [t], n.lineWidth = e, n.fillColor = i, this._buffer.push(n)
            }, e.drawDots = function(t, e, i) {
                if (t && 0 != t.length) {
                    null == (i = i || this.getDrawColor()).a && (i.a = 255);
                    for (var n = 0, r = t.length; n < r; n++) this.drawDot(t[n], e, i)
                }
            }, e.drawSegment = function(t, e, i, n) {
                i = i || this._lineWidth, null == (n = n || this.getDrawColor()).a && (n.a = 255);
                var r = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                r.verts = [t, e], r.lineWidth = 2 * i, r.lineColor = n, r.isStroke = !0, r.lineCap = "round", this._buffer.push(r)
            }, e.drawPoly_ = function(t, e, i, n, r) {
                i = null == i ? this._lineWidth : i, null == (n = n || this.getDrawColor()).a && (n.a = 255);
                var s = new cc._DrawNodeElement(cc.DrawNode.TYPE_POLY);
                s.verts = t, s.fillColor = e, s.lineWidth = i, s.lineColor = n, s.isClosePolygon = !r, s.isStroke = !0, s.lineCap = "round", e && (s.isFill = !0), this._buffer.push(s)
            }, e.drawPoly = function(t, e, i, n, r) {
                for (var s = [], o = 0; o < t.length; o++) s.push(cc.p(t[o].x, t[o].y));
                return this.drawPoly_(s, e, i, n, r)
            }, e.clear = function() {
                this._buffer.length = 0
            }, t("./CCDrawNodeCanvasRenderCmd"), e._createRenderCmd = function() {
                return new cc.DrawNode.CanvasRenderCmd(this)
            }) : cc._renderType === cc.game.RENDER_TYPE_WEBGL && (e._bufferCapacity = 0, e._trianglesArrayBuffer = null, e._trianglesWebBuffer = null, e._trianglesReader = null, e._dirty = !1, e._className = "DrawNodeWebGL", e.ctor = function() {
                _ccsg.Node.prototype.ctor.call(this), this._buffer = [], this._blendFunc = new cc.BlendFunc(cc.macro.SRC_ALPHA, cc.macro.ONE_MINUS_SRC_ALPHA), this._drawColor = cc.color(255, 255, 255, 255), this.init()
            }, e.init = function() {
                return !!_ccsg.Node.prototype.init.call(this) && (this.shaderProgram = cc.shaderCache.programForKey(cc.macro.SHADER_POSITION_LENGTHTEXTURECOLOR), this._ensureCapacity(64), this._trianglesWebBuffer = cc._renderContext.createBuffer(), this._dirty = !0, !0)
            }, e.drawRect = function(t, e, i, n, r) {
                n = null == n ? this._lineWidth : n, null == (r = r || this.getDrawColor()).a && (r.a = 255);
                var s = [t, cc.p(e.x, t.y), e, cc.p(t.x, e.y)];
                null == i ? this._drawSegments(s, n, r, !0) : this.drawPoly(s, i, n, r)
            }, e.drawCircle = function(t, e, i, n, r, s, o) {
                s = s || this._lineWidth, null == (o = o || this.getDrawColor()).a && (o.a = 255);
                var c, a, h = 2 * Math.PI / n,
                    l = [];
                for (c = 0; c <= n; c++) {
                    var u = c * h,
                        _ = e * Math.cos(u + i) + t.x,
                        d = e * Math.sin(u + i) + t.y;
                    l.push(cc.p(_, d))
                }
                for (r && l.push(cc.p(t.x, t.y)), s *= .5, c = 0, a = l.length; c < a - 1; c++) this.drawSegment(l[c], l[c + 1], s, o)
            }, e.drawQuadBezier = function(t, e, i, n, r, s) {
                r = r || this._lineWidth, null == (s = s || this.getDrawColor()).a && (s.a = 255);
                for (var o = [], c = 0, a = 0; a < n; a++) {
                    var h = Math.pow(1 - c, 2) * t.x + 2 * (1 - c) * c * e.x + c * c * i.x,
                        l = Math.pow(1 - c, 2) * t.y + 2 * (1 - c) * c * e.y + c * c * i.y;
                    o.push(cc.p(h, l)), c += 1 / n
                }
                o.push(cc.p(i.x, i.y)), this._drawSegments(o, r, s, !1)
            }, e.drawCubicBezier = function(t, e, i, n, r, s, o) {
                s = s || this._lineWidth, null == (o = o || this.getDrawColor()).a && (o.a = 255);
                for (var c = [], a = 0, h = 0; h < r; h++) {
                    var l = Math.pow(1 - a, 3) * t.x + 3 * Math.pow(1 - a, 2) * a * e.x + 3 * (1 - a) * a * a * i.x + a * a * a * n.x,
                        u = Math.pow(1 - a, 3) * t.y + 3 * Math.pow(1 - a, 2) * a * e.y + 3 * (1 - a) * a * a * i.y + a * a * a * n.y;
                    c.push(cc.p(l, u)), a += 1 / r
                }
                c.push(cc.p(n.x, n.y)), this._drawSegments(c, s, o, !1)
            }, e.drawCatmullRom = function(t, e, i, n) {
                this.drawCardinalSpline(t, .5, e, i, n)
            }, e.drawCardinalSpline = function(t, e, i, n, r) {
                n = n || this._lineWidth, null == (r = r || this.getDrawColor()).a && (r.a = 255);
                for (var s, o, c = [], a = 1 / t.length, h = 0; h < i + 1; h++) {
                    var l = h / i;
                    1 === l ? (s = t.length - 1, o = 1) : o = (l - a * (s = 0 | l / a)) / a;
                    var u = cc.cardinalSplineAt(cc.getControlPointAt(t, s - 1), cc.getControlPointAt(t, s - 0), cc.getControlPointAt(t, s + 1), cc.getControlPointAt(t, s + 2), e, o);
                    c.push(u)
                }
                n *= .5;
                for (var _ = 0, d = c.length; _ < d - 1; _++) this.drawSegment(c[_], c[_ + 1], n, r)
            }, e._render = function() {
                var t = cc._renderContext;
                t.bindBuffer(t.ARRAY_BUFFER, this._trianglesWebBuffer), this._dirty && (t.bufferData(t.ARRAY_BUFFER, this._trianglesArrayBuffer, t.STREAM_DRAW), this._dirty = !1);
                var e = cc.V2F_C4B_T2F.BYTES_PER_ELEMENT;
                t.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_POSITION), t.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_COLOR), t.enableVertexAttribArray(cc.macro.VERTEX_ATTRIB_TEX_COORDS), t.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_POSITION, 2, t.FLOAT, !1, e, 0), t.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_COLOR, 4, t.UNSIGNED_BYTE, !0, e, 8), t.vertexAttribPointer(cc.macro.VERTEX_ATTRIB_TEX_COORDS, 2, t.FLOAT, !1, e, 12), t.drawArrays(t.TRIANGLES, 0, 3 * this._buffer.length), cc.incrementGLDraws(1)
            }, e._ensureCapacity = function(t) {
                var e = this._buffer;
                if (e.length + t > this._bufferCapacity) {
                    var i = cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT;
                    if (this._bufferCapacity += Math.max(this._bufferCapacity, t), null == e || 0 === e.length) this._buffer = [], this._trianglesArrayBuffer = new ArrayBuffer(i * this._bufferCapacity), this._trianglesReader = new Uint8Array(this._trianglesArrayBuffer);
                    else {
                        for (var n = [], r = new ArrayBuffer(i * this._bufferCapacity), s = 0; s < e.length; s++) n[s] = new cc.V2F_C4B_T2F_Triangle(e[s].a, e[s].b, e[s].c, r, s * i);
                        this._trianglesReader = new Uint8Array(r), this._trianglesArrayBuffer = r, this._buffer = n
                    }
                }
            }, e.drawDot = function(t, e, i) {
                null == (i = i || this.getDrawColor()).a && (i.a = 255);
                var n = {
                        r: 0 | i.r,
                        g: 0 | i.g,
                        b: 0 | i.b,
                        a: 0 | i.a
                    },
                    r = {
                        vertices: {
                            x: t.x - e,
                            y: t.y - e
                        },
                        colors: n,
                        texCoords: {
                            u: -1,
                            v: -1
                        }
                    },
                    s = {
                        vertices: {
                            x: t.x - e,
                            y: t.y + e
                        },
                        colors: n,
                        texCoords: {
                            u: -1,
                            v: 1
                        }
                    },
                    o = {
                        vertices: {
                            x: t.x + e,
                            y: t.y + e
                        },
                        colors: n,
                        texCoords: {
                            u: 1,
                            v: 1
                        }
                    },
                    c = {
                        vertices: {
                            x: t.x + e,
                            y: t.y - e
                        },
                        colors: n,
                        texCoords: {
                            u: 1,
                            v: -1
                        }
                    };
                this._ensureCapacity(6), this._buffer.push(new cc.V2F_C4B_T2F_Triangle(r, s, o, this._trianglesArrayBuffer, this._buffer.length * cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT)), this._buffer.push(new cc.V2F_C4B_T2F_Triangle(r, o, c, this._trianglesArrayBuffer, this._buffer.length * cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT)), this._dirty = !0
            }, e.drawDots = function(t, e, i) {
                if (t && 0 !== t.length) {
                    null == (i = i || this.getDrawColor()).a && (i.a = 255);
                    for (var n = 0, r = t.length; n < r; n++) this.drawDot(t[n], e, i)
                }
            }, e.drawSegment = function(t, e, i, r) {
                null == (r = r || this.getDrawColor()).a && (r.a = 255), i = i || .5 * this._lineWidth;
                this._ensureCapacity(18);
                var s = {
                        r: 0 | r.r,
                        g: 0 | r.g,
                        b: 0 | r.b,
                        a: 0 | r.a
                    },
                    o = cc.v2(t),
                    c = cc.v2(e),
                    a = cc.pNormalize(cc.pPerp(cc.pSub(c, o))),
                    h = cc.pPerp(a),
                    l = cc.pMult(a, i),
                    u = cc.pMult(h, i),
                    _ = cc.pSub(c, cc.pAdd(l, u)),
                    d = cc.pAdd(c, cc.pSub(l, u)),
                    f = cc.pSub(c, l),
                    p = cc.pAdd(c, l),
                    g = cc.pSub(o, l),
                    m = cc.pAdd(o, l),
                    v = cc.pSub(o, cc.pSub(l, u)),
                    y = cc.pAdd(o, cc.pAdd(l, u)),
                    C = cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT,
                    T = this._trianglesArrayBuffer,
                    E = this._buffer;
                E.push(new cc.V2F_C4B_T2F_Triangle({
                    vertices: _,
                    colors: s,
                    texCoords: n(cc.pNeg(cc.pAdd(a, h)))
                }, {
                    vertices: d,
                    colors: s,
                    texCoords: n(cc.pSub(a, h))
                }, {
                    vertices: f,
                    colors: s,
                    texCoords: n(cc.pNeg(a))
                }, T, E.length * C)), E.push(new cc.V2F_C4B_T2F_Triangle({
                    vertices: p,
                    colors: s,
                    texCoords: n(a)
                }, {
                    vertices: d,
                    colors: s,
                    texCoords: n(cc.pSub(a, h))
                }, {
                    vertices: f,
                    colors: s,
                    texCoords: n(cc.pNeg(a))
                }, T, E.length * C)), E.push(new cc.V2F_C4B_T2F_Triangle({
                    vertices: p,
                    colors: s,
                    texCoords: n(a)
                }, {
                    vertices: g,
                    colors: s,
                    texCoords: n(cc.pNeg(a))
                }, {
                    vertices: f,
                    colors: s,
                    texCoords: n(cc.pNeg(a))
                }, T, E.length * C)), E.push(new cc.V2F_C4B_T2F_Triangle({
                    vertices: p,
                    colors: s,
                    texCoords: n(a)
                }, {
                    vertices: g,
                    colors: s,
                    texCoords: n(cc.pNeg(a))
                }, {
                    vertices: m,
                    colors: s,
                    texCoords: n(a)
                }, T, E.length * C)), E.push(new cc.V2F_C4B_T2F_Triangle({
                    vertices: v,
                    colors: s,
                    texCoords: n(cc.pSub(h, a))
                }, {
                    vertices: g,
                    colors: s,
                    texCoords: n(cc.pNeg(a))
                }, {
                    vertices: m,
                    colors: s,
                    texCoords: n(a)
                }, T, E.length * C)), E.push(new cc.V2F_C4B_T2F_Triangle({
                    vertices: v,
                    colors: s,
                    texCoords: n(cc.pSub(h, a))
                }, {
                    vertices: y,
                    colors: s,
                    texCoords: n(cc.pAdd(a, h))
                }, {
                    vertices: m,
                    colors: s,
                    texCoords: n(a)
                }, T, E.length * C)), this._dirty = !0
            }, e.drawPoly = function(t, e, i, r, s) {
                if (null != e) {
                    null == e.a && (e.a = 255), null == r.a && (r.a = 255), i = null == i ? this._lineWidth : i, i *= .5;
                    var o, c, a, h, l = {
                            r: 0 | e.r,
                            g: 0 | e.g,
                            b: 0 | e.b,
                            a: 0 | e.a
                        },
                        u = {
                            r: 0 | r.r,
                            g: 0 | r.g,
                            b: 0 | r.b,
                            a: 0 | r.a
                        },
                        _ = [],
                        d = t.length;
                    for (o = 0; o < d; o++) {
                        c = cc.v2(t[(o - 1 + d) % d]), a = cc.v2(t[o]), h = cc.v2(t[(o + 1) % d]);
                        var f = cc.pNormalize(cc.pPerp(cc.pSub(a, c))),
                            p = cc.pNormalize(cc.pPerp(cc.pSub(h, a))),
                            g = cc.pMult(cc.pAdd(f, p), 1 / (cc.pDot(f, p) + 1));
                        _[o] = {
                            offset: g,
                            n: p
                        }
                    }
                    var m = i > 0,
                        v = 3 * (3 * d - 2);
                    this._ensureCapacity(v);
                    var y, C, T, E = cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT,
                        x = this._trianglesArrayBuffer,
                        R = this._buffer;
                    for (o = 0; o < d - 2; o++) y = {
                        vertices: t[0],
                        colors: l,
                        texCoords: n(cc.v2())
                    }, C = {
                        vertices: t[o + 1],
                        colors: l,
                        texCoords: n(cc.v2())
                    }, T = {
                        vertices: t[o + 2],
                        colors: l,
                        texCoords: n(cc.v2())
                    }, R.push(new cc.V2F_C4B_T2F_Triangle(y, C, T, x, R.length * E));
                    if (m)
                        for (o = 0; o < d; o++) {
                            var S = (o + 1) % d;
                            c = cc.v2(t[o]), a = cc.v2(t[S]);
                            var w = _[o].n,
                                A = _[o].offset,
                                b = _[S].offset,
                                I = cc.pSub(c, cc.pMult(A, i)),
                                O = cc.pSub(a, cc.pMult(b, i)),
                                N = cc.pAdd(c, cc.pMult(A, i)),
                                P = cc.pAdd(a, cc.pMult(b, i));
                            y = {
                                vertices: I,
                                colors: u,
                                texCoords: n(cc.pNeg(w))
                            }, C = {
                                vertices: O,
                                colors: u,
                                texCoords: n(cc.pNeg(w))
                            }, T = {
                                vertices: P,
                                colors: u,
                                texCoords: n(w)
                            }, R.push(new cc.V2F_C4B_T2F_Triangle(y, C, T, x, R.length * E)), y = {
                                vertices: I,
                                colors: u,
                                texCoords: n(cc.pNeg(w))
                            }, C = {
                                vertices: N,
                                colors: u,
                                texCoords: n(w)
                            }, T = {
                                vertices: P,
                                colors: u,
                                texCoords: n(w)
                            }, R.push(new cc.V2F_C4B_T2F_Triangle(y, C, T, x, R.length * E))
                        }
                    _ = null, this._dirty = !0
                } else this._drawSegments(t, i, r, !s)
            }, e._drawSegments = function(t, e, i, r) {
                if (e = null == e ? this._lineWidth : e, null == (i = i || this._drawColor).a && (i.a = 255), !((e *= .5) <= 0)) {
                    var s, o, c, a, h = {
                            r: 0 | i.r,
                            g: 0 | i.g,
                            b: 0 | i.b,
                            a: 0 | i.a
                        },
                        l = [],
                        u = t.length;
                    for (s = 0; s < u; s++) {
                        o = cc.v2(t[(s - 1 + u) % u]), c = cc.v2(t[s]), a = cc.v2(t[(s + 1) % u]);
                        var _ = cc.pNormalize(cc.pPerp(cc.pSub(c, o))),
                            d = cc.pNormalize(cc.pPerp(cc.pSub(a, c))),
                            f = cc.pMult(cc.pAdd(_, d), 1 / (cc.pDot(_, d) + 1));
                        l[s] = {
                            offset: f,
                            n: d
                        }
                    }
                    var p = 3 * (3 * u - 2);
                    this._ensureCapacity(p);
                    var g = cc.V2F_C4B_T2F_Triangle.BYTES_PER_ELEMENT,
                        m = this._trianglesArrayBuffer,
                        v = this._buffer,
                        y = r ? u : u - 1;
                    for (s = 0; s < y; s++) {
                        var C = (s + 1) % u;
                        o = cc.v2(t[s]), c = cc.v2(t[C]);
                        var T = l[s].n,
                            E = l[s].offset,
                            x = l[C].offset,
                            R = cc.pSub(o, cc.pMult(E, e)),
                            S = cc.pSub(c, cc.pMult(x, e)),
                            w = cc.pAdd(o, cc.pMult(E, e)),
                            A = cc.pAdd(c, cc.pMult(x, e));
                        v.push(new cc.V2F_C4B_T2F_Triangle({
                            vertices: R,
                            colors: h,
                            texCoords: n(cc.pNeg(T))
                        }, {
                            vertices: S,
                            colors: h,
                            texCoords: n(cc.pNeg(T))
                        }, {
                            vertices: A,
                            colors: h,
                            texCoords: n(T)
                        }, m, v.length * g)), v.push(new cc.V2F_C4B_T2F_Triangle({
                            vertices: R,
                            colors: h,
                            texCoords: n(cc.pNeg(T))
                        }, {
                            vertices: w,
                            colors: h,
                            texCoords: n(T)
                        }, {
                            vertices: A,
                            colors: h,
                            texCoords: n(T)
                        }, m, v.length * g))
                    }
                    l = null, this._dirty = !0
                }
            }, e.clear = function() {
                this._buffer.length = 0, this._dirty = !0
            }, t("./CCDrawNodeWebGLRenderCmd"), e._createRenderCmd = function() {
                return new cc.DrawNode.WebGLRenderCmd(this)
            })
        }))
    }), {
        "./CCDrawNodeCanvasRenderCmd": 163,
        "./CCDrawNodeWebGLRenderCmd": 164
    }],
    163: [(function(t, e, i) {
        cc.DrawNode.CanvasRenderCmd = function(t) {
            this._rootCtor(t), this._needDraw = !0, this._buffer = null, this._drawColor = null, this._blendFunc = null
        };
        var n = cc.DrawNode.CanvasRenderCmd.prototype = Object.create(_ccsg.Node.CanvasRenderCmd.prototype);
        n.constructor = cc.DrawNode.CanvasRenderCmd, n.rendering = function(t, e, i) {
            var n = t || cc._renderContext,
                r = (n.getContext(), this._node._displayedOpacity / 255);
            if (0 !== r) {
                n.setTransform(this._worldTransform, e, i), n.setGlobalAlpha(r), this._blendFunc && this._blendFunc.src === cc.macro.SRC_ALPHA && this._blendFunc.dst === cc.macro.ONE && n.setCompositeOperation("lighter");
                for (var s = this._buffer, o = 0, c = s.length; o < c; o++) {
                    var a = s[o];
                    switch (a.type) {
                        case cc.DrawNode.TYPE_DOT:
                            this._drawDot(n, a, e, i);
                            break;
                        case cc.DrawNode.TYPE_SEGMENT:
                            this._drawSegment(n, a, e, i);
                            break;
                        case cc.DrawNode.TYPE_POLY:
                            this._drawPoly(n, a, e, i)
                    }
                }
            }
        }, n._drawDot = function(t, e, i, n) {
            var r = e.fillColor,
                s = e.verts[0],
                o = e.lineWidth,
                c = t.getContext();
            t.setFillStyle("rgba(" + (0 | r.r) + "," + (0 | r.g) + "," + (0 | r.b) + "," + r.a / 255 + ")"), c.beginPath(), c.arc(s.x, -s.y, o, 0, 2 * Math.PI, !1), c.closePath(), c.fill()
        }, n._drawSegment = function(t, e, i, n) {
            var r = e.lineColor,
                s = e.verts[0],
                o = e.verts[1],
                c = e.lineWidth,
                a = e.lineCap,
                h = t.getContext();
            t.setStrokeStyle("rgba(" + (0 | r.r) + "," + (0 | r.g) + "," + (0 | r.b) + "," + r.a / 255 + ")"), h.lineWidth = c * i, h.beginPath(), h.lineCap = a, h.moveTo(s.x, -s.y), h.lineTo(o.x, -o.y), h.stroke()
        }, n._drawPoly = function(t, e, i, n) {
            var r = e.verts,
                s = e.lineCap;
            if (null != r) {
                var o = e.fillColor,
                    c = e.lineWidth,
                    a = e.lineColor,
                    h = e.isClosePolygon,
                    l = e.isFill,
                    u = e.isStroke,
                    _ = t.getContext(),
                    d = r[0];
                _.lineCap = s, o && t.setFillStyle("rgba(" + (0 | o.r) + "," + (0 | o.g) + "," + (0 | o.b) + "," + o.a / 255 + ")"), c && (_.lineWidth = c * i), a && t.setStrokeStyle("rgba(" + (0 | a.r) + "," + (0 | a.g) + "," + (0 | a.b) + "," + a.a / 255 + ")"), _.beginPath(), _.moveTo(d.x, -d.y);
                for (var f = 1, p = r.length; f < p; f++) _.lineTo(r[f].x, -r[f].y);
                h && _.closePath(), l && _.fill(), u && _.stroke()
            }
        }
    }), {}],
    164: [(function(t, e, i) {
        cc.DrawNode.WebGLRenderCmd = function(t) {
            this._rootCtor(t), this._needDraw = !0, this._matrix = new cc.math.Matrix4, this._matrix.identity()
        }, cc.DrawNode.WebGLRenderCmd.prototype = Object.create(_ccsg.Node.WebGLRenderCmd.prototype), cc.DrawNode.WebGLRenderCmd.prototype.constructor = cc.DrawNode.WebGLRenderCmd, cc.DrawNode.WebGLRenderCmd.prototype.rendering = function(t) {
            var e = this._node;
            if (e._buffer.length > 0) {
                var i = this._worldTransform,
                    n = this._matrix.mat;
                n[0] = i.a, n[4] = i.c, n[12] = i.tx, n[1] = i.b, n[5] = i.d, n[13] = i.ty, cc.gl.blendFunc(e._blendFunc.src, e._blendFunc.dst), this._shaderProgram.use(), this._shaderProgram._setUniformForMVPMatrixWithMat4(this._matrix), e._render()
            }
        }
    }), {}],
    165: [(function(t, e, i) {
        t("./cocos2d/core"), t("./cocos2d/animation"), t("./cocos2d/particle/CCParticleSystem"), t("./cocos2d/tilemap/CCTiledMap"), t("./cocos2d/motion-streak/CCMotionStreak"), t("./cocos2d/core/components/CCStudioComponent"), t("./extensions/ccpool/CCNodePool"), t("./extensions/ccpool/CCPool"), t("./cocos2d/actions"), t("./external/chipmunk/chipmunk"), t("./extensions/spine"), t("./extensions/dragonbones"), t("./cocos2d/deprecated")
    }), {
        "./cocos2d/actions": 1,
        "./cocos2d/animation": 1,
        "./cocos2d/core": 58,
        "./cocos2d/core/components/CCStudioComponent": 1,
        "./cocos2d/deprecated": 142,
        "./cocos2d/motion-streak/CCMotionStreak": 1,
        "./cocos2d/particle/CCParticleAsset": 1,
        "./cocos2d/particle/CCParticleSystem": 1,
        "./cocos2d/tilemap/CCTiledMap": 1,
        "./cocos2d/tilemap/CCTiledMapAsset": 1,
        "./extensions/ccpool/CCNodePool": 166,
        "./extensions/ccpool/CCPool": 167,
        "./extensions/dragonbones": 1,
        "./extensions/spine": 1,
        "./external/chipmunk/chipmunk": 1
    }],
    166: [(function(t, e, i) {
        cc.NodePool = function(t) {
            this.poolHandlerComp = t, this._pool = []
        }, cc.NodePool.prototype = {
            constructor: cc.NodePool,
            size: function() {
                return this._pool.length
            },
            clear: function() {
                for (var t = this._pool.length, e = 0; e < t; ++e) this._pool[e].destroy();
                this._pool.length = 0
            },
            put: function(t) {
                if (t && -1 === this._pool.indexOf(t)) {
                    t.removeFromParent(!1);
                    var e = this.poolHandlerComp ? t.getComponent(this.poolHandlerComp) : null;
                    e && e.unuse && e.unuse(), this._pool.push(t)
                }
            },
            get: function() {
                var t = this._pool.length - 1;
                if (t < 0) return null;
                var e = this._pool[t];
                this._pool.length = t;
                var i = this.poolHandlerComp ? e.getComponent(this.poolHandlerComp) : null;
                return i && i.reuse && i.reuse.apply(i, arguments), e
            }
        }, e.exports = cc.NodePool
    }), {}],
    167: [(function(t, e, i) {
        var n = [];
        cc.pool = {
            _pool: {},
            _releaseCB: function() {
                this.release()
            },
            _autoRelease: function(t) {
                var e = void 0 !== t._running && !t._running;
                cc.director.getScheduler().schedule(this._releaseCB, t, 0, 0, 0, e)
            },
            putInPool: function(t) {
                var e = cc.js._getClassId(t.constructor);
                e && (this._pool[e] || (this._pool[e] = []), t.unuse && t.unuse(), this._pool[e].push(t))
            },
            hasObject: function(t) {
                var e = cc.js._getClassId(t),
                    i = this._pool[e];
                return !(!i || 0 === i.length)
            },
            removeObject: function(t) {
                var e = cc.js._getClassId(t.constructor);
                if (e) {
                    var i = this._pool[e];
                    if (i)
                        for (var n = 0; n < i.length; n++) t === i[n] && i.splice(n, 1)
                }
            },
            getFromPool: function(t) {
                if (this.hasObject(t)) {
                    var e = cc.js._getClassId(t),
                        i = this._pool[e];
                    n.length = arguments.length - 1;
                    for (var r = 0; r < n.length; r++) n[r] = arguments[r + 1];
                    var s = i.pop();
                    return s.reuse && s.reuse.apply(s, n), n.length = 0, s
                }
            },
            drainAllPools: function() {
                this._pool = {}
            }
        }
    }), {}],
    168: [(function(t, e, i) {
        e.exports = (function() {
            "use strict";
            var t = Math.round(window.devicePixelRatio || 1),
                e = function(t, e) {
                    this._color = e || "#666", this._canvas = document.createElement("canvas"), this._ctx = this._canvas.getContext("2d"), this._canvas.className = "pstats-canvas", t.appendChild(this._canvas)
                };
            e.prototype.init = function(e, i) {
                var n = e * t,
                    r = i * t;
                this._canvas.width = n, this._canvas.height = r, this._canvas.style.width = e + "px", this._canvas.style.height = i + "px", this._ctx.globalAlpha = 1, this._ctx.fillStyle = "#444", this._ctx.fillRect(0, 0, n, r)
            };
            var i = Math.round(window.devicePixelRatio || 1),
                n = (function(t) {
                    function e(e, i) {
                        t.call(this, e, i), this._current = 0, this._max = 0
                    }
                    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.draw = function(t, e) {
                        var n = this._canvas.width,
                            r = this._canvas.height;
                        this._current += .1 * (t - this._current), this._max *= .99, this._current > this._max && (this._max = this._current);
                        var s = Math.round((1 - this._current / this._max) * r);
                        this._ctx.globalAlpha = 1, this._ctx.drawImage(this._canvas, i, 0, n - i, r, 0, 0, n - i, r), e ? (this._ctx.fillStyle = "#444", this._ctx.fillRect(n - i, 0, i, r), this._ctx.fillStyle = "#b70000", this._ctx.fillRect(n - i, s, i, r - s), this._ctx.globalAlpha = .5, this._ctx.fillStyle = "#fff", this._ctx.fillRect(n - i, s, i, i)) : (this._ctx.fillStyle = "#444", this._ctx.fillRect(n - i, 0, i, r), this._ctx.fillStyle = this._color, this._ctx.fillRect(n - i, s, i, r - s), this._ctx.globalAlpha = .5, this._ctx.fillStyle = "#fff", this._ctx.fillRect(n - i, s, i, i))
                    }, e
                })(e),
                r = Math.round(window.devicePixelRatio || 1),
                s = (function(t) {
                    function e(e, i) {
                        t.call(this, e, i), this._threshold = 0, this._canvas2 = document.createElement("canvas"), this._ctx2 = this._canvas2.getContext("2d")
                    }
                    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.init = function(e, i) {
                        t.prototype.init.call(this, e, i);
                        var n = e * r,
                            s = i * r;
                        this._canvas2.width = n, this._canvas2.height = s, this._canvas2.style.width = e + "px", this._canvas2.style.height = i + "px", this._ctx2.globalAlpha = 1, this._ctx2.fillStyle = "#444", this._ctx2.fillRect(0, 0, n, s)
                    }, e.prototype.draw = function(t, e) {
                        var i = this._canvas.width,
                            n = this._canvas.height;
                        if (this._ctx.globalAlpha = 1, this._ctx2.globalAlpha = 1, t > this._threshold) {
                            var s = n * ((t - t % n) / n + 1),
                                o = this._threshold;
                            this._threshold = s;
                            var c = o / s;
                            this._ctx2.drawImage(this._canvas, 0, 0), this._ctx.fillStyle = "#444", this._ctx.fillRect(0, 0, i, n), this._ctx.drawImage(this._canvas2, r, 0, i - r, n, 0, Math.round((1 - c) * n), i - r, n)
                        } else this._ctx.drawImage(this._canvas, r, 0, i - r, n, 0, 0, i - r, n);
                        var a = Math.round(n * (1 - t / this._threshold));
                        e ? (this._ctx.fillStyle = "#444", this._ctx.fillRect(i - r, 0, r, n), this._ctx.fillStyle = "#b70000", this._ctx.fillRect(i - r, a, r, n - a), this._ctx.globalAlpha = .5, this._ctx.fillStyle = "#fff", this._ctx.fillRect(i - r, a, r, r)) : (this._ctx.fillStyle = "#444", this._ctx.fillRect(i - r, 0, r, n), this._ctx.fillStyle = this._color, this._ctx.fillRect(i - r, a, r, n - a), this._ctx.globalAlpha = .5, this._ctx.fillStyle = "#fff", this._ctx.fillRect(i - r, a, r, r))
                    }, e
                })(e),
                o = Math.round(window.devicePixelRatio || 1),
                c = (function(t) {
                    function e(e, i, n, r) {
                        t.call(this, e, i), this._min = n, this._max = r
                    }
                    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.draw = function(t, e) {
                        var i = this._canvas.width,
                            n = this._canvas.height,
                            r = (t - this._min) / (this._max - this._min),
                            s = Math.round((1 - r) * n);
                        this._ctx.globalAlpha = 1, this._ctx.drawImage(this._canvas, o, 0, i - o, n, 0, 0, i - o, n), e ? (this._ctx.fillStyle = "#444", this._ctx.fillRect(i - o, 0, o, n), this._ctx.fillStyle = "#b70000", this._ctx.fillRect(i - o, s, o, n - s), this._ctx.globalAlpha = .5, this._ctx.fillStyle = "#fff", this._ctx.fillRect(i - o, s, o, o)) : (this._ctx.fillStyle = "#444", this._ctx.fillRect(i - o, 0, o, n), this._ctx.fillStyle = this._color, this._ctx.fillRect(i - o, s, o, n - s), this._ctx.globalAlpha = .5, this._ctx.fillStyle = "#fff", this._ctx.fillRect(i - o, s, o, o))
                    }, e
                })(e),
                a = Math.round(window.devicePixelRatio || 1),
                h = function(t, e) {
                    this._colors = e, this._canvas = document.createElement("canvas"), this._ctx = this._canvas.getContext("2d"), this._canvas.className = "pstats-canvas", t.appendChild(this._canvas)
                };
            h.prototype.init = function(t, e, i) {
                var n = t * a,
                    r = e * a;
                this._canvas.width = n, this._canvas.height = r * i, this._canvas.style.width = t + "px", this._canvas.style.height = e * i + "px", this._ctx.globalAlpha = 1, this._ctx.fillStyle = "#444", this._ctx.fillRect(0, 0, n, r * i)
            }, h.prototype.draw = function(t) {
                var e = this._canvas.width,
                    i = this._canvas.height;
                this._ctx.globalAlpha = 1, this._ctx.drawImage(this._canvas, a, 0, e - a, i, 0, 0, e - a, i);
                for (var n = 0, r = 0; r < t.length; ++r) {
                    var s = t[r] * i;
                    this._ctx.fillStyle = this._colors[r], this._ctx.fillRect(e - a, n, a, s), n += s
                }
            };
            var l = function(t, e) {
                    this._id = t, this._opts = e || {}, this._value = 0, this._total = 0, this._averageValue = 0, this._accumValue = 0, this._accumSamples = 0, this._accumStart = window.performance.now()
                },
                u = {
                    value: {}
                };
            l.prototype._average = function(t) {
                if (this._opts.average) {
                    this._accumValue += t, ++this._accumSamples;
                    var e = performance.now();
                    e - this._accumStart >= this._opts.average && (this._averageValue = this._accumValue / this._accumSamples, this._accumValue = 0, this._accumStart = e, this._accumSamples = 0)
                }
            }, u.value.get = function() {
                return this._value
            }, u.value.set = function(t) {
                this._value = t
            }, l.prototype.sample = function() {
                this._average(this._value)
            }, l.prototype.human = function() {
                var t = this._opts.average ? this._averageValue : this._value;
                return Math.round(100 * t) / 100
            }, l.prototype.alarm = function() {
                return this._opts.below && this._value < this._opts.below || this._opts.over && this._value > this._opts.over
            }, Object.defineProperties(l.prototype, u);
            var _ = (function(t) {
                    function e(e, i) {
                        t.call(this, e, i), this._time = window.performance.now()
                    }
                    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.start = function() {
                        this._time = window.performance.now()
                    }, e.prototype.end = function() {
                        this._value = window.performance.now() - this._time, this._average(this._value)
                    }, e.prototype.tick = function() {
                        this.end(), this.start()
                    }, e.prototype.frame = function() {
                        var t = window.performance.now(),
                            e = t - this._time;
                        this._total++;
                        e > (this._opts.average || 1e3) && (this._value = 1e3 * this._total / e, this._total = 0, this._time = t, this._average(this._value))
                    }, e
                })(l),
                d = Math.log(1024),
                f = ["Bytes", "KB", "MB", "GB", "TB"],
                p = (function(t) {
                    function e(e, i, n) {
                        t.call(this, i, n), this._stats = e, this._start = 0, 0 === n.extension.indexOf("memory.") && (this._field = n.extension.substring(7))
                    }
                    return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype.snapshot = function() {
                        this._value = this._stats[this._field]
                    }, e.prototype.start = function() {
                        this._start = this._stats[this._field]
                    }, e.prototype.end = function() {
                        this._value = this._stats[this._field] - this._start
                    }, e.prototype.human = function() {
                        return (function(t) {
                            var e = Math.floor(Math.log(t) / d);
                            return 0 === t ? "n/a" : Math.round(100 * t / Math.pow(1024, e)) / 100 + " " + f[e]
                        })(t.prototype.human.call(this))
                    }, e
                })(l),
                g = function() {
                    0 === window.performance.memory.totalJSHeapSize && console.warn("totalJSHeapSize === 0, performance.memory is only available in Chrome."), this._used = 0, this._total = 0, this._lastUsed = 0
                },
                m = {
                    alarm: {},
                    used: {},
                    total: {}
                };
            g.prototype.tick = function() {
                this._lastUsed = this._used, this._used = window.performance.memory.usedJSHeapSize, this._total = window.performance.memory.totalJSHeapSize
            }, m.alarm.get = function() {
                return this._used - this._lastUsed < 0
            }, m.used.get = function() {
                return window.performance.memory.usedJSHeapSize
            }, m.total.get = function() {
                return this._total
            }, g.prototype.counter = function(t, e) {
                return new p(this, t, e)
            }, Object.defineProperties(g.prototype, m);
            var v = {
                    memory: g
                },
                y = document.createElement("style");
            y.type = "text/css", y.textContent = "\n  .pstats {\n    position: fixed;\n    z-index: 9999;\n\n    padding: 5px;\n    width: 250px;\n    right: 5px;\n    bottom: 5px;\n\n    font-size: 10px;\n    font-family: 'Roboto Condensed', tahoma, sans-serif;\n    overflow: hidden;\n    user-select: none;\n    cursor: default;\n\n    background: #222;\n    border-radius: 3px;\n  }\n\n  .pstats-container {\n    display: block;\n    position: relative;\n    color: #888;\n    white-space: nowrap;\n  }\n\n  .pstats-item {\n    position: absolute;\n    width: 250px;\n    height: 12px;\n    left: 0px;\n  }\n\n  .pstats-label {\n    position: absolute;\n    width: 150px;\n    height: 12px;\n    text-align: left;\n    transition: background 0.3s;\n  }\n\n  .pstats-label.alarm {\n    color: #ccc;\n    background: #800;\n\n    transition: background 0s;\n  }\n\n  .pstats-counter-id {\n    position: absolute;\n    width: 90px;\n    left: 0px;\n  }\n\n  .pstats-counter-value {\n    position: absolute;\n    width: 60px;\n    left: 90px;\n    text-align: right;\n  }\n\n  .pstats-canvas {\n    display: block;\n    position: absolute;\n    right: 0px;\n    top: 1px;\n  }\n\n  .pstats-fraction {\n    position: absolute;\n    width: 250px;\n    left: 0px;\n  }\n\n  .pstats-legend {\n    position: absolute;\n    width: 150px;\n\n    text-align: right;\n  }\n\n  .pstats-legend > span {\n    position: absolute;\n    right: 0px;\n  }\n", document.head.appendChild(y);
            var C = function(t, e) {
                if (e = e || {}, this._showGraph = void 0 === e.showGraph || e._showGraph, this._values = e.values || {}, this._fractions = e.fractions || [], this._id2counter = {}, this._id2item = {}, this._name2extStats = {}, e.css) {
                    var i = document.createElement("style");
                    i.type = "text/css", i.textContent = e.css, document.head.appendChild(i)
                }
                if (e.extensions)
                    for (var r = 0; r < e.extensions.length; ++r) {
                        var o = e.extensions[r],
                            a = v[o];
                        a ? this._name2extStats[o] = new a : console.warn("Can not find extensions " + o + ", please register your extension via pstats.register().")
                    }
                this._root = document.createElement("div"), this._root.className = "pstats";
                var l = document.createElement("div");
                l.className = "pstats-container", this._root.appendChild(l);
                var u = 0;
                for (var _ in this._values) {
                    var d = this._values[_],
                        f = document.createElement("div");
                    f.className = "pstats-item";
                    var p = document.createElement("div");
                    p.className = "pstats-label";
                    var g = document.createElement("span");
                    g.className = "pstats-counter-id", g.textContent = d.desc || _;
                    var m = document.createElement("div");
                    m.className = "pstats-counter-value";
                    var y = document.createTextNode("");
                    y.nodeValue = "0", p.appendChild(g), p.appendChild(m), m.appendChild(y), f.appendChild(p);
                    var C = void 0;
                    this._showGraph && (C = void 0 !== d.min || void 0 !== d.max ? new c(f, d.color, d.min || 0, d.max || 9999) : d.threshold ? new s(f, d.color) : new n(f, d.color)).init(95, 10), this._id2item[_] = {
                        label: p,
                        valueText: y,
                        graph: C
                    }, f.style.top = u + "px", l.appendChild(f), u += 12
                }
                if (this._showGraph && e.fractions)
                    for (var T = 0; T < e.fractions.length; ++T) {
                        var E = e.fractions[T],
                            x = E.steps,
                            R = 10 * x.length + 2;
                        E.colors = E.colors || ["#850700", "#c74900", "#fcb300", "#284280", "#4c7c0c"];
                        var S = document.createElement("div");
                        S.className = "pstats-fraction";
                        var w = document.createElement("div");
                        w.className = "pstats-legend", w.style.height = R + "px";
                        for (var A = 0; A < x.length; ++A) {
                            var b = document.createElement("span");
                            b.textContent = x[A], b.style.color = E.colors[A], b.style.top = 10 * A + "px", w.appendChild(b)
                        }
                        S.appendChild(w), S.style.height = R + "px", S.style.top = u + "px";
                        var I = new h(S, E.colors);
                        I.init(95, 10, x.length), E.graph = I, E.values = new Array(x.length), l.appendChild(S), u += 10 * x.length + 2
                    }
                l.style.height = u + "px", this._root.style.height = u + "px", this._showGraph || (this._root.style.width = "150px"), t.appendChild(this._root)
            };
            C.prototype.item = function(t) {
                if (!t) return null;
                var e = this._id2counter[t];
                if (e) return e;
                var i = this._values[t];
                if (!i) return null;
                if (i.extension) {
                    var n = i.extension.indexOf("."),
                        r = i.extension.substring(0, n),
                        s = this._name2extStats[r];
                    if (!s) return console.error("extension " + r + " not found, make sure you have register and enable it."), null;
                    e = s.counter(t, i)
                } else e = new _(t, i);
                return this._id2counter[t] = e, e
            }, C.prototype.tick = function() {
                for (var t in this._name2extStats) {
                    this._name2extStats[t].tick()
                }
                for (var e in this._values) {
                    var i = this._id2counter[e];
                    if (i) {
                        i.sample();
                        var n = i.alarm(),
                            r = i.human(),
                            s = this._id2item[e];
                        s.label.classList.toggle("alarm", n > 0), s.valueText.nodeValue = r, this._showGraph && s.graph.draw(i.value, n)
                    }
                }
                if (this._showGraph)
                    for (var o = 0; o < this._fractions.length; ++o) {
                        var c = this._fractions[o],
                            a = this._id2counter[c.base];
                        if (a) {
                            for (var h = c.steps, l = 0; l < h.length; ++l) {
                                var u = h[l],
                                    _ = this._id2counter[u];
                                _ && (c.values[l] = _.value / a.value)
                            }
                            c.graph.draw(c.values)
                        }
                    }
            }, (function() {
                if (void 0 === window.performance && (window.performance = {}), !window.performance.now) {
                    var t = Date.now();
                    performance.timing && performance.timing.navigationStart && (t = performance.timing.navigationStart), window.performance.now = function() {
                        return Date.now() - t
                    }
                }
                window.performance.mark || (window.performance.mark = function() {}), window.performance.measure || (window.performance.measure = function() {}), window.performance.memory || (window.performance.memory = {
                    usedJSHeapSize: 0,
                    totalJSHeapSize: 0
                })
            })();
            return {
                new: function(t, e) {
                    var i = new C(t, e);
                    return function(t) {
                        return t ? i.item(t) : i
                    }
                },
                register: function(t, e) {
                    v[t] = e
                }
            }
        })()
    }), {}],
    169: [(function(t, e, i) {
        function n(t, e) {
            void 0 === s[t] && (s[t] = e)
        }

        function r(t) {
            return "object" == typeof s[t]
        }
        var s = "undefined" == typeof window ? global : window;
        n("CC_TEST", r("tap") || r("QUnit")), n("CC_EDITOR", r("Editor") && r("process") && "electron" in process.versions), n("CC_PREVIEW", !0), n("CC_DEV", !0), n("CC_DEBUG", !0), n("CC_JSB", r("jsb")), n("CC_BUILD", !1), n("CC_WECHATGAME", !1), n("CC_QQPLAY", !1), n("CC_SUPPORT_JIT", !0), cc = {}, _ccsg = {}, _cc = {}, t("./CCDebugger"), cc._initDebugSetting(cc.DebugMode.INFO), t("./polyfill/string"), t("./polyfill/misc"), t("./polyfill/array"), t("./polyfill/typescript"), t("./cocos2d/kazmath"), t("./cocos2d/core/predefine"), ccs = {}, cp = {}, t("./cocos2d/shaders"), t("./CCBoot"), t("./cocos2d"), t("./extends"), e.exports = cc
    }), {
        "./CCBoot": 2,
        "./CCDebugger": 3,
        "./DebugInfos": 4,
        "./cocos2d": 143,
        "./cocos2d/core/predefine": 105,
        "./cocos2d/kazmath": 147,
        "./cocos2d/shaders": 161,
        "./extends": 165,
        "./package.json": void 0,
        "./polyfill/array": 170,
        "./polyfill/misc": 171,
        "./polyfill/string": 172,
        "./polyfill/typescript": 173
    }],
    170: [(function(t, e, i) {
        Array.isArray || (Array.isArray = function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        })
    }), {}],
    171: [(function(t, e, i) {
        if (Math.sign || (Math.sign = function(t) {
                return 0 == (t = +t) || isNaN(t) ? t : t > 0 ? 1 : -1
            }), Number.isInteger || (Number.isInteger = function(t) {
                return "number" == typeof t && isFinite(t) && Math.floor(t) === t
            }), !console.time) {
            var n = window.performance || Date,
                r = Object.create(null);
            console.time = function(t) {
                r[t] = n.now()
            }, console.timeEnd = function(t) {
                var e = r[t],
                    i = n.now() - e;
                console.log(t + ": " + i + "ms")
            }
        }
    }), {}],
    172: [(function(t, e, i) {
        String.prototype.startsWith || (String.prototype.startsWith = function(t, e) {
            return e = e || 0, this.lastIndexOf(t, e) === e
        }), String.prototype.endsWith || (String.prototype.endsWith = function(t, e) {
            (void 0 === e || e > this.length) && (e = this.length), e -= t.length;
            var i = this.indexOf(t, e);
            return -1 !== i && i === e
        })
    }), {}],
    173: [(function(t, e, i) {
        var n = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function(t, e) {
            t.__proto__ = e
        } || function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
        };
        window.__extends = function(t, e) {
            function i() {
                this.constructor = t
            }
            n(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
        }, window.__assign = Object.assign || function(t) {
            for (var e, i = 1, n = arguments.length; i < n; i++) {
                e = arguments[i];
                for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
            }
            return t
        }, window.__rest = function(t, e) {
            var i = {};
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (i[n] = t[n]);
            if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
                var r = 0;
                for (n = Object.getOwnPropertySymbols(t); r < n.length; r++) e.indexOf(n[r]) < 0 && (i[n[r]] = t[n[r]])
            }
            return i
        }, window.__decorate = function(t, e, i, n) {
            var r, s = arguments.length,
                o = s < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, i, n);
            else
                for (var c = t.length - 1; c >= 0; c--)(r = t[c]) && (o = (s < 3 ? r(o) : s > 3 ? r(e, i, o) : r(e, i)) || o);
            return s > 3 && o && Object.defineProperty(e, i, o), o
        }, window.__param = function(t, e) {
            return function(i, n) {
                e(i, n, t)
            }
        }, window.__metadata = function(t, e) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(t, e)
        }, window.__awaiter = function(t, e, i, n) {
            return new(i || (i = Promise))(function(r, s) {
                function o(t) {
                    try {
                        a(n.next(t))
                    } catch (t) {
                        s(t)
                    }
                }

                function c(t) {
                    try {
                        a(n.throw(t))
                    } catch (t) {
                        s(t)
                    }
                }

                function a(t) {
                    t.done ? r(t.value) : new i(function(e) {
                        e(t.value)
                    }).then(o, c)
                }
                a((n = n.apply(t, e || [])).next())
            })
        }, window.__generator = function(t, e) {
            function i(i) {
                return function(o) {
                    return (function(i) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; c;) try {
                            if (n = 1, r && (s = r[2 & i[0] ? "return" : i[0] ? "throw" : "next"]) && !(s = s.call(r, i[1])).done) return s;
                            switch (r = 0, s && (i = [0, s.value]), i[0]) {
                                case 0:
                                case 1:
                                    s = i;
                                    break;
                                case 4:
                                    return c.label++, {
                                        value: i[1],
                                        done: !1
                                    };
                                case 5:
                                    c.label++, r = i[1], i = [0];
                                    continue;
                                case 7:
                                    i = c.ops.pop(), c.trys.pop();
                                    continue;
                                default:
                                    if (s = c.trys, !(s = s.length > 0 && s[s.length - 1]) && (6 === i[0] || 2 === i[0])) {
                                        c = 0;
                                        continue
                                    }
                                    if (3 === i[0] && (!s || i[1] > s[0] && i[1] < s[3])) {
                                        c.label = i[1];
                                        break
                                    }
                                    if (6 === i[0] && c.label < s[1]) {
                                        c.label = s[1], s = i;
                                        break
                                    }
                                    if (s && c.label < s[2]) {
                                        c.label = s[2], c.ops.push(i);
                                        break
                                    }
                                    s[2] && c.ops.pop(), c.trys.pop();
                                    continue
                            }
                            i = e.call(t, c)
                        } catch (t) {
                            i = [6, t], r = 0
                        } finally {
                            n = s = 0
                        }
                        if (5 & i[0]) throw i[1];
                        return {
                            value: i[0] ? i[1] : void 0,
                            done: !0
                        }
                    })([i, o])
                }
            }
            var n, r, s, o, c = {
                label: 0,
                sent: function() {
                    if (1 & s[0]) throw s[1];
                    return s[1]
                },
                trys: [],
                ops: []
            };
            return o = {
                next: i(0),
                throw: i(1),
                return: i(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                return this
            }), o
        }, window.__exportStar = function(t, e) {
            for (var i in t) e.hasOwnProperty(i) || (e[i] = t[i])
        }, window.__values = function(t) {
            var e = "function" == typeof Symbol && t[Symbol.iterator],
                i = 0;
            return e ? e.call(t) : {
                next: function() {
                    return t && i >= t.length && (t = void 0), {
                        value: t && t[i++],
                        done: !t
                    }
                }
            }
        }, window.__read = function(t, e) {
            var i = "function" == typeof Symbol && t[Symbol.iterator];
            if (!i) return t;
            var n, r, s = i.call(t),
                o = [];
            try {
                for (;
                    (void 0 === e || e-- > 0) && !(n = s.next()).done;) o.push(n.value)
            } catch (t) {
                r = {
                    error: t
                }
            } finally {
                try {
                    n && !n.done && (i = s.return) && i.call(s)
                } finally {
                    if (r) throw r.error
                }
            }
            return o
        }, window.__spread = function() {
            for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(__read(arguments[e]));
            return t
        }, window.__await = function(t) {
            return this instanceof __await ? (this.v = t, this) : new __await(t)
        }, window.__asyncGenerator = function(t, e, i) {
            function n(t) {
                h[t] && (a[t] = function(e) {
                    return new Promise(function(i, n) {
                        l.push([t, e, i, n]) > 1 || r(t, e)
                    })
                })
            }

            function r(t, e) {
                try {
                    (function(t) {
                        t.value instanceof __await ? Promise.resolve(t.value.v).then(s, o) : c(l[0][2], t)
                    })(h[t](e))
                } catch (t) {
                    c(l[0][3], t)
                }
            }

            function s(t) {
                r("next", t)
            }

            function o(t) {
                r("throw", t)
            }

            function c(t, e) {
                t(e), l.shift(), l.length && r(l[0][0], l[0][1])
            }
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var a, h = i.apply(t, e || []),
                l = [];
            return a = {}, n("next"), n("throw"), n("return"), a[Symbol.asyncIterator] = function() {
                return this
            }, a
        }, window.__asyncDelegator = function(t) {
            function e(e, r) {
                t[e] && (i[e] = function(i) {
                    return (n = !n) ? {
                        value: __await(t[e](i)),
                        done: "return" === e
                    } : r ? r(i) : i
                })
            }
            var i, n;
            return i = {}, e("next"), e("throw", (function(t) {
                throw t
            })), e("return"), i[Symbol.iterator] = function() {
                return this
            }, i
        }, window.__asyncValues = function(t) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var e = t[Symbol.asyncIterator];
            return e ? e.call(t) : "function" == typeof __values ? __values(t) : t[Symbol.iterator]()
        }
    }), {}]
}, {}, [169]);