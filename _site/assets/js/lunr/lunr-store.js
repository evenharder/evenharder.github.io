var store = [{
        "title": "블로그를 시작했습니다",
        "excerpt":"미루고 미루던 Jekyll 블로그 공사를 진행했습니다. 정말 Github Page와 Jekyll의 궁합이 좋긴 하네요. Minimal Mistakes도 정말 깔끔하고 좋은 테마입니다. Github Page + Jekyll 처음 써보시는 분이라면, 이 repo를 clone 떠서 바로 시작해보아도 좋을 정도입니다. 블로그에 대체 뭘 쓰면 좋을까 고민이 많았습니다. 알고리즘 강의. 제가 잘 모르는 내용이나, 이전에 동아리에서 다루었던...","categories": ["blog"],
        "tags": ["Jekyll"],
        "url": "/blog/hello-jekyll/",
        "teaser":null},{
        "title": "Jekyll 기반 블로그 글꼴 수정하기",
        "excerpt":"Jekyll 같은 정적 웹페이지 생성기는 편하지만, 글꼴처럼 세부 설정을 건드리는 건 편하지 않습니다. (2020.01.11 수정. language-plaintext 쪽을 추가했습니다.) 첫 포스트에서 추천드린 이 repo에는 _sass, _includes, _layouts 등 디렉토리가 없습니다. 그럼에도 불구하고 잘 작동하는 이유는 remote에 있는 설정을 그대로 가져다가 쓰기 때문입니다. 때문에, 이쪽 관련된 설정을 건드리는 건 얼핏 보기엔 쉬워...","categories": ["blog"],
        "tags": ["Jekyll"],
        "url": "/blog/jekyll-change-fonts/",
        "teaser":null},{
        "title": "Sibelius Violin Concerto in D minor, Op. 47",
        "excerpt":"듣고 왜 이 협주곡을 이전에 알지 못했을까 싶었습니다.     이 NAVER 지식백과의 칼럼을 통해 배경과 음악적 느낌을 접하시면 될 것 같습니다.   연주 시간은 대략 27분에서 33분 정도입니다.       연주도 일품이지만, 막심 벤게로프의 표정 변화를 보며 웃음을 참지 못하는 분들도 있으리라 생각합니다.  ","categories": ["music"],
        "tags": ["classic"],
        "url": "/music/sibelius-violin-concerto/",
        "teaser":null},{
        "title": "블로그에 MathJax 추가",
        "excerpt":"수식을 보기 좋게 렌더링해주는 MathJax를 추가하였습니다.     $ e^{\\pi i} + 1 = 0$ 같이 인라인 수식도,   \\[a^2 + b^2 = c^2\\]  같은 수식도 쓸 수 있습니다.   이 포스트 의 도움을 받아 쉽게 추가할 수 있었습니다.   ","categories": ["blog"],
        "tags": ["Jekyll"],
        "url": "/blog/add-mathjax/",
        "teaser":null},{
        "title": "Persistent Segment Tree w/ BOJ 13538",
        "excerpt":"헷갈리던 Persistent Segment Tree를 드디어 이해했습니다. Persistent Segment Tree란, 크기 $N$의 segment tree가 총 $M$번 상태 변화가 일어날 때, 이를 공간 복잡도 $O(N + M \\lg N)$에 저장하는 자료구조입니다. 대표적인 예시로 2차원 격자에서, 점 갱신이 일어나지 않을 때 $x_1 \\leq x \\leq x_2$이면서 $y_1 \\leq y \\leq y_2$를 만족하는 점의...","categories": ["algo"],
        "tags": ["PS","Data Structure"],
        "url": "/algo/persistent-segment-tree-xor-query/",
        "teaser":null},{
        "title": "2020년 1월 초반 Problem Solving",
        "excerpt":"연말연초라 문제 풀이를 많이 하지는 못했습니다. HLD 정도만 제대로 다시 짜보고, 수학 문제들 위주로 풀어보았습니다. TOPC 2015 E. Egg 문제 링크 : BOJ 11012 대표적인 persistent segment tree 사용 문제이고, 이전에 썼던 포스팅과 비교해가며 코딩해보았는데 좌표 압축 과정에서 황당한 실수를 며칠간 발견 못 해 고생했었습니다. BOJ 1040 정수 문제 링크...","categories": ["algo"],
        "tags": ["PS"],
        "url": "/algo/recent-ps-2020-01-0x/",
        "teaser":null},{
        "title": "2020년 1월 12일 Problem Solving",
        "excerpt":"문제를 조금 풀고 CF 613을 버추얼로 해보았습니다. BOJ 1376 민식우선탐색 링크 : BOJ 1376 특이한 순서로 DFS를 돌아야 합니다. 한 정점에서 방문할 수 있는 정점의 개수가 홀수면 중앙값의 정점 번호로, 짝수면 최소 정점 번호로 순회해야 합니다. 정점은 최대 $10^5$개지만 간선이 최대 $10^6$개입니다. 동적으로 변하는 자료의 중앙값을 구하는 대표적인 방법은 세그먼트...","categories": ["algo"],
        "tags": ["PS","Codeforces"],
        "url": "/algo/daily-ps-2020-0112/",
        "teaser":null},{
        "title": "2020년 1월 중순 Problem Solving",
        "excerpt":"풀고 싶은 문제만 쌓여가고 있습니다. 다양한 문제 풀이 BOJ 8339 Fibonacci Machine 문제 링크 lazy propgation을 통한 세그먼트 트리로 풀 수 있습니다. 구간 $[a, b]$에 대해 현재 합을 $F_{i_a} + F_{i_{a+1}} + \\cdots + F_{i_b}$로, 이전 합을 $F_{i_a - 1} + F_{i_{a+1} - 1} + \\cdots + F_{i_b - 1}$로...","categories": ["algo"],
        "tags": ["PS"],
        "url": "/algo/recent-ps-2020-01-1x/",
        "teaser":null},{
        "title": "USACO 2020 January Contest",
        "excerpt":"USACO Platinum을 오랜만에 쳐보았습니다.     대회를 다른 거 하면서 겸사겸사 치룬 와중에 1번 문제는 금방 풀려서 좋았습니다. 그러나 다음 두 문제를 생각할 시간이 별로 없었을 뿐더러 훨씬 더 어려웠습니다. 2번은 깊게 생각 안 했고 3번은 깊게 생각했었는데 삽질만 했습니다…시간이 나면 여기에 모든 Division의 문제 풀이를 작성해보도록 하겠습니다.   ","categories": ["algo"],
        "tags": ["PS"],
        "url": "/algo/USACO-2020-January-Contest/",
        "teaser":null},{
        "title": "ICPC 2019 World Finals 팀연습",
        "excerpt":"2020년의 첫 팀연습을 지난 21일에 19 WF로 돌아보았습니다. 블로그에 아직 제대로 글을 쓰지는 않았지만 제가 작년에 속해 있던 Powered by Zigui 팀이 ICPC 2020 World Finals에 진출하게 되었습니다. 이후 지구이님과 다른 분들께 조언을 많이 듣고, 앞으로 자주 하지 못할 3인 팀연습을 19 WF로 진행하였습니다. 결과는 생각보다는 저조했습니다. 서로 오랜만에 팀연습을...","categories": ["algo"],
        "tags": ["PS"],
        "url": "/algo/ICPC-2019-World-Finals-practice/",
        "teaser":null},{
        "title": "2019 ICPC Asia Da Nang Regional Contest 후기",
        "excerpt":"Powered by Zigui (pbz) 팀의 2019 ICPC Asia Da Nang Regional Contest 후기입니다. 돌아오는 비행기를 기다리며 작성한 내용이 많았는데, 그 이후 잊고 살다가 이제야 마무리해봅니다. 2019.12.04 (D-2) 1 WA = 5 Push Up 팀과 BFS_BROUGHT_ME_HERE 팀과 동행했습니다. 모두 멋있는 분들입니다. 비행기를 탔습니다. 밤 9시 15분 출발 비행기가 10시나 되서야 이륙했고,...","categories": ["algo"],
        "tags": ["PS","ICPC"],
        "url": "/algo/pdz-2019-danang-regional/",
        "teaser":null},{
        "title": "2020년 1월 말/2월 초 Problem Solving",
        "excerpt":"풀려는 문제를 연습대회로 만들어서 풀기로 마음먹었습니다. 원래 풀고자 하는 문제들을 목록으로 만들어서 이 문제들만 보려고 했는데, 각 문제들과 같은 대회에 있었던 문제들 중에서도 재밌어보이는 게 많아 그냥 멋대로 잡탕처럼 풀기로 했습니다. 1월 말~2월 초에 검수자로 들어가 있는 대회가 2개나 있어서 그동안은 2문제밖에 못 풀었고, 개인적인 일도 겹쳐서 2월 4일이 되어서야...","categories": ["algo"],
        "tags": ["PS"],
        "url": "/algo/recent-ps-2020-02-0x/",
        "teaser":null},{
        "title": "SCPC 2020 Round 1 후기",
        "excerpt":"매년 열리는 기업주최 알고리즘 대회 중 가장 화려한 축제인 SCPC가 돌아왔습니다. 이번 SCPC 2020 Round 1의 난이도 분포는 전례 없는 스타일이었습니다. 최근 3년간 SCPC 1차 예선은 첫 두 문제가 비슷한 난이도로 쉬운 축을 담당하고 있었습니다. 이번에는 약간의 수학적 지식을 이용하면 쉽게 풀 수 있는 1번 문제 다이어트가 역대 최대 만점자를...","categories": ["algo"],
        "tags": ["PS"],
        "url": "/algo/scpc-2020-round-1/",
        "teaser":null}]
