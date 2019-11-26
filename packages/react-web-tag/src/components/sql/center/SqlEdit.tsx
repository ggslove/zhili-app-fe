import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import 'monaco-editor/esm/vs/editor/contrib/dnd/dnd.js';
import 'monaco-editor/esm/vs/editor/contrib/linesOperations/linesOperations.js';
import 'monaco-editor/esm/vs/editor/contrib/multicursor/multicursor.js';
import 'monaco-editor/esm/vs/editor/contrib/wordOperations/wordOperations.js';
import 'monaco-editor/esm/vs/basic-languages/apex/apex.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/azcli/azcli.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/bat/bat.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/clojure/clojure.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/coffee/coffee.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/csharp/csharp.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/csp/csp.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/css/css.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/dockerfile/dockerfile.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/fsharp/fsharp.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/go/go.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/graphql/graphql.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/handlebars/handlebars.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/html/html.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/ini/ini.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/java/java.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/kotlin/kotlin.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/less/less.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/lua/lua.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/markdown/markdown.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/msdax/msdax.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/mysql/mysql.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/objective-c/objective-c.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/pascal/pascal.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/perl/perl.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/pgsql/pgsql.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/php/php.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/postiats/postiats.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/powerquery/powerquery.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/powershell/powershell.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/pug/pug.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/python/python.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/r/r.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/razor/razor.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/redis/redis.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/redshift/redshift.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/ruby/ruby.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/rust/rust.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/sb/sb.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/scheme/scheme.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/scss/scss.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/shell/shell.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/solidity/solidity.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/st/st.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/swift/swift.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/tcl/tcl.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/vb/vb.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution.js';
import 'monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution.js';
import 'monaco-editor/esm/vs/editor/contrib/suggest/suggestController.js';
import 'monaco-editor/esm/vs/editor/contrib/bracketMatching/bracketMatching.js';
import 'monaco-editor/esm/vs/editor/contrib/hover/hover.js';
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js';
// @ts-ignore
import { language as mysqlLanguage } from 'monaco-editor/esm/vs/basic-languages/mysql/mysql';
import * as monacoEditor from 'monaco-editor';
import { observer } from 'mobx-react';
import { Sql, System } from "src/store";

interface IProps {
  system: System,
  sql: Sql,
  width: number,
  height: number,
}

@observer
export default class SqlEdit extends  React.Component<IProps> {
  editorDidMount = (editor: monacoEditor.editor.IStandaloneCodeEditor, monaco: typeof monacoEditor) => {
    // @ts-ignore
    monaco.languages.registerCompletionItemProvider('sql', { provideCompletionItems: function(model, position) {
        const textUntilPosition = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        });
        const match1 = textUntilPosition.match(/(\S+)$/);
        if (!match1) return [];
        const match = match1[0].toUpperCase();
        var suggestions: any[] = [];
        mysqlLanguage.keywords.forEach((item: any) => {
          if (item.indexOf(match) !== -1) {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: item
            });
          }
        });
        mysqlLanguage.operators.forEach((item: any) => {
          if (item.indexOf(match) !== -1) {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Operator,
              insertText: item
            });
          }
        });
        mysqlLanguage.builtinFunctions.forEach((item: any) => {
          if (item.indexOf(match) !== -1) {
            suggestions.push({
              label: item,
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: item
            });
          }
        });
        return {
          suggestions
        };
      },
      triggerCharacters: ['#'],
    });
  };

  render() {
    const { width, height, sql } = this.props;
    const { sqlValue, changeSqlValue } = sql;
    const options: monacoEditor.editor.IEditorConstructionOptions = {
      selectOnLineNumbers: true,
      lineHeight: 30,
      minimap: { enabled: false },
    };
    options['lineNumbers'] =  'on';
    options['wordWrap'] = 'on';
    return (
      <MonacoEditor
        width={width - 100 }
        height={height}
        language={'sql'}
        theme='vs'
        value={sqlValue}
        options={options}
        onChange={e => changeSqlValue(e)}
        editorDidMount={this.editorDidMount}
      />
    )
  }
}
