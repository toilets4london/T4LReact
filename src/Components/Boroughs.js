export const boroughs = [
  {
    value: "City of London",
    display_name: "City of London",
  },
  {
    value: "Barking and Dagenham",
    display_name: "Barking and Dagenham",
  },
  {
    value: "Barnet",
    display_name: "Barnet",
  },
  {
    value: "Bexley",
    display_name: "Bexley",
  },
  {
    value: "Brent",
    display_name: "Brent",
  },
  {
    value: "Bromley",
    display_name: "Bromley",
  },
  {
    value: "Camden",
    display_name: "Camden",
  },
  {
    value: "Croydon",
    display_name: "Croydon",
  },
  {
    value: "Ealing",
    display_name: "Ealing",
  },
  {
    value: "Enfield",
    display_name: "Enfield",
  },
  {
    value: "Greenwich",
    display_name: "Greenwich",
  },
  {
    value: "Hackney",
    display_name: "Hackney",
  },
  {
    value: "Hammersmith and Fulham",
    display_name: "Hammersmith and Fulham",
  },
  {
    value: "Haringey",
    display_name: "Haringey",
  },
  {
    value: "Harrow",
    display_name: "Harrow",
  },
  {
    value: "Havering",
    display_name: "Havering",
  },
  {
    value: "Hillingdon",
    display_name: "Hillingdon",
  },
  {
    value: "Hounslow",
    display_name: "Hounslow",
  },
  {
    value: "Islington",
    display_name: "Islington",
  },
  {
    value: "Kensington and Chelsea",
    display_name: "Kensington and Chelsea",
  },
  {
    value: "Kingston upon Thames",
    display_name: "Kingston upon Thames",
  },
  {
    value: "Lambeth",
    display_name: "Lambeth",
  },
  {
    value: "Lewisham",
    display_name: "Lewisham",
  },
  {
    value: "Merton",
    display_name: "Merton",
  },
  {
    value: "Newham",
    display_name: "Newham",
  },
  {
    value: "Redbridge",
    display_name: "Redbridge",
  },
  {
    value: "Richmond upon Thames",
    display_name: "Richmond upon Thames",
  },
  {
    value: "Southwark",
    display_name: "Southwark",
  },
  {
    value: "Sutton",
    display_name: "Sutton",
  },
  {
    value: "Tower Hamlets",
    display_name: "Tower Hamlets",
  },
  {
    value: "Waltham Forest",
    display_name: "Waltham Forest",
  },
  {
    value: "Wandsworth",
    display_name: "Wandsworth",
  },
  {
    value: "Westminster",
    display_name: "Westminster",
  },
  {
    value: "",
    display_name: "Other",
  },
];

export default function getValidBorough(borough) {
  for (const b of boroughs) {
    if (b.display_name.toLowerCase().replaceAll(" ","+") === borough.toLowerCase()) {
      return b.display_name.replaceAll(" ","+");
    }
  }
  return null;
}
