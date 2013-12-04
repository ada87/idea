package com.xdnote.ep2;
/**
 * @author xdnote.com
 * 题目：
 * 给定一个十进制的下整数N，写下从1开始，到N的所有整数，然后数一下其中出现所有“1”的个数
 * 例如 N=2 写下1，2，出现了1个1
 *        N=12 写下 123456789101112 出现了5个1
 *  问题是
 *  1.写一个函数 F(n)，返回1到N之间出现的1的个数，比如 F(12)=5
 *  2.在32位速数范围内，满足条件 "F(n)=n"的最大的N是多少
 * */
public class Client {
	/**
	 * 第一题，一解
	 * 拿到手之想法
	 * 遍历数，然后算1个个数有多少
	 * */
	public static int q1a1(int n){
		StringBuffer sb = new StringBuffer();
		for(int i = 1;i <= n;i++){
			sb.append(i);
		}
		String rst=sb.toString();
		rst = rst.replaceAll("0", "")
		.replaceAll("2", "")
		.replaceAll("3", "")
		.replaceAll("4", "")
		.replaceAll("5", "")
		.replaceAll("6", "")
		.replaceAll("7", "")
		.replaceAll("8", "")
		.replaceAll("9", "");
		return rst.length();
	}
	/**
	 * 第一题，二解
	 * 用1解确实能算出来，只不过是想想如果数字太大的情况，性能是否会吃不消？
	 * 算到50W时，就明显有一点延时了，看来计算机性能还不错
	 * 先算算，找规律
	 * 0   	 	0
	 * 1-9		1
	 * 10			2
	 * 11			4
	 * 12-19	5-12
	 * 20			12
	 * 21			13
	 * 22-30	13
	 * 31-99	14-20	...
	 * 100		21
	 * 1000		301
	 * 10000	4001
	 * 100000	50001
	 * 得出
	 * */
	public static int q1a2(int n){
		return 0;
	}
    public static void main(String[] args){

		String a="https://caiyun.feixin.10086.cn/Mcloud/Mcloud/index.jsp?sourceid=433&account=13710345732&token=6d4dde09-e443-4700-9117-3f9984c9a1c0";
		System.out.println(a.replaceAll("Mcloud/", ""));
//        System.out.println(q1a1(100000));
    }
}
