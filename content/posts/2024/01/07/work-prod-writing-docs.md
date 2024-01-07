---
title: "직장 개발환경 개선: 문서 작성편"
date: 2024-01-07T17:20:00+09:00
categories:
  - work
tags:
  - productivity
  - tech
  - confluence
  - obsidian
  - wezterm
  - neovim
  - powershell
  - treesitter
  - markdown-preview.nvim
  - unicode
summary: 직장의 문서 작성 환경을 WezTerm과 Neovim을 이용해 개선했습니다.
---

지난 목요일에 공부를 위해 문서를 사내 [Confluence](https://www.atlassian.com/software/confluence)에 작성하고 있었으나 몇 가지 단점이 점점 크게 부각되었습니다.

- 느립니다. 2024년이 된 이후로 조금 더 느려진 느낌이 듭니다.
- 수식 편집이 불편합니다. LaTex inline mode는 닫는 `$`를 누르는 순간 렌더링이 되지 않고 수식째로 증발하고 있습니다.
- 각주를 지원하지 않습니다.
- 글꼴 설정에 제약이 있습니다.
- 세션이 종종 만료됩니다.

Confluence는 매우 강력한 툴이지만 수식이 많이 들어가는 문서 편집에는 적절해 보이지 않았습니다. 이대로는 안 되겠다 싶어 Markdown으로 문서를 작성하고, pdf와 markdown 파일을 게시하는 노선을 택했습니다. Confluence 내 검색도 되고, 문서 열람도 편히 할 수 있어 일석이조라고 생각했습니다. 원래는 [Obsidian](https://obsidian.md/)을 주로 사용했으나 여러 가지 시행착오를 거친 결과, [WezTerm](https://wezfurlong.org/wezterm/index.html)에서 remote Neovim을 실행하는 환경으로 옮길 수 있었습니다.

## Obsidian과의 작별
최근에 좋은 평을 받고 있는 Markdown 편집기지만 아쉬운 부분이 없잖아 있었습니다. 수식 입력에 반복이 너무 많다보니 똑같은 `\mathbb{x}`를 계속 타이핑해야 했고, preview와 print시 양식이 별도의 css로 처리된다는 점이 특히 마음에 걸렸습니다. conceal 기능도 묘하게 불편할 때가 있었습니다. 출력 관련해서도  `print.css` 설정에 있어 많은 애로사항을 겪었습니다. 저는 제가 보는 그대로 출력되었으면 좋겠는데, 기술적으로 어려운가 봅니다. 그래도 `pandoc`까지 직접 설정해보고 싶지는 않아서, 일단은 pdf export 용도로만 사용하기로 했습니다.

## MobaXTerm에서 WezTerm으로
원격 Neovim에서 편집을 시작해봤습니다. 수식 입력을 필두로 편집이 훨씬 더 편해졌습니다. 수식 관련한 여담으로, 부끄럽게도 markdown에서 왜 inline math가 syntax highlighting이 안 되지 싶어 불평불만이었습니다. `:TSInstall latex`을 해야 하는 줄 뒤늦게 알았습니다. 쾌적하게 편집을 하는 듯 싶었으나, 한글 입력시 backspace가 작동하지 않았습니다. 사용 중이든 remote ssh cilent 앱인 [MobaXTerm](https://mobaxterm.mobatek.net/)의 문제로 보였습니다. 회사에서 널리 쓰이는 MobaXTerm은 상당한 편의성이 돋보이는 프로그램이지만, 아쉽게도 설정 변경으로 해결이 되지 않았습니다. Windows 10에서 문제가 발생했는데, 11에서는 해결이 되었으려나 모르겠습니다.

다른 방안을 찾다가 이전에 VimEnter에서 소개받은 WezTerm으로 접속하고 편집을 시도해봤는데 입력 지연 없이 쾌적하게 입력되었습니다. 즉시 migration을 결정하고 아주 기본적인 환경설정 파일을 만들었습니다. 글꼴 및 색상 설정에 기본 shell을 `PowerShell`로 재지정해줬고 X11 설정을 해줬습니다. lua script로 정말 이것저것 고칠 수 있어 보였습니다.

```lua
local wezterm = require 'wezterm'
local config = {}
local launch_menu = {}

config.font = wezterm.font 'D2Coding'
config.color_scheme = 'seoulbones_dark'
config.enable_wayland = false -- X11?

if wezterm.target_triple == 'x86_64-pc-windows-msvc' then
  table.insert(launch_menu, {
    label = 'PowerShell',
    args = { 'powershell.exe', '-NoLogo' },
  })
  config.default_prog = { 'powershell.exe', '-NoLogo' }
end

config.launch_menu = launch_menu

return config
```

PowerShell에도 [공식 문서](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles)의 도움을 받아 profile을 통해 아주 간략하게 `ssh-copy-id`와 `X11 forwarding`을 설정해주었습니다. `ssh-keygen`이나 `ExecutionPolicy` 설정은 별도로 수행했습니다.
```powershell
# some aliases for remote server omitted

function Send-PubKey {
  type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh -v $args[0] "cat >> .ssh/authorized_keys"
}

# X11 forwarding
$env:DISPLAY="127.0.0.1:0.0"

function fn_xssh { ssh -Y $args }
Set-Alias xssh fn_xssh
```
ssh 연결에서 시행착오가 많았습니다. public key를 등록했는데도 ssh에서 계속 password를 요청해서 `-v` 옵션도 넣어보는 등 다양한 시도를 해봤으나 client 쪽 문제는 아니어보였습니다. remote의 `/var/log/secure`를 확인해보니 `~/.ssh/authorized_keys`의 권한이 644가 아닌 기본값 664로 되어있어 생긴 문제였습니다. Linux 구석구석을 언젠가 공부해봐야겠습니다.

여기까지 설정하니 WezTerm을 통해 seamless한 remote Neovim 편집이 가능했고 [markdown-preview.nvim](https://github.com/iamcco/markdown-preview.nvim)을 통해 실시간 렌더링도 확인할 수 있었습니다. 방화벽 때문에 firefox가 조금 딜레이가 있긴 했지만 충분히 만족스러웠습니다. 오늘도 Neovim을 접하게 되어 감사한 하루입니다.

## 결론
개발환경 설정은 자신에게의 투자임을 느꼈습니다. 단기적으로는 시간 소모가 클 수 있으나 장기적으로는 이를 훨씬 상회하는 효과를 낼 수 있어 보입니다. 앞으로의 문서 작성이 더 기대가 됩니다.

