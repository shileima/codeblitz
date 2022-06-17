import { Autowired } from '@opensumi/di';
import { Disposable, URI, Domain } from '@opensumi/ide-core-common';
import { LanguagesContribution, GrammarsContribution } from '@opensumi/ide-monaco';
import { Registry } from '@alipay/alex-registry';
import { TextmateKey } from './base';
import { ITextmateTokenizer } from '@opensumi/ide-monaco/lib/browser/contrib/tokenizer';
import type { ITextmateTokenizerService } from '@opensumi/ide-monaco/lib/browser/contrib/tokenizer';

@Domain()
export class LanguageGrammarRegistrationService extends Disposable {
  @Autowired(ITextmateTokenizer)
  private readonly textMateService: ITextmateTokenizerService;

  async initRegisterLanguageAndGrammar() {
    // 没啥作用，只是确保传参类型正确
    const uri = new URI();

    this.addDispose(
      Registry.onRegister<LanguagesContribution>(TextmateKey.language, (contrib) => {
        this.textMateService.registerLanguage(contrib, uri);
      })
    );

    this.addDispose(
      Registry.onRegister<GrammarsContribution>(TextmateKey.grammar, (contrib) => {
        this.textMateService.registerGrammar(contrib, uri);
      })
    );

    const languageContrib = Registry.getData<LanguagesContribution>(TextmateKey.language) || [];
    const grammarContrib = Registry.getData<GrammarsContribution>(TextmateKey.grammar) || [];

    return Promise.all([
      ...languageContrib.map((contrib) => this.textMateService.registerLanguage(contrib, uri)),
      ...grammarContrib.map((contrib) => this.textMateService.registerGrammar(contrib, uri)),
    ]);
  }
}
