export const stages = [
    'Pending',
    'Accepted',
    'Declined',
    'Done',
    
];

export const stageNames = {
    opportunity: 'Opportunity',
    'proposal-sent': 'Proposal Sent',
    'in-negociation': 'In Negociation',
    won: 'Won',
    lost: 'Lost',
    delayed: 'Delayed',
};

export const stageChoices = stages.map(type => ({
    id: type,
    /* @ts-ignore */
    name: stageNames[type],
}));
