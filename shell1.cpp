#include <iostream>
#include <string>
#include <vector>
#include <cstring>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <fcntl.h>

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

int main() {
    std::string input;

    while (true) {
        std::cout << "$ ";
        std::getline(std::cin, input);

        if (input.empty()) {
            continue;
        }

        if (input == "exit") {
            break;
        }

        std::string command;
        std::vector<std::string> arguments;
        parseInput(input, command, arguments);

        pid_t pid = fork();

        if (pid < 0) {
            std::cerr << "Error forking a child process" << std::endl;
        } else if (pid == 0) {
            executeCommand(command, arguments);
            exit(EXIT_SUCCESS);
        } else {
            int status;
            waitpid(pid, &status, 0);
        }
    }

    return 0;
}
