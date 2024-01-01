---
title: "Good Bye, BOJ 2023! 참가 후기 / 업솔빙"
date: 2024-01-01T21:40:00+09:00
categories:
  - algo
tags:
  - ps
  - boj
  - competition
  - goodbye-boj
  - 2023
  - upsolving
summary: 오랜만에 BOJ 대회에 참가했습니다. 새해 복 많이 받으세요.
toc: true
---

올해도 전대프연 주최 하에 [Good Bye, BOJ 2023!](https://2023w.ucpc.me/)이 진행되었습니다. PS를 손 놓은지 오래되어서 좋은 성적은 기대하지 않았지만 실력보다는 상황 파악 능력이 더 떨어졌다는 느낌을 받았습니다. 문제는 C번이 조금 구현이 까다로웠다는 점을 빼고는 정말 마음에 들었습니다. 대회를 준비하고 또 참가한 분들 모두 고생 많으셨습니다.

## 대회 타임라인
저는 닉네임 `oddeasier`로 참가했습니다. 지금 생각해보면 원본 닉네임과 글자수를 통일하기 위해 `odd_easier`로 할 걸 그랬습니다.

- 0:01 : **A AC**. 다행스럽게도 A번이 매우 간단하게 나왔습니다.
- 0:07 : **B AC**. 지문의 컨셉이 특히 마음에 들었습니다.
- 0:52 : **C AC(+2)** : 구현이 생각보다 산으로 갔습니다. 인덱싱 실수로 2번 정도 틀렸습니다.
- 1:21 : **D AC(+1)** : 재밌게 풀었습니다. 첫 WA에서 반례를 금방 찾았습니다.
- 이후 E를 HLD로 삽질하다 끝났습니다. 저는 예로부터 자료구조랑 친하지 않았다는 사실을 깨달았습니다.
- 업솔빙 때는 F를 40분 정도만에 풀었습니다. 대회 중에 좀 분위기가 어수선하기도 했는데 끝나고 보니 풀이가 엄청 자명하게 나와서 아쉬웠습니다.
- 4솔브 55등으로 마무리되었습니다. 6솔브가 35명이나 되어서 '와 다들 잘하신다~' 생각만 들었습니다.

## 문제 풀이 및 업솔빙
G는 읽어보지도 못했는데 티어를 보니 할만해보여서 전부 업솔빙을 해봤습니다. 간략한 풀이와 디버깅 코드를 제외한 소스 코드도 첨부하였습니다.

### A. 2023은 무엇이 특별할까?
프로그래밍 언어에 따라 one-liner가 쉽게 나올법한 문제입니다. 연도의 끝 두 자리는 `n % 100`이므로 `(n + 1) % (n % 100)`을 확인해보면 됩니다.

```c++
#include <algorithm>
#include <ios>
#include <iostream>
#include <string>
#include <vector>

using namespace std;
using ll = long long;

int main() {
  ios_base::sync_with_stdio(false);
  cin.tie(nullptr);

  int t;
  cin >> t;
  while (t--) {
    int n;
    cin >> n;
    cout << ((n + 1) % (n % 100) ? "Bye" : "Good") << '\n';
  }
}
```

### B. 거짓말
$k$명이 거짓말하고 하고 있는 상황을 가정할 때, '$x\ (x < k)$명 이하가 거짓말을 하고 있다'와 '$x\ (x>k)$명 이상이 거짓말을 하고 있다'라고 주장하는 사람이 거짓말을 하고 있습니다. $k$를 $0$에서부터 $n$까지 순회하면서 누적합 등을 통해 실제로 거짓말을 하는 사람이 $k$명인지 확인하면 됩니다.
```c++
#include <algorithm>
#include <ios>
#include <iostream>
#include <string>
#include <vector>

using namespace std;
using ll = long long;

int cnt[2][500005];
int main() {
  ios_base::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    cnt[x > 0][abs(x)]++;
  }
  vector<int> ans;
  int res = 0;
  for (int i = 1; i <= n; i++)
    res += cnt[1][i];
  for (int i = 0; i <= n; i++) {
    if (res == i)
      ans.push_back(i);
    res += cnt[0][i];
    res -= cnt[1][i + 1];
  }
  cout << ans.size() << '\n';
  for (int x : ans)
    cout << x << ' ';
}
```
### C. 스티커 재배치
$S$의 위치를 정했으면, 두 가지 상황이 발생합니다.
- 현재 스티커랑 $S$에 대응되는 알파벳이 동일할 때: 그대로 내버려두면 됩니다.
- 그 외의 경우: 현재 스티커를 떼야 합니다.

그 외의 경우에 해당하는 알파벳에 대해서는 스티커를 새로 붙여야 하는데, 스티커를 가져올 수 있는 방법도 3가지가 있습니다.

1. 아까 전 뗀 스티커를 부착
2. $S$랑 겹치는 위치에 있지 않으면서 알파벳이 같은 스티커를 떼고 부착
3. 알파벳이 같은 스티커를 새로 구매

1번의 경우 추가 비용이 0이기 때문에 우선적으로 처리해야 합니다. 3번은 해당 알파벳의 최소 구매 비용 $\min(a_j)$를 미리 전처리해두면 구할 수 있습니다. 2번의 경우 3번보다 비용이 낮을 때만 고려하면 됩니다. 저는 알파벳별로 새로 스티커를 붙이는 비용을 담는 `std::vector`를 만들었으며, 1번에 해당하면 0, 2번에 해당하면 `d_j`을 넣고 내림차순으로 정렬해 뒤에서부터 뽑았습니다. `std::vector`가 비면 3번에서 계산한 비용(불가능할 경우 적당히 큰 값으로 처리)을 사용해주면 됩니다.

```c++
#include <algorithm>
#include <ios>
#include <iostream>
#include <string>
#include <vector>

using namespace std;
using ll = long long;
const int inf = 1e9;

struct sticker {
  char ch;
  int d, a;
  sticker(char ch = 0, int d = 0, int a = 0) : ch(ch), d(d), a(a) {}
};

vector<vector<int>> detach;
int buy[128];

sticker st[505];
int ord[505];
int main() {
  ios_base::sync_with_stdio(false);
  cin.tie(nullptr);
  detach.resize(128);
  fill(buy, buy + 128, inf);

  int n, m, k;
  cin >> n >> m >> k;
  for (int i = 0; i < m; i++) {
    string s;
    int d, a;
    cin >> s >> d >> a;
    st[i] = sticker(s[0], d, a);
    buy[s[0]] = min(buy[s[0]], a);
  }
  for (int i = 0; i < n; i++) {
    cin >> ord[i];
    ord[i]--;
  }
  string target;
  cin >> target;

  int ans = inf;
  for (int i = 0; i <= n - k; i++) {
    int res = 0;
    int le[128] = {};
    for (char ch : target)
      le[ch]++;

    for (int j = 0; j < 128; j++)
      detach[j].clear();
    for (int j = 0; j < i; j++) {
      if (st[ord[j]].d < buy[st[ord[j]].ch])
        detach[st[ord[j]].ch].push_back(st[ord[j]].d);
    }
    for (int j = i + k; j < n; j++) {
      if (st[ord[j]].d < buy[st[ord[j]].ch])
        detach[st[ord[j]].ch].push_back(st[ord[j]].d);
    }
    for (char ch = 'a'; ch <= 'z'; ch++)
      sort(detach[ch].rbegin(), detach[ch].rend());

    for (int j = i; j < i + k; j++) {
      if (target[j - i] != st[ord[j]].ch) {
        res += st[ord[j]].d;
        detach[st[ord[j]].ch].push_back(0);
      } else
        le[st[ord[j]].ch]--;
    }
    for (char ch = 'a'; ch <= 'z'; ch++) {
      while (le[ch]) {
        while (detach[ch].size()) {
          res += detach[ch].back();
          detach[ch].pop_back();
          le[ch]--;
          if (le[ch] == 0)
            break;
        }
        if (le[ch] == 0)
          break;
        res += buy[ch];
        le[ch]--;
        if (res >= inf)
          break;
      }
      if (res >= inf)
        break;
    }
    ans = min(ans, res);
  }
  if (ans >= inf)
    ans = -1;
  cout << ans << '\n';
}

```
코드를 작성하면서도 `st[ord[j]]`를 따로 변수를 선언해야 하나 고민이 많았습니다. 빠르면서도 깔끔한 코드를 짜기가 참 어렵습니다.
### D. 23E
가능한 쌍은 $ (2, 2) $, $(2, 3)$, $(2, E)$, $(3, 3)$, $(3, E)$, $(E, E)$로 총 6가지이며, 이 중 $(2, 2)$와 $(3, E)$는 이미 일치하기 때문에 교환에 고려하지 않아도 됩니다. 이후 교환 우선순위는 다음과 같습니다.
- $(2, 3)$과 $(2, E)$를 교환하면 $(2, 2)$와 $(3, E)$가 만들어집니다.
- $(3, 3)$과 $(E, E)$를 교환하면 $(3, E)$가 2개 만들어집니다.

위 2개의 교환은 교환시 아름다움이 최대로 증가하는 방법이기 때문에 최대한 하면 됩니다. 이후 할 수 있는 교환은 다음과 같습니다.
- $(2, 3)$과 $(E, E)$를 교환하며 $(2, E)$, $(3, E)$을 만듭니다.
- $(2, E)$와 $(3, 3)$을 교환하여 $(2, 3)$, $(3, E)$를 만듭니다.
- $(2, 3)$과 $(2, 3)$을 교환하여 $(2, 2)$, $(3, 3)$을 만듭니다.
- $(2, E)$와 $(2, E)$를 교환하여 $(2, 2)$, $(E, E)$를 만듭니다.

4개의 교환 모두 아름다움을 2밖에 늘리지 못하지만, 부산물을 이용하면 다음에 아름다움이 4 증가하는 교환이 가능해질 수도 있습니다. 아름다움이 4 증가할 수 있는 교환을 다음에 할 수 있게 하는 교환을 우선시하고, 그 외에는 아무렇게나 하면 됩니다.

```c++
#include <algorithm>
#include <ios>
#include <iostream>
#include <string>
#include <vector>

using namespace std;
using ll = long long;

string s;
int main() {
  ios_base::sync_with_stdio(false);
  cin.tie(nullptr);

  int n, k;
  cin >> n >> k;
  cin >> s;
  int a_ee = 0, a_33 = 0, a_e2 = 0, a_32 = 0;
  int ans = 0;
  for (int i = 0; i < n / 2; i++) {
    if (0 + s[i] + s[n - 1 - i] == 0 + 'E' + 'E')
      a_ee++;
    else if (0 + s[i] + s[n - 1 - i] == 0 + '3' + '3')
      a_33++;
    else if (0 + s[i] + s[n - 1 - i] == 0 + 'E' + '2')
      a_e2++;
    else if (0 + s[i] + s[n - 1 - i] == 0 + '3' + '2')
      a_32++;
    else
      ans++;
  }
  ans *= 2;
  cout << ans << '\n';
  auto doit = [&]() {
    if (a_ee && a_33) {
      a_ee--;
      a_33--;
      return 2;
    }
    if (a_e2 && a_32) {
      a_e2--;
      a_32--;
      return 2;
    }
    if (a_32) {
      if (a_ee && a_32) {
        a_ee--;
        a_32--;
        a_e2++;
        return 1;
      }
    }
    if (a_e2) {
      if (a_33 && a_e2) {
        a_33--;
        a_e2--;
        a_32++;
        return 1;
      }
    }
    if (a_ee) {
      if (a_32 >= 2) {
        a_32 -= 2;
        a_33++;
        return 1;
      }
    }
    if (a_33) {
      if (a_e2 >= 2) {
        a_e2 -= 2;
        a_ee++;
        return 1;
      }
    }
    if (a_33 && a_e2) {
      a_33--;
      a_e2--;
      a_32++;
      return 1;
    }
    if (a_ee && a_32) {
      a_ee--;
      a_32--;
      a_e2++;
      return 1;
    }
    if (a_32 >= 2) {
      a_32 -= 2;
      a_33++;
      return 1;
    }
    if (a_e2 >= 2) {
      a_e2 -= 2;
      a_ee++;
      return 1;
    }
    return 0;
  };
  for (int i = 1; i <= k; i++) {
    ans += 2 * doit();
    cout << ans << '\n';
  }
}
```
역시 작성하면서 저 반복되는 분기문을 따로 함수로 빼야 하나 말아야 하나 고민이 많았지만 손은 이미 yank하는 쪽으로 움직이고 있었습니다.

### E. 전기 전송
HLD에 매몰되서 대회에서 많은 시간을 허비하고 풀지도 못했지만 대회 종료 후 LCA로만 풀 수 있다는 사실을 깨닫고 실력이 많이 녹슬었구나 싶었습니다. 문제의 연산 $ \left\lfloor \dfrac{\max(e - r_i, 0)}{z_i} \right\rfloor $는 다음 수학적 성질 때문에 chaining이 가능합니다.

$$ n \in \mathbb{N}, m \in \mathbb{Z} \implies \forall x \in \mathbb{R}, \left\lfloor \dfrac{x + m}{n} \right\rfloor = \left\lfloor \dfrac{\lfloor x \rfloor + m}{n} \right\rfloor$$

$x$와 $y$의 LCA $p$를 구하면, sparse table의 원리를 이용해 $x$에서 $p$까지 연산을 chaining하고 $p$에서 $y$까지의 연산을 chaining하면 됩니다. chaining에서 교환법칙이 성립하지 않기 때문에 $p$에서 $y$로 내려가는 부분은 $y$에서 $p$로 올라가는 순으로 바꾸되, 연산 순서만 거꾸로 했습니다.

제가 사용한 코드의 일부분만 떼오면 다음과 같습니다.
```c++
#include <algorithm>
#include <ios>
#include <iostream>
#include <string>
#include <vector>

using namespace std;
using ll = long long;
const ll inf = 1e18 + 10;

ll clamp(ll a, ll b, ll c = 0) {
  if (max(a, b) == 0)
    return c;
  if (inf / max(a, b) < min(a, b))
    return inf;
  return min(a * b + c, inf);
}

struct edge {
  int to, r, z;
};

struct wire {
  ll r, z;
  wire(ll r = 0, ll z = 1) : r(r), z(z) {}
  template <typename T> wire operator+(T &&x) {
    return wire(clamp(z, x.r, r), clamp(z, x.z));
  }
  ll apply(ll e) {
    ll &&res = max(e - r, 0ll) / z;
    return res;
  }
};

const int MAXN = 100003;
vector<edge> v[MAXN];
int par[17][MAXN];
wire w0[17][MAXN];
wire w1[17][MAXN];
int lv[MAXN];

void dfs(int x, int p) {
  par[0][x] = p;
  lv[x] = lv[p] + 1;
  for (auto [y, r, z] : v[x]) {
    if (y == p)
      continue;
    w1[0][y] = w0[0][y] = wire(r, z);
    dfs(y, x);
  }
}

void make_par() {
  for (int i = 1; i < 17; i++) {
    for (int j = 1; j < MAXN; j++) {
      int p0 = par[i - 1][j];
      par[i][j] = par[i - 1][p0];
      w1[i][j] = w1[i - 1][p0] + w1[i - 1][j];
      w0[i][j] = w0[i - 1][j] + w0[i - 1][p0];
    }
  }
}

void level_up(int &x, int d) {
  for (int i = 0; d; i++, d >>= 1) {
    if (d & 1)
      x = par[i][x];
  }
}

int get_lca(int x, int y) {
  int d = lv[x] - lv[y];
  if (d > 0)
    level_up(x, d);
  else
    level_up(y, -d);
  for (int i = 16; i >= 0; i--) {
    if (par[i][x] != par[i][y])
      x = par[i][x], y = par[i][y];
  }
  return x == y ? x : par[0][x];
}

template <int DIR> wire apply_wire(int x, int d, int i = 0) {
  const auto &w = DIR ? w1 : w0;
  if (!d)
    return wire();
  if (d & 1) {
    auto wcur = w[i][x];
    auto wnxt = apply_wire<DIR>(par[i][x], d >> 1, i + 1);
    if (DIR)
      return wnxt + wcur;
    else
      return wcur + wnxt;
  } else {
    return apply_wire<DIR>(x, d >> 1, i + 1);
  }
}

ll query(int x, int y, ll e) {
  int p = get_lca(x, y);
  e = apply_wire<0>(x, lv[x] - lv[p]).apply(e);
  e = apply_wire<1>(y, lv[y] - lv[p]).apply(e);
  return e;
}

int main() {
  ios_base::sync_with_stdio(false);
  cin.tie(nullptr);
  int n;
  cin >> n;
  for (int i = 1; i < n; i++) {
    int x, y, r, z;
    cin >> x >> y >> r >> z;
    v[x].emplace_back(y, r, z);
    v[y].emplace_back(x, r, z);
  }
  dfs(1, 0);
  make_par();
  int q;
  cin >> q;
  while (q--) {
    int x, y;
    ll e;
    cin >> x >> y >> e;
    cout << query(x, y, e) << '\n';
  }
}
```
### F. 등수
$n$명 중 $k$등인 상황은 우선 나보다 앞선 사람이 $k-1$명 있다는 뜻입니다. $k-1$명끼리 순위가 배분되는 경우의 수를 먼저 따져보겠습니다. $f(n)$을 $n$명끼리 순위를 정하는 경우의 수라고 하면, 다음과 같은 수식이 나옵니다.

$$ f(n) = \sum_{1 \leq x < n} \binom{n}{x} f(n-x)$$

$\binom{n}{x}$는 1등이 $x$명이면 1등인 조합을 고르는 경우의 수, $f(n-x)$는 나머지 $n-x$명의 등수를 정하는 경우의 수입니다. 비슷하게, 1등인 금성이를 포함해서 $n$명의 순위를 정하는 경우의 수를 $g(n)$이라고 하면

$$ g(n) = \sum_{1 \leq x < n} \binom{n-1}{x-1} g(n-x)$$
가 됩니다. 1등 한 명이 고정되었기 때문에 나머지 1등 $x-1$명을 고르는 경우의 수 $\binom{n-1}{x-1}$, 뒷순위를 정하는 경우의 수 $g(n-x)$의 곱의 합이 됩니다.

여기까지 계산이 되었으면, 질의 $(n, k)$에 대한 정답은 금성이보다 앞선 $k-1$명의 조합을 고르는 $\binom{n-1}{k-1}$에 $f(k-1)$과 $g(n-k+1)$의 곱이 됩니다. 물론 구현시 나머지 연산을 꼬박꼬박 해주어야 합니다.
```c++
#include <algorithm>
#include <ios>
#include <iostream>
#include <string>
#include <vector>

using namespace std;
using ll = long long;
constexpr ll mod = 1'000'000'007;
constexpr int MAXN = 5005;

ll f[MAXN], fi[MAXN];
ll dp0[MAXN] = {1, 1}, dp1[MAXN] = {1, 1};

ll mpow(ll x, ll y) {
  if (!y)
    return 1;
  if (y & 1)
    return x * mpow(x * x % mod, y >> 1) % mod;
  return mpow(x * x % mod, y >> 1);
}
ll binom(int n, int r) {
  if (n < 0 || r < 0 || n < r)
    return 0;
  return f[n] * fi[r] % mod * fi[n - r] % mod;
}

int main() {
  ios_base::sync_with_stdio(false);
  cin.tie(nullptr);

  f[0] = 1;
  for (int i = 1; i < MAXN; i++)
    f[i] = i * f[i - 1] % mod;
  fi[MAXN - 1] = mpow(f[MAXN - 1], mod - 2);
  for (int i = MAXN - 1; i; i--)
    fi[i - 1] = i * fi[i] % mod;

  for (int i = 2; i < MAXN; i++) {
    for (int j = 1; j <= i; j++) {
      dp0[i] += binom(i, j) * dp0[i - j];
      dp1[i] += binom(i - 1, j - 1) * dp0[i - j];
      dp0[i] %= mod;
      dp1[i] %= mod;
    }
  }

  int q;
  cin >> q;
  while (q--) {
    int n, k;
    cin >> n >> k;
    cout << binom(n - 1, k - 1) * dp0[k - 1] % mod * dp1[n - k + 1] % mod
         << '\n';
  }
}
```

### G. 오직 5%의 사람들만이 이 문제를 풀 수 있습니다

[5%만의 사람이 풀 수 있다면서 실상은 도저히 인간의 연산능력으로는 계산할 수 없는 타원곡선 문제](https://www.reddit.com/r/puzzles/comments/azf0zo/im_stuck_on_this_one/)가 생각나는 문제 제목입니다. $2^{20}$과 $10^6$이 비슷한 규모이기 때문에 이진수 스위치를 이용해 반복시키는 건가?라는 생각이 들었습니다. 조금 생각해보니 $k=1$일 때 가능해야 하기 때문에 시작 위치와 도착 위치는 같은 선상에 있을 수밖에 없습니다. $k=2$와 $k=3$은 각각 정반대방향으로 보내기, 90도 방향으로 보냈다가 돌아오게 하기로 풀 수 있습니다.

![k=1,2,3일 때의 예시](/images/2024/01/goodbye-2023-g-01.jpg)

4일 때는 어떻게 해야 하나 싶었는데, 다음과 같이 작성하니까 되었습니다.

![k=4일 때의 예시](/images/2024/01/goodbye-2023-g-02.jpg)

이 4를 어떻게 재활용해야 하나 관찰해본 결과, 재사용을 하려면 도착위치쪽 방향이 아닌 약간의 우회 경로를 타게 해야 한다는 생각이 들었습니다. 다음 탄에서 다시 루프에 넣으면 어떻게 되나 봤는데 $k=10$과 $k=7$을 해결했습니다.


![k=10,7일 때의 예시](/images/2024/01/goodbye-2023-g-03.jpg)

이를 일반화하니 다음과 같은 게임판이 완성되었습니다. 현재 스위치를 활성화하면 이전까지의 모든 스위치를 활성화하는데, 눌러야하는 버튼 수가 $f(0) = 3$이고, $f(n) = 3 + \sum\limits_{0 \leq k < n} f(k)$가 되면서 $f(n) = 3 \cdot 2^{n}$의 일반항이 도출됩니다.

![완성된 게임판](/images/2024/01/goodbye-2023-g-04.jpg)

그러므로 $k = k-1$을 대입하고 3으로 나눈 나머지에 따라 처음 한 칸을 처리한 후, 나머지를 스위치로 처리하면 최대 19개만의 칸만을 조작해 해결할 수 있습니다. interactive의 탈을 쓴 constructive 문제였습니다. 다양한 풀이가 있을텐데 다른 구성해도 궁금합니다.

```c++
#include <algorithm>
#include <ios>
#include <iostream>
#include <string>
#include <vector>

using namespace std;
using ll = long long;

char board[2][103][103];
int dx[4] = {1, 0, -1, 0};
int dy[4] = {0, -1, 0, 1};

// verification purpose
int eval_board(int n, int m, int x, int y) {
  auto &b0 = board[0];
  auto &b1 = board[1];
  int cnt = 0;
  if (b0[x][y] == '0')
    return 0;
  while (b0[x][y] > '0') {
    int dir = b0[x][y] - '1';
    int nx = x, ny = y;
    while (b0[nx][ny] == dir + '1') {
      swap(b0[nx][ny], b1[nx][ny]);
      nx += dx[dir];
      ny += dy[dir];
    }
    cnt++;
    x = nx, y = ny;
  }
  return b0[x][y] == '0' ? cnt : -1;
}

void print_board(int n) {
  for (int i = 1; i <= n; i++)
    cout << &board[0][i][1] << endl;

  for (int i = 1; i <= n; i++)
    cout << &board[1][i][1] << endl;
}

int main() {
  ios_base::sync_with_stdio(false);
  auto set_board = [&](int i, int j, int b0, int b1) {
    board[0][i][j] = b0 + '0';
    board[1][i][j] = b1 + '0';
  };

  int n = 19, m = 22;
  for (int i = 1; i <= n; i++)
    for (int j = 1; j <= m; j++)
      set_board(i, j, 1, 1);

  set_board(1, 1, 4, 4);
  set_board(1, 2, 4, 4);
  set_board(1, 3, 4, 1);
  set_board(1, m, 0, 0);
  set_board(2, 2, 3, 3);
  for (int i = 2; i <= 19; i++) {
    set_board(i, 3, 3, 3);
    for (int j = 1; j < i; j++) {
      set_board(i, 3 + j, 2, 2);
      if (j == 1)
        set_board(j, i + 2, 4, 1);
      else
        set_board(j, i + 2, 1, 1);
    }
  }
  cout << n << ' ' << m << endl;
  print_board(n);
  cout << "1 2" << endl;

  int k0, k;
  cin >> k0;
  k = k0;
  k--;

  if (k % 3 == 1) {
    set_board(1, 2, 2, 4);
  } else if (k % 3 == 2) {
    set_board(1, 2, 1, 4);
  }
  k = k / 3;

  for (int i = 0; i < 19; i++) {
    if (k & (1 << i)) {
      set_board(1, i + 3, 1, 4);
    }
  }

  print_board(n);
}
```
여담으로 업솔빙시 시간 초과가 나서 아리송했는데, `cin.tie(nullptr)` 때문이었습니다.

## 결론
대회 성적은 아쉬웠지만 그와 별개로 업솔빙까지 정말 재밌었습니다. 본선 대회를 나갈 수 있을지는 잘 모르겠지만 나간다면 이번 예선과 작년 본선보다는 받아들일 수 있는 결과를 일궈내고 싶습니다. 앞으로 PS를 손볼 시간은 점점 줄어들 것 같지만 종종 알고리즘 풀이라는 지적 유희를 즐기며 살아야겠습니다.



