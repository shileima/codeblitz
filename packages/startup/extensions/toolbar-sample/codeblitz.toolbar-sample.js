module.exports = {
  "extension": {
    "publisher": "codeblitz",
    "name": "toolbar-sample",
    "version": "1.0.0"
  },
  "packageJSON": {
    "name": "toolbar-sample",
    "publisher": "codeblitz",
    "version": "1.0.0",
    "repository": {
      "type": "git",
    },
    "displayName": "command Sample",
    "description": "View toolbar sample",
    "icon": "resources/icon.png",
    "activationEvents": [
      "*"
    ],
    // 配置与 contributes 的区别 ？？？
    "sumiContributes": {
      "browserMain": "./out/browser/index.js",
      "nodeMain": "./out/node/index.js",
      "workerMain": "./out/extension.js", // 引入贡献点
      "toolbar": {
        "actions": [
          {
            "type": "button",
            "title": "运行 (Run)",
            "iconPath": "./icons/start.svg",
            "id": "sample-start",
            "command": "sample-start",
            "states": {
              "default": {
                "btnTitleStyle": "horizontal",
                "titleForeground": "#FF004F"
              },
              "clicked": {
                "titleForeground": "#CCC"
              }
            }
          },
          {
            "type": "button",
            "title": "弹窗 (Popover)",
            "iconPath": "./icons/book.svg",
            "id": "popover-start",
            "command": "popover-command",
            "popoverComponent": "CustomPopover",
            "popoverStyle": {
              "minWidth": "200",
              "minHeight": "200"
            },
            "states": {
              "default": {
                "titleForeground": "#FF004F"
              },
              "clicked": {
                "titleForeground": "#CCC"
              }
            }
          }
        ]
      },
      "viewsProxies": [
        "Leftview"
      ],
      "browserViews": {
        "left": {
          "type": "add",
          "view": [
            {
              "id": "Leftview",
              "icon": "extension"
            }
          ]
        }
      }
    },
    "contributes": {
      "browserMain": "./out/browser/index.js",
      "nodeMain": "./out/node/index.js",
      "workerMain": "./out/extension.js", // 引入贡献点
      "commands": [
        {
          sayHello: 'command/hello',
          foo: 'command/foo',
        },
        {
          getWorkspaceFolder: 'command/getWorkspaceFolder',
          quickPick: 'command/quickPick',
        }
      ],
      "toolbar": {
        "actions": [
          {
            "type": "button",
            "title": "运行 (Run)",
            "iconPath": "./icons/start.svg",
            "id": "sample-start",
            "command": "sample-start",
            "states": {
              "default": {
                "btnTitleStyle": "horizontal",
                "titleForeground": "#FF004F"
              },
              "clicked": {
                "titleForeground": "#CCC"
              }
            }
          },
          {
            "type": "button",
            "title": "弹窗 (Popover)",
            "iconPath": "./icons/book.svg",
            "id": "popover-start",
            "command": "popover-command",
            "popoverComponent": "CustomPopover",
            "popoverStyle": {
              "minWidth": "200",
              "minHeight": "200"
            },
            "states": {
              "default": {
                "titleForeground": "#FF004F"
              },
              "clicked": {
                "titleForeground": "#CCC"
              }
            }
          }
        ]
      },
      "viewsProxies": [
        "Leftview"
      ],
      "browserViews": {
        "left": {
          "type": "add",
          "view": [
            {
              "id": "Leftview",
              "icon": "extension"
            }
          ]
        }
      }
    },
    "kaitianContributes": {
      "browserMain": "./out/browser/index.js",
      "nodeMain": "./out/node/index.js",
      "workerMain": "./out/extension.js", // 引入贡献点
      "toolbar": {
        "actions": [
          {
            "type": "button",
            "title": "运行 (Run)",
            "iconPath": "./icons/start.svg",
            "id": "sample-start",
            "command": "sample-start",
            "states": {
              "default": {
                "btnTitleStyle": "horizontal",
                "titleForeground": "#FF004F"
              },
              "clicked": {
                "titleForeground": "#CCC"
              }
            }
          },
          {
            "type": "button",
            "title": "弹窗 (Popover)",
            "iconPath": "./icons/book.svg",
            "id": "popover-start",
            "command": "popover-command",
            "popoverComponent": "CustomPopover",
            "popoverStyle": {
              "minWidth": "200",
              "minHeight": "200"
            },
            "states": {
              "default": {
                "titleForeground": "#FF004F"
              },
              "clicked": {
                "titleForeground": "#CCC"
              }
            }
          }
        ]
      },
      "viewsProxies": [
        "Leftview"
      ],
      "browserViews": {
        "left": {
          "type": "add",
          "view": [
            {
              "id": "Leftview",
              "icon": "extension"
            }
          ]
        }
      }
    },
  },
  "pkgNlsJSON": {},
  "nlsList": [],
  "extendConfig": {},
  "webAssets": [
  ],
  "mode": "local", // 开发模式
  // 远程镜像地址
  "uri": "http://127.0.0.1:50999/assets/Users/shilei/xbot/opensumi-extension-samples/toolbar-sample",
}