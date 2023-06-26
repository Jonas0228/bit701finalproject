import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import noimage from "../image/noimage.png";

function BoardDetailPage(props) {
  const { num, currentPage } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await Axios.get(`/board/detail?num=${num}`);
        setBoard(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch board", error);
      }
    };

    fetchBoard();
  }, [num]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!board) {
    return <div>Board not found</div>;
  }

  const handleEdit = () => {
    navigate.push(`/board/edit/${num}`);
  };

  const handleDelete = async () => {
    // 사용자에게 삭제 확인 대화상자를 띄움
    const isConfirmed = window.confirm("게시글을 삭제하시겠습니까?");

    // 사용자가 확인 버튼을 눌렀을 경우에만 삭제를 진행
    if (isConfirmed) {
      try {
        // 백엔드에 DELETE 요청을 보내고 게시글 삭제
        await Axios.delete(`/board/delete`, { params: { num } });

        // 삭제 성공 후 사용자에게 메시지를 보여주고
        alert("게시글이 성공적으로 삭제되었습니다.");

        // 현재 페이지의 게시물 정보 확인
        const response = await Axios.get(`/board/list`, {
          params: { currentPage },
        });
        const { totalCount, totalPage } = response.data;

        // 페이지에 게시물이 없으면 이전 페이지로 이동, 그렇지 않으면 현재 페이지로 이동
        let targetPage = currentPage;
        if (totalCount === 0 && currentPage > 1) {
          targetPage = currentPage - 1;
        } else if (currentPage > totalPage) {
          targetPage = totalPage; // 총 페이지 수를 넘어가는 경우, 총 페이지로 이동
        }

        // 게시글 목록 페이지로 리다이렉션
        navigate(`/board/list/${targetPage}`);
      } catch (error) {
        // 에러가 발생한 경우, 에러 메시지를 표시
        console.error("Failed to delete board", error);
        alert("게시글 삭제에 실패했습니다.");
      }
    }
  };

  const handleGoBack = () => {
    navigate(`/board/list/${currentPage}`); // 게시물 목록 페이지로 이동. 경로는 실제 경로에 맞게 변경하세요.
  };

  const isAuthor = board.myname === sessionStorage.myname;

  //이미지 경로
  const photoUrl = process.env.REACT_APP_BOARDURL;

  // 이미지 URL 결정
  const imageUrl = board.photo ? `${photoUrl}${board.photo}` : noimage;

  return (
    <div>
      <h1>{board.subject}</h1>
      <img src={imageUrl} alt="Board" style={{ width: "300px" }} />
      <p>글쓴이: {board.myname}</p>
      <p>아이디: {board.myid ? board.myid.slice(0, -3) + "***" : ""}</p>
      <p>작성일: {board.writeday}</p>
      <p>조회수: {board.readcount}</p>
      <p>내 용: {board.content}</p>
      <button className="btn btn-sm btn-secondary" onClick={handleGoBack}>
        목록
      </button>
      &nbsp;
      {isAuthor && (
        <span>
          <button className="btn btn-sm btn-success" onClick={handleEdit}>
            수정
          </button>
          &nbsp;
          <button className="btn btn-sm btn-danger" onClick={handleDelete}>
            삭제
          </button>
          &nbsp;
        </span>
      )}
    </div>
  );
}

export default BoardDetailPage;
