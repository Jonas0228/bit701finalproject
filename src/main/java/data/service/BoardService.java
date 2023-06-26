package data.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import data.dto.BoardDto;
import data.mapper.BoardMapper;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BoardService implements BoardServiceInter {

	private BoardMapper boardMapper;
	
	@Override
	public int getTotalCount() {
		// TODO Auto-generated method stub
		return boardMapper.getTotalCount();
	}
	
	@Override
	public void insertBoard(BoardDto dto) {
		// TODO Auto-generated method stub
		boardMapper.insertBoard(dto);
	}

	@Override
	public List<BoardDto> getPagingList(int start, int perpage) {
		// TODO Auto-generated method stub
		Map<String, Integer> map=new HashMap<>();
		map.put("start", start);
		map.put("perpage", perpage);
		
		return boardMapper.getPagingList(map);
	}

	@Override
	public void updateReadcount(int num) {
		// TODO Auto-generated method stub
		boardMapper.updateReadcount(num);
	}

	@Override
	public BoardDto detailPage(int num) {
	    BoardDto boardDto = boardMapper.detailPage(num);
	    if (boardDto == null) {
	        // Optionally, you can log an error message or throw a custom exception
	        return null;
	    }
	    return boardDto;
	}

	@Override
	public void deleteBoard(int num) {
		// TODO Auto-generated method stub
		boardMapper.deleteBoard(num);
	}

}