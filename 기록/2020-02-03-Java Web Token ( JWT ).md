# Java Web Token ( JWT )

#### 기본 구조 ( Architecture )

##### 1. Header ( JWT 웹 토큰의 헤더 정보 )

- typ : 토큰의 타입, JWT만 존재
- alg : 해싱 알고리즘 ( HMACSHA256 또는 RSA )
  - 헤더를 암호화 하는게 아니다. 토큰 검증시 사용.

```
{
	"alg" : "HS256",
	"typ" : "JWT"
}
```

##### 2. Payload

- 실제 토큰으로 사용하려는 데이터가 담기는 부분, 각 데이터를 Claim이라고 하며 다음과 같이 3가지 종류가 있다
- `Reserved claims` : 이미 예약된 Claim. 필수는 아니지만 사용하길 권장. key는 모두 3자리 String이다.
  - iss (String) : issuer, 토큰 발행자 정보
  - exp (Number) : expiration time, 만료일
  - sub (String) : subject, 제목
  - aud (String) : audience
  - [More](https://tools.ietf.org/html/draft-jones-json-web-token-07#section-4.1)

- `Public claims` : 사용자 정의 Claim.
  - Public 이라는 이름처럼 공개용 정보
  - 충돌 방지를 위해 URI 포맷을 이용해 저장한다.
- `Private claims` : 사용자 정의 Claim
  - Public claims 와 다르게 사용자가 임의로 정한 정보
  - 아래와 같이 일반 정보를 저장한다.

```
{
	"name" : "hak",
	"age" : 26
}
```

##### 3. Signature

- Header와 Payload의 데이터 무결성과 변조 방지를 위한 서명 
- Header + Payload를 합친 후, Secret 키와 함께 Header의 해싱 알고리즘으로 인코딩

```
HMACSHA256(
	base64UrlEncode(header)+"."+
	base64UrlEncode(payload),
	secret)
```



#### JWT 구조

- JWT는 [ Header Payload Signature] 각각 JSON 형태의 데이터를 `base 64` 인코딩 후 합친다.
- 아래와 같은 순서로 `.`을 이용해 합친다.
- 최종적으로 만들어진 토큰은 HTTP 통신 간 이용되며, `Authorization`이라는 `key`의 `value`로서 사용 된다.

![](document_img/JWT-Architecturepng.png)

이미지 출처 : https://sanghaklee.tistory.com/47

#### JWT 인증 과정

![](C:\Users\multicampus\Desktop\스켈레톤_공통\sub2-project\heartmarket\document_img\JWT-process.png)

이미지 출처 : https://sanghaklee.tistory.com/47



#### JWT의 단점 & 도입시 고려사항

- `Self-contained` :  토큰 자체에 정보가 있다는 사실은 양날의 검이 될 수 있다.

  - `토큰 길이` : 토큰 자체 payload에 Claim set을 저장하기 때문에 정보가 많아질수록 토큰의 길이가 늘어나 네트워크에 부하를 줄 수 있다.

  - `payload 암호화` : payload 자체는 암호화 되지 않고 base64로 인코딩한 데이터다.

    중간에 payload를 탈취하면 디코딩을 통해 데이터를 볼 수 있다.

    JWE를 통해 암호화하거나, payload에 중요 데이터를 넣지 않아야 한다.

- `Stateless` : 무상태성이 때론 불편할 수 있다. 토큰은 한번 만들면 서버에서 제어가 불가능하다. 
  토큰을 임의로 삭제할 수 있는 방법이 없기 때문에 토큰 만료시간을 꼭 넣어주는게 좋다.

- `store Token` : 토큰은 클라이언트 side에서 관리해야하기 때문에 토큰을 저장해야 한다.



#### References

[[JWT/JSON Web Token] 로그인 / 인증에서 Token 사용하기](https://sanghaklee.tistory.com/47)

[[JWT] 토큰(Token) 기반 인증에 대한 소개](https://velopert.com/2350)

[[JWT] JSON Web Token 소개 및 구조](https://velopert.com/2389)

[[Node.js] Token 기반 인증](https://behonestar.tistory.com/37)

[SignWith 메서드 deprecated ](https://stackoverflow.com/questions/40252903/static-secret-as-byte-key-or-string)



#### 구현시 참조

[SpringSecurity 간단한 설정과 예제](https://galid1.tistory.com/576)

[JWT생성 및 검증](https://charlie-choi.tistory.com/211)

[Jwt 구현 기초](https://hyojun123.github.io/2018/07/17/JWT2/)