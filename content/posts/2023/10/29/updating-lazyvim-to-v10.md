---
title: "LazyVim v10으로 업데이트하기"
date: 2023-10-29T12:10:00+09:00
categories:
  - tech
tags:
  - neovim
  - lazyvim
  - conform.nvim
  - nvim-lint
---

LazyVim이 [v10으로 업데이트되면서](https://github.com/LazyVim/LazyVim/releases/tag/v10.0.0) 몇몇 플러그인 관련 breaking change가 있었습니다. 이 포스트에서는 이와 관련한 플러그인 설정 변경을 다룹니다.

Neovim을 켜니 다음과 같은 안내 메시지를 받았습니다.
```text
`conform.nvim` and `nvim-lint` are now the default formatters and linters in LazyVim.

You can use those plugins together with `none-ls.nvim`,
but you need to enable the `lazyvim.plugins.extras.lsp.none-ls` extra,
for formatting to work correctly.

In case you no longer want to use `none-ls.nvim`, just remove the spec from your config.
Press ENTER or type command to continue
```
[이전 포스트](/posts/2023/10/09/installing-neovim-on-wsl-2/)에서 설정했던 `none-ls.nvim`이 LazyVim 기본 플러그인에서 제외되면서, `conform.nvim`을 새롭게 설정하게 되었습니다. 설정은 생각보다 훨씬 간단했습니다. 기존 `none-ls.nvim`관련 lua 파일을 제거하고, 새로 `conform.lua`를 만들었습니다.

```lua
return {
  {
    "stevearc/conform.nvim",
    opts = {
      formatters_by_ft = {
        lua = { "stylua" },
        python = { "autopep8" },
        sh = { "shellcheck", "shfmt" },
        javascript = { "prettierd" },
        ["_"] = { "trim_whitespace" },
      },
      formatters = {
        autopep8 = {
          prepend_args = { "--ignore=E731" },
        },
      },
    },
  },
}
```

`nvim-lint`도 관련 파일은 만들어두었는데 지금은 주석처리를 해두었습니다.

```lua
return {
  {
    "mfussenegger/nvim-lint",
    opts = {
      linters_by_ft = {
        -- python = { "pylint" },
        -- sh = { "shellcheck" },
      },
    },
  },
}
```

LSP 설정 등 기타 파일은 수정이 필요하지 않았습니다. seamless한 업데이트가 아직도 신기합니다. 그 외로는 v10으로 올라오면서 메인 화면에 extra 기능이 추가되었는데, 때에 따라 유용하게 쓸 수 있을 것 같습니다.
