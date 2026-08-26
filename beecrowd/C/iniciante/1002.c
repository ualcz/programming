#include <stdio.h>

int main() {
    double a;
    scanf("%lf", &a);
    double area = 3.14159 * (a * a);
    printf("A=%.4lf\n", area);

    return 0;
}