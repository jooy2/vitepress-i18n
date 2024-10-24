---
order: 1
---

# 시작하기

이 페이지에서는 VitePress I18n 모듈의 설치 및 사용 방법을 안내합니다.

## 설치

먼저 이 모듈을 사용하기 전에 **[VitePress](https://vitepress.dev)** 모듈을 사전 구성해야 할 수 있습니다.

Node.js 버전은 18.x 이상을 사용하는 것이 좋습니다. **VitePress I18n**은 `ESM`으로 작성되었습니다.

[NPM](https://www.npmjs.com/package/vitepress-i18n) 또는 다른 노드 모듈 패키지 관리자를 사용하여 모듈을 설치할 수 있습니다. 이 패키지는 개발자 환경에서만 사용되므로 `devDependencies`에 설치해야 합니다. 아래 명령어로 설치하세요:

```shell
# via npm
$ npm i -D vitepress-i18n

# via yarn
$ yarn add -D vitepress-i18n

# via pnpm
$ pnpm i -D vitepress-i18n
```

## 사용 방법

이 문서에서 VitePress에 대한 기본 지식에 대해서는 설명하지 않습니다. VitePress에 대해 자세히 알아보시려면 다음 사이트를 방문하세요: https://vitepress.dev

먼저 아래 두 가지 방법 중 하나로 `vitepress-i18n`을 import합니다.

### 1. named-import 사용 (권장)

```javascript
// `.vitepress/config.js`
import { generateI18n } from 'vitepress-i18n';

const vitePressOptions = {
  title: 'VitePress',
  themeConfig: {
    // ...
  }
};

const vitePressI18nOptions = {
  /* Options... */
};

export default defineConfig(withI18n(vitePressOptions, vitePressI18nOptions));
```

### 2. default-import 사용

```javascript
// `.vitepress/config.js`
import VitePressI18n from 'vitepress-i18n';

const vitePressOptions = {
  title: 'VitePress',
  themeConfig: {
    // ...
  }
};

const vitePressI18nOptions = {
  /* Options... */
};

export default defineConfig(VitePressI18n.withI18n(vitePressOptions, vitePressI18nOptions));
```

VitePress의 구성 파일인 `.vitepress/config.js` 파일(설정 파일 이름은 프로젝트 환경에 따라 다를 수 있음)의 `defineConfig` 옵션값에 `withI18n`을 호출합니다.

`withI18n`에는 두가지 인자값을 포함해야 합니다. 첫번째 인자는 VitePress의 옵션 값을, 두번째 인자는 오버라이딩 할 VitePress I18n의 옵션 값을 포함합니다.

VitePress I18n의 출력 결과에는 자동 번역이 된 텍스트가 포함되어 있습니다. 이 옵션 데이터는 기존의 VitePress의 옵션과 병합 될 것입니다.

이것이 어떻게 출력되는지 테스트하려면 VitePress I18에서 제공하는 `debugPrint` 옵션을 `true`로 설정하여 VitePress를 빌드해 보세요. 콘솔에 출력이 표시될 것입니다.

VitePress I18n의 옵션에 대해 자세히 알아보시려면 VitePress I18n 옵션 문서를 참고하세요.
