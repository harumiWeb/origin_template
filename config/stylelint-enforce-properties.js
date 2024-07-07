// stylelint-enforce-properties.js

const stylelint = require("stylelint");

const ruleName = "plugin/enforce-properties";
const messages = stylelint.utils.ruleMessages(ruleName, {
  color: "要素にcolorプロパティが指定されていません。",
  letterSpacing: "要素にletter-spacingプロパティが指定されていません。",
  lineHeight: "要素にline-heightプロパティが指定されていません。"
});

module.exports = stylelint.createPlugin(ruleName, (primaryOption, secondaryOptionObject) => {
  return (postcssRoot, postcssResult) => {
    postcssRoot.walkRules(rule => {
      let hasFontSize = false;
      let hasColor = false;
      let hasLetterSpacing = false;
      let hasLineHeight = false;

      rule.walkDecls(decl => {
        if (decl.prop === "font-size") {
          hasFontSize = true;
        }
        if (decl.prop === "color") {
          hasColor = true;
        }
        if (decl.prop === "letter-spacing") {
          hasLetterSpacing = true;
        }
        if (decl.prop === "line-height") {
          hasLineHeight = true;
        }
      });

      if (hasFontSize) {
        if (!hasColor) {
          stylelint.utils.report({
            message: messages.color,
            node: rule,
            result: postcssResult,
            ruleName
          });
        }
        if (!hasLetterSpacing) {
          stylelint.utils.report({
            message: messages.letterSpacing,
            node: rule,
            result: postcssResult,
            ruleName
          });
        }
        if (!hasLineHeight) {
          stylelint.utils.report({
            message: messages.lineHeight,
            node: rule,
            result: postcssResult,
            ruleName
          });
        }
      }
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
