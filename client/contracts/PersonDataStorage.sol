// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract PersonalDataStorage {
    struct Person {
        string name;
        uint age;
        string mobileNumber;
        string fathersName;
        uint height;
        uint weight;
        string gender;
    }

    mapping(address => Person) public personalData;
    address[] public users;

    function setPersonalData(
        string memory _name,
        uint _age,
        string memory _mobileNumber,
        string memory _fathersName,
        uint _height,
        uint _weight,
        string memory _gender
    ) public {
        personalData[msg.sender] = Person({
            name: _name,
            age: _age,
            mobileNumber: _mobileNumber,
            fathersName: _fathersName,
            height: _height,
            weight: _weight,
            gender: _gender
        });
    }

    function getPersonalData() public view returns (
        string memory name,
        uint age,
        string memory mobileNumber,
        string memory fathersName,
        uint height,
        uint weight,
        string memory gender
    ) {
        Person memory person = personalData[msg.sender];
        return (
            person.name,
            person.age,
            person.mobileNumber,
            person.fathersName,
            person.height,
            person.weight,
            person.gender
        );
    }

    function deletePersonalData() public {
        delete personalData[msg.sender];
        removeUser(msg.sender);
    }

    function deleteUser(address userAddress) public {
        require(msg.sender == userAddress, "You can only delete your own data.");
        delete personalData[userAddress];
        removeUser(userAddress);
    }

    function getAllUserPersonalData() public view returns (
        address[] memory usersArray,
        string[] memory names,
        uint[] memory ages,
        string[] memory mobileNumbers,
        string[] memory fathersNames,
        uint[] memory heights,
        uint[] memory weights,
        string[] memory genders
    ) {
        uint userCount = users.length;
        usersArray = new address[](userCount);
        names = new string[](userCount);
        ages = new uint[](userCount);
        mobileNumbers = new string[](userCount);
        fathersNames = new string[](userCount);
        heights = new uint[](userCount);
        weights = new uint[](userCount);
        genders = new string[](userCount);

        for (uint i = 0; i < userCount; i++) {
            address userAddr = users[i];
            Person memory person = personalData[userAddr];
            usersArray[i] = userAddr;
            names[i] = person.name;
            ages[i] = person.age;
            mobileNumbers[i] = person.mobileNumber;
            fathersNames[i] = person.fathersName;
            heights[i] = person.height;
            weights[i] = person.weight;
            genders[i] = person.gender;
        }
    }

    function userExists(address userAddress) public view returns (bool) {
        for (uint i = 0; i < users.length; i++) {
            if (users[i] == userAddress) {
                return true;
            }
        }
        return false;
    }

    function removeUser(address userAddress) internal {
        for (uint i = 0; i < users.length; i++) {
            if (users[i] == userAddress) {
                if (i != users.length - 1) {
                    users[i] = users[users.length - 1];
                }
                users.pop();
                break;
            }
        }
    }
}
