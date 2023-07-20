import { Conversation } from '@/state/reducers/conversations/conversationsSlice.types';

export const getConversationName = (currentUsername: string, conversation: Conversation, isNew: boolean) => {

    if (isNew) {
        return 'New conversation';
    }

    // get participants from conversation
    const members = conversation.participants;

    // if there is only one participant, return the current username
    if (members.length === 1) {
        return currentUsername;
    }

    // remove current username from participants
    const filteredMembers = members.filter(member => member.username !== currentUsername);

    // if there are 2 participants, return the other participant's username
    if (filteredMembers.length === 2) {
        const otherParticipant = filteredMembers.find(participant => participant.username !== currentUsername);
        return otherParticipant.username;
    }

    // if there are more than 2 participants, return: first, second, and rest:
    const firstParticipant = filteredMembers[0];
    const secondParticipant = filteredMembers[1];
    const restParticipants = filteredMembers.slice(2);

    return `${firstParticipant.username}, ${secondParticipant.username} and ${restParticipants.length} others`;
};