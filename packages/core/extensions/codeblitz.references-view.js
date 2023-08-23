module.exports = {
  "extension": {
    "publisher": "codeblitz",
    "name": "references-view",
    "version": "1.0.0"
  },
  "packageJSON": {
    "name": "references-view",
    "publisher": "ms-vscode",
    "version": "1.0.0",
    "repository": {
      "type": "git",
      "url": "https://github.com/Microsoft/vscode-references-view"
    },
    "displayName": "%displayName%",
    "description": "%description%",
    "icon": "media/icon.png",
    "activationEvents": [
      "onCommand:references-view.find",
      "onCommand:references-view.findReferences",
      "onCommand:references-view.findImplementations",
      "onCommand:references-view.showCallHierarchy",
      "onCommand:references-view.showTypeHierarchy",
      "onCommand:editor.action.showReferences",
      "onView:references-view.tree"
    ],
    "contributes": {
      "configuration": {
        "properties": {
          "references.preferredLocation": {
            "description": "%config.references.preferredLocation%",
            "type": "string",
            "default": "peek",
            "enum": [
              "peek",
              "view"
            ],
            "enumDescriptions": [
              "%config.references.preferredLocation.peek%",
              "%config.references.preferredLocation.view%"
            ]
          }
        }
      },
      "viewsContainers": {
        "activitybar": [
          {
            "id": "references-view",
            "icon": "$(references)",
            "title": "%container.title%"
          }
        ]
      },
      "views": {
        "references-view": [
          {
            "id": "references-view.tree",
            "name": "%view.title%",
            "when": "reference-list.isActive"
          }
        ]
      },
      "commands": [
        {
          "command": "references-view.findReferences",
          "title": "%cmd.references-view.findReferences%",
          "category": "%cmd.category.references%"
        },
        {
          "command": "references-view.findImplementations",
          "title": "%cmd.references-view.findImplementations%",
          "category": "%cmd.category.references%"
        },
        {
          "command": "references-view.clearHistory",
          "title": "%cmd.references-view.clearHistory%",
          "category": "%cmd.category.references%",
          "icon": "$(clear-all)"
        },
        {
          "command": "references-view.clear",
          "title": "%cmd.references-view.clear%",
          "category": "%cmd.category.references%",
          "icon": "$(clear-all)"
        },
        {
          "command": "references-view.refresh",
          "title": "%cmd.references-view.refresh%",
          "category": "%cmd.category.references%",
          "icon": "$(refresh)"
        },
        {
          "command": "references-view.pickFromHistory",
          "title": "%cmd.references-view.pickFromHistory%",
          "category": "%cmd.category.references%"
        },
        {
          "command": "references-view.removeReferenceItem",
          "title": "%cmd.references-view.removeReferenceItem%",
          "icon": "$(close)"
        },
        {
          "command": "references-view.copy",
          "title": "%cmd.references-view.copy%"
        },
        {
          "command": "references-view.copyAll",
          "title": "%cmd.references-view.copyAll%"
        },
        {
          "command": "references-view.copyPath",
          "title": "%cmd.references-view.copyPath%"
        },
        {
          "command": "references-view.refind",
          "title": "%cmd.references-view.refind%",
          "icon": "$(refresh)"
        },
        {
          "command": "references-view.showCallHierarchy",
          "title": "%cmd.references-view.showCallHierarchy%",
          "category": "Calls"
        },
        {
          "command": "references-view.showOutgoingCalls",
          "title": "%cmd.references-view.showOutgoingCalls%",
          "category": "Calls",
          "icon": "$(call-outgoing)"
        },
        {
          "command": "references-view.showIncomingCalls",
          "title": "%cmd.references-view.showIncomingCalls%",
          "category": "Calls",
          "icon": "$(call-incoming)"
        },
        {
          "command": "references-view.removeCallItem",
          "title": "%cmd.references-view.removeCallItem%",
          "icon": "$(close)"
        },
        {
          "command": "references-view.next",
          "title": "%cmd.references-view.next%",
          "enablement": "references-view.canNavigate"
        },
        {
          "command": "references-view.prev",
          "title": "%cmd.references-view.prev%",
          "enablement": "references-view.canNavigate"
        },
        {
          "command": "references-view.showTypeHierarchy",
          "title": "%cmd.references-view.showTypeHierarchy%",
          "category": "Types"
        },
        {
          "command": "references-view.showSupertypes",
          "title": "%cmd.references-view.showSupertypes%",
          "category": "Types",
          "icon": "$(type-hierarchy-super)"
        },
        {
          "command": "references-view.showSubtypes",
          "title": "%cmd.references-view.showSubtypes%",
          "category": "Types",
          "icon": "$(type-hierarchy-sub)"
        },
        {
          "command": "references-view.removeTypeItem",
          "title": "%cmd.references-view.removeTypeItem%",
          "icon": "$(close)"
        }
      ],
      "menus": {
        "editor/context": [
          {
            "command": "references-view.findReferences",
            "when": "editorHasReferenceProvider",
            "group": "0_navigation@1"
          },
          {
            "command": "references-view.findImplementations",
            "when": "editorHasImplementationProvider",
            "group": "0_navigation@2"
          },
          {
            "command": "references-view.showCallHierarchy",
            "when": "editorHasCallHierarchyProvider",
            "group": "0_navigation@3"
          },
          {
            "command": "references-view.showTypeHierarchy",
            "when": "editorHasTypeHierarchyProvider",
            "group": "0_navigation@4"
          }
        ],
        "view/title": [
          {
            "command": "references-view.clear",
            "group": "navigation@3",
            "when": "view == references-view.tree && reference-list.hasResult"
          },
          {
            "command": "references-view.clearHistory",
            "group": "navigation@3",
            "when": "view == references-view.tree && reference-list.hasHistory && !reference-list.hasResult"
          },
          {
            "command": "references-view.refresh",
            "group": "navigation@2",
            "when": "view == references-view.tree && reference-list.hasResult"
          },
          {
            "command": "references-view.showOutgoingCalls",
            "group": "navigation@1",
            "when": "view == references-view.tree && reference-list.hasResult && reference-list.source == callHierarchy &&  references-view.callHierarchyMode == showIncoming"
          },
          {
            "command": "references-view.showIncomingCalls",
            "group": "navigation@1",
            "when": "view == references-view.tree && reference-list.hasResult && reference-list.source == callHierarchy &&  references-view.callHierarchyMode == showOutgoing"
          },
          {
            "command": "references-view.showSupertypes",
            "group": "navigation@1",
            "when": "view == references-view.tree && reference-list.hasResult && reference-list.source == typeHierarchy &&  references-view.typeHierarchyMode != supertypes"
          },
          {
            "command": "references-view.showSubtypes",
            "group": "navigation@1",
            "when": "view == references-view.tree && reference-list.hasResult && reference-list.source == typeHierarchy &&  references-view.typeHierarchyMode != subtypes"
          }
        ],
        "view/item/context": [
          {
            "command": "references-view.removeReferenceItem",
            "group": "inline",
            "when": "view == references-view.tree && viewItem == file-item || view == references-view.tree && viewItem == reference-item"
          },
          {
            "command": "references-view.removeCallItem",
            "group": "inline",
            "when": "view == references-view.tree && viewItem == call-item"
          },
          {
            "command": "references-view.removeTypeItem",
            "group": "inline",
            "when": "view == references-view.tree && viewItem == type-item"
          },
          {
            "command": "references-view.refind",
            "group": "inline",
            "when": "view == references-view.tree && viewItem == history-item"
          },
          {
            "command": "references-view.removeReferenceItem",
            "group": "1",
            "when": "view == references-view.tree && viewItem == file-item || view == references-view.tree && viewItem == reference-item"
          },
          {
            "command": "references-view.removeCallItem",
            "group": "1",
            "when": "view == references-view.tree && viewItem == call-item"
          },
          {
            "command": "references-view.removeTypeItem",
            "group": "1",
            "when": "view == references-view.tree && viewItem == type-item"
          },
          {
            "command": "references-view.refind",
            "group": "1",
            "when": "view == references-view.tree && viewItem == history-item"
          },
          {
            "command": "references-view.copy",
            "group": "2@1",
            "when": "view == references-view.tree && viewItem == file-item || view == references-view.tree && viewItem == reference-item"
          },
          {
            "command": "references-view.copyPath",
            "group": "2@2",
            "when": "view == references-view.tree && viewItem == file-item"
          },
          {
            "command": "references-view.copyAll",
            "group": "2@3",
            "when": "view == references-view.tree && viewItem == file-item || view == references-view.tree && viewItem == reference-item"
          },
          {
            "command": "references-view.showOutgoingCalls",
            "group": "1",
            "when": "view == references-view.tree && viewItem == call-item"
          },
          {
            "command": "references-view.showIncomingCalls",
            "group": "1",
            "when": "view == references-view.tree && viewItem == call-item"
          },
          {
            "command": "references-view.showSupertypes",
            "group": "1",
            "when": "view == references-view.tree && viewItem == type-item"
          },
          {
            "command": "references-view.showSubtypes",
            "group": "1",
            "when": "view == references-view.tree && viewItem == type-item"
          }
        ],
        "commandPalette": [
          {
            "command": "references-view.removeReferenceItem",
            "when": "never"
          },
          {
            "command": "references-view.removeCallItem",
            "when": "never"
          },
          {
            "command": "references-view.removeTypeItem",
            "when": "never"
          },
          {
            "command": "references-view.copy",
            "when": "never"
          },
          {
            "command": "references-view.copyAll",
            "when": "never"
          },
          {
            "command": "references-view.copyPath",
            "when": "never"
          },
          {
            "command": "references-view.refind",
            "when": "never"
          },
          {
            "command": "references-view.findReferences",
            "when": "editorHasReferenceProvider"
          },
          {
            "command": "references-view.clear",
            "when": "reference-list.hasResult"
          },
          {
            "command": "references-view.clearHistory",
            "when": "reference-list.isActive && !reference-list.hasResult"
          },
          {
            "command": "references-view.refresh",
            "when": "reference-list.hasResult"
          },
          {
            "command": "references-view.pickFromHistory",
            "when": "reference-list.isActive"
          },
          {
            "command": "references-view.next",
            "when": "never"
          },
          {
            "command": "references-view.prev",
            "when": "never"
          }
        ]
      },
      "keybindings": [
        {
          "command": "references-view.findReferences",
          "when": "editorHasReferenceProvider",
          "key": "shift+alt+f12"
        },
        {
          "command": "references-view.next",
          "when": "reference-list.hasResult",
          "key": "f4"
        },
        {
          "command": "references-view.prev",
          "when": "reference-list.hasResult",
          "key": "shift+f4"
        },
        {
          "command": "references-view.showCallHierarchy",
          "when": "editorHasCallHierarchyProvider",
          "key": "shift+alt+h"
        }
      ]
    },
    "browser": "./dist/extension.js"
  },
  "defaultPkgNlsJSON": {
    "displayName": "Reference Search View",
    "description": "Reference Search results as separate, stable view in the sidebar",
    "config.references.preferredLocation": "Controls whether 'Peek References' or 'Find References' is invoked when selecting code lens references",
    "config.references.preferredLocation.peek": "Show references in peek editor.",
    "config.references.preferredLocation.view": "Show references in separate view.",
    "container.title": "References",
    "view.title": "Results",
    "cmd.category.references": "References",
    "cmd.references-view.findReferences": "Find All References",
    "cmd.references-view.findImplementations": "Find All Implementations",
    "cmd.references-view.clearHistory": "Clear History",
    "cmd.references-view.clear": "Clear",
    "cmd.references-view.refresh": "Refresh",
    "cmd.references-view.pickFromHistory": "Show History",
    "cmd.references-view.removeReferenceItem": "Dismiss",
    "cmd.references-view.copy": "Copy",
    "cmd.references-view.copyAll": "Copy All",
    "cmd.references-view.copyPath": "Copy Path",
    "cmd.references-view.refind": "Rerun",
    "cmd.references-view.showCallHierarchy": "Show Call Hierarchy",
    "cmd.references-view.showOutgoingCalls": "Show Outgoing Calls",
    "cmd.references-view.showIncomingCalls": "Show Incoming Calls",
    "cmd.references-view.removeCallItem": "Dismiss",
    "cmd.references-view.next": "Go to Next Reference",
    "cmd.references-view.prev": "Go to Previous Reference",
    "cmd.references-view.showTypeHierarchy": "Show Type Hierarchy",
    "cmd.references-view.showSupertypes": "Show Supertypes",
    "cmd.references-view.showSubtypes": "Show Subtypes",
    "cmd.references-view.removeTypeItem": "Dismiss"
  },
  "pkgNlsJSON": {},
  "nlsList": [],
  "extendConfig": {},
  "webAssets": [
    "package.json"
  ],
  "mode": "public"
}
