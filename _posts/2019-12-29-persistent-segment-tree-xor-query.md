---
title: "Persistent Segment Tree w/ BOJ 13538"
date: 2019-12-29 19:30
categories:
  - algo
tags:
  - PS
  - Data Structure
excerpt_separator: <!--more-->
---

헷갈리던 Persistent Segment Tree를 드디어 이해했습니다.

<!--more-->

Persistent Segment Tree란, 크기 $N$의 segment tree가 총 $M$번 상태 변화가 일어날 때, 이를 공간 복잡도 $O(N + M \lg N)$에 저장하는 자료구조입니다. 대표적인 예시로 2차원 격자에서, 점 갱신이 일어나지 않을 때 $x_1 \leq x \leq x_2$이면서 $y_1 \leq y \leq y_2$를 만족하는 점의 개수를 구하는데 사용될 수 있습니다.

Persistent Segment Tree의 개념은 다른 블로그에 설명이 잘 되어 있으므로, 여기서는 [BOJ 13538 XOR 쿼리](https://icpc.me/13538)를 해결하는데 사용한 코드를 서술하고 풀이해보자 합니다. 이해가 될 듯 말 듯 한 분들은 코드의 설명을 보시는 게 나을 수도 있습니다.

코드는 [cubelover님의 코드](https://cubelover.tistory.com/15)와 매우 흡사하게 진행됩니다.

### 요구 사항

이 문제의 골자는 다음과 같습니다. 배열 $A$가 있을 때,

+ 1번 쿼리 : $A$의 끝에 $x$를 추가
+ 2번 쿼리 : $A[L, R]$에서 $x$와 XOR한 값이 최대인 $y$ 계산
+ 3번 쿼리 : $A$의 마지막 $k$ 개 원소 삭제
+ 4번 쿼리 : $A[L, R]$에서 $x$ 이하의 원소 개수 계산
+ 5번 쿼리 : $A[L, R]$에서 $k$ 번째로 작은 수 계산

`root[i]`를 `i`번째 값까지 추가한 세그먼트 트리의 root라고 하면, `root[i]`의 값이 갱신되는 경우는 없음을 알 수 있습니다. 마지막 원소를 삭제하는 건 갱신이 아닌 삭제이고, 이전의 `root[i]`에는 영향을 미치지 않기 때문에 갱신이 아닙니다.

코드와 함께, 이 쿼리들을 어떻게 처리하는지 보도록 하겠습니다.

### `node` 구조체

Persistent Segment Tree의 각 노드는 이진 트리답게, 왼쪽 / 오른쪽 자식을 가리키는 포인터와 현재 값을 저장합니다.

```c++
struct node{
    node *l, *r;
    int val;
};
```

이제 이 노드를 얼마나 저장해야 하느냐도 중요합니다. 크기를 $N$, 변화 개수를 $M$이라 할 때

+ 1-indexed 초기 세그먼트 트리는 $2N$개의 노드를 요구로 합니다.
+ 이후, 세그먼트 트리의 변화를 저장할 때마다 $\lg N$개의 칸이 갱신되고, 별도로 한 개의 root node가 할당됩니다.

그러므로 node는 $2N + M (\lg N + 1)$개 있으면 되고, 각 세그먼트 트리의 root를 저장할 node pointer $M+1$개가 필요합니다. 코드에서는 혹시 몰라 1을 추가했습니다.

```c++
node a[(1<<20) + 20 * 500000 + 1], *root[500005];
```



### 초기화

PST의 기본이 되는 `root[0]` 세그트리입니다. 모든 값을 0으로 세팅하고, 자식 관계만 설정해주되 리프 노드는 그대로 내버려둡니다. 이러면 의미상 `a[1]`이 `root[0]`이 되며, `a[0]`은 null pointer를 의미하게 됩니다. 이는 1-index 세그먼트 트리랑 비슷합니다.

```c++
int tcnt;
void init(){
    root[0] = a + 1;
    for(int i=1;i<(1<<19);i++){
        a[i].l = a + (i << 1);
        a[i].r = a + (i << 1) + 1;
    }
    tcnt = 1<<20;
}
```



### 세그먼트 트리 생성

기존 세그먼트 트리들로부터 새로운 세그먼트 트리를 생성하는 과정입니다. 알고리즘을 생각하면 그리 어렵진 않습니다.

+ 우선, 새로운 루트 노드를 할당합니다. (처음에 `p`로 들어갑니다)
+ 한 칸 (`x`)만 갱신이 되기 때문에, 직전의 세그먼트 트리를 의미하는 `q`에서 $O(\lg n)$개 정도의 노드 변화만 있게 됩니다.
+ 바뀌는 쪽만 새로 노드를 할당하고, 그대로인 쪽은 `q`의 자식을 그대로 대입합니다.
+ 탑다운 방식으로 반복합니다.

이를 다음과 같이 구현할 수 있습니다.

```c++
// lv == -1 : leaf node, child with null
void add(node* p, node* q, int x, int lv=18){
    p->val = q->val + 1;
    if(lv < 0) return;
    if(x >> lv & 1) {
        p->l = q->l;
        p->r = a + ++tcnt;
        add(p->r, q->r, x, lv-1);
    }
    else {
        p->l = a + ++tcnt;
        p->r = q->r;
        add(p->l, q->l, x, lv-1);
    }
}
```

`lv`은 변경되는 index `x`에서, `1 << lv`을 계산하여 좌우 방향을 결정하기 위해 필요합니다. 연산자 우선 순위에 의해 `x >> lv & 1 `은 `1 << lv` 자리에 `x`의 비트가 1인지 묻는 것과 동일합니다. 0이면 왼쪽, 1이면 오른쪽을 갱신합니다.

`lv`이 `-1`이라는 건 자식이 모두 null pointer (`a[0]`)인, 리프 노드라는 뜻입니다. 기본적으로 `l`과 `r`이 0으로 초기화되므로, null pointer를 가리키게 됩니다. 

이를 통해 1번 쿼리를 해결할 수 있습니다.

중요한 점은, `root[i]`는 1번째 수부터 i번째 수까지 추가된 세그트리라는 사실입니다. 밑에서 서술된 쿼리 함수들은 이 성질에 기반해 작동합니다.

### 구간 최대 XOR 쿼리

이 문제에서 가장 복잡하면서 흔치 않은 쿼리가 아닌가 생각됩니다. 변화가 점층적으로 이루어진다는 점에 기반하여, i번째부터 j번째 세그먼트 트리를 보고 싶으면 `root[j]`와 `root[i-1]`를 비교해가며 따지면 됩니다. prefix sum의 개념과 비슷합니다.

함수의 로직 자체는 복잡하지 않습니다. `x`의 비트를 따져서, XOR를 최대화할 수 있는 방향으로 진행하는 것입니다.

```c++
int pst_xor(node* s, node* e, int x, int lv=18){
    if(lv < 0) return 0;
    if(x >> lv & 1) {
        if(e->l->val - s->l->val)
            return pst_xor(s->l, e->l, x, lv-1);
        return 1 << lv | pst_xor(s->r, e->r, x, lv-1);
    }
    else{
        if(e->r->val - s->r->val)
            return 1 << lv | pst_xor(s->r, e->r, x, lv-1);
        return pst_xor(s->l, e->l, x, lv-1);
    }
}
```
`p`, `q` 대신 `s`, `e`를 사용한 이유는 이 두 포인터를 통해 보고자 하는 수들의 범위를 지정할 수 있기 때문입니다.

`s`와 `e`는 구간을 처리하기 위한 node 포인터, `x`는 2번 쿼리의 값, `lv`는 보아야 할 비트의 위치를 의미합니다. 이 함수는 `s`와 `e` 사이에 있는 수 (변화) 중 `x`랑 XOR해서 가장 큰 값을 반환합니다.

이 함수를 통해 2번 쿼리를 해결할 수 있습니다.

### 구간 원소 개수 쿼리

j번째 세그트리에서 원소의 개수를 따지는 건 어렵지 않습니다. 역시 `x`의 비트를 따져가면서 1이면 (왼쪽) + (오른쪽 재귀), 0이면 (왼쪽 재귀)를 더하면 됩니다.

리프 노드 (`lv == -1`)일 때도 값을 더해주는 걸 잊으면 안 됩니다.

```c++
int pst_sum(node* s, int x, int lv=18){
    if(lv < 0) return s->val;
    if(x >> lv & 1) {
        return s->l->val + pst_sum(s->r, x, lv-1);
    }
    return pst_sum(s->l, x, lv-1);
}
```

`s`는 지금 보고 있는 node 포인터, `x`는 4번 쿼리의 값, `lv`는 보아야 할 비트의 위치를 의미합니다. 이 함수는 지금 보고 있는 노드에서 `x` 이하의 원소 개수를 반환합니다.

이 쿼리를 통해 4번 쿼리를 해결할 수 있습니다 (2번 호출하면 됩니다).

### 구간 k번째 원소 쿼리

위에 있던 XOR 쿼리와 비슷하게, `e`에서 `s`를 뺀 게 실제로 우리가 보아야 할 유효한 구간입니다. 답이 되는 index를 포함하는 쪽으로 재귀 함수를 호출합니다. 

```c++
int pst_kth(node* s, node* e, int k, int lv=18){
    if(lv < 0) return 0;
    if(e->l->val - s->l->val < k){
        k -= e->l->val - s->l->val;
        return 1 << lv | pst_kth(s->r, e->r, k, lv-1);
    }
    return pst_kth(s->l, e->l, k, lv-1);
}
```

`s`와 `e`는 구간을 처리하기 위한 node 포인터, `k`는 5번 쿼리의 값, `lv`는 보아야 할 비트의 위치를 의미합니다. 이 함수는 `s`와 `e` 사이에 있는 수 `k`번째로 작은 수를 반환합니다 (1-index).

이 함수로 5번 쿼리를 해결할 수 있습니다.

### `main` 함수

나머지 3번 쿼리는`main` 함수에서 카운터를 감소하는 걸로 처리할 수 있고, 이제 쿼리만 호출하면 됩니다.

```c++
int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);

    init();
    int q;
    cin >> q;
    int n = 0;
    while(q--) {
        int t, l, r, k, x;
        cin >> t;
        if(t == 1){
            cin >> x;
            n++;
            root[n] = a + ++tcnt; // root node 생성
            add(root[n], root[n-1], x);
        }
        else if(t == 2) {
            cin >> l >> r >> x;
            cout << pst_xor(root[l-1], root[r], x) << '\n';
        }
        else if(t == 3) {
            cin >> k;
            n -= k;
        }
        else if(t == 4) {
            cin >> l >> r >> x;
            cout << pst_sum(root[r], x) - pst_sum(root[l-1], x) << '\n';
        }
        else {
            cin >> l >> r >> k;
            cout << pst_kth(root[l-1], root[r], k) << '\n';
        }
    }
}
```

이렇게 짜면, [BOJ 13538 XOR 쿼리](https://icpc.me/13538)를 시간 복잡도 $ O(M \lg N)$ 해결할 수 있습니다 ($ N = 2^{19}$).

