import React, { useEffect, useState } from "react";
import "../App.css";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import BoardRowList from "./BoardRowList";

function BoardList(props) {
  const [data, setData] = useState("");

  const { currentPage } = useParams();
  console.log({ currentPage });

  const navi = useNavigate();

  //페이징처리에 필요한 데이타 가져오기
  const list = () => {
    const url =
      "/board/list?currentPage=" + (currentPage == null ? 1 : currentPage);
    Axios.get(url).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    list();
  }, [currentPage]);

  const onWriteButtonEvent = () => {
    if (sessionStorage.loginok == null) {
      alert("먼저 로그인을 해주세요");
      navi("/login");
    } else {
      navi("/board/form");
    }
  };
  return (
    <div style={{ marginLeft: "30px" }}>
      <button
        type="button"
        className="btn btn-outline-success"
        style={{ width: "100px", marginLeft: "100px" }}
        onClick={onWriteButtonEvent}
      >
        글쓰기
      </button>
      <br />
      <br />
      <h5>
        <b>총 {data ? data.totalCount : "로딩 중..."}개의 글이 있습니다</b>
      </h5>

      <table className={"table table-bordered"} style={{ width: "700px" }}>
        <thead>
          <tr style={{ backgroundColor: "#eeddff" }}>
            <th style={{ width: "30px" }}>번호</th>
            <th style={{ width: "200px" }}>제목</th>
            <th style={{ width: "70px" }}>작성자</th>
            <th style={{ width: "100px" }}>작성일</th>
            <th style={{ width: "50px" }}>조회</th>
          </tr>
        </thead>
        <tbody>
          {
            //비 동기 통신으로 목록출력할 때 이걸 항상 넣어주어야 된다.
            //데이터가 없을 때는 호출되지않게 같이 넣어주어야한다.,
            data.list &&
              data.list.map((row, idx) => (
                <BoardRowList
                  key={idx}
                  row={row}
                  no={data.no}
                  idx={idx}
                  currentPage={currentPage}
                />
              ))
          }
        </tbody>
      </table>
      <div style={{ width: "800px", textAlign: "center" }}>
        {/* 이전 */}
        {data.startPage > 1 && (
          <Link
            to={`/board/list/${data.startPage - 1}`}
            style={{ textDecoration: "none", marginRight: "7px" }}
          >
            이전
          </Link>
        )}

        {/* 페이징처리 */}
        {data.parr &&
          data.parr.map((pno, i) => (
            <NavLink to={`/board/list/${pno}`} key={i}>
              <b
                style={{
                  marginRight: "7px",
                  color:
                    pno === (currentPage ? Number(currentPage) : 1)
                      ? "red"
                      : "black",
                }}
              >
                {pno}
              </b>
            </NavLink>
          ))}

        {/* 다음 */}
        {data.endPage < data.totalPage && (
          <Link
            to={`/board/list/${data.endPage + 1}`}
            style={{ textDecoration: "none" }}
          >
            다음
          </Link>
        )}
      </div>
    </div>
  );
}

export default BoardList;
