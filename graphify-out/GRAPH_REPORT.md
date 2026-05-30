# Graph Report - /Users/hafee/Documents/Claude/Utility-Website  (2026-05-29)

## Corpus Check
- 103 files · ~51,387 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 689 nodes · 903 edges · 69 communities (36 shown, 33 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 80 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Homepage & Age Calculator|Homepage & Age Calculator]]
- [[_COMMUNITY_App Layout & Trust Pages|App Layout & Trust Pages]]
- [[_COMMUNITY_Project Dependencies|Project Dependencies]]
- [[_COMMUNITY_SEO & App Router Patterns|SEO & App Router Patterns]]
- [[_COMMUNITY_Dynamic Route Pages|Dynamic Route Pages]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_UI Component Conventions|UI Component Conventions]]
- [[_COMMUNITY_AdSense & Content Strategy|AdSense & Content Strategy]]
- [[_COMMUNITY_Interactive Tool Registry|Interactive Tool Registry]]
- [[_COMMUNITY_Calculator Engine|Calculator Engine]]
- [[_COMMUNITY_Paycheck Calculator|Paycheck Calculator]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Calculator Modules|Calculator Modules]]
- [[_COMMUNITY_Performance Metrics|Performance Metrics]]
- [[_COMMUNITY_Root Layout & Theme|Root Layout & Theme]]
- [[_COMMUNITY_Trust & Navigation Pages|Trust & Navigation Pages]]
- [[_COMMUNITY_Prettier Config|Prettier Config]]
- [[_COMMUNITY_Address Generator Tool|Address Generator Tool]]
- [[_COMMUNITY_Project Phases & Roadmap|Project Phases & Roadmap]]
- [[_COMMUNITY_Tool Content JSON|Tool Content JSON]]
- [[_COMMUNITY_Loan Content JSON|Loan Content JSON]]
- [[_COMMUNITY_Case Converter Tool|Case Converter Tool]]
- [[_COMMUNITY_Username Generator Tool|Username Generator Tool]]
- [[_COMMUNITY_ROI Content JSON|ROI Content JSON]]
- [[_COMMUNITY_Mortgage Content JSON|Mortgage Content JSON]]
- [[_COMMUNITY_Paycheck Content JSON|Paycheck Content JSON]]
- [[_COMMUNITY_Investment Content JSON|Investment Content JSON]]
- [[_COMMUNITY_Random Number Content JSON|Random Number Content JSON]]
- [[_COMMUNITY_Password Generator Tool|Password Generator Tool]]
- [[_COMMUNITY_Spin the Wheel Tool|Spin the Wheel Tool]]
- [[_COMMUNITY_Binary to Text Tool|Binary to Text Tool]]
- [[_COMMUNITY_Text to Binary Tool|Text to Binary Tool]]
- [[_COMMUNITY_VS Code Launch Config|VS Code Launch Config]]
- [[_COMMUNITY_Claude Permissions Config|Claude Permissions Config]]
- [[_COMMUNITY_Component Barrel Exports|Component Barrel Exports]]
- [[_COMMUNITY_Contact Page|Contact Page]]
- [[_COMMUNITY_Disclaimer Page|Disclaimer Page]]
- [[_COMMUNITY_Privacy Policy Page|Privacy Policy Page]]
- [[_COMMUNITY_Terms Page|Terms Page]]
- [[_COMMUNITY_Character Counter Tool|Character Counter Tool]]
- [[_COMMUNITY_Module Cluster 40|Module Cluster 40]]
- [[_COMMUNITY_Module Cluster 41|Module Cluster 41]]
- [[_COMMUNITY_Module Cluster 42|Module Cluster 42]]
- [[_COMMUNITY_Module Cluster 43|Module Cluster 43]]
- [[_COMMUNITY_Module Cluster 44|Module Cluster 44]]
- [[_COMMUNITY_Module Cluster 48|Module Cluster 48]]
- [[_COMMUNITY_Module Cluster 49|Module Cluster 49]]
- [[_COMMUNITY_Module Cluster 50|Module Cluster 50]]
- [[_COMMUNITY_Module Cluster 53|Module Cluster 53]]
- [[_COMMUNITY_Module Cluster 54|Module Cluster 54]]
- [[_COMMUNITY_Module Cluster 55|Module Cluster 55]]
- [[_COMMUNITY_Module Cluster 56|Module Cluster 56]]
- [[_COMMUNITY_Module Cluster 57|Module Cluster 57]]
- [[_COMMUNITY_Module Cluster 58|Module Cluster 58]]
- [[_COMMUNITY_Module Cluster 59|Module Cluster 59]]
- [[_COMMUNITY_Module Cluster 60|Module Cluster 60]]
- [[_COMMUNITY_Module Cluster 61|Module Cluster 61]]
- [[_COMMUNITY_Module Cluster 62|Module Cluster 62]]
- [[_COMMUNITY_Module Cluster 63|Module Cluster 63]]
- [[_COMMUNITY_Module Cluster 64|Module Cluster 64]]
- [[_COMMUNITY_Module Cluster 65|Module Cluster 65]]
- [[_COMMUNITY_Module Cluster 66|Module Cluster 66]]
- [[_COMMUNITY_Module Cluster 67|Module Cluster 67]]
- [[_COMMUNITY_Module Cluster 68|Module Cluster 68]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 33 edges
2. `CUSTOM_COMPONENTS registry` - 14 edges
3. `Interactive Tool Component Pattern` - 13 edges
4. `scripts` - 12 edges
5. `ToolConfig` - 11 edges
6. `CalculatorPageClient` - 11 edges
7. `TOOLS array (single source of truth)` - 11 edges
8. `rules` - 10 edges
9. `HomePage()` - 10 edges
10. `CATEGORIES` - 10 edges

## Surprising Connections (you probably didn't know these)
- `ResultBox()` --calls--> `clsx`  [INFERRED]
  src/components/calculators/ResultBox.tsx → package.json
- `Tool Interface (TypeScript)` --semantically_similar_to--> `ToolConfig Interface`  [EXTRACTED] [semantically similar]
  .planning/REQUIREMENTS.md → src/lib/data/CLAUDE.md
- `Header()` --calls--> `clsx`  [INFERRED]
  src/components/layout/Header.tsx → package.json
- `RelatedTools()` --calls--> `clsx`  [INFERRED]
  src/components/common/RelatedTools.tsx → package.json
- `InputGroup()` --calls--> `clsx`  [INFERRED]
  src/components/calculators/InputGroup.tsx → package.json

## Hyperedges (group relationships)
- **Project toolchain configuration (TypeScript + ESLint + Prettier + Tailwind + Next.js)** — root_tsconfigjson_typescript_config, root_eslintrc_eslintconfig, root_eslint_config_mjs_eslintflat, root_prettierrc_prettierconfig, root_tailwind_config_tailwindconfig, root_next_config_nextconfig [INFERRED 0.95]
- **Root layout wraps all providers and global UI shell** — app_layout_rootlayout, components_providers_themeprovider_themeprovider, components_layout_header_header, components_layout_footer_footer [EXTRACTED 1.00]
- **AdSense trust pages (contact, disclaimer, privacy-policy)** — app_contact_contactpage, app_disclaimer_disclaimerpage, app_privacy_policy_privacypolicypage [INFERRED 0.85]
- **SEO data pipeline: TOOLS + CATEGORIES → sitemap + homepage + category pages** — lib_data_tools_tools, lib_data_categories_categories, app_sitemap_sitemapgenerator, app_page_homepage, app_not_found_notfound [EXTRACTED 1.00]
- **All Interactive Tool Components** — tools_fakeaddressgenerator, tools_texttobinary, tools_passwordgenerator, tools_spinthewheel, tools_wordcounter, tools_qrcodegenerator, tools_caseconverter, tools_datedifference, tools_binarytotext, tools_charactercounter, tools_countdowntimer, tools_randomnamepicker, tools_usernamegenerator [EXTRACTED 1.00]
- **Dynamic [slug] route for calculators** — app_calculators_slug_page, app_calculators_slug_client, lib_data_tools, lib_data_content_types, lib_utils_seo, concept_serializabletool, concept_server_client_boundary [INFERRED 0.95]
- **AdSense Trust Pages** — app_terms_page, app_about_page, concept_trust_pages [INFERRED 0.85]
- **Tool/Category Listing Pages using TOOLS+CATEGORIES registry** — app_calculators_page, app_categories_category_page, app_about_page, layout_footer, lib_data_tools, lib_data_categories [EXTRACTED 1.00]
- **Dark mode theme system participants** — hooks_usetheme_hook, providers_themeprovider_component, providers_themeprovider_context, providers_themeprovider_usethemecontext, layout_themetoggle_component, concept_theme_darkmode [EXTRACTED 1.00]
- **CalculatorLayout composition: all sub-components rendered within it** — calculators_calculatorlayout_component, calculators_faqaccordion_component, common_breadcrumbnav_component, common_relatedtools_component, common_adplaceholder_component, common_sharebutton_component [EXTRACTED 1.00]
- **localStorage-backed state hooks** — hooks_usefavorites_hook, hooks_userecenttools_hook, hooks_usetheme_hook, concept_localstorage_persistence [EXTRACTED 1.00]
- **Calculator data-driven engine: hooks + UI components** — hooks_usecalculator_hook, hooks_usedebounce_hook, calculators_calculatorlayout_component, calculators_inputgroup_component, calculators_resultbox_component [INFERRED 0.95]
- **Validation and constants: financial boundaries enforced in validation fns** — utils_validation_functions, lib_constants_financiallimits, lib_constants_validationrules, lib_constants_taxbrackets [EXTRACTED 1.00]
- **Finance Calculator Suite (mortgage, paycheck, ROI, loan, investment)** — calculators_mortgage_module, calculators_paycheck_module, calculators_roi_module, calculators_loan_module, calculators_investment_module [EXTRACTED 1.00]
- **Everyday Utilities Calculator Suite (age, random number generator)** — calculators_age_module, calculators_random_module [EXTRACTED 1.00]
- **Math Utility Functions used by calculators** — utils_math_calculatecompoundinterest, utils_math_calculatemonthlypayment, utils_math_calculatepayoffmonths, utils_math_calculateage, utils_math_parsedate, utils_math_calculatefederaltax [EXTRACTED 1.00]
- **SEO JSON-LD Schema Generators** — utils_seo_generatecalculatorschema, utils_seo_generatefaqschema, utils_seo_generatebreadcrumbschema, utils_seo_generatewebsiteschema [EXTRACTED 1.00]
- **Tool Content JSON files (SEO copy + FAQs)** — content_mortgage_calculator_json, content_paycheck_calculator_json, content_investment_calculator_json, content_roi_calculator_json, content_loan_calculator_json, content_age_calculator_json, content_random_number_generator_json [EXTRACTED 1.00]
- **All financial calculator modules using decimal.js for precision** — calculators_mortgage_module, calculators_paycheck_module, calculators_loan_module, calculators_investment_module, calculators_roi_module, utils_math_module [EXTRACTED 1.00]
- **Tools registry pattern: tools.ts drives routing, metadata, compute** — data_tools_tools_array, data_tools_toolconfig, data_tools_gettoolbyslug, data_tools_gettoolsbycategory, data_tools_getpopulartools, data_tools_getrelatedtools [EXTRACTED 1.00]
- **SEO Infrastructure Components** — dotclaude_seo_architecture, requirements_schema_markup, research_faq_schema, research_breadcrumb_schema, app_claude_schema_injection, calculators_component_faqaccordion, concept_internal_linking [EXTRACTED 0.95]
- **Core Web Vitals Optimization Group** — dotclaude_performance_targets, research_cwv_optimization, research_debounce_pattern, common_claude_adplaceholder, hooks_claude_usecalculator [EXTRACTED 0.95]
- **Data Layer (Single Source of Truth)** — readme_single_source_of_truth, lib_data_toolconfig, lib_data_categories, lib_data_toolcontent, lib_data_custom_components, lib_data_tools_helpers [EXTRACTED 1.00]
- **Calculator Engine Stack** — calculators_component_layout, calculators_component_inputgroup, calculators_component_resultbox, hooks_claude_usecalculator, lib_calc_pure_functions, lib_claude_decimal_js_rule, research_decimal_js_pattern [EXTRACTED 1.00]
- **MVP 7 Calculators** — concept_7_calculators_mvp, lib_calc_existing_calculators, plan_01_tasks, roadmap_phase1, roadmap_finance_first_rationale [EXTRACTED 1.00]

## Communities (69 total, 33 thin omitted)

### Community 0 - "Homepage & Age Calculator"
Cohesion: 0.06
Nodes (52): HomePage(), HOMEPAGE_FAQS, metadata, AgeInputs, AgeOutput, calculateAgeCalculator(), calculateInvestment(), InvestmentInputs (+44 more)

### Community 1 - "App Layout & Trust Pages"
Cohesion: 0.06
Nodes (39): metadata, inter, metadata, CalculatorLayout(), CalculatorLayoutProps, FAQAccordion(), FAQAccordionProps, FAQItem (+31 more)

### Community 2 - "Project Dependencies"
Cohesion: 0.04
Nodes (45): dependencies, decimal.js, mathjs, next, qrcode, react, react-dom, description (+37 more)

### Community 3 - "SEO & App Router Patterns"
Cohesion: 0.06
Nodes (39): Canonical URL Pattern, App Router Page Conventions, Schema Injection (3 JSON-LD scripts), Server-Client Boundary (SerializableTool), CalculatorPageClient Responsibilities, Input Type Safety (no number coercion for select/text/date), Calculator [slug] Page Responsibilities, Calculator Engine Components (+31 more)

### Community 4 - "Dynamic Route Pages"
Cohesion: 0.10
Nodes (37): AboutPage, CalculatorsPage, CalculatorPageClient, CalculatorPage (Server Component), CategoryPage, CalculatorLayout, InputGroup, ResultBox (+29 more)

### Community 5 - "TypeScript Config"
Cohesion: 0.05
Nodes (36): compilerOptions, allowJs, allowSyntheticDefaultImports, alwaysStrict, baseUrl, declaration, declarationMap, esModuleInterop (+28 more)

### Community 6 - "UI Component Conventions"
Cohesion: 0.06
Nodes (35): Key Invariants, AdPlaceholder (min-h CLS Prevention), SearchBar (fuzzy matching, 150ms debounce), ShareButton (Web Share API + clipboard fallback), Common Shared UI Components, 7 Calculators MVP (finance + utility), Dark Mode (no-flash localStorage script), Revenue Model (AdSense + Affiliate) (+27 more)

### Community 7 - "AdSense & Content Strategy"
Cohesion: 0.06
Nodes (34): adsense, contentPagesTarget, minimumWordsPerPage, targetApprovalDate, contentStrategy, contentGeneration, faqsPerCalculator, wordsPerCalculator (+26 more)

### Community 8 - "Interactive Tool Registry"
Cohesion: 0.11
Nodes (20): ResultBox(), ResultBoxProps, next/dynamic lazy loading for interactive tool components, ToolContent, CUSTOM_COMPONENTS, DynamicComponent, CalculatorInput, CalculatorOutput (+12 more)

### Community 9 - "Calculator Engine"
Cohesion: 0.09
Nodes (29): CalculatorLayout, FAQAccordion, InputGroup, ResultBox, BreadcrumbNav, BreadcrumbList JSON-LD schema, RelatedTools, SearchBar (+21 more)

### Community 10 - "Paycheck Calculator"
Cohesion: 0.10
Nodes (11): calculatePaycheck(), FREQUENCY_DIVISOR, PaycheckInputs, PaycheckOutput, PayFrequency, 2024 Federal Progressive Tax Brackets, FINANCIAL_LIMITS, TAX_BRACKETS_2024 (+3 more)

### Community 11 - "ESLint Config"
Cohesion: 0.09
Nodes (21): extends, overrides, parser, parserOptions, ecmaVersion, project, sourceType, plugins (+13 more)

### Community 12 - "Calculator Modules"
Cohesion: 0.15
Nodes (17): age.ts calculator module, investment.ts calculator module, loan.ts calculator module, mortgage.ts calculator module, paycheck.ts calculator module, random.ts calculator module, roi.ts calculator module, decimal.js for financial arithmetic precision (+9 more)

### Community 13 - "Performance Metrics"
Cohesion: 0.14
Nodes (14): metrics, phase1, phase2, phase6Month, clsTarget, inpTarget, lcpTarget, lighthousePerformance (+6 more)

### Community 14 - "Root Layout & Theme"
Cohesion: 0.14
Nodes (14): RootLayout(), Footer component, Header component, ThemeProvider component, Dark Mode No-Flash Inline Script Pattern, Security HTTP Headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection), Tailwind darkMode: class strategy, TypeScript Strict Mode (noImplicitAny + strictNullChecks) (+6 more)

