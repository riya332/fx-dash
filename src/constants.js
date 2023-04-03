export const ASC = 'ASC';
export const DESC = 'DESC';
export const CREATE_DATE = "CREATE_DATE";
export const FX_RATE = "FX_RATE";
export const LAST_UPDATE = "LAST_UPDATE";


export const sortDir = {
  ASC: ASC,
  DESC: DESC
}

export const sortOptions = {
  CREATE_DATE: CREATE_DATE,
  FX_RATE: FX_RATE,
  LAST_UPDATE: LAST_UPDATE
}
export const sortOptionsConstant = [
  {
    type: CREATE_DATE,
    label: "SORT BY CREATED",
    direction: sortDir.ASC,
  },
  {
    type: FX_RATE,
    label: "SORT BY FX RATE",
    direction: sortDir.DESC,
  },
  {
    type: LAST_UPDATE,
    label: "SORT BY LAST UPDATED",
    direction: sortDir.DESC,
  }
]
  

