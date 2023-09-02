#include <iostream>
using namespace std;

#define PID 0
#define AT 1
#define BT 2
#define ST 3
#define ET 4
#define WT 5
#define TAT 6

void disp(int processInfo[][7], int numProcesses)
{
    cout << "\nProcess\tAT\tBT\tST\tWT\tET\tTAT\n";
    for (int i = 0; i < numProcesses; i++) {
        cout << processInfo[i][PID] << "\t" << processInfo[i][AT] << "\t" << processInfo[i][BT] << "\t"
             << processInfo[i][ST] << "\t" << processInfo[i][WT] << "\t" << processInfo[i][ET] << "\t"
             << processInfo[i][TAT] << "\n";
    }
}

void swapRow(int processInfo[][7], int row1, int row2)
{
    for (int i = 0; i < 7; i++) {
        int temp = processInfo[row1][i];
        processInfo[row1][i] = processInfo[row2][i];
        processInfo[row2][i] = temp;
    }
}

void sortArray(int processInfo[][7], int numProcesses)
{
    for (int i = 0; i < numProcesses - 1; i++) {
        for (int j = 0; j < numProcesses - i - 1; j++) {
            if (processInfo[j][AT] > processInfo[j + 1][AT]) {
                swapRow(processInfo, j, j + 1);
            }
        }
    }
}

int main()
{
    const int numProcesses = 5;
    const int columns = 7;
    int processInfo[numProcesses][columns] = {0};

    cout << "Before taking input: \n";
    disp(processInfo, numProcesses);

    for (int i = 0; i < numProcesses; i++) {
        processInfo[i][PID] = i;
        cout << "Enter Arrival Time for Process " << i << ": ";
        cin >> processInfo[i][AT];
        cout << "Enter Burst Time for Process " << i << ": ";
        cin >> processInfo[i][BT];
    }

    cout << "After taking input: \n";
    disp(processInfo, numProcesses);

    // Sort the processes based on arrival time
    sortArray(processInfo, numProcesses);
    cout << "After Sorting: \n";
    disp(processInfo, numProcesses);

    // Calculation

    // Calculation for the first process
    processInfo[0][ST] = processInfo[0][AT];
    processInfo[0][ET] = processInfo[0][AT] + processInfo[0][BT];
    processInfo[0][WT] = 0;
    processInfo[0][TAT] = processInfo[0][ET] - processInfo[0][AT];

    // Calculation for the remaining processes
    for (int i = 1; i < numProcesses; i++) {
        processInfo[i][ST] = max(processInfo[i][AT], processInfo[i - 1][ET]);
        processInfo[i][ET] = processInfo[i][ST] + processInfo[i][BT];
        processInfo[i][WT] = processInfo[i][ST] - processInfo[i][AT];
        processInfo[i][TAT] = processInfo[i][ET] - processInfo[i][AT];
    }

    cout << "After Calculation: \n";
    disp(processInfo, numProcesses);

    return 0;
}
