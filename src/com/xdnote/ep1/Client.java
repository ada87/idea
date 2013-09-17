package com.xdnote.ep1;
/**
 * @author xdnote.com
 * <pre>
 * 题目来自网络
 * 求解
 * 苹果 1元/个， 桔子 2 元/个， 芒果 4元/个，若是用10元去买，有几种组合呢？
 * </pre>
 * */
public class Client {
    /**
     * <p>苹果单价</p>
     * */
    private int x = 1;
    /**
     * <p>桔子单价</p>
     * */
    private int y = 2;
    /**
     * <p>芒果单价</p>
     * */
    private int z = 4;

    /**
     * <p>计算结果</p>
     * */
    private void execute() {
        System.out.println(this.getTimes(10, 0, 0, 0, 0));
    }
    /**
     * @param total 身上还有多少钱
     * @param times 次数
     * @param xp 买多少个苹果
     * @param yp 买多少个桔子
     * @param zp 买多少个芒果
     * @return int 最多组合数数量
     * */
    private int getTimes(int total, int times, int xp, int yp, int zp) {
        int rtn = 0;
        int xn = xp;
        int yn = yp;
        int zn = zp;
        if (times <= x) {
            if (total == x) {
                System.out.println("xn:" + xn
                        + "  yn:" + yn + "  zn:" + zn);
                rtn++;
            } else {
                if (total > x) {
                    xn++;
                    rtn = rtn + getTimes(total - x, x, xn, yn, zn);
                }
            }
        }
        if (times <= y) {
            if (total == y) {
                System.out.println("xn:" + xn + "  yn:" + yn + "  zn:" + zn);
                rtn++;
            } else {
                if (total > y) {
                    yn++;
                    rtn = rtn + getTimes(total - y, y, xn, yn, zn);
                }
            }
        }
        if (times <= z) {
            if (total == z) {
                System.out.println("xn:" + xn + "  yn:" + yn + "  zn:" + zn);
                rtn++;
            } else {
                if (total > z) {
                    zn++;
                    rtn = rtn + getTimes(total - z, z, xn, yn, zn);
                }
            }
        }
        return rtn;
    }

    /**
     * @param args 无聊的main方法
     * <p>构造实例运行计算得出结果</p>
     */
    public static void main(final String[] args) {
        Client c = new Client();
        c.execute();
    }

}