### Community 15 - "Trust & Navigation Pages"
Cohesion: 0.23
Nodes (12): NotFound(), PrivacyPolicyPage (src/app/privacy-policy/page.tsx), Sitemap Generator (src/app/sitemap.ts), AdPlaceholder, AdPlaceholder component, Google AdSense Monetization Strategy, Programmatic SEO with Dynamic Sitemap + Schema JSON-LD, Single Source of Truth (TOOLS/CATEGORIES registries) (+4 more)

### Community 16 - "Prettier Config"
Cohesion: 0.20
Nodes (9): arrowParens, bracketSpacing, endOfLine, printWidth, semi, singleQuote, tabWidth, trailingComma (+1 more)

### Community 17 - "Address Generator Tool"
Cohesion: 0.22
Nodes (6): Address, CITIES, FIRST, LAST, Props, STREETS

### Community 18 - "Project Phases & Roadmap"
Cohesion: 0.29
Nodes (7): Programmatic Scale (50-state variations), Calculator Accuracy Verification, Phase 1 Execution Plan (8 Tasks), Wave-Based Task Structure, Phase 1: MVP Launch (Week 1), Phase 2: Expansion (Week 2-3), Phase 3: Scale (Week 4+)

### Community 19 - "Tool Content JSON"
Cohesion: 0.33
Nodes (5): faqs, howItWorks, interpretationGuide, intro, slug

