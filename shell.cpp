#include <iostream>
#include <string>
#include <vector>
#include <cstring>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <fcntl.h>
#include <readline/readline.h>
#include <readline/history.h>
#include <pthread.h>

// Function to parse the user input into a command and arguments
void parseInput(const std::string& input, std::string& command, std::vector<std::string>& arguments) {
    arguments.clear();

    size_t pos = input.find(' ');
    command = input.substr(0, pos);

    while (pos != std::string::npos) {
        size_t start = pos + 1;
        pos = input.find(' ', start);
        std::string arg = input.substr(start, pos - start);
        arguments.push_back(arg);
    }
}

// Function to execute the command
void executeCommand(const std::string& command, const std::vector<std::string>& arguments) {
    char** args = new char*[arguments.size() + 2];
    args[0] = new char[command.size() + 1];
    strcpy(args[0], command.c_str());

    for (size_t i = 0; i < arguments.size(); ++i) {
        args[i + 1] = new char[arguments[i].size() + 1];
        strcpy(args[i + 1], arguments[i].c_str());
    }

    args[arguments.size() + 1] = nullptr;

    execvp(command.c_str(), args);
    std::cerr << "Error executing command: " << command << std::endl;
    exit(EXIT_FAILURE);
}

// Function to handle command execution in a separate thread
void* threadExecuteCommand(void* arguments) {
    std::pair<std::string, std::vector<std::string>>* cmdArgs = static_cast<std::pair<std::string, std::vector<std::string>>*>(arguments);
    executeCommand(cmdArgs->first, cmdArgs->second);
    delete cmdArgs;
    return nullptr;
}

int main() {
    std::string input;

    while (true) {
        char* inputCStr = readline("$ ");

        if (!inputCStr) {
            break;
        }

        input = inputCStr;

        if (input.empty()) {
            continue;
        }

        add_history(inputCStr);

        if (input == "exit") {
            break;
        }

        std::string command;
        std::vector<std::string> arguments;
        parseInput(input, command, arguments);

        // Input/Output Redirection
        int inputRedirection = -1;
        int outputRedirection = -1;
        bool appendOutput = false;
        std::string outputFile;

        for (size_t i = 0; i < arguments.size(); ++i) {
            if (arguments[i] == "<") {
                if (i + 1 < arguments.size()) {
                    inputRedirection = open(arguments[i + 1].c_str(), O_RDONLY);
                    if (inputRedirection == -1) {
                        std::cerr << "Error opening input file: " << arguments[i + 1] << std::endl;
                    } else {
                        arguments.erase(arguments.begin() + i, arguments.begin() + i + 2);
                        --i;
                    }
                } else {
                    std::cerr << "Missing input file name after <" << std::endl;
                }
            } else if (arguments[i] == ">") {
                if (i + 1 < arguments.size()) {
                    outputRedirection = open(arguments[i + 1].c_str(), O_WRONLY | O_CREAT | O_TRUNC, 0666);
                    if (outputRedirection == -1) {
                        std::cerr << "Error opening output file: " << arguments[i + 1] << std::endl;
                    } else {
                        outputFile = arguments[i + 1];
                        arguments.erase(arguments.begin() + i, arguments.begin() + i + 2);
                        --i;
                    }
                } else {
                    std::cerr << "Missing output file name after >" << std::endl;
                }
            } else if (arguments[i] == ">>") {
                if (i + 1 < arguments.size()) {
                    outputRedirection = open(arguments[i + 1].c_str(), O_WRONLY | O_CREAT | O_APPEND, 0666);
                    if (outputRedirection == -1) {
                        std::cerr << "Error opening output file: " << arguments[i + 1] << std::endl;
                    } else {
                        outputFile = arguments[i + 1];
                        appendOutput = true;
                        arguments.erase(arguments.begin() + i, arguments.begin() + i + 2);
                        --i;
                    }
                } else {
                    std::cerr << "Missing output file name after >>" << std::endl;
                }
            }
        }

        pid_t pid = fork();

        if (pid < 0) {
            std::cerr << "Error forking a child process" << std::endl;
        } else if (pid == 0) {
            pthread_t thread;
            std::pair<std::string, std::vector<std::string>>* cmdArgs = new std::pair<std::string, std::vector<std::string>>(command, arguments);

            if (pthread_create(&thread, nullptr, threadExecuteCommand, cmdArgs) != 0) {
                std::cerr << "Error creating thread" << std::endl;
            } else {
                pthread_join(thread, nullptr);
            }

            if (inputRedirection != -1) {
                dup2(inputRedirection, STDIN_FILENO);
                close(inputRedirection);
            }

            if (outputRedirection != -1) {
                dup2(outputRedirection, STDOUT_FILENO);
                close(outputRedirection);
            }

            if (!outputFile.empty()) {
                std::cout << "Output written to file: " << outputFile << std::endl;
            }

            exit(EXIT_SUCCESS);
        } else {
            int status;
            waitpid(pid, &status, 0);
        }

        free(inputCStr);
    }

    return 0;
}
