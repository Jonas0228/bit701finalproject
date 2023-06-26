package data.service;

import java.util.List;

import data.dto.BoardDto;

public interface BoardServiceInter {
	public int getTotalCount();
	public void insertBoard(BoardDto dto);
	public List<BoardDto> getPagingList(int start,int perpage);
	public void updateReadcount(int num);
	public BoardDto detailPage(int num);
	public void deleteBoard(int num);
}