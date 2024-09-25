// Fonction pour générer les données initiales
export const getInitialData = () => ({
    tasks: {},
    listOrder: [],
    newListName: '',
    isAddingList: false,
});

// Fonction pour réordonner les éléments (drag and drop)
export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};
