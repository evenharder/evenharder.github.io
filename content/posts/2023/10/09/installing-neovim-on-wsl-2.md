---
title: "WSL2에 LazyVim 설치 및 설정하기"
date: 2023-10-09T16:40:00+09:00
categories:
  - tech
tags:
  - wsl2
  - neovim
  - lazyvim
  - mason.nvim null-ls.nvim
  - none-ls.nvim
  - clangd
summary: 갓 다운받은 WSL 2 Ubuntu 22.04.2 LTS에 Neovim (+LazyVim)을 설치하고 LSP와 formatter를 설정했습니다.
---

갓 다운받은 WSL 2 Ubuntu 22.04.2 LTS에 Neovim (+LazyVim)을 설치하고 LSP와 formatter를 설정했습니다.

# Neovim 설치

Neovim은 여러 가지 방법으로 설치할 수 있지만 `apt` 쪽 저장소는 너무 버전이 오래되었고, 소스 코드를 컴파일하고 싶지는 않아서 appimage를 사용했습니다. 그런데 실행이 안 되어서 찾아보니 WSL의 Ubuntu 22.04.2에 FUSE가 설치되어있지 않았습니다. [AppImage의 FUSE 설치 페이지](https://github.com/AppImage/AppImageKit/wiki/FUSE)를 따라 다음을 수행했습니다.

```bash
sudo add-apt-repository universe
sudo apt install libfuse2
```

그 뒤로는 [Neovim 설치 문서](https://github.com/neovim/neovim/wiki/Installing-Neovim)를 따라 로컬 디렉토리에 설정하고 alias를 설정했습니다.

```bash
cd ~/bin
curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim.appimage
chmod u+x nvim.appimage
echo "alias nvim='nvim.appimage'" >> {somewhere with alias config}
```

# LazyVim 설치

Neovim을 직접 설정하고 플러그인을 설치하기에는 너무 많은 시간과 노력이 필요해보여, Neovim setup 중 하나인 [LazyVim](https://www.lazyvim.org/)을 설치했습니다. [설치 방법](https://www.lazyvim.org/installation)은 공식 문서 그대로 따라했습니다.

그 이후에 `:checkhealth`를 수행해 추가적으로 설치를 몇몇 더 했습니다.

```bash
sudo apt-get install ripgrep unzip 7zip
```

stylua는 [공식 GitHub 저장소 배포판](https://github.com/JohnnyMorganz/StyLua/releases)을 다운받아 `~/bin`에 넣어두었습니다.

```bash
wget  https://github.com/JohnnyMorganz/StyLua/releases/download/v0.18.2/stylua-linux.zip
unzip stylua-linux.zip
```

LazyVim은 가장 널리 알려진 Neovim setup중 하나인만큼 강력한 플러그인과 흥미로운 keymap으로 구성되어 있습니다. 아직 알아가는 단계지만 LSP 및 포매팅에 집중해서 기초적인 설정을 해보았습니다.

## `mason-lspconfig.nvim` 설정

Neovim의 [`mason.nvim`](https://github.com/williamboman/mason.nvim)은 Neovim에서 사용되는 LSP, DAP, linter, formatter 등을 관리를 해주는 패키지입니다. [`mason-lspconfig.nvim`](https://github.com/williamboman/mason-lspconfig.nvim)는 mason.nvim에서 다운로드 받은 프로그램 중 LSP 프로그램을 Neovim의 LSP와 연결해줍니다. LazyVim에서 플러그인을 설정하고 싶으면 `lua/plugins/`에 lua 파일을 만들면 되는데, 정말 기본적인 설정만 담겨있는 `lua/plugins/lsp-config.lua`를 다음과 같이 작성해봤습니다.

```lua
return {
  {
    "williamboman/mason-lspconfig.nvim",
    dependencies = {
      "williamboman/mason.nvim",
      "neovim/nvim-lspconfig",
    },
    config = function()
      require("mason").setup()
      require("mason-lspconfig").setup()

      local lspconfig = require("lspconfig")

      -- clangd config
      lspconfig.clangd.setup({
        settings = {},
      })

      -- shell config
      lspconfig.bashls.setup({
        settings = {},
      })

      -- python config
      lspconfig.pyright.setup({
        settings = {},
      })

      -- css config
      lspconfig.cssls.setup({
        settings = {},
      })
    end,
  },
}

```

이 스크립트는 `clangd`, `bash-language-server`, `pyright`, `css-lsp`에 대한 LSP 서버를 구동해줍니다. setup만 호출하면 서버가 구동됩니다! 물론 각 LSP는 직접 설치해야 하는데, 저는 다음과 같이 진행했습니다.

- `clangd`: `sudo apt-get install clangd`
- `bash-language-server`, `pyright`: `sudo npm install -g pyright bash-language-server`
- `css-lsp`: mason 이용

## `none-ls.nvim` 설정

> **경고!** `none-ls.nvim`은 LazyVim v10 기준 기본 플러그인에서 제외되었으며, 기본 포매터는 `conform.nvim`으로 변경되었습니다. migration 관련해선 [LazyVim v10으로 업데이트하기 포스트](/posts/2023/10/29/updating-lazyvim-to-v10/)를 참고 바랍니다.

[`null-ls.nvim`](https://github.com/jose-elias-alvarez/null-ls.nvim)은 LSP가 아닌 프로그램도 LSP 서버처럼 작동할 수 있게 도와주는 플러그인인데, 2023년 8월 12일부로 개발이 중단되었습니다. 현재는 community fork인 [`none-ls.nvim`](https://github.com/nvimtools/none-ls.nvim)에서 유지보수가 계속되고 있습니다.

`none-ls.nvim`에는 `shellcheck`, `shfmt`, `autopep8`, `prettierd`를 설정해주었습니다. `shellcheck`만 linter이고 나머지는 formatter임을 알 수 있습니다. `apt` 또는 mason을 통해 관리 가능했습니다.

```lua
return {
  {
    "nvimtools/none-ls.nvim",
    config = function()
      local augroup = vim.api.nvim_create_augroup("LspFormatting", {})
      local null_ls = require("null-ls")
      null_ls.setup({
        sources = { null_ls.builtins.code_actions.shellcheck, null_ls.builtins.formatting.shfmt,
          null_ls.builtins.formatting.autopep8.with({
            extra_args = { "--ignore=E731" } }),
          null_ls.builtins.formatting.prettierd, },
        -- you can reuse a shared lspconfig on_attach callback here
        on_attach = function(client, bufnr)
          if client.supports_method("textDocument/formatting") then
            vim.api.nvim_clear_autocmds({ group = augroup, buffer = bufnr })
            vim.api.nvim_create_autocmd("BufWritePre", {
              group = augroup,
              buffer = bufnr,
              callback = function()
                -- on 0.8, you should use vim.lsp.buf.format({ bufnr = bufnr }) instead
                -- on later neovim version, you should use vim.lsp.buf.format({ async = false }) instead
                vim.lsp.buf.format({ async = false })
                -- vim.lsp.buf.formatting_sync()
              end,
            })
          end
        end,
      })
    end,
  },
}

```

저장 시 자동으로 포매팅을 해주는 코드를 [`null-ls.nvim` 위키 문서](https://github.com/jose-elias-alvarez/null-ls.nvim/wiki/Formatting-on-save)를 참고하여 추가하였고, `autopep8` 수행시 익명 함수를 일반 함수로 자동 변환해주는 E731 기능을 무시하도록 설정했습니다.

## `clangd` 추가 설정

`sudo apt-get install gcc clang-format clangd cmake` 정도를 기본적으로 수행해주고 C++ 코드를 켜보았는데, `clangd`가 C++17에 도입된 함수도 인식하지 못하고 있었습니다. 조금 더 섬세한 해결방법도 있겠지만 임시방편으로 `~/.config/clangd/config.yaml`에 옵션을 추가하는 미봉책을 택했습니다.

```
CompileFlags:
  Add: [-std=c++17, -Wall]
```

# 후기

글로는 짧게 보이지만 환경설정에 정말 많은 시행착오가 있었습니다. Neovim 및 LazyVim 생태계 이해 부족으로 인해 `clangd`를 Neovim과 연동하기까지 수많은 좌절을 겪었으며, `null-ls.nvim`이 생각보다 훨씬 강력한 플러그인이라는 사실도 얼마 전에 깨달았습니다. 아직도 LazyVim config의 정확한 명세를 잘 모르겠습니다. 다행인 점은 첫 단추를 어떻게든 꿰는 데 성공하니 이어나갈 수 있었습니다.

Neovim 및 LazyVim에서 더 알아가고 싶은 점을 몇 가지 생각해보면,

- LazyVim 생태계 이해. keymap이나 동봉 플러그인에 대한 고찰이 필요해보입니다.
- 한글 다루기. [JohnGrib님의 훌륭한 '한국어 키보드로 VIM 사용하기'](https://github.com/johngrib/simple_vim_guide/blob/master/md/with_korean.md)를 읽어보았지만 아직 잘 모르겠습니다.
- 한국어 spellcheck 적용. 아직 블로그 포스트는 Host OS인 Windows의 Obsidian에서 작성하고 있습니다.
- Vim 기본기 숙달. [Vim Manual](https://vimhelp.org/)의 Getting Started를 정독했고 생각보다 많은 기능을 배웠으나 아직 익숙치가 않고, LazyVim에선 다른 기능으로 대체된 기능도 많았습니다.
