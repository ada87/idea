package com.xdnote.ep3;

import java.util.ArrayList;
import java.util.List;

/**
 * 研究下自动寻路实现原理
 * */
public class Client {
	//地图
	public static List<Corrd> corrds = null;
	//障碍物
	public static List<Corrd> roadBlock = null;

	//maxX 地图最大X轴 maxY地图最大Y轴 hard 难度
	public static void initMap(int maxX,int maxY,int hard){
		corrds = new ArrayList<Corrd>();
		roadBlock = new ArrayList<Corrd>();
		for(int i=0;i<maxX;i++){
			for(int j=0;j<maxY;j++){
				Corrd corrd = new Corrd(i,j);
				corrds.add(corrd);
				if(hard > (Math.random()*10)){
					System.out.println(i+" x "+j);
					roadBlock.add(corrd);
				}
			}
		}
	}
	public static void main(String[] args){
		initMap(10,10,1);
	}
	
	
}
