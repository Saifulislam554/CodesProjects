#include <iostream>
#include <thread>
#include <vector>
#include <fstream>
#include <string>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

// Function to process a file
void processFile(const std::string& filename, const std::string& outputFile) {
    std::ifstream inputFile(filename);
    if (!inputFile.is_open()) {
        std::cerr << "Error opening input file: " << filename << std::endl;
        return;
    }

    std::ofstream outputFileStream(outputFile, std::ios::app);
    if (!outputFileStream.is_open()) {
        std::cerr << "Error opening output file: " << outputFile << std::endl;
        inputFile.close();
        return;
    }

    std::string line;
    while (std::getline(inputFile, line)) {
        // Process the line
        // In this example, we simply write the line to the output file
        outputFileStream << line << std::endl;
    }

    inputFile.close();
    outputFileStream.close();
}

// Thread function
void threadFunction(const std::string& filename, const std::string& outputFile) {
    processFile(filename, outputFile);
}

int main() {
    const int numThreads = 4;
    const int numProcesses = 2;

    std::vector<std::string> filenames = {"file1.txt", "file2.txt", "file3.txt", "file4.txt"};
    const std::string outputFile = "output.txt";

    // Create threads
    std::vector<std::thread> threads;
    for (int i = 0; i < numThreads; ++i) {
        threads.emplace_back(threadFunction, filenames[i], outputFile);
    }

    // Wait for threads to finish
    for (auto& thread : threads) {
        thread.join();
    }

    // Create processes
    for (int i = 0; i < numProcesses; ++i) {
        pid_t pid = fork();

        if (pid < 0) {
            std::cerr << "Error forking a child process" << std::endl;
        } else if (pid == 0) {
            // Child process
            processFile(filenames[i + numThreads], outputFile);
            exit(EXIT_SUCCESS);
        } else {
            // Parent process
            int status;
            waitpid(pid, &status, 0);
        }
    }

    // Print the contents of the output file
    std::ifstream outputFileStream(outputFile);
    if (outputFileStream.is_open()) {
        std::string line;
        while (std::getline(outputFileStream, line)) {
            std::cout << line << std::endl;
        }
        outputFileStream.close();
    } else {
        std::cerr << "Error opening output file: " << outputFile << std::endl;
    }

    return 0;
}
