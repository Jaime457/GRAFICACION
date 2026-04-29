package Metodos_Numericos;

import java.util.Scanner;

public class Practica_4 
{
	public static String format(double x) 
	{
	    return String.format("%.5g", x);
	}
    public static void main(String[] args) 
    {
        Scanner scanner = new Scanner(System.in); 
        
        System.out.println("\t\t\t\t\tInstituto Tecnológico de Culiacán");
        System.out.println("\t\t\t\t\tIng. en Sistemas Computacionales");
        System.out.println("Loya Chaidez Jaime Eduardo");
        System.out.println("Solución de Sistemas de Ecuaciones");
        System.out.println("Método de Jacobi");
        System.out.println("11:00 - 12:00 horas\n");

        System.out.print("Ingrese la pregunta del Problema");
        String pregunta = scanner.nextLine();
        System.out.print("Ingrese la Unidad de medida: ");
        String unidad = scanner.nextLine();

        int orden = 0;
        do 
        {
            System.out.print("Ingrese el orden de la matriz (2 a 6): ");
            orden = scanner.nextInt();
        } while (orden < 2 || orden > 6);

        String[] concepto = new String[orden]; double[] vant = new double[orden]; double[] vact = new double[orden];

        for (int f = 0; f < orden; f++) 
        {
            scanner.nextLine();
            System.out.print("Ingrese el concepto de la incógnita " + (f + 1) + ": ");
            concepto[f] = scanner.nextLine();
            System.out.print("Ingrese el valor inicial de " + concepto[f] + ": ");
            vant[f] = scanner.nextDouble();
            vact[f] = 0.0;
        }

        System.out.print("\nIngrese el error a tolerar: ");
        double error = scanner.nextDouble();
        System.out.print("Ingrese el total de calculos máximo (Tc): ");
        int totalC = scanner.nextInt();

        double[][] matriz = new double[orden][orden + 1];
        System.out.println("\nCaptura de los datos de la matriz:");
        for (int f = 0; f < orden; f++) 
        {
            for (int c = 0; c < orden + 1; c++) 
            {
                System.out.print("Matriz [" + (f + 1) + "][" + (c + 1) + "]: ");
                matriz[f][c] = scanner.nextDouble();
            }
        }

        System.out.println("\n\n\n");
        System.out.println("==========================================================================================");
        System.out.println("\t\t\t\t\tInstituto Tecnológico de Culiacán");
        System.out.println("\t\t\t\t\tIng. en Sistemas Computacionales");
        System.out.println("Loya Chaidez Jaime Eduardo");
        System.out.println("Solución de Sistemas de Ecuaciones");
        System.out.println("Método de Jacobi");
        System.out.println("11:00 - 12:00 horas \n");
        System.out.println("PROBLEMA: " + pregunta + "\n");

        int Columnas = 15;
        String linea = "-".repeat(10 + (orden + 1) * Columnas);
        System.out.println(linea);
        System.out.printf("%-7s", "No.");
        for (String c : concepto) System.out.printf("%-" + Columnas + "s", c);
        System.out.printf("%-" + Columnas + "s\n", "Error Total");
        System.out.println(linea);

        int nc = 0;
        double errorTotal = 0.0;
        System.out.printf("%-7d", nc);
        for (double v : vant) System.out.printf("%-" + Columnas + "s", format(v));
        System.out.printf("%-" + Columnas + "s\n", format(errorTotal));

        do 
        {
            for (int f = 0; f < orden; f++) 
            {
                double suma = matriz[f][orden];
                double coef = matriz[f][f];
                for (int c = 0; c < orden; c++) 
                {
                    if (f != c) 
                    {
                        suma += ((matriz[f][c] * -1.0) * vant[c]);
                    }
                }
                vact[f] = suma / coef;
            }

            errorTotal = 0.0;
            for (int p = 0; p < orden; p++) 
            {
                errorTotal += Math.abs(Math.abs(vact[p]) - Math.abs(vant[p]));
            }

            nc++;
            System.out.printf("%-7d", nc);
            for (double v : vact) System.out.printf("%-" + Columnas + "s", format(v));
            System.out.printf("%-" + Columnas + "s\n", format(errorTotal));

            for (int p = 0; p < orden; p++) 
            {
                vant[p] = vact[p];
            }

        } while (errorTotal > error && nc < totalC);

        System.out.println(linea);

        if (errorTotal <= error) 
        {
            System.out.println("\nResultados:\n");
            for (int i = 0; i < orden; i++) 
            {
                System.out.println("\t\t" + concepto[i] + " = " + format(vact[i]) + " " + unidad + ".");
            }
        } 
        else 
        {
            System.out.println("\nEl proceso superó el número máximo de calculos y no encontró la mejor aproximación.");
        }
    }
}