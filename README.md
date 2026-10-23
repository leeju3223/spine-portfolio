# Spine Portfolio — Starter

다크 테마 원페이지형 Spine 애니메이션 포트폴리오의 첫 번째 프로토타입입니다.

## 포함된 기능

- 반응형 다크 테마 원페이지
- 공식 Spine Web Player 연결
- Idle / Walk / Attack / Hit 버튼
- 캔버스 클릭 시 Attack 재생 후 Idle로 복귀
- 재생 속도 선택
- Spine 에셋이 없거나 로딩에 실패했을 때 안내 표시
- GitHub Pages 배포를 위한 상대 경로 사용

## 폴더 구조

```text
spine-portfolio-starter/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── main.js
└── assets/
    └── character/
        └── README.txt
```

## 1. 로컬에서 실행

`index.html`을 파일 더블클릭으로 열기보다 로컬 웹 서버를 사용하세요.

### VS Code 사용 시
1. 폴더를 VS Code로 엽니다.
2. Live Server 확장 프로그램을 설치합니다.
3. `index.html`에서 **Open with Live Server**를 선택합니다.

### Python이 설치되어 있다면
프로젝트 폴더에서 터미널을 열고 다음을 실행합니다.

```bash
python -m http.server 8000
```

브라우저에서 `http://localhost:8000`으로 접속합니다.

## 2. 내 Spine 캐릭터 넣기

1. Spine Editor에서 프로젝트를 **JSON** 형식으로 내보냅니다.
2. Texture Atlas도 함께 내보냅니다.
3. 다음 파일을 `assets/character/`에 복사합니다.
   - `character.json`
   - `character.atlas`
   - atlas 파일이 참조하는 PNG 텍스처 파일(이름은 atlas 안에 적힌 파일명과 일치해야 합니다)
4. 파일명을 다르게 유지하려면 `js/main.js` 상단 `CONFIG`의 `skeleton`과 `atlas` 경로를 변경합니다.
5. `CONFIG.defaultAnimation`, `clickAnimation`, `idleAnimation` 및 버튼의 `data-animation` 값을 실제 애니메이션 이름으로 바꿉니다.

예를 들어 Spine에서 애니메이션 이름이 `Idle_01`, `Attack_A`라면 코드에서도 똑같이 사용해야 합니다.

### 중요: Spine 버전

현재 `index.html`은 Spine Web Player **4.2.x** CDN을 참조합니다. Spine Editor에서 내보낸 데이터와 호환되는 런타임 버전을 사용해야 합니다. 4.1, 4.2, 4.3 등 서로 다른 버전의 데이터를 무조건 섞어 쓸 수 있는 것은 아닙니다. 필요하면 두 CDN 주소의 `4.2.*`를 프로젝트 버전에 맞춰 변경하세요.

공식 문서: https://en.esotericsoftware.com/spine-player

## 3. GitHub Pages 배포

1. GitHub에서 새 저장소(repository)를 만듭니다.
2. 이 폴더 안의 파일을 저장소 루트에 업로드합니다. `index.html`이 루트에 있어야 합니다.
3. 저장소의 **Settings → Pages**로 이동합니다.
4. **Build and deployment → Deploy from a branch**를 선택합니다.
5. 브랜치 `main`, 폴더 `/ (root)`를 선택하고 저장합니다.
6. 잠시 기다리면 Pages 주소가 생성됩니다.

GitHub Pages는 정적 호스팅이므로 이 프로젝트에는 서버 코드가 필요하지 않습니다. CDN의 Spine Player를 불러오기 위해 방문자의 브라우저가 인터넷에 연결되어 있어야 합니다.

## 4. 배포 전 체크리스트

- [ ] 캐릭터 JSON/atlas/PNG를 업로드했는가?
- [ ] atlas 파일 안의 텍스처 파일명이 실제 PNG 이름과 일치하는가?
- [ ] Spine 런타임 버전과 내보내기 버전이 호환되는가?
- [ ] 실제 애니메이션 이름으로 버튼과 CONFIG를 바꿨는가?
- [ ] 모바일 화면과 클릭 동작을 확인했는가?
- [ ] 공개하면 안 되는 원본 프로젝트나 상용 에셋이 저장소에 포함되지 않았는가?
- [ ] 연락처, 소개, 작업 이미지가 실제 정보로 교체되었는가?

## 참고

이 스타터에는 사용자 전용 Spine 캐릭터 에셋이 포함되어 있지 않습니다. 에셋을 넣기 전에도 사이트 레이아웃은 표시되지만, 실제 캐릭터 애니메이션을 재생하려면 위 파일을 추가해야 합니다.
