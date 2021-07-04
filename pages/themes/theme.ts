// theme.ts
// -----------------/How to responsive/-----------------
// How to responsive
// // 1. Import the utilities
// import { extendTheme } from "@chakra-ui/react"
// import { createBreakpoints } from "@chakra-ui/theme-tools"
// // 2. Update the breakpoints as key-value pairs
// const breakpoints = createBreakpoints({
//   sm: "320px",
//   md: "768px",
//   lg: "960px",
//   xl: "1200px",
// })
// // 3. Extend the theme
// const theme = extendTheme({ breakpoints })
// // 4. Now you can use the custom breakpoints
// function Example() {
//   return <Box width={{ base: "100%", sm: "50%", md: "25%" }} />
// }
// -----------------/Global style overrides/-----------------
// // theme.js
// import { extendTheme } from "@chakra-ui/react"
// // Global style overrides
// import styles from "./styles"
// // Foundational style overrides
// import borders from "./foundations/borders"
// // Component style overrides
// import Button from "./components/button"
// const overrides = {
//   styles,
//   borders,
//   // Other foundational style overrides go here
//   components: {
//     Button,
//     // Other components go here
//   },
// }
// export default extendTheme(overrides)
// -----------------//-----------------
// const theme = extendTheme({
//   config: {
//     cssVarPrefix: "ck",
//   },
// })
// -----------------//-----------------

// 1. import `extendTheme` function
import { extendTheme, ThemeConfig } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

// 2. Add your color mode config
const config: ThemeConfig = {
	initialColorMode: "light",
	useSystemColorMode: true,
	cssVarPrefix: "chutchaikp",
}

const breakpoints = createBreakpoints({
	sm: "320px",
	md: "768px",
	lg: "960px",
	xl: "1200px",
})

// 3. extend the theme
const theme = extendTheme({
	config,
	breakpoints,
	// fonts: {
	// 	heading: "Red Hat Display",
	// 	body: "Red Hat Display",
	// },
})

export default theme