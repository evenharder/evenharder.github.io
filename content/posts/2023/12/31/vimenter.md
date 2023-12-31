---
title: "VimEnter 후기"
date: 2023-12-31T13:00:00+09:00
categories:
  - tech
tags:
  - vimenter
  - vim
  - nvim
  - productivity
  - philosophy
---

2023년 12월 23일에 진행된 [VimEnter 2023](https://event-us.kr/vim/event/74978)에 참석했습니다. 우연히 [JohnGrib](https://johngrib.github.io/)님의 X 포스트를 보았고, 마침 직장인 자리가 1개 남아있길래 일말의 고민도 없이 신청했습니다. 제가 요즘 (Neo)vim의 열렬한 추종자가 되면서 다른 Vimmer와 이야기를 나누고 싶기도 했고, 학업과 업무를 제외하고 전혀 모르는 개발자를 모르는 자리가 처음인지라 기대가 많이 되었습니다. 간단히 요약하면 (Neo)Vim 지식과 경험뿐만 아니라 다른 분의 개발철학까지 접할 수 있었고, 감사하게도 책 두 권도 받아갈 수 있었습니다.

행사는 3시 시작이었는데, 강남역으로 향하는 광역버스가 교통체증으로 인해 서행운전하여 행사장에는 3시 15분 경에 도착했습니다. 때문에 행사의 개회식을 듣지 못했습니다. 2층으로 향하는 계단을 올라가는데 박수 소리가 들려서 발표 하나를 놓쳐 아쉽다는 생각과 맞게 왔구나 싶은 안도감이 공존했습니다.

그 이후로 7시 조금 전까지 다양한 발표가 이어졌고 각 발표마다 다양한 점을 시사했습니다만, 여기서는 여러 발표를 종합한 저의 감상 위주로 정리해보도록 하겠습니다.

# 발표장의 분위기
참가자분 대부분이 노트북을 가져오셨는데, 놀라울 정도로 Mac의 비중이 높았습니다. 그 외에는 특이사항은 없었습니다.

# Neovim의 기능성
Vim도 마찬가지지만 Neovim은 정말 상상 이상으로 강력한 플러그인이 많습니다. 모두가 인정한 [telescope.nvim](https://github.com/nvim-telescope/telescope.nvim)과 [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter)는 오늘 배부된 Neovim 스티커 패키지에도 따로 로고 스티커로 있을 정도였습니다. [vimwiki][https://github.com/vimwiki/vimwiki]도, vim을 프레젠테이션용으로 쓰는 플러그인도 처음 알았습니다. 당장 내가 쓰는 LazyVim에도 수많은 기본 플러그인이 제 할 일을 하고 있습니다. [vim.kr Discord 서버](https://vim.kr/)에서는 neovim 0.10 nightly에 inlay hint나 osc52 적용 등 흥미로운 부분이 많다고 했는데, 아직은 천천히 배워가야 할 것 같습니다.

# Learning Neovim the hard (and the right) way
옛날에 누가 학부 공용 서버 vi에 chmod 000을 걸어서 강제로 모두 emacs를 써야 했다는 일화를 들은 적이 있습니다. 조금 극단적인 예시지만 어떤 편집기를 배우는 환경에 있어서는 최적의 상황이기도 합니다. 쓸 수밖에 없는 상황이 되면 쓰게 됩니다. 저도 cli 환경에서 코드를 작성해야 하는 상황이 되어서 vim을 조금 배워볼까 싶어 시작했었습니다.

Neovim을 입문하긴 했으나 사실 LazyVim의 config을 조금 바꾸는 데도 적지 않은 시행착오가 필요했습니다. 아직 lua script도 잘 모르겠습니다. vim을 배우는 가장 효과적인 방법은 vanilla vim에서 본인이 필요하다고 생각하는 플러그인을 하나씩 가감해가기겠지만 아쉽게도 이렇게 탐구할 시간은 없을 것 같습니다. 그렇기에 지금 LazyVim에 있는 플러그인 하나하나를 짧게나마 탐구해보는 시간은 필요해보입니다.

vim의 원초적인 강력함도 무시할 수 없습니다. 물론 배우다가 막히는 부분도 있습니다. 최근에는 의식적으로 vim macro를 사용해보려고 노력했는데, 뭔가 조금씩 이상하게 실행될 때가 있었습니다. 그럴 때 조그마한 macro부터 작성해서 이를 합치는 분할정복을 해보라는 조언을 받았습니다. 그 외에도 후술한 Pratical Vim을 서적 추첨 후 건네받아서, 2024년도 1분기에 완독해보고자 합니다.

# Neovim + a로 생산성 퀀텀점프하기
작년 여름 정도에 vim을 사용해보기 시작하고 얼마 지나지 않아 [kodingwarrior](https://kodingwarrior.github.io/)님의 [Neovim으로 생산성 퀀텀점프하기](https://kodingwarrior.github.io/wiki/appendix/excelcon-2nd/)를 접했습니다. 발표자료와 포스틀 읽고 깜짝 놀랐습니다! vim이 저렇게 강력할 수가 있구나, 근데 vim이 아니라 Neovim이네? 설치해볼까? 그 결과 VimEnter까지 참가하는 사람이 되었습니다. 특히 제가 Neovim에 매료된 발표의 후속편을 들을 수 있어 더욱 기대가 되었습니다.

이번 발표에서는 Neovim뿐만 아니라 Neovim과 같이 사용되는 개발 환경에서 생산성을 어떻게 끌어올릴지, 더 나아가 생산성이란 무엇이고 어떻게 개선해야 하는지를 공유해주셨습니다. 정말 많은 내용을 정리해주셨지만 그중 몇 개를 꼽자면 다음과 같습니다.

- 생산성은 불필요 및 반복되는 시간소모를 분석하는 메타인지에서 시작한다.
- context switching의 비용을 최소화하기. 머슬 메모리 탑재가 예시.
- snippet을 통해 boilerplate 재사용하기. 결국 자신이 작성하는 코드의 반복을 인지해야 함.
- CLI랑 친해지기.
  - terminal emulator로 [WezTerm](https://wezfurlong.org/wezterm/index.html)이나 [Alacritty](https://alacritty.org/)는 정말 처음 들어봤다.
  - shell/terminal : tmux를 조금 더 공부해야겠다. [tmuxinator](https://github.com/tmuxinator/tmuxinator)는 요긴하겠다.
- 개인 맞춤형 환경 구성하기
  - dotfiles도 체계적으로 만들어볼 필요를 느꼈다.
  - 일 그 자체의 context switching 횟수를 최소화해보자. (timeslot 배분)
  - GPT를 이용한 commit message 자동 생성기는 좀 신기했다.
  - project별로 배경 색을 조금 다르게 하거나 투명도 지정.
- [Typing Fast Is About Latency, Not Throughput](https://two-wrongs.com/typing-fast-is-about-latency-not-throughput) 일독 권장. 타자수보다는 의미론 단위의 행동이 중요.

# 꾸준한 개발
저는 흔히 알고리즘 문제풀이라고 불리는 Problem Solving, Competitive Programming을 아주 열정적으로 했던 사람이지만 그 외 개발 경험은 학부나 현업을 제외하고는 많지 않았습니다. 그런 측면에서 꾸준히 개인적인 개발을 이어가시는 분들이 많아 대단했습니다. 저도 개발까지는 아니더라도 개인 개발 환경 구축 등을 멀리하지 말아야겠습니다.

# 서적 추첨
감사하게도 첫 추첨이었던 '개발자를 넘어 기술 리더로 가는 길 (The Staff Engineer's Path)'에 당첨되어 받아갈 수 있었습니다. 시니어로 성장할 때 즈음 더욱 값질 듯한 책입니다. 추첨이 끝나고 [kiyoon](https://github.com/kiyoon)님께서 '손가락이 먼저 반응하는 Practical Vim' 책을 양도해주셨습니다. 감사히 잘 읽겠습니다. 또한, VimEnter 행사에 책을 후원해주신 출판사 관계자분들께도 깊은 감사의 말씀 드립니다. 책 완독후 리뷰 올리도록 하겠습니다.

# What's Next?
눈 감았다 뜨면 2024년이겠지만 올해는 유난히 무덤덤합니다. 내년에 어떻게 성장해야할지 방향성이 잡혀서 그렇다고 생각하고 있습니다. 생각만큼 몸과 머리가 따라주면 좋을텐데, 작심삼일로 끝나지 않게 해보겠습니다. 그런 의미에서, Vim이라는 소프트웨어가 제 삶과 저의 개발에 있어 작지 않은 요소 스며든 나날이 참 마음에 듭니다. 앞으로도 배워나가겠습니다. 내년에도 VimEnter가 있을지는 모르겠지만, 한 번 발표 단상에 올라보고 싶어졌습니다.

다사다난한 2023년 모두 고생 많으셨습니다. 다가오는 청룡의 해도 잘 부탁드리겠습니다.

