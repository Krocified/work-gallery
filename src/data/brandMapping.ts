export const brandMapping: Record<string, string> = {
    "across": "ACROSS",
    "fortytwo": "FortyTwo",
    "idl": "IDL Courier Express",
    "mwa": "Multi Wangi Alami",
    "tropee": "Tropee bebe",
    "store2go": "Store2Go",
    "tigersnus": "Tigersnus"
};

export const getBrandName = (key: string): string => {
    return brandMapping[key.toLowerCase()] || key;
};
