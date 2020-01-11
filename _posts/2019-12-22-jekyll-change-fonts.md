---
title: "Jekyll 기반 블로그 글꼴 수정하기"
date:               2019-12-22 20:00
last_modified_at:   2020-01-11 13:40
categories:
  - blog
tags:
  - Jekyll
excerpt_separator: <!--more-->
---
Jekyll 같은 정적 웹페이지 생성기는 편하지만, 글꼴처럼 세부 설정을 건드리는 건
편하지 않습니다.

<!--more-->
(2020.01.11 수정. `language-plaintext` 쪽을 추가했습니다.)

첫 포스트에서 추천드린 [이 repo][mmistakes-starter]에는 `_sass`, `_includes`,
`_layouts` 등 디렉토리가 없습니다. 그럼에도 불구하고 잘 작동하는 이유는
remote에 있는 설정을 그대로 가져다가 쓰기 때문입니다.
때문에, 이쪽 관련된 설정을 건드리는 건 얼핏 보기엔 쉬워 보이지 않습니다.

몇 시간에 걸친 구글링과 삽질을 통해, 블로그 전체에 'Noto Sans KR'과
'Ubuntu Mono'를 적용하고, 글꼴 크기를 조금 줄여 적용할 수 있었습니다.

## 글꼴 설정 방법
많은 사람들이 글꼴을 설정하고 싶어했습니다. [이 issue][mmistakes-issue-1219]
또한 예외는 아니었습니다. 해당 글에서는 `_sass` 폴더 어딘가의 `_variables.scss`나
`_reset.scss`를 덮어쓰는 기존의 해결법이 설정과 꼬일 수 있어서 좋지 않다고
지적하고 있습니다. 여기에 이 repo의 개발자가 훨씬 좋은 방법을 제시합니다.
**모든 사용자 정의 css를** `assets/css/main.scss`**에 덮어쓰라는 것입니다.**

그 이후의 과정을 굳이 서술하기보다는, 결론을 제시하는 게
모두에게 편하지 않을까요? 구글링을 통해 여러 의견을 종합하여 만든 파일입니다.



```scss
--- 
# Only the main Sass file needs front matter (the dashes are enough) 
--- 

// https://mmistakes.github.io/minimal-mistakes/docs/stylesheets/#customizing
$sans-serif: 'Noto Sans KR';
$monospace: 'Ubuntu Mono';
$type-size-4-5: 1.12em !default; // Ubuntu Mono is a bit small

@charset "utf-8";
@import "minimal-mistakes/skins/{{ site.minimal_mistakes_skin | default: 'default' }}"; // skin
@import "minimal-mistakes";

@import url(https://fonts.googleapis.com/css?family=Noto+Sans+KR|Ubuntu+Mono);

// https://github.com/mmistakes/minimal-mistakes/issues/1219
html {
  font-size: 12px; // change to whatever
  
  @include breakpoint($medium) {
    font-size: 14px; // change to whatever
  }

  @include breakpoint($large) {
    font-size: 16px; // change to whatever
  }

  @include breakpoint($x-large) {
    font-size: 18px; // change to whatever
  }
}

.highlight {
  font-family: $monospace;
  font-size: $type-size-4-5;
}

.language-plaintext {
  font-family: $monospace;
  font-size: $type-size-5;
  background: #c0ffee;
}
```

이렇게 파일을 만들면
+ 기본 글꼴이 Noto Sans KR로 변경되며,
+ 고정폭 글꼴은 Ubuntu Mono로 설정되고
+ 글꼴 크기도 설정된 것처럼 작아지면서
+ code highlight(backtick 3개/3개)의 폰트 크기도 변경되고
+ inline code(backtick 1개/1개)의 폰트 크기 및 배경 색깔이 변경됩니다.

첫 번째로 나오는 `$sans-serif`는  `_variables.scss`에서 정의되는 sans-serif 관련
변수인데, 조금 읽다보면 이 변수가 그대로
`$global-font-family: $sans-serif !default;`나
`$header-font-family: $sans-serif !default;`처럼 실제 문서 글꼴로 적용되는
코드가 나옵니다. 

위에 있는 documentation 링크에 의하면, `import`를 하기 전에 변수에 값을 대입하여
사용자가 정의하고 싶은 값을 적용할 수 있습니다. 그래서 두 글꼴을 대입하였습니다.

글꼴을 실제로 불러오는 과정은 [Google Fonts][google-fonts]를 통해 한 줄에
가능합니다.

그 이후에는 해당 issue의 해결법을 적용하였습니다 (4px씩 줄였습니다).
Jekyll에서 컴파일 하는 과정에서 `@import "minimal-mistakes/skins/aqua"; // skin`
같은 줄들은 자동으로 생성됩니다.

`highlight`와 `language-plaintext` 역시 Ubuntu Mono의 기본 크기 때문에
수정할 수밖에 없었는데, html 요소의 이름과 연관된 것 같아 설정해보았는데
다행히 잘 작동하였습니다. 색깔을 `c0ffee`로 장난삼아 해보았는데, 기본 색깔과 잘
어울리는 것 같아 일단 점찍어놓았습니다.

헤더는 다른 폰트로 설정해서 더 멋있게 할 수 있지 않을까 싶지만,
디자인에 조예가 깊지 않고 지금 보기에도 괜찮아 일단 여기에서 멈추려 합니다.

[google-fonts]: https://fonts.google.com/
[mmistakes-starter]: https://github.com/mmistakes/mm-github-pages-starter
[mmistakes-issue-1219]: https://github.com/mmistakes/minimal-mistakes/issues/1219