### Community 20 - "Loan Content JSON"
Cohesion: 0.33
Nodes (5): faqs, howItWorks, interpretationGuide, intro, slug

### Community 21 - "Case Converter Tool"
Cohesion: 0.53
Nodes (5): CaseConverterTool(), Props, toCamel(), toSentence(), toTitle()

### Community 22 - "Username Generator Tool"
Cohesion: 0.33
Nodes (3): ADJECTIVES, NOUNS, Props

### Community 23 - "ROI Content JSON"
Cohesion: 0.33
Nodes (5): faqs, howItWorks, interpretationGuide, intro, slug

### Community 24 - "Mortgage Content JSON"
Cohesion: 0.33
Nodes (5): faqs, howItWorks, interpretationGuide, intro, slug

### Community 25 - "Paycheck Content JSON"
Cohesion: 0.33
Nodes (5): faqs, howItWorks, interpretationGuide, intro, slug

### Community 26 - "Investment Content JSON"
Cohesion: 0.33
Nodes (5): faqs, howItWorks, interpretationGuide, intro, slug

### Community 27 - "Random Number Content JSON"
Cohesion: 0.33
Nodes (5): faqs, howItWorks, interpretationGuide, intro, slug

### Community 30 - "Binary to Text Tool"
Cohesion: 0.67
Nodes (3): binaryToText(), BinaryToTextTool(), Props

