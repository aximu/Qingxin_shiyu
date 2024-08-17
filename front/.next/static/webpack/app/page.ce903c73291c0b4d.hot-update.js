"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-client)/./app/page.tsx":
/*!**********************!*\
  !*** ./app/page.tsx ***!
  \**********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-client)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _mui_material_TextField__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material/TextField */ \"(app-client)/./node_modules/@mui/material/TextField/TextField.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-client)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_material_ButtonGroup__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material/ButtonGroup */ \"(app-client)/./node_modules/@mui/material/ButtonGroup/ButtonGroup.js\");\n/* harmony import */ var _mui_lab_LoadingButton__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/lab/LoadingButton */ \"(app-client)/./node_modules/@mui/lab/LoadingButton/LoadingButton.js\");\n/* harmony import */ var _mui_material_Stack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Stack */ \"(app-client)/./node_modules/@mui/material/Stack/Stack.js\");\n/* harmony import */ var _mui_icons_material_Send__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/icons-material/Send */ \"(app-client)/./node_modules/@mui/icons-material/Send.js\");\n/* harmony import */ var _mui_material_Paper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material/Paper */ \"(app-client)/./node_modules/@mui/material/Paper/Paper.js\");\n/* harmony import */ var _mui_material_List__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/List */ \"(app-client)/./node_modules/@mui/material/List/List.js\");\n/* harmony import */ var _mui_material_ListItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/ListItem */ \"(app-client)/./node_modules/@mui/material/ListItem/ListItem.js\");\n/* harmony import */ var _mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @mui/material/ListItemText */ \"(app-client)/./node_modules/@mui/material/ListItemText/ListItemText.js\");\n/* harmony import */ var _mui_material_ListItemAvatar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mui/material/ListItemAvatar */ \"(app-client)/./node_modules/@mui/material/ListItemAvatar/ListItemAvatar.js\");\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/Box */ \"(app-client)/./node_modules/@mui/material/Box/Box.js\");\n/* harmony import */ var _mui_material_Avatar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mui/material/Avatar */ \"(app-client)/./node_modules/@mui/material/Avatar/Avatar.js\");\n/* harmony import */ var _mui_icons_material_AccountCircle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/icons-material/AccountCircle */ \"(app-client)/./node_modules/@mui/icons-material/AccountCircle.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-client)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction Home() {\n    _s();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const [isLoading, setIsLoading] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(false);\n    const [authVerifying, setAuthVerifying] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(true);\n    const [error, setError] = react__WEBPACK_IMPORTED_MODULE_1___default().useState();\n    const [messages, setMessages] = react__WEBPACK_IMPORTED_MODULE_1___default().useState([]);\n    const [prompt, setPrompt] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(\"\");\n    const [user, setUser] = react__WEBPACK_IMPORTED_MODULE_1___default().useState(null);\n    console.log(user);\n    react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(()=>{\n        verifyAuth();\n    }, [\n        router\n    ]);\n    async function verifyAuth() {\n        setAuthVerifying(true);\n        const token = localStorage.getItem(\"token\");\n        const res = await fetch(\"\".concat(\"http://localhost:8001\", \"/verify-auth\"), {\n            headers: {\n                \"Authorization\": token !== null && token !== void 0 ? token : \"\"\n            }\n        });\n        const json = await res.json();\n        if ((json === null || json === void 0 ? void 0 : json.authenticated) === true) {\n            setUser(json);\n            setAuthVerifying(false);\n        } else {\n            router.push(\"sign-in\");\n        }\n    }\n    if (authVerifying) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"Verifying user...\"\n        }, void 0, false, {\n            fileName: \"/home/cad/test/nextjs/nextjs-fastapi-langchain-master/front/app/page.tsx\",\n            lineNumber: 61,\n            columnNumber: 12\n        }, this);\n    }\n    const handleKeyDown = (event)=>{\n        if (event.key === \"Enter\" && !event.shiftKey) {\n            event.preventDefault();\n            handlePrompt();\n        } else if (event.key === \"Enter\" && event.shiftKey) {\n            setPrompt((prevValue)=>prevValue + \"\\n\");\n        }\n    };\n    const handlePrompt = async ()=>{\n        setPrompt(\"\");\n        setMessages((prevMessages)=>{\n            return [\n                ...prevMessages,\n                {\n                    from: user === null || user === void 0 ? void 0 : user.username,\n                    content: prompt\n                }\n            ];\n        });\n        setIsLoading(true);\n        try {\n            const token = localStorage.getItem(\"token\");\n            if (!token) {\n                throw new Error(\"Token not found\");\n            }\n            const response = await fetch(\"\".concat(\"http://localhost:8001\", \"/chat-here/invoke\"), {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\",\n                    \"Authorization\": token !== null && token !== void 0 ? token : \"\"\n                },\n                body: JSON.stringify({\n                    input: prompt\n                })\n            });\n            if (!response.ok) {\n                verifyAuth();\n                throw new Error(\"Failed to fetch data\");\n            }\n            const result = await response.json();\n            setMessages((prevMessages)=>[\n                    ...prevMessages,\n                    {\n                        from: \"清心食语\",\n                        content: result.output\n                    }\n                ]);\n        } catch (error) {\n            setError(error.message);\n            alert(\"Ups! Error...\");\n        } finally{\n            setIsLoading(false);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                spacing: {\n                    xs: 1,\n                    sm: 2\n                },\n                pb: 20,\n                direction: \"column\",\n                useFlexGap: true,\n                flexWrap: \"wrap\",\n                children: [\n                    messages.length === 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_Box__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                        sx: {\n                            paddingY: 20\n                        },\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                children: \"你好呀, 我是 清心食语!\"\n                            }, void 0, false, {\n                                fileName: \"/home/cad/test/nextjs/nextjs-fastapi-langchain-master/front/app/page.tsx\",\n                                lineNumber: 114,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                children: \"你可以问我关于健康饮食方面的所有问题...\"\n                            }, void 0, false, {\n                                fileName: \"/home/cad/test/nextjs/nextjs-fastapi-langchain-master/front/app/page.tsx\",\n                                lineNumber: 115,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: \"在屏幕低下输入框中写出您的问题\"\n                            }, void 0, false, {\n                                fileName: \"/home/cad/test/nextjs/nextjs-fastapi-langchain-master/front/app/page.tsx\",\n                                lineNumber: 116,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/cad/test/nextjs/nextjs-fastapi-langchain-master/front/app/page.tsx\",\n                        lineNumber: 113,\n                        columnNumber: 11\n                    }, this),\n                    !isLoading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_List__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                        children: messages === null || messages === void 0 ? void 0 : messages.map((message, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_ListItem__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_ListItemAvatar__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                                        children: message.from !== \"清心食语\" ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_AccountCircle__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {}, void 0, false, {\n                                                fileName: \"/home/cad/test/nextjs/nextjs-fastapi-langchain-master/front/app/page.tsx\",\n                                                lineNumber: 126,\n                                                columnNumber: 21\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"/home/cad/test/nextjs/nextjs-fastapi-langchain-master/front/app/page.tsx\",\n                                            lineNumber: 125,\n                                            columnNumber: 19\n                                        }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                                            src: \"https://www.promptior.ai/assets/promptior-icon-f9f2bdd1.webp\"\n                                        }, void 0, false, {\n                                            fileName: \"/home/cad/test/nextjs/nextjs-fastapi-langchain-master/front/app/page.tsx\",\n                                            lineNumber: 128,\n                                            columnNumber: 20\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/home/cad/test/nextjs/nextjs-fastapi-langchain-master/front/app/page.tsx\",\n                                        lineNumber: 123,\n                                        columnNumber: 13\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_ListItemText__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n                                        primary: \"\".concat(message.from, \":\"),\n                                        secondary: message.content\n                                    }, void 0, false, {\n                                        fileName: \"/home/cad/test/nextjs/nextjs-fastapi-langchain-master/front/app/page.tsx\",\n                                        lineNumber: 130,\n                                        columnNumber: 13\n                                    }, this)\n                                ]\n                            }, index, true, {\n                                fileName: \"/home/cad/test/nextjs/nextjs-fastapi-langchain-master/front/app/page.tsx\",\n                                lineNumber: 122,\n                                columnNumber: 11\n                            }, this))\n                    }, void 0, false, {\n                        fileName: \"/home/cad/test/nextjs/nextjs-fastapi-langchain-master/front/app/page.tsx\",\n                        lineNumber: 120,\n                        columnNumber: 9\n                    }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                        children: \"加载中...\"\n                    }, void 0, false, {\n                        fileName: \"/home/cad/test/nextjs/nextjs-fastapi-langchain-master/front/app/page.tsx\",\n                        lineNumber: 134,\n                        columnNumber: 10\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/cad/test/nextjs/nextjs-fastapi-langchain-master/front/app/page.tsx\",\n                lineNumber: 111,\n                columnNumber: 5\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_Stack__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                component: _mui_material_Paper__WEBPACK_IMPORTED_MODULE_11__[\"default\"],\n                elevation: 0,\n                sx: {\n                    position: \"fixed\",\n                    bottom: 0,\n                    left: 0,\n                    right: 0,\n                    padding: \"35px\"\n                },\n                spacing: 2,\n                direction: \"row\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n                        value: prompt,\n                        fullWidth: true,\n                        multiline: true,\n                        onChange: (e)=>setPrompt(e.target.value),\n                        id: \"\",\n                        label: \"问清心食语一些问题\",\n                        variant: \"outlined\",\n                        onKeyDown: handleKeyDown\n                    }, void 0, false, {\n                        fileName: \"/home/cad/test/nextjs/nextjs-fastapi-langchain-master/front/app/page.tsx\",\n                        lineNumber: 138,\n                        columnNumber: 7\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material_ButtonGroup__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n                        variant: \"outlined\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_lab_LoadingButton__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n                            onClick: ()=>handlePrompt(),\n                            loading: isLoading,\n                            loadingPosition: \"start\",\n                            startIcon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_icons_material_Send__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {}, void 0, false, void 0, void 0),\n                            children: \"Send\"\n                        }, void 0, false, {\n                            fileName: \"/home/cad/test/nextjs/nextjs-fastapi-langchain-master/front/app/page.tsx\",\n                            lineNumber: 149,\n                            columnNumber: 9\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/home/cad/test/nextjs/nextjs-fastapi-langchain-master/front/app/page.tsx\",\n                        lineNumber: 148,\n                        columnNumber: 7\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/cad/test/nextjs/nextjs-fastapi-langchain-master/front/app/page.tsx\",\n                lineNumber: 137,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true);\n}\n_s(Home, \"adCZS5D2Us8hdt4HjsJn/+05fa8=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVM7d0JBQ1RDLFVBQVUsQ0FBQ0MsSUFBTXhFLFVBQVV3RSxFQUFFQyxPQUFPTDt3QkFDcENNLElBQUc7d0JBQ0hDLE9BQU07d0JBQ05DLFNBQVE7d0JBQ1JDLFdBQVd6RDs7Ozs7O2tDQUVmLDhEQUFDN0Msa0VBQVdBO3dCQUFDcUcsU0FBUTtrQ0FDbkIsNEVBQUNwRywrREFBYUE7NEJBQUNzRyxTQUFTLElBQU1yRDs0QkFBZ0JzRCxTQUFTekY7NEJBQVcwRixpQkFBZ0I7NEJBQVFDLHlCQUFXLDhEQUFDdkcsaUVBQVFBO3NDQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTzNIO0dBL0h3QlU7O1FBQ1BELHNEQUFTQTs7O0tBREZDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9wYWdlLnRzeD83NjAzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiXG5pbXBvcnQgeyBSZW1vdGVSdW5uYWJsZSB9IGZyb20gXCJAbGFuZ2NoYWluL2NvcmUvcnVubmFibGVzL3JlbW90ZVwiO1xuaW1wb3J0IFRleHRGaWVsZCBmcm9tICdAbXVpL21hdGVyaWFsL1RleHRGaWVsZCc7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQnV0dG9uR3JvdXAgZnJvbSAnQG11aS9tYXRlcmlhbC9CdXR0b25Hcm91cCc7XG5pbXBvcnQgTG9hZGluZ0J1dHRvbiBmcm9tICdAbXVpL2xhYi9Mb2FkaW5nQnV0dG9uJztcbmltcG9ydCBTdGFjayBmcm9tICdAbXVpL21hdGVyaWFsL1N0YWNrJztcbmltcG9ydCBTZW5kSWNvbiBmcm9tICdAbXVpL2ljb25zLW1hdGVyaWFsL1NlbmQnO1xuaW1wb3J0IFBhcGVyIGZyb20gJ0BtdWkvbWF0ZXJpYWwvUGFwZXInO1xuaW1wb3J0IExpc3QgZnJvbSAnQG11aS9tYXRlcmlhbC9MaXN0JztcbmltcG9ydCBMaXN0SXRlbSBmcm9tICdAbXVpL21hdGVyaWFsL0xpc3RJdGVtJztcbmltcG9ydCBMaXN0SXRlbVRleHQgZnJvbSAnQG11aS9tYXRlcmlhbC9MaXN0SXRlbVRleHQnO1xuaW1wb3J0IExpc3RJdGVtQXZhdGFyIGZyb20gJ0BtdWkvbWF0ZXJpYWwvTGlzdEl0ZW1BdmF0YXInO1xuaW1wb3J0IEJveCBmcm9tICdAbXVpL21hdGVyaWFsL0JveCc7XG5pbXBvcnQgQXZhdGFyIGZyb20gJ0BtdWkvbWF0ZXJpYWwvQXZhdGFyJztcbmltcG9ydCBBY2NvdW50Q2lyY2xlSWNvbiBmcm9tICdAbXVpL2ljb25zLW1hdGVyaWFsL0FjY291bnRDaXJjbGUnO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJztcblxudHlwZSBQcm9tcHQgPSB7XG4gIGZyb206c3RyaW5nO1xuICBjb250ZW50OnN0cmluZztcbn1cblxudHlwZSBVc2VyID0ge1xuICBhdXRoZW50aWNhdGVkOiBib29sZWFuO1xuICB1c2VybmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IFJlYWN0LnVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKVxuICBjb25zdCBbYXV0aFZlcmlmeWluZywgc2V0QXV0aFZlcmlmeWluZ10gPSBSZWFjdC51c2VTdGF0ZTxib29sZWFuPih0cnVlKVxuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IFJlYWN0LnVzZVN0YXRlPHN0cmluZyB8IG51bGw+KClcbiAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSBSZWFjdC51c2VTdGF0ZTxhbnk+KFtdKVxuICBjb25zdCBbcHJvbXB0LCBzZXRQcm9tcHRdID0gUmVhY3QudXNlU3RhdGU8c3RyaW5nPihcIlwiKVxuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSBSZWFjdC51c2VTdGF0ZTxVc2VyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnNvbGUubG9nKHVzZXIpXG4gXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgdmVyaWZ5QXV0aCgpO1xuICB9LCBbcm91dGVyXSk7XG5cbiAgYXN5bmMgZnVuY3Rpb24gdmVyaWZ5QXV0aCgpIHtcbiAgICBzZXRBdXRoVmVyaWZ5aW5nKHRydWUpXG4gICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUEl9L3ZlcmlmeS1hdXRoYCwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQXV0aG9yaXphdGlvbic6IHRva2VuID8/ICcnLFxuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IGpzb24gPSBhd2FpdCByZXMuanNvbigpO1xuICAgIGlmIChqc29uPy5hdXRoZW50aWNhdGVkID09PSB0cnVlKSB7XG4gICAgICBzZXRVc2VyKGpzb24pO1xuICAgICAgc2V0QXV0aFZlcmlmeWluZyhmYWxzZSlcbiAgICB9IGVsc2Uge1xuICAgICAgcm91dGVyLnB1c2goJ3NpZ24taW4nKTtcbiAgICB9XG4gIH1cbiAgXG4gIGlmIChhdXRoVmVyaWZ5aW5nKSB7XG4gICAgcmV0dXJuIDxkaXY+VmVyaWZ5aW5nIHVzZXIuLi48L2Rpdj47XG4gIH1cblxuICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2ZW50OmFueSkgPT4ge1xuICAgIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgJiYgIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaGFuZGxlUHJvbXB0KCk7XG4gICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT09ICdFbnRlcicgJiYgZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgIHNldFByb21wdCgocHJldlZhbHVlOnN0cmluZykgPT4gcHJldlZhbHVlICsgXCJcXG5cIik7XG4gIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVQcm9tcHQgPSBhc3luYyAoKSA9PiB7XG4gICAgc2V0UHJvbXB0KFwiXCIpXG4gICAgc2V0TWVzc2FnZXMoKHByZXZNZXNzYWdlczpQcm9tcHRbXSkgPT4gWy4uLnByZXZNZXNzYWdlcywge2Zyb206IHVzZXI/LnVzZXJuYW1lLCBjb250ZW50OiBwcm9tcHR9XSlcbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9rZW4nKTtcbiAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUb2tlbiBub3QgZm91bmQnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19BUEl9L2NoYXQtaGVyZS9pbnZva2VgLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IHRva2VuID8/ICcnLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7aW5wdXQ6cHJvbXB0fSksXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB2ZXJpZnlBdXRoKClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggZGF0YScpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICAgIHNldE1lc3NhZ2VzKChwcmV2TWVzc2FnZXM6UHJvbXB0W10pID0+IFsuLi5wcmV2TWVzc2FnZXMsIHtmcm9tOlwi5riF5b+D6aOf6K+tXCIsIGNvbnRlbnQ6cmVzdWx0Lm91dHB1dH1dKTtcbiAgICB9IGNhdGNoIChlcnJvcjphbnkpIHtcbiAgICAgIHNldEVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgYWxlcnQoXCJVcHMhIEVycm9yLi4uXCIpIFxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpXG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gIDw+XG4gICAgPFN0YWNrIHNwYWNpbmc9e3sgeHM6IDEsIHNtOiAyIH19IHBiPXsyMH0gZGlyZWN0aW9uPVwiY29sdW1uXCIgdXNlRmxleEdhcCBmbGV4V3JhcD1cIndyYXBcIj5cbiAgICAgIHttZXNzYWdlcy5sZW5ndGggPT09IDAgJiYgKFxuICAgICAgICAgIDxCb3ggc3g9e3twYWRkaW5nWToyMH19PlxuICAgICAgICAgIDxoMT7kvaDlpb3lkYAsIOaIkeaYryDmuIXlv4Ppo5/or60hPC9oMT5cbiAgICAgICAgICA8aDM+5L2g5Y+v5Lul6Zeu5oiR5YWz5LqO5YGl5bq36aWu6aOf5pa56Z2i55qE5omA5pyJ6Zeu6aKYLi4uPC9oMz5cbiAgICAgICAgICA8cD7lnKjlsY/luZXkvY7kuIvovpPlhaXmoYbkuK3lhpnlh7rmgqjnmoTpl67popg8L3A+XG4gICAgICAgICAgPC9Cb3g+XG4gICAgICAgICl9XG4gICAgICB7IWlzTG9hZGluZz8oXG4gICAgICAgIDxMaXN0PlxuICAgICAgICB7bWVzc2FnZXM/Lm1hcCgobWVzc2FnZTpQcm9tcHQsIGluZGV4Om51bWJlcikgPT4gKFxuICAgICAgICAgIDxMaXN0SXRlbSBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgIDxMaXN0SXRlbUF2YXRhcj5cbiAgICAgICAgICAgICAgICB7IG1lc3NhZ2UuZnJvbSAhPT0gXCLmuIXlv4Ppo5/or61cIiA/IChcbiAgICAgICAgICAgICAgICAgIDxBdmF0YXI+XG4gICAgICAgICAgICAgICAgICAgIDxBY2NvdW50Q2lyY2xlSWNvbiAvPlxuICAgICAgICAgICAgICAgICAgPC9BdmF0YXI+XG4gICAgICAgICAgICAgICAgKTogPEF2YXRhciBzcmM9XCJodHRwczovL3d3dy5wcm9tcHRpb3IuYWkvYXNzZXRzL3Byb21wdGlvci1pY29uLWY5ZjJiZGQxLndlYnBcIiAvPn1cbiAgICAgICAgICAgIDwvTGlzdEl0ZW1BdmF0YXI+XG4gICAgICAgICAgICA8TGlzdEl0ZW1UZXh0IHByaW1hcnk9e2Ake21lc3NhZ2UuZnJvbX06YH0gc2Vjb25kYXJ5PXttZXNzYWdlLmNvbnRlbnR9IC8+XG4gICAgICAgICAgPC9MaXN0SXRlbT4gXG4gICAgICAgICkpfVxuICAgICAgPC9MaXN0PlxuICAgICAgKTooPGgzPuWKoOi9veS4rS4uLjwvaDM+KVxuICAgICAgfVxuICAgICA8L1N0YWNrPlxuICAgICAgPFN0YWNrIGNvbXBvbmVudD17UGFwZXJ9IGVsZXZhdGlvbj17MH0gc3g9e3sgcG9zaXRpb246ICdmaXhlZCcsIGJvdHRvbTogMCwgbGVmdDogMCwgcmlnaHQ6IDAsIHBhZGRpbmc6IFwiMzVweFwiIH19IHNwYWNpbmc9ezJ9IGRpcmVjdGlvbj1cInJvd1wiPlxuICAgICAgPFRleHRGaWVsZCBcbiAgICAgICAgICB2YWx1ZT17cHJvbXB0fSBcbiAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICBtdWx0aWxpbmVcbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFByb21wdChlLnRhcmdldC52YWx1ZSl9IFxuICAgICAgICAgIGlkPVwiXCIgXG4gICAgICAgICAgbGFiZWw9XCLpl67muIXlv4Ppo5/or63kuIDkupvpl67pophcIiBcbiAgICAgICAgICB2YXJpYW50PVwib3V0bGluZWRcIiBcbiAgICAgICAgICBvbktleURvd249e2hhbmRsZUtleURvd259XG4gICAgICAgIC8+ICAgXG4gICAgICA8QnV0dG9uR3JvdXAgdmFyaWFudD1cIm91dGxpbmVkXCI+XG4gICAgICAgIDxMb2FkaW5nQnV0dG9uIG9uQ2xpY2s9eygpID0+IGhhbmRsZVByb21wdCgpfSBsb2FkaW5nPXtpc0xvYWRpbmd9IGxvYWRpbmdQb3NpdGlvbj1cInN0YXJ0XCIgc3RhcnRJY29uPXs8U2VuZEljb24gLz59PlxuICAgICAgICAgIFNlbmRcbiAgICAgICAgPC9Mb2FkaW5nQnV0dG9uPlxuICAgICAgPC9CdXR0b25Hcm91cD5cbiAgICA8L1N0YWNrPlxuICAgIDwvPlxuICApO1xufVxuIl0sIm5hbWVzIjpbIlRleHRGaWVsZCIsIlJlYWN0IiwiQnV0dG9uR3JvdXAiLCJMb2FkaW5nQnV0dG9uIiwiU3RhY2siLCJTZW5kSWNvbiIsIlBhcGVyIiwiTGlzdCIsIkxpc3RJdGVtIiwiTGlzdEl0ZW1UZXh0IiwiTGlzdEl0ZW1BdmF0YXIiLCJCb3giLCJBdmF0YXIiLCJBY2NvdW50Q2lyY2xlSWNvbiIsInVzZVJvdXRlciIsIkhvbWUiLCJyb3V0ZXIiLCJpc0xvYWRpbmciLCJzZXRJc0xvYWRpbmciLCJ1c2VTdGF0ZSIsImF1dGhWZXJpZnlpbmciLCJzZXRBdXRoVmVyaWZ5aW5nIiwiZXJyb3IiLCJzZXRFcnJvciIsIm1lc3NhZ2VzIiwic2V0TWVzc2FnZXMiLCJwcm9tcHQiLCJzZXRQcm9tcHQiLCJ1c2VyIiwic2V0VXNlciIsImNvbnNvbGUiLCJsb2ciLCJ1c2VFZmZlY3QiLCJ2ZXJpZnlBdXRoIiwidG9rZW4iLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwicmVzIiwiZmV0Y2giLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQVBJIiwiaGVhZGVycyIsImpzb24iLCJhdXRoZW50aWNhdGVkIiwicHVzaCIsImRpdiIsImhhbmRsZUtleURvd24iLCJldmVudCIsImtleSIsInNoaWZ0S2V5IiwicHJldmVudERlZmF1bHQiLCJoYW5kbGVQcm9tcHQiLCJwcmV2VmFsdWUiLCJwcmV2TWVzc2FnZXMiLCJmcm9tIiwidXNlcm5hbWUiLCJjb250ZW50IiwiRXJyb3IiLCJyZXNwb25zZSIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiaW5wdXQiLCJvayIsInJlc3VsdCIsIm91dHB1dCIsIm1lc3NhZ2UiLCJhbGVydCIsInNwYWNpbmciLCJ4cyIsInNtIiwicGIiLCJkaXJlY3Rpb24iLCJ1c2VGbGV4R2FwIiwiZmxleFdyYXAiLCJsZW5ndGgiLCJzeCIsInBhZGRpbmdZIiwiaDEiLCJoMyIsInAiLCJtYXAiLCJpbmRleCIsInNyYyIsInByaW1hcnkiLCJzZWNvbmRhcnkiLCJjb21wb25lbnQiLCJlbGV2YXRpb24iLCJwb3NpdGlvbiIsImJvdHRvbSIsImxlZnQiLCJyaWdodCIsInBhZGRpbmciLCJ2YWx1ZSIsImZ1bGxXaWR0aCIsIm11bHRpbGluZSIsIm9uQ2hhbmdlIiwiZSIsInRhcmdldCIsImlkIiwibGFiZWwiLCJ2YXJpYW50Iiwib25LZXlEb3duIiwib25DbGljayIsImxvYWRpbmciLCJsb2FkaW5nUG9zaXRpb24iLCJzdGFydEljb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-client)/./app/page.tsx\n"));

/***/ })

});