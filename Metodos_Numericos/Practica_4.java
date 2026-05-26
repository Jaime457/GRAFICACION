package Metodos_Numericos;

import java.util.Scanner;

public class Practica_5 
{
    public static void main(String[] args) 
    {
        Scanner sc = new Scanner(System.in);
        
        System.out.println("\t\t\t\t\tInstituto Tecnológico de Culiacán");
        System.out.println("\t\t\t\t\tIng. en Sistemas Computacionales\n");
        System.out.println("Loya Chaidez Jaime Eduardo");
        System.out.println("Método de Simpson");
        System.out.println("De 11:00 a 12:00 horas\n");
        System.out.println("Este programa ejecuta el proceso de cálculo sobre el tema de derivación e integración numérica utilizando las 4 reglas de Simpson \n");

        System.out.print("Cuál es la ,uk,u, pregunta del Problema: ");
        String pregunta = sc.nextLine();
        System.out.print("Valor real de la integral: ");
        double Vreal = sc.nextDouble();
        System.out.print("Límite inferior (a): ");
        double a = sc.nextDouble();
        System.out.print("Límite superior (b): ");
        double b = sc.nextDouble();
        sc.nextLine(); 
        System.out.print("Unidad: ");
        String Unidad = sc.nextLine();

        System.out.println("\nMétodo de las Reglas de Simpson");
        System.out.println("- Regla 1 : n=2");
        System.out.println("- Regla 2 : n=3");
        System.out.println("- Regla 3 : n>2 y n=par");
        System.out.println("- Regla 4 : n>3, n=impar y n= multiple de 3\n");

        int N3, N4;
        do 
        {
            System.out.print("Capture el Numero de Divisiones para la regla 3: ");
            N3 = sc.nextInt();
        } while (N3 != 2 && !(N3 > 2 && N3 % 2 == 0));
        do 
        {
            System.out.print("Capture el Numero de Divisiones para la regla 4: ");
            N4 = sc.nextInt();
        } while (N4 != 3 && !(N4 > 3 && N4 % 3 == 0)); 

        String encabezado = "\nInstituto Tecnológico de Culiacán\nIng. en Sistemas Computacionales\n\nLoya Chaidez Jaime Eduardo\nIntegración Numérica - Método de Simpson";
        String horas = "De 11:00 a 12:00 horas.\n\nPregunta: ";
        String tabla = String.format("%-5s %-12s %-15s %-10s %-15s\n", "Pxy", "x", "f(x)", "Factor", "f(x) * Factor");
  
        //Regla 1
        int n1 = 2;
        double h1 = (b - a) / n1;
        System.out.println(encabezado + "\nRegla aplicada para Simpson de 1/3 para n=2.\n" + horas + pregunta);
        System.out.println("-------------------------------------------------------------------------");
        System.out.print(tabla);
        System.out.println("-------------------------------------------------------------------------");
        
        double fa1 = Math.pow(a, 3) - Math.sin(a + 1);
        double x1_1 = a + h1;
        double fx1_1 = Math.pow(x1_1, 3) - Math.sin(x1_1 + 1);
        double fb1 = Math.pow(b, 3) - Math.sin(b + 1);
        
        System.out.printf("%-5d %-12.5f %-15.5f %-10d %-15.5f\n", 1, a, fa1, 1, fa1);
        System.out.printf("%-5d %-12.5f %-15.5f %-10d %-15.5f\n", 2, x1_1, fx1_1, 4, (4 * fx1_1));
        System.out.printf("%-5d %-12.5f %-15.5f %-10d %-15.5f\n", 3, b, fb1, 1, fb1);

        double Vcalc1 = (h1 / 3) * (fa1 + (4 * fx1_1) + fb1);
        double Error1 = Math.abs(Vreal - Vcalc1);
        
        System.out.println("-------------------------------------------------------------------------");
        System.out.printf("%35s %10.5f\n\nNo. de Divisiones = %d\n", "Área Simpson 1/3=", Vcalc1, n1);
        System.out.printf("Valor Real de la Integral = %.5f %s\nValor por el Método      = %.5f %s\nError del Método         = %.5f %s\n", Vreal, Unidad, Vcalc1, Unidad, Error1, Unidad);
        
        System.out.println("===========================================================================");
        
        //Regla 2
        int n2 = 3;
        double h2 = (b - a) / n2;
        System.out.println(encabezado + "\nRegla aplicada para Simpson de 3/8 para n=3.\n" + horas + pregunta);
       
        System.out.println("-------------------------------------------------------------------------");        
        System.out.print(tabla);
        System.out.println("-------------------------------------------------------------------------");
        
        double fa2 = Math.pow(a, 3) - Math.sin(a + 1);
        double x1_2 = a + h2;
        double x2_2 = a + (2 * h2);
        double fx1_2 = Math.pow(x1_2, 3) - Math.sin(x1_2 + 1);
        double fx2_2 = Math.pow(x2_2, 3) - Math.sin(x2_2 + 1);
        double fb2 = Math.pow(b, 3) - Math.sin(b + 1);
        
        System.out.printf("%-5d %-12.5f %-15.5f %-10d %-15.5f\n", 1, a, fa2, 1, fa2);
        System.out.printf("%-5d %-12.5f %-15.5f %-10d %-15.5f\n", 2, x1_2, fx1_2, 3, (3 * fx1_2));
        System.out.printf("%-5d %-12.5f %-15.5f %-10d %-15.5f\n", 3, x2_2, fx2_2, 3, (3 * fx2_2));
        System.out.printf("%-5d %-12.5f %-15.5f %-10d %-15.5f\n", 4, b, fb2, 1, fb2);

        double Vcalc2 = ((3 * h2) / 8) * (fa2 + (3 * fx1_2) + (3 * fx2_2) + fb2);
        double Error2 = Math.abs(Vreal - Vcalc2);

        System.out.println("-------------------------------------------------------------------------");
        System.out.printf("%35s %10.5f\n\nNo. de Divisiones = %d\n", "Área Simpson 3/8=", Vcalc2, n2);
        System.out.printf("Valor Real de la Integral = %.5f %s\nValor por el Método      = %.5f %s\nError del Método         = %.5f %s\n", Vreal, Unidad, Vcalc2, Unidad, Error2, Unidad);
        
        System.out.println("===========================================================================");
        
        //Regla 3
        double Vcalc3 = 0, h3 = (b - a) / N3;
        System.out.println(encabezado + "\nRegla aplicada para Simpson de 1/3 compleja para n=" + horas + pregunta);
        System.out.println("-------------------------------------------------------------------------");
        System.out.print(tabla);
        System.out.println("-------------------------------------------------------------------------");
        
        for (int x = 1; x <= N3 + 1; x++) 
        {
            double pto, fpto, valor;
            int factor;

            if (x == 1) 
            {
                factor = 1; pto = a;
            } 
            else if (x == N3 + 1) 
            {
                factor = 1; pto = b;
            } 
            else 
            {
                factor = (x % 2 == 0) ? 4 : 2;
                pto = a + ((x - 1) * h3);
            }
            fpto = Math.pow(pto, 3) - Math.sin(pto + 1);
            valor = factor * fpto;
            Vcalc3 += valor;
            System.out.printf("%-5d %-12.5f %-15.5f %-10d %-15.5f\n", x, pto, fpto, factor, valor);
        }
        
        Vcalc3 = (h3 / 3) * Vcalc3;
        double Error3 = Math.abs(Vreal - Vcalc3);
        
        System.out.println("-------------------------------------------------------------------------");
        System.out.printf("%35s %10.5f\n\nNo. de Divisiones = %d\n", "Área Simpson 1/3=", Vcalc3, N3);
        System.out.printf("Valor Real de la Integral = %.5f %s\nValor por el Método      = %.5f %s\nError del Método         = %.5f %s\n", Vreal, Unidad, Vcalc3, Unidad, Error3, Unidad);
        
        System.out.println("===========================================================================");
        
        //Regla 4
        double Vcalc4 = 0, h4 = (b - a) / N4;
        System.out.println(encabezado + "\nRegla aplicada para Simpson de 3/8 compleja para n=" + horas + pregunta);
        System.out.println("-------------------------------------------------------------------------");
        System.out.print(tabla);
        System.out.println("-------------------------------------------------------------------------");
        
        for (int xx = 1; xx <= N4 + 1; xx++) 
        {
            double pto, fpto, valor;
            int factor;

            if (xx == 1) 
            {
                factor = 1; pto = a;
            } 
            else if (xx == N4 + 1) 
            {
                factor = 1; pto = b;
            } 
            else 
            {
                factor = ((xx - 1) % 3 == 0) ? 2 : 3;
                pto = a + ((xx - 1) * h4);
            }
            fpto = Math.pow(pto, 3) - Math.sin(pto + 1);
            valor = factor * fpto;
            Vcalc4 += valor;
            System.out.printf("%-5d %-12.5f %-15.5f %-10d %-15.5f\n", xx, pto, fpto, factor, valor);
        }
        Vcalc4 = (3 * h4 / 8) * Vcalc4;
        double Error4 = Math.abs(Vreal - Vcalc4);
        
        System.out.println("-------------------------------------------------------------------------");
        System.out.printf("%35s %10.5f\n\nNo. de Divisiones = %d\n", "Área Simpson 3/8=", Vcalc4, N4);
        System.out.printf("Valor Real de la Integral = %.5f %s\nValor por el Método      = %.5f %s\nError del Método         = %.5f %s\n", Vreal, Unidad, Vcalc4, Unidad, Error4, Unidad);
    }
}