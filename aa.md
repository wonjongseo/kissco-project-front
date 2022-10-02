브라우저 크기에 따라 css를 다시 하였습니다.
겹치거나 하는 부분이 계속 발생한다면 사진과 함께 알려주세요 (저는 잘 작동 되기 때문에)
"사진 첨부 바람" 이라고 적은 부분은 제가 테스트 했을때 문제가 되지 않았기에 사진으로 문제 상황을 알려주세요.

메인화면

# 1.피드백 중, 입력창 클릭 시 한/일 자판으로 각각 자동 변경되는 기능이 있으면 좋겠다고 하심.

-> 불가능

# 2.피드백 중, 셀렉트박스의 한국어/일본어가 어떤 기능인 지 알 수 있으면 좋겠다고 하심.

-> 한국어/ 일본어 셀렉트 박스 제거

# 3.수정 취소 기능이 없음.

-> 수정 완료

# 4.단어장에 있는 단어 저장 불가능하도록(저장 버튼을 없앤다든가)

-> 피드백 받은 내용이 기존에 저장되어 있어도 alert 로 "저장되었습니다 " 가 문제였음, 따라서 저장되었습니다를 뺌으로써 이질감 제거되었다고 생각함.

# 5.언어 선택 버튼과 찾기 버튼의 크기가 미묘함.

-> 브라우저 크기에 따라 요소 크기 변경했으니 다시 확인 바람. 그 후에도 문제 있다면 사진 첨부 바람

# 6.검색 시 검색창과 단어검색 텍스트가 위로 올라감.

-> 브라우저 크기에 따라 요소 크기 변경했으니 다시 확인 바람. 그 후에도 문제 있다면 사진 첨부 바람

# 7.axios 관련 500에러가 꽤 빈번함.

-> 빈 텍스트 상자로 요청 보낼 시 500에러 수정
-> 단위 테스트를 별도로 진행할테니 안정화된 후 추후 말하겠음.

회원가입

# 1.비밀번호 일치하지 않을 시(이하 회원가입 실패 시) 오류 문구 출력으로 인해 창이 늘어남

-> 브라우저 크기에 따라 요소 크기 변경했으니 다시 확인 바람. 그 후에도 문제 있다면 사진 첨부 바람

# 2.회원가입 실패 시, 실패 전의 창과 크기가 같으면 좋겠음.

-> 브라우저 크기에 따라 요소 크기 변경했으니 다시 확인 바람. 그 후에도 문제 있다면 사진 첨부 바람

로그인

# 1.비밀번호 일치하지 않을 시, 오류 메시지에 오타가 있음.

-> 수정 완료

# 2.로그인 실패 시, 일정 시간이 지나면 바로 새로고침 되어 오류 메시지를 확인하기 어려움.

-> 수정 완료

단어장

# api의 변경으로, 변경되는 부분이 이후 많을 거라 생각하니 현재는 참고만 해주세요!

-> api에 관한 작업 상황 알려주기를 바람.

# 1.메인화면의 검색창 placeholder와 통일이 필요함.

-> 저장된 단어를 검색하는 기능이였는데 삭제함.

# 2.페이지 하단 여백이 적어 가독성이 떨어짐.

-> 브라우저 크기에 따라 요소 크기 변경했으니 다시 확인 바람. 그 후에도 문제 있다면 사진 첨부 바람

# 3.저장된 단어가 9개 이상일 시, 다음페이지 / 이전페이지 버튼과 위치가 겹침.

-> 브라우저 크기에 따라 요소 크기 변경했으니 다시 확인 바람. 그 후에도 문제 있다면 사진 첨부 바람

# 4.모름/삭제버튼이 많음

-> 모름/ 삭제를 텍스트 박스 하나로 축약 가능. (구체적인 의견 제시 바람)

# 5.화면을 봤을 때, 왼쪽이 비어서 오른쪽으로 시야가 쏠림.

-> 브라우저 크기에 따라 요소 크기 변경했으니 다시 확인 바람. 그 후에도 문제 있다면 사진 첨부 바람

# 6.테스트 버튼을 누르고 다음페이지로 이동하면 문항 수의 값이 비어있음.

-> 사진 첨부 바람

# 7.아는 단어는 테스트 기능이 존재하지 않음.

-> 아는 단어가 4개 이상인지 확인 바람
-> 4개 이하면 테스트 버튼 없음.
-> 4개 이하면 주관식 테스트 기능을 넣을까 생각중.

# 8.테스트 취소 불가능.

-> 사진 첨부 바람

# 9.없는 단어를 검색했을 시, 없다고 표시해주면 좋을듯.

-> 파파고에 검색하면 빈 문자열이 아닌 이상 무조건 반환함, 없는 단어가 이해가 안됨

# 10.피드백 중, 페이지 번호가 있어 그를 클릭하면 이동할 수 있는 기능 필요하다는 의견 있었음.

-> 수정 하겠음.

# 11.저장된 단어가 10개일 때, 다음 페이지 버튼이 작동함.

-> 10번 내용을 반영하여 다음, 이전 페이지 제거함

# 다운로드 1.누를 시, IP 8080의 로그인 창이 나와 진행 불가

-> 수정완료

# 테스트 1.문항 수 제한이 10인 점.

-> 테스트 문제를 개발하다보니 4개에서 10개로 제안되었음, 수정이 원한다면 얘기 바람