// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Community {

    struct Proposal {
        bytes32 name;
        uint totalCost;
        address[] support;
    }

    address public president;
    address[] public members;
    Proposal[] public proposals;

    mapping (address => uint) public debt;

    event MemberAdded(address member_added);
    event ProposalApproved(bytes32 name);


    constructor() {
        president = msg.sender;
        members.push(msg.sender);
    }

    function vote(uint proposal_index) public {
        require(contains(msg.sender, members), 
                    "Not Member of this community");
        require(!contains(msg.sender, proposals[proposal_index].support), 
                    "Already voted for this proposal");

        proposals[proposal_index].support.push(msg.sender);
        uint approveThreshold = members.length/2 + members.length%2;
        if (proposals[proposal_index].support.length >= approveThreshold) {
            //Approve Proposal proposal_index
            uint divided_dept = proposals[proposal_index].totalCost / members.length; 
            for (uint i = 0; i < members.length; ++i) {
                debt[members[i]] += divided_dept;
            }
            emit ProposalApproved(proposals[proposal_index].name);
        }
    }

    function addProposal(bytes32 shortName, uint totalCost) public {
        uint maxMembers = members.length;
        proposals.push(Proposal({
            name: shortName,
            totalCost: totalCost,
            support: new address[](maxMembers)
        }));
    }

    function isMember(address addr) public view returns (bool) {
        for (uint i = 0; i < members.length; ++i)
            if (members[i] == addr) 
                return true;
        return false;
    }

    function removeMember(address addr) public {
        require(msg.sender == president);

        for (uint i = 0; i < members.length; ++i) {
            if (members[i] == addr)
                delete members[i];
        }
    }

    function setNewPresident(address newPresident) public {
        require(msg.sender == president);
        president = newPresident;
    }

    function addMember(address member) public {
        require(msg.sender == president);
        members.push(member);

        emit MemberAdded(member);
    }

    function contains(address a, address[] memory addresses) 
                                private pure returns (bool) {
        for (uint i = 0; i < addresses.length; ++i)
            if (addresses[i] == a) 
                return true;
        return false;
    }


}