Fontello - создание своего иконочного шрифта
=============================

[![CI](https://github.com/fontello/fontello/workflows/CI/badge.svg?branch=master)](https://github.com/fontello/fontello/actions)
[![Gitter](https://badges.gitter.im/fontello/fontello.svg)](https://gitter.im/fontello/fontello)

website: [fontello.com](https://fontello.com/), help: [wiki](https://github.com/fontello/fontello/wiki/Help)

[![](https://opencollective.com/puzrin/tiers/baker.svg?width=770)](https://opencollective.com/puzrin#category-CONTRIBUTE)

Этот инструмент позволяет комбинировать иконочные веб-шрифты для вашего собственного проекта. С помощью Fontello вы можете:

1. сокращать коллекции глифов, уменьшая размер шрифта
2. объединить символы из нескольких шрифтов в один файл
3. доступ к большим наборам профессиональных иконок с открытым исходным кодом


## API разработчиков

Fontello позволяет легко создавать сценарии для реализации различных удобных функций:

1. Откройте сайт из командной строки с вашей конфигурацией и импортируйте отредактированный проект.
    - [Makefile example] (https://gist.github.com/puzrin/5537065). Это живой рабочий код, используемый
      для разработки самого fontello.
2. Написание плагинов для сайта, для импорта/экспорта иконок через админку.

Когда появится больше примеров, они будут добавлены сюда.

### API methods

1. `POST https://fontello.com/` creates a session with your config and
   return you `session_id`. You can use it later to open fontello with your configuration
   and to automatically download your font. Session is stored for 24h. POST params
   (form-encoded):
    - `config` - (Required) content of `config.json` for your font
    - `url` - (Optional) if used, download button will link to your admin panel, where you can
      run importing script.
2. `https://fontello.com/[session_id]` - opening fontello with your config preloaded.
   When you edit font, your config is automatically sent to server
3. `https://fontello.com/[session_id]/get` - download your font.

Note. When you open site via API url, `download` button will have another text.


### Examples

* [Makefile](https://gist.github.com/puzrin/5537065) - quick load iconic font
  from your project via CLI & save result back.
* [fontello-cli](https://github.com/paulyoung/fontello-cli) - the same, as above,
  but written in `node.js`. If you don't like `make` utility, then
  `fontello-cli` is for you :)
* [fontello_rails_converter](https://github.com/railslove/fontello_rails_converter) - Ruby CLI gem for interacting with the API.  Additional features (Sass conversion) for Rails integration, but should work for every project.
* [grunt-fontello](https://github.com/jubalm/grunt-fontello) - lightweight integration with grunt

## Authors

- Roman Shmelev ([shmelev](https://github.com/shmelev)).
- Vitaly Puzrin ([puzrin](https://github.com/puzrin)).
- Aleksey Zapparov ([ixti](https://github.com/ixti)).
- Evgeny Shkuropat ([shkuropat](https://github.com/shkuropat)).
- Vladimir Zapparov ([dervus](https://github.com/dervus)).
- Alex Kocharin ([rlidwka](https://github.com/rlidwka)).

Thanks to:

- [Werner Lemberg](https://github.com/lemzwerg) for help with ttfautohint.
- [Hermanto Lim](https://github.com/nackle2k10) for the image.


## License

Fontello's code (all files, except fonts) is distributed under MIT license. See
[LICENSE](https://github.com/fontello/fontello/blob/master/LICENSE) file for details.

Embedded fonts are distributed under their primary licenses (SIL OFL / CC BY / CC BY-SA).
See fonts info on fontello website for credits & links to homepages. This info is also
included in generated font archives for your convenience (see LICENSE.txt file).

Generated fonts are intended for web usage, and should not be
considered/distributed as independent artwork. Consider fontello a
"font archiver" and credit original font creators according to their respective license.

Crediting fontello is not required :)