### Community 31 - "Text to Binary Tool"
Cohesion: 0.67
Nodes (3): Props, textToBinary(), TextToBinaryTool()

### Community 34 - "Component Barrel Exports"
Cohesion: 0.67
Nodes (3): Barrel Export Pattern, Component Conventions, Server vs Client Component Rule

## Ambiguous Edges - Review These
- `SearchBar` → `VALIDATION_RULES`  [AMBIGUOUS]
  src/components/common/SearchBar.tsx · relation: conceptually_related_to
- `ResultBox` → `VALIDATION_RULES`  [AMBIGUOUS]
  src/components/calculators/ResultBox.tsx · relation: conceptually_related_to
- `TAX_BRACKETS_2024` → `siteConfig`  [AMBIGUOUS]
  src/lib/siteConfig.ts · relation: conceptually_related_to

## Knowledge Gaps
- **317 isolated node(s):** `config`, `semi`, `trailingComma`, `singleQuote`, `printWidth` (+312 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **33 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `SearchBar` and `VALIDATION_RULES`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `ResultBox` and `VALIDATION_RULES`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `TAX_BRACKETS_2024` and `siteConfig`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `dependencies` connect `Project Dependencies` to `App Layout & Trust Pages`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Why does `clsx` connect `App Layout & Trust Pages` to `Interactive Tool Registry`, `Project Dependencies`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Are the 13 inferred relationships involving `CUSTOM_COMPONENTS registry` (e.g. with `FakeAddressGeneratorTool` and `TextToBinaryTool`) actually correct?**
  _`CUSTOM_COMPONENTS registry` has 13 INFERRED edges - model-reasoned connections that need verification._
- **Are the 13 inferred relationships involving `Interactive Tool Component Pattern` (e.g. with `FakeAddressGeneratorTool` and `TextToBinaryTool`) actually correct?**
  _`Interactive Tool Component Pattern` has 13 INFERRED edges - model-reasoned connections that need verification._