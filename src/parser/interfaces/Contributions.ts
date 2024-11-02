export interface Contributions
{
  multilineComments: boolean;
  useJSDocStyle: boolean;
  highlightPlainText: boolean;
  tags: [{
    tag: string;
    color: string;
    strikethrough: boolean;
    backgroundColor: string;
  }];
}