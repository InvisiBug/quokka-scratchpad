import { gql } from "graphql-request";

export const viewQuery = gql`
  query View(
    $urn: URN!
    $withBottomBar: Boolean = false
    $withLeftSidebar: Boolean = false
    $withRegulatoryData: Boolean = false
    $numberOfFilledCardsInCardGroup: Int!
    $numberOfFilledCardsInView: Int!
    $withPageInfo: Boolean = false
    $first: Int
    $cursor: String
    $preferences: LayoutPreferencesInput
    $productExclusions: [ProductExclusion!]
    $experiments: [ExperimentsInput!]
    $throttlesOn: [String!]
    $throttlesOff: [String!]
  )
  @preferences(preferences: $preferences)
  @productExclusions(productExclusions: $productExclusions)
  @experiments(experiments: $experiments)
  @throttlesOn(throttlesOn: $throttlesOn)
  @throttlesOff(throttlesOff: $throttlesOff) {
    View(viewURN: $urn) {
      ...eventView
      ...sportView
      ...marketView
      ...allMarketsView
      ...allCompetitionsView
      ...gameView
      ...gamingCategoryView
      ...competitionView
      ...gamingView
      ...imsPromotionView
      ...promotionsView
      ...myBetsView
      ...myAccountView
      ...browseView
      ...settingsView
      ...raceView
      ...runnerView
      ...maintenanceView
      ...genericView
      ...gamingSegmentationView
      ...notFoundView
      ...marketRulesView
      ...selfExcludedView
      __typename
    }
  }
  fragment DisplayNameStats on DisplayNameTranslationKey {
    translationKey
    __typename
  }
  fragment DisplayNameStatsContent on DisplayNameTranslationKey {
    translationKey
    __typename
  }
  fragment GamingPrizeMachineCard on GamingPrizeMachineCard {
    __typename
    urn
    placementId
    completed
    redirectUrl
    jackpotAmount
    jackpotState
    activeTitle
    ctaLabel
    displayJackpotWinnersPostPlayWidget
    guaranteedPrize
    themeImages {
      topLeftImage {
        url
        alt
        dimensions {
          width
          height
          __typename
        }
        __typename
      }
      bottomLeftImage {
        url
        alt
        dimensions {
          width
          height
          __typename
        }
        __typename
      }
      bottomRightImage {
        url
        alt
        dimensions {
          width
          height
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment StatsContentCardGroup on StatsContentCardGroup {
    __typename
    urn
    full: items(first: 1) {
      ...StatsContentCardGroupItems
      __typename
    }
    partials: items {
      edges {
        ... on StatsPebbleItemEdge {
          displayName {
            ...DisplayNameStatsContent
            __typename
          }
          node {
            urn
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment StatsContentCardGroupItems on StatsContentItemsConnection {
    edges {
      ... on StatsPebbleItemEdge {
        displayName {
          ...DisplayNameStatsContent
          __typename
        }
        node {
          urn
          ... on StatsPebbleCardGroup {
            ...StatsPebbleCardGroup
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  fragment StatsFormCard on StatsFormCard {
    __typename
    urn
    fixture {
      urn
      scheduledAt
      home {
        name
        __typename
      }
      away {
        name
        __typename
      }
      recentForm {
        home {
          score {
            home
            away
            __typename
          }
          outcome
          __typename
        }
        away {
          score {
            home
            away
            __typename
          }
          outcome
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment StatsHeadToHeadCard on StatsHeadToHeadCard {
    __typename
    urn
    fixture {
      urn
      scheduledAt
      head2head {
        home {
          opponent
          score {
            home
            away
            __typename
          }
          startAt
          side
          __typename
        }
        away {
          opponent
          score {
            home
            away
            __typename
          }
          startAt
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment StatsPebbleCardGroup on StatsPebbleCardGroup {
    __typename
    urn
    status
    full: items(first: 1, selectedOnly: true) {
      edges {
        displayName {
          ...DisplayNameStats
          __typename
        }
        node {
          ... on StatsFormCard {
            ...StatsFormCard
            __typename
          }
          ... on StatsHeadToHeadCard {
            ...StatsHeadToHeadCard
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    partials: items {
      edges {
        displayName {
          ...DisplayNameStats
          __typename
        }
        node {
          urn
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment accountBannersCard on AccountBannersCard {
    __typename
    urn
    bannerDetails {
      bannerInfo {
        title
        bodyContent {
          text
          items
          formContent {
            addressInfo {
              addressLabel
              postcodeLabel
              jumioAddressStreetName
              jumioAddressCity
              jumioAddressProvince
              __typename
            }
            __typename
          }
          contactUsInfo {
            link
            label
            __typename
          }
          __typename
        }
        __typename
      }
      minimizedBannerInfo {
        bodyText
        __typename
      }
      bannerActions {
        label
        gaLabel
        minimizedLabel
        type
        buttonType
        path
        url
        target
        action
        data
        actionFinalize {
          onErrorBanner {
            bannerInfo {
              title
              bodyContent {
                text
                items
                formContent {
                  addressInfo {
                    addressLabel
                    postcodeLabel
                    jumioAddressStreetName
                    jumioAddressCity
                    jumioAddressProvince
                    __typename
                  }
                  __typename
                }
                contactUsInfo {
                  link
                  label
                  __typename
                }
                __typename
              }
              __typename
            }
            minimizedBannerInfo {
              bodyText
              __typename
            }
            bannerActions {
              label
              gaLabel
              minimizedLabel
              type
              buttonType
              path
              url
              target
              action
              data
              __typename
            }
            isMinimized
            priority
            useCase
            flow
            template
            attentionLevel
            maxDisplays
            version
            isClosable
            __typename
          }
          __typename
        }
        __typename
      }
      isMinimized
      priority
      useCase
      flow
      template
      attentionLevel
      maxDisplays
      version
      isClosable
      bannerType
      __typename
    }
  }
  fragment allCompetitionsView on AllCompetitionsView {
    __typename
    urn
    url
    title
    items(first: $numberOfFilledCardsInView) {
      ...viewItems
      __typename
    }
    partialItems: items {
      ...viewItemsPartial
      __typename
    }
    bottomBar @include(if: $withBottomBar) {
      ...bottomBar
      __typename
    }
    leftSidebar @include(if: $withLeftSidebar) {
      ...leftSidebar
      __typename
    }
    regulatoryData @include(if: $withRegulatoryData) {
      ...regulatoryData
      __typename
    }
  }
  fragment allMarketsView on AllMarketsView {
    __typename
    urn
    url
    title
    items(first: $numberOfFilledCardsInView) {
      ...viewItems
      __typename
    }
    partialItems: items {
      ...viewItemsPartial
      __typename
    }
    bottomBar @include(if: $withBottomBar) {
      ...bottomBar
      __typename
    }
    leftSidebar @include(if: $withLeftSidebar) {
      ...leftSidebar
      __typename
    }
    regulatoryData @include(if: $withRegulatoryData) {
      ...regulatoryData
      __typename
    }
  }
  fragment balanceCard on BalanceCard {
    __typename
    urn
    wallets {
      name
      __typename
    }
    walletSections {
      ... on WalletSectios {
        __typename
        key
        label
        name
        walletRules {
          ... on WalletRule {
            __typename
            name
            hideIfZero
            withCurrency
            aggregationRules {
              ... on WalletAggregationRule {
                __typename
                field
                sign
                wallet
              }
              __typename
            }
          }
          __typename
        }
      }
      __typename
    }
  }
  fragment baseFixture on BaseFixture {
    __typename
    urn
    sportevent {
      ...sportEvent
      __typename
    }
    mainMarket {
      exchange {
        ...exchangeMarketLiveData
        __typename
      }
      sportsbook {
        ...sportsbookMarketLiveData
        __typename
      }
      __typename
    }
  }
  fragment basketballFixture on BasketballFixture {
    __typename
    urn
    runnerNames {
      home
      away
      __typename
    }
    isAmericanFormat
    score {
      scoreHome: home
      scoreAway: away
      __typename
    }
    clock {
      period
      segment
      timeElapsed
      timeRemaining
      __typename
    }
    periodScores {
      score {
        scoreHome: home
        scoreAway: away
        __typename
      }
      period
      segment
      __typename
    }
  }
  fragment betCardGroup on BetCardGroup {
    __typename
    urn
    aggregatorId
    aggregatorDesc
    full: items {
      edges {
        node {
          ...fixtureCard
          ...eventHeaderCard
          ...raceDetailsCard
          ...sportsbookBetCard
          ...sportsbookExpandableLegCardGroup
          ...marketBetCardGroup
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment betOpportunityPromoCard on BetOpportunityPromoCard {
    __typename
    urn
    theme
    title
    subTitle
    promoImage {
      url
      __typename
    }
    termsAndConditions {
      ...promoTermsAndConditions
      __typename
    }
    betOpportunityAction: action {
      __typename
      link {
        label {
          ...displayName
          __typename
        }
        viewLink {
          viewUrn
          viewUrl
          viewDisplayMode
          __typename
        }
        __typename
      }
    }
  }
  fragment betSharingCardGroup on BetSharingCardGroup {
    __typename
    urn
    bet {
      ...sportsbookBet
      __typename
    }
    full: items {
      edges {
        node {
          ...sportsbookBetLegCardGroup
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment bottomBar on BottomBar {
    __typename
    hasProductSwitcher
    tiles: sections {
      tileType: sectionType
      viewLink {
        viewUrn
        viewUrl
        viewDisplayMode
        __typename
      }
      __typename
    }
  }
  fragment broadcastsAndStatisticsCard on BroadcastsAndStatisticsCard {
    __typename
    urn
    sportevent {
      ...sportEvent
      __typename
    }
    eventBroadCasts: broadcasts {
      dataVizUrl
      liveVideoUrl
      __typename
    }
    eventBroadCastsIsCollapsed: isCollapsed
    statisticsViewLink {
      viewUrn
      viewUrl
      __typename
    }
  }
  fragment broadcastsCard on BroadcastsCard {
    __typename
    urn
    broadcasts {
      dataVizUrl
      liveVideoUrl
      __typename
    }
    isCollapsed
  }
  fragment browseView on BrowseView {
    __typename
    urn
    url
    items {
      ...viewItems
      __typename
    }
    bottomBar @include(if: $withBottomBar) {
      ...bottomBar
      __typename
    }
    leftSidebar @include(if: $withLeftSidebar) {
      ...leftSidebar
      __typename
    }
    regulatoryData @include(if: $withRegulatoryData) {
      ...regulatoryData
      __typename
    }
  }
  fragment budgetLimitsCard on BudgetLimitsCard {
    __typename
    urn
    limits {
      amount
      category
      remain
      reset
      __typename
    }
  }
  fragment byTimeRangeOptions on ByTimeRangeOptions {
    __typename
    countriesFilter {
      urn
      defaultOptions {
        urn
        name
        __typename
      }
      availableOptions {
        urn
        name
        __typename
      }
      __typename
    }
  }
  fragment commonCompetition on Competition {
    __typename
    urn
    name
    competitionId
    sport {
      ...sport
      __typename
    }
  }
  fragment competition on Competition {
    ...commonCompetition
    ...competitionLogo
    ...competitionCountry
    __typename
  }
  fragment competitionBasic on Competition {
    ...commonCompetition
    __typename
  }
  fragment competitionCountry on Competition {
    country {
      ...country
      __typename
    }
    __typename
  }
  fragment competitionLogo on Competition {
    logo {
      vector
      small
      medium
      large
      __typename
    }
    __typename
  }
  fragment competitionRegionCard on CompetitionRegionCard {
    __typename
    urn
    competitionRegions {
      country {
        urn
        code
        flag {
          vector
          small
          medium
          large
          __typename
        }
        __typename
      }
      competitionViewLinks {
        urn
        viewLink {
          viewUrn
          viewUrl
          __typename
        }
        competition {
          ...competitionWithLogo
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment competitionView on CompetitionView {
    __typename
    urn
    url
    title
    canonicalUrl
    competition {
      ...competitionBasic
      __typename
    }
    items(first: $numberOfFilledCardsInView) {
      ...viewItems
      __typename
    }
    partialItems: items {
      ...viewItemsPartial
      __typename
    }
    bottomBar @include(if: $withBottomBar) {
      ...bottomBar
      __typename
    }
    leftSidebar @include(if: $withLeftSidebar) {
      ...leftSidebar
      __typename
    }
    regulatoryData @include(if: $withRegulatoryData) {
      ...regulatoryData
      __typename
    }
  }
  fragment competitionViewLinkCard on CompetitionViewLinkCard {
    __typename
    urn
    isHighlighted
    viewLink {
      viewUrn
      viewUrl
      __typename
    }
    competition {
      ...competition
      __typename
    }
  }
  fragment competitionViewLinkCardBasic on CompetitionViewLinkCard {
    __typename
    urn
    isHighlighted
    viewLink {
      viewUrn
      viewUrl
      __typename
    }
    competition {
      ...competitionBasic
      __typename
    }
  }
  fragment competitionWithLogo on Competition {
    ...commonCompetition
    ...competitionLogo
    __typename
  }
  fragment contentSummaryCard on ContentSummaryCard {
    __typename
    urn
    sections {
      sectionType
      title
      includeToFaq
      items {
        __typename
        ... on ContentSummaryGroupLinkItem {
          subtitle
          items {
            alignment
            text
            viewLink {
              viewUrl
              viewUrn
              __typename
            }
            __typename
          }
          __typename
        }
        ... on ContentSummaryTextItem {
          alignment
          text
          __typename
        }
      }
      __typename
    }
  }
  fragment correctScoreCard on CorrectScoreCard {
    __typename
    urn
    numberOfItemsToDisplay
    market {
      ...sportsbookMarket
      __typename
    }
  }
  fragment country on Country {
    urn
    code
    flag {
      vector
      small
      medium
      large
      __typename
    }
    __typename
  }
  fragment couponHeaderCard on CouponHeaderCard {
    __typename
    urn
    columns
    competition {
      ...competitionBasic
      __typename
    }
    competitionViewLink {
      viewUrn
      viewUrl
      __typename
    }
    hasStats
  }
  fragment couponHeaderCardPartial on CouponHeaderCard {
    __typename
    urn
  }
  fragment cricketFixture on CricketFixture {
    __typename
    urn
    isAmericanFormat
    runnerNames {
      home
      away
      __typename
    }
    score {
      homeScore: home {
        runs
        wickets
        inningNumber
        __typename
      }
      awayScore: away {
        runs
        wickets
        inningNumber
        __typename
      }
      __typename
    }
    currentTeamBatting
    currentTime {
      inning
      over
      __typename
    }
  }
  fragment displayName on DisplayName {
    ...displayNameTitle
    ...displayNameTranslationKey
    __typename
  }
  fragment displayNameTitle on DisplayNameTitle {
    __typename
    name
  }
  fragment displayNameTranslationKey on DisplayNameTranslationKey {
    __typename
    translationKey
  }
  fragment editorialPromoCard on EditorialPromoCard {
    __typename
    urn
    theme
    title
    subTitle
    promoImage {
      url
      __typename
    }
    promoTag {
      ... on PromoIconTag {
        iconTag
        __typename
      }
      ... on PromoLabelTag {
        label
        __typename
      }
      __typename
    }
    termsAndConditions {
      ...promoTermsAndConditions
      __typename
    }
    editorialAction: action {
      __typename
      link {
        label {
          ...displayName
          __typename
        }
        viewLink {
          viewUrn
          viewUrl
          viewDisplayMode
          __typename
        }
        __typename
      }
    }
  }
  fragment embeddedContentCard on EmbeddedContentCard {
    __typename
    urn
    contentTitle: title {
      ...displayNameTitle
      __typename
    }
    contentUrl: url
  }
  fragment embeddedViewCard on EmbeddedViewCard {
    __typename
    urn
    text
    url
  }
  fragment eventHeaderCard on EventHeaderCard {
    __typename
    urn
    title
    subtitle
    tertiaryTitle
    sportId
    date
  }
  fragment eventMarketCard on EventMarketCard {
    __typename
    urn
    eventViewLink {
      viewUrn
      viewUrl
      __typename
    }
    runnerViewLinks {
      runnerUrn
      viewUrl
      viewUrn
      __typename
    }
    title
    defaultIndex
    sportevent {
      ...sportEvent
      __typename
    }
    statsPebble {
      urn
      __typename
    }
    fixture {
      ...fixture
      __typename
    }
    displayRunners {
      exchange {
        market {
          ...exchangeMarketLiveData
          __typename
        }
        runners {
          runnerURN
          __typename
        }
        __typename
      }
      sportsbook {
        market {
          ...sportsbookMarketLiveData
          __typename
        }
        runners {
          runnerURN
          __typename
        }
        __typename
      }
      __typename
    }
    videoAvailable
    marketPromo: promotion {
      title
      description
      signposting
      __typename
    }
  }
  fragment eventMarketCardPartial on EventMarketCard {
    __typename
    urn
  }
  fragment eventStatsCard on EventStatsCard {
    __typename
    urn
    matchStatsUrl
  }
  fragment eventView on EventView {
    __typename
    urn
    url
    items(first: $numberOfFilledCardsInView) {
      ...viewItems
      __typename
    }
    canonicalUrl
    partialItems: items(first: 100) {
      ...viewItemsPartial
      __typename
    }
    sportevent {
      ...sportEvent
      __typename
    }
    bottomBar @include(if: $withBottomBar) {
      ...bottomBar
      __typename
    }
    leftSidebar @include(if: $withLeftSidebar) {
      ...leftSidebar
      __typename
    }
    regulatoryData @include(if: $withRegulatoryData) {
      ...regulatoryData
      __typename
    }
  }
  fragment eventViewLinkCard on EventViewLinkCard {
    ...eventViewLinkCardWithoutFixture
    eventViewLinkFixture: fixture {
      ... on FootballFixture {
        ...footballFixtureLite
        __typename
      }
      __typename
    }
    __typename
  }
  fragment eventViewLinkCardWithoutFixture on EventViewLinkCard {
    __typename
    urn
    isHighlighted
    viewLink {
      viewUrn
      viewUrl
      __typename
    }
    sportevent {
      ...sportEvent
      __typename
    }
  }
  fragment exchangeCashoutQuote on ExchangeCashoutQuote {
    __typename
    urn
    marketURN
    marketBetURN
    value
    profit
    status
  }
  fragment exchangeMarket on ExchangeMarket {
    __typename
    urn
    name
    marketType
    marketTypeName
    hierarchy {
      ...marketHierarchy
      __typename
    }
    bettingType
    eachWayDivisor
    numberOfWinners
    sport {
      ...sport
      __typename
    }
    runners {
      __typename
      runnerURN
      name
      selectionId
      handicap
      resultType
    }
  }
  fragment exchangeMarketBet on MarketBet {
    __typename
    urn
    id
    description
    numOfOrders
    numOfUnmatched
    cashoutQuotes {
      ...exchangeCashoutQuote
      __typename
    }
    liability
    betDelay
    marketViewLink {
      viewUrn
      viewUrl
      __typename
    }
    unmatchedEditViewLink {
      viewUrn
      viewUrl
      __typename
    }
    commission
    profit
    netProfit
  }
  fragment exchangeMarketLiveData on ExchangeMarket {
    __typename
    urn
    liveData {
      totalMatched
      exchangeMarketStatus
      inplay
      __typename
    }
    name
    marketType
    marketTypeName
    hierarchy {
      ...marketHierarchy
      __typename
    }
    sport {
      ...sport
      __typename
    }
    bettingType
    eachWayDivisor
    numberOfWinners
    runners {
      __typename
      runnerURN
      name
      selectionId
      handicap
      resultType
    }
    marketRulesViewLink {
      viewUrn
      viewUrl
      __typename
    }
  }
  fragment expandableCardGroup on ExpandableCardGroup {
    __typename
    urn
    expandableCardGroupTitle: title
    isExpandable
    isExpanded
    full: items(first: $numberOfFilledCardsInCardGroup) {
      ...fullExpandableCardGroupItems
      __typename
    }
    partials: items {
      ...partialsExpandableCardGroupItems
      __typename
    }
  }
  fragment expandableMarketCard on ExpandableMarketCard {
    __typename
    urn
    title
    viewOpenBets {
      viewUrl
      viewUrn
      __typename
    }
    marketCardURN
  }
  fragment filteredCouponCardGroup on FilteredCouponCardGroup {
    __typename
    urn
    has90Min(first: 10)
    filteredCouponTitle: title
    filterOptions {
      ...filteredCouponOptions
      __typename
    }
    viewAll {
      label
      icon
      viewLink {
        viewUrn
        viewUrl
        __typename
      }
      __typename
    }
    full: items(first: 10) {
      ...fullFilteredCouponCardGroupItems
      __typename
    }
    partials: items {
      ...partialsFilteredCouponCardGroupItems
      __typename
    }
  }
  fragment filteredCouponOptions on FilteredCouponOptions {
    __typename
    sortOption {
      defaultOption
      availableOptions
      __typename
    }
    dateRangeFilter {
      urn
      defaultOption {
        urn
        title {
          ...displayName
          __typename
        }
        __typename
      }
      availableOptions {
        urn
        title {
          ...displayName
          __typename
        }
        __typename
      }
      __typename
    }
    filtersSorting
    marketTypeFilter {
      urn
      defaultOption {
        marketType {
          urn
          __typename
        }
        name
        __typename
      }
      availableOptions {
        marketType {
          urn
          __typename
        }
        name
        __typename
      }
      __typename
    }
    competitionsFilter {
      urn
      defaultOptions {
        ...competitionBasic
        __typename
      }
      topCompetitions {
        ...competitionBasic
        __typename
      }
      __typename
    }
  }
  fragment fixture on Fixture {
    ... on FootballFixture {
      ...footballFixture
      __typename
    }
    ... on BaseFixture {
      ...baseFixture
      __typename
    }
    ... on TennisMatch {
      ...tennisFixture
      __typename
    }
    ... on BasketballFixture {
      ...basketballFixture
      __typename
    }
    ... on CricketFixture {
      ...cricketFixture
      __typename
    }
    ... on TableTennisFixture {
      ...tableTennisFixture
      __typename
    }
    __typename
  }
  fragment fixtureCard on FixtureCard {
    __typename
    urn
    fixture {
      ...fixture
      __typename
    }
    fixtureEventViewLink: eventViewLink {
      viewUrn
      viewUrl
      __typename
    }
    sportevent {
      ...sportEvent
      __typename
    }
    availableToSubscribe
  }
  fragment footballFixture on FootballFixture {
    __typename
    urn
    home {
      name
      color
      crest {
        vector
        small
        medium
        large
        __typename
      }
      __typename
    }
    away {
      name
      color
      crest {
        vector
        small
        medium
        large
        __typename
      }
      __typename
    }
    isAmericanFormat
    runnerNames {
      home
      away
      __typename
    }
    scheduledAt
    startedAt
    score {
      home
      away
      __typename
    }
    firstLegScore {
      home
      away
      __typename
    }
    duration {
      period
      status
      clock {
        minute
        second
        __typename
      }
      stoppageMinutes
      __typename
    }
    penaltyShootout {
      firstTeamToShoot
      nextTeamToShoot
      penaltyFormat
      penaltyScores {
        penaltyNumber
        side
        shotResult
        __typename
      }
      __typename
    }
  }
  fragment footballFixtureLite on FootballFixture {
    urn
    __typename
    scheduledAt
    startedAt
    duration {
      period
      status
      clock {
        minute
        second
        __typename
      }
      stoppageMinutes
      __typename
    }
    isAmericanFormat
    runnerNames {
      home
      away
      __typename
    }
    home {
      name
      __typename
    }
    away {
      name
      __typename
    }
  }
  fragment footballFixtureWithRecentForm on FootballFixture {
    ...footballFixture
    recentForm {
      home {
        ...footballTeamForm
        __typename
      }
      away {
        ...footballTeamForm
        __typename
      }
      __typename
    }
    __typename
  }
  fragment footballIncident on FootballIncident {
    clock {
      minute
      second
      __typename
    }
    period
    periodStatus
    details {
      ... on GoalIncident {
        __typename
        goalType
        side
        goalScorer {
          ...footballPlayer
          __typename
        }
        assist {
          ...footballPlayer
          __typename
        }
      }
      ... on CardIncident {
        __typename
        cardType
        side
        player {
          ...footballPlayer
          __typename
        }
      }
      ... on SubstitutionIncident {
        __typename
        side
        playerIn {
          ...footballPlayer
          __typename
        }
        playerOut {
          ...footballPlayer
          __typename
        }
      }
      ... on PenaltyIncident {
        __typename
        side
        penaltyType
      }
      ... on PenaltyShootoutIncident {
        __typename
        side
        penaltyShootoutType
        player {
          ...footballPlayer
          __typename
        }
      }
      ... on PeriodIncident {
        __typename
        periodType
        period
        status
        injuryTime
      }
      ... on ShotIncident {
        __typename
        side
        shotType
        player {
          ...footballPlayer
          __typename
        }
      }
      ... on SetPieceIncident {
        __typename
        side
        setPieceType
      }
      ... on FoulIncident {
        __typename
        side
        foulType
        player {
          ...footballPlayer
          __typename
        }
      }
      ... on AttackIncident {
        __typename
        side
        attackType
      }
      __typename
    }
    __typename
  }
  fragment footballPlayer on FootballPlayer {
    id
    name
    shirtNumber
    position
    positionDescription
    startingType
    __typename
  }
  fragment footballTeamForm on FootballTeamForm {
    opponent
    outcome
    startAt
    side
    score {
      home
      away
      __typename
    }
    extraTimeScore {
      home
      away
      __typename
    }
    penaltyShootoutScore {
      home
      away
      __typename
    }
    __typename
  }
  fragment forbiddenContentCard on ForbiddenContentCard {
    __typename
    urn
    forbiddenCardType
  }
  fragment fullCardGroupItems on SwimlaneCardGroupItemsConnection {
    edges {
      node {
        ...accountBannersCard
        ...balanceCard
        ...betOpportunityPromoCard
        ...broadcastsCard
        ...competitionViewLinkCard
        ...contentSummaryCard
        ...editorialPromoCard
        ...eventMarketCard
        ...eventViewLinkCard
        ...fixtureCard
        ...gameCard
        ...gameInfoCard
        ...gamingJackpotCard
        ...gamingLinkCard
        ...gamingPlayNewCard
        ...genericViewLinkCard
        ...headToHeadCard
        ...highlightedSelectionCard
        ...imsPromotionDetailsCard
        ...imsPromotionErrorCard
        ...imsPromotionStateCard
        ...imsPromotionTermsAndConditionsCard
        ...linksCard
        ...marketCard
        ...marketExtendedCard
        ...marketGraphsCard
        ...marketRulesCard
        ...marketViewLinkCard
        ...matchStatsCard
        ...matchTimelineCard
        ...miniPromoBannerCard
        ...loyaltyPromoCard
        ...promotionCard
        ...quickLinksCard
        ...raceDetailsCard
        ...raceMarketCard
        ...raceSwitcherPartialCard
        ...raceViewLinkCard
        ...raceViewLinksCard
        ...rewardsCard
        ...runnerInfoCard
        ...selectionPromoCard
        ...sportsbookBetCard
        ...sportViewLinkCard
        ...teamFormCard
        ...teamLineupCard
        ...raceByTimeRangeCard
        ...imsPromotionErrorCard
        ...regulatoryCard
        ...competitionRegionCard
        ...budgetLimitsCard
        ...gridCard
        ...expandableMarketCard
        ...popularBetBuilderCard
        ...popularMultiplesBetBuilderCard
        ...correctScoreCard
        ...marketBetCard
        ...marketBetSelectionCard
        ...priceBoostMultiplePromoCard
        ...priceBoostMultisCard
        ...GamingPrizeMachineCard
        __typename
      }
      __typename
    }
    __typename
  }
  fragment fullExpandableCardGroupItems on ExpandableCardGroupItemsConnection {
    edges {
      node {
        ...highlightedSelectionCard
        __typename
      }
      __typename
    }
    __typename
  }
  fragment fullFilteredCouponCardGroupItems on FilteredCouponCardGroupItemsConnection {
    edges {
      node {
        ...eventMarketCard
        ...couponHeaderCard
        __typename
      }
      __typename
    }
    __typename
  }
  fragment fullFutureRacingCardGroupItems on FutureRacingCardGroupItemsConnection {
    edges {
      date
      node {
        ...quickLinksCard
        __typename
      }
      __typename
    }
    __typename
  }
  fragment fullGameCardGroupItems on GamingCardGroupItemsConnection {
    edges {
      node {
        ...gameCard
        ...gameInfoCard
        ...gamingJackpotCard
        ...gamingLinkCard
        ...gamingPlayNewCard
        ...GamingPrizeMachineCard
        __typename
      }
      __typename
    }
    __typename
  }
  fragment fullNavigationTabItems on NavigationTabItems {
    edges {
      node {
        ...accountBannersCard
        ...balanceCard
        ...betOpportunityPromoCard
        ...broadcastsAndStatisticsCard
        ...broadcastsCard
        ...budgetLimitsCard
        ...competitionRegionCard
        ...competitionViewLinkCard
        ...contentSummaryCard
        ...correctScoreCard
        ...editorialPromoCard
        ...embeddedContentCard
        ...embeddedViewCard
        ...eventMarketCard
        ...eventViewLinkCard
        ...expandableMarketCard
        ...fixtureCard
        ...forbiddenContentCard
        ...gameCard
        ...gameInfoCard
        ...gamingJackpotCard
        ...gamingLinkCard
        ...gamingPlayNewCard
        ...genericViewLinkCard
        ...gridCard
        ...headToHeadCard
        ...highlightedSelectionCard
        ...imsPromotionDetailsCard
        ...imsPromotionDetailsCard
        ...imsPromotionErrorCard
        ...imsPromotionErrorCard
        ...imsPromotionStateCard
        ...imsPromotionStateCard
        ...imsPromotionTermsAndConditionsCard
        ...imsPromotionTermsAndConditionsCard
        ...linksCard
        ...marketCard
        ...marketExtendedCard
        ...marketGraphsCard
        ...marketRulesCard
        ...marketViewLinkCard
        ...matchStatsCard
        ...matchTimelineCard
        ...miniPromoBannerCard
        ...outrightMarketListCard
        ...popularMultiplesBetBuilderCard
        ...preferenceSingleChoiceCard
        ...promotionCard
        ...quickLinksCard
        ...raceByTimeRangeCard
        ...raceDetailsCard
        ...raceMarketCard
        ...raceResultsCard
        ...raceSwitcherPartialCard
        ...raceViewLinkCard
        ...raceViewLinksCard
        ...regulatoryCard
        ...rewardsCard
        ...runnerInfoCard
        ...searchBarCard
        ...selectionPromoCard
        ...sportsbookBetCard
        ...sportViewLinkCard
        ...teamFormCard
        ...teamLineupCard
        ...timeFormBroadCastsCard
        ...virtualEventDetailsCard
        ...virtualMarketCard
        ...priceBoostMultiplePromoCard
        ...betCardGroup
        ...expandableCardGroup
        ...filteredCouponCardGroup
        ...futureRacingCardGroup
        ...gamingCardGroup
        ...pebbleCardGroup
        ...quicklinksGridCardGroup
        ...racesByTimeRangeCardGroup
        ...segmentedCardGroup
        ...selectableitemsCardGroup
        ...sportRibbonCardGroup
        ...swimlaneCardGroup
        ...swimlaneIndexedCardGroup
        ...viewZone
        ...GamingPrizeMachineCard
        ...StatsPebbleCardGroup
        ...StatsContentCardGroup
        __typename
      }
      __typename
    }
    __typename
  }
  fragment fullPebbleCardGroupItems on PebbleLayoutItemsConnection {
    edges {
      name
      node {
        ...accountBannersCard
        ...balanceCard
        ...betOpportunityPromoCard
        ...broadcastsCard
        ...competitionViewLinkCard
        ...contentSummaryCard
        ...editorialPromoCard
        ...eventMarketCard
        ...eventViewLinkCard
        ...fixtureCard
        ...gameCard
        ...gameInfoCard
        ...gamingJackpotCard
        ...gamingLinkCard
        ...gamingPlayNewCard
        ...genericViewLinkCard
        ...headToHeadCard
        ...highlightedSelectionCard
        ...imsPromotionDetailsCard
        ...imsPromotionErrorCard
        ...imsPromotionStateCard
        ...imsPromotionTermsAndConditionsCard
        ...linksCard
        ...marketCard
        ...marketExtendedCard
        ...marketGraphsCard
        ...marketRulesCard
        ...marketViewLinkCard
        ...matchStatsCard
        ...matchTimelineCard
        ...miniPromoBannerCard
        ...promotionCard
        ...quickLinksCard
        ...raceDetailsCard
        ...raceMarketCard
        ...raceSwitcherPartialCard
        ...raceViewLinkCard
        ...raceViewLinksCard
        ...rewardsCard
        ...runnerInfoCard
        ...selectionPromoCard
        ...sportsbookBetCard
        ...sportViewLinkCard
        ...teamFormCard
        ...teamLineupCard
        ...raceByTimeRangeCard
        ...imsPromotionDetailsCard
        ...imsPromotionTermsAndConditionsCard
        ...imsPromotionStateCard
        ...imsPromotionErrorCard
        ...regulatoryCard
        ...competitionRegionCard
        ...accountBannersCard
        ...gridCard
        ...virtualMarketCard
        ...correctScoreCard
        ...packagedCreatedBetsCard
        ...priceBoostMultiplePromoCard
        ...GamingPrizeMachineCard
        __typename
      }
      __typename
    }
    __typename
  }
  fragment fullRacesByTimeRangeCardGroupItems on RacesByTimeRangeCardGroupItemsConnection {
    edges {
      node {
        ...swimlaneIndexedCardGroup
        __typename
      }
      __typename
    }
    __typename
  }
  fragment fullSegmentedCardGroupItems on SegmentedCardGroupItemsConnection {
    edges {
      node {
        ...gamingCardGroup
        __typename
      }
      __typename
    }
    __typename
  }
  fragment fullSelectableItemsCardGroupItems on SelectableItemsCardGroupItemsConnection {
    edges {
      ... on RaceTimeItemEdge {
        startTime
        venue
        promotion {
          signposting
          __typename
        }
        node {
          ...raceMarketCard
          __typename
        }
        __typename
      }
      ... on StatisticsItemEdge {
        node {
          ...teamFormCard
          ...eventStatsCard
          ...matchStatsCard
          ...teamLineupCard
          ...matchTimelineCard
          ...headToHeadCard
          __typename
        }
        __typename
      }
      ...virtualCardGroupFullItemEdge
      __typename
    }
    __typename
  }
  fragment fullSwimlaneIndexedCardGroupItems on SwimlaneIndexedCardGroupItemsConnection {
    edges {
      node {
        ...accountBannersCard
        ...balanceCard
        ...betOpportunityPromoCard
        ...broadcastsCard
        ...competitionViewLinkCard
        ...contentSummaryCard
        ...editorialPromoCard
        ...eventMarketCard
        ...eventViewLinkCard
        ...fixtureCard
        ...gameCard
        ...gameInfoCard
        ...gamingJackpotCard
        ...gamingLinkCard
        ...gamingPlayNewCard
        ...genericViewLinkCard
        ...headToHeadCard
        ...highlightedSelectionCard
        ...imsPromotionDetailsCard
        ...imsPromotionErrorCard
        ...imsPromotionStateCard
        ...imsPromotionTermsAndConditionsCard
        ...linksCard
        ...marketCard
        ...marketExtendedCard
        ...marketGraphsCard
        ...marketRulesCard
        ...marketViewLinkCard
        ...matchStatsCard
        ...matchTimelineCard
        ...miniPromoBannerCard
        ...loyaltyPromoCard
        ...promotionCard
        ...quickLinksCard
        ...raceDetailsCard
        ...raceMarketCard
        ...raceSwitcherPartialCard
        ...raceViewLinkCard
        ...raceViewLinksCard
        ...rewardsCard
        ...runnerInfoCard
        ...selectionPromoCard
        ...sportsbookBetCard
        ...sportViewLinkCard
        ...teamFormCard
        ...teamLineupCard
        ...raceByTimeRangeCard
        ...imsPromotionErrorCard
        ...regulatoryCard
        ...competitionRegionCard
        ...budgetLimitsCard
        ...priceBoostMultiplePromoCard
        ...GamingPrizeMachineCard
        __typename
      }
      __typename
    }
    __typename
  }
  fragment futureRacingCardGroup on FutureRacingCardGroup {
    __typename
    urn
    filterOptions {
      ...futureRacingOptions
      __typename
    }
    full: items(first: $numberOfFilledCardsInCardGroup) {
      ...fullFutureRacingCardGroupItems
      __typename
    }
    partials: items {
      ...partialsFutureRacingCardGroupItems
      __typename
    }
  }
  fragment futureRacingOptions on FutureRacingOptions {
    __typename
    countriesFilter {
      urn
      defaultOptions {
        urn
        name
        __typename
      }
      availableOptions {
        urn
        name
        __typename
      }
      __typename
    }
    monthFilter {
      urn
      defaultOptions {
        urn
        date
        __typename
      }
      availableOptions {
        urn
        date
        __typename
      }
      __typename
    }
  }
  fragment game on Game {
    urn
    __typename
    viewLink {
      viewUrn
      viewUrl
      __typename
    }
    name
    launchId
    rgsCodeMobile
    jackpotLogo
    customLogo {
      name
      image {
        ...gameImage
        __typename
      }
      __typename
    }
    feedData {
      jackpot
      availableSeats
      lastNumbers {
        number
        color
        __typename
      }
      tableNames
      __typename
    }
    copyrightText
    customBackgroundColor
    backgroundColor
    label
    provider {
      name
      uid
      __typename
    }
    mainProduct
    flattened {
      ...gameImages
      __typename
    }
    description {
      headline
      content {
        type
        text
        spans {
          start
          end
          style
          url
          __typename
        }
        __typename
      }
      __typename
    }
    rtp
    decoration
    hasDemo
  }
  fragment gameCard on GameCard {
    __typename
    urn
    game {
      ...game
      __typename
    }
  }
  fragment gameImage on GameImage {
    url
    alt
    dimensions {
      width
      height
      __typename
    }
    __typename
  }
  fragment gameImages on GameImages {
    small {
      url
      alt
      dimensions {
        width
        height
        __typename
      }
      __typename
    }
    medium {
      url
      alt
      dimensions {
        width
        height
        __typename
      }
      __typename
    }
    __typename
  }
  fragment gameInfoCard on GameInfoCard {
    __typename
    urn
    game {
      ...game
      __typename
    }
  }
  fragment gameStats on FootballGameStats {
    possession
    corners
    yellowCards
    redCards
    offsides
    fouls
    throwIns
    freeKicks
    goalKicks
    blockedShots
    dangerousAttacks
    shotsOnTarget
    shotsOffTarget
    goals
    __typename
  }
  fragment gameView on GameView {
    __typename
    urn
    url
    items {
      ...viewItems
      __typename
    }
    bottomBar @include(if: $withBottomBar) {
      ...bottomBar
      __typename
    }
    leftSidebar @include(if: $withLeftSidebar) {
      ...leftSidebar
      __typename
    }
    regulatoryData @include(if: $withRegulatoryData) {
      ...regulatoryData
      __typename
    }
  }
  fragment gamingCardGroup on GamingCardGroup {
    __typename
    urn
    cardGroupTitle: title
    displayName {
      translationKey
      __typename
    }
    defaultLayout
    layouts
    type
    viewAll {
      label
      icon
      viewLink {
        viewUrn
        viewUrl
        __typename
      }
      __typename
    }
    full: items(first: $numberOfFilledCardsInCardGroup) {
      ...fullGameCardGroupItems
      __typename
    }
    partials: items {
      ...partialsGameCardGroupItems
      __typename
    }
    decoration
    gameTileSize
  }
  fragment gamingCategoryView on GamingCategoryView {
    __typename
    urn
    url
    items(first: $numberOfFilledCardsInView) {
      ...viewItems
      __typename
    }
    partialItems: items(first: 100) {
      ...viewItemsPartial
      __typename
    }
    bottomBar @include(if: $withBottomBar) {
      ...bottomBar
      __typename
    }
    leftSidebar @include(if: $withLeftSidebar) {
      ...leftSidebar
      __typename
    }
    regulatoryData @include(if: $withRegulatoryData) {
      ...regulatoryData
      __typename
    }
  }
  fragment gamingJackpot on GamingJackpot {
    __typename
    urn
    name
    value
    state
    progress
    dropValue
    dropTime
    dropText
  }
  fragment gamingJackpotCard on GamingJackpotCard {
    __typename
    urn
    name
    logo
    jackpots {
      ...gamingJackpot
      __typename
    }
  }
  fragment gamingLinkCard on GamingLinkCard {
    __typename
    urn
    link {
      label
      icon
      viewLink {
        viewUrn
        viewUrl
        __typename
      }
      __typename
    }
  }
  fragment gamingPlayNewCard on GamingPlayNewCard {
    __typename
    urn
    title
    subtitle
    backgroundImage {
      url
      width
      height
      __typename
    }
    logoImage {
      url
      width
      height
      __typename
    }
    termsAndConditions {
      summary
      url
      label {
        ...displayName
        __typename
      }
      viewLink {
        viewUrn
        viewUrl
        viewDisplayMode
        __typename
      }
      __typename
    }
    endDate
    optInState
    tags
  }
  fragment gamingSegmentationView on GamingSegmentationView {
    __typename
    urn
    url
    items(first: $numberOfFilledCardsInView) {
      ...viewItems
      __typename
    }
    partialItems: items(first: 100) {
      ...viewItemsPartial
      __typename
    }
    bottomBar @include(if: $withBottomBar) {
      ...bottomBar
      __typename
    }
    leftSidebar @include(if: $withLeftSidebar) {
      ...leftSidebar
      __typename
    }
    regulatoryData @include(if: $withRegulatoryData) {
      ...regulatoryData
      __typename
    }
  }
  fragment gamingView on GamingView {
    __typename
    urn
    url
    items(first: $numberOfFilledCardsInView) {
      ...viewItems
      __typename
    }
    partialItems: items {
      ...viewItemsPartial
      __typename
    }
    bottomBar @include(if: $withBottomBar) {
      ...bottomBar
      __typename
    }
    leftSidebar @include(if: $withLeftSidebar) {
      ...leftSidebar
      __typename
    }
    regulatoryData @include(if: $withRegulatoryData) {
      ...regulatoryData
      __typename
    }
  }
  fragment genericSwitcherPartialCard on GenericSwitcherCard {
    __typename
    urn
    filterTitle {
      translated
      translate {
        key
        __typename
      }
      __typename
    }
    selectedViewLink {
      label
      viewLink {
        viewUrn
        viewUrl
        __typename
      }
      __typename
    }
  }
  fragment genericView on GenericView {
    __typename
    urn
    url
    title
    canonicalUrl
    category
    viewHeader {
      title
      titleImage
      subTitle
      badge
      __typename
    }
    items(first: $numberOfFilledCardsInView) {
      ...viewItems
      __typename
    }
    partialItems: items {
      ...viewItemsPartial
      __typename
    }
    bottomBar @include(if: $withBottomBar) {
      ...bottomBar
      __typename
    }
    leftSidebar @include(if: $withLeftSidebar) {
      ...leftSidebar
      __typename
    }
    regulatoryData @include(if: $withRegulatoryData) {
      ...regulatoryData
      __typename
    }
  }
  fragment genericViewLinkCard on GenericViewLinkCard {
    __typename
    urn
    genericViewLinkTitle: title {
      ...displayName
      __typename
    }
    isHighlighted
    viewLink {
      viewUrn
      viewUrl
      viewDisplayMode
      __typename
    }
    badge
    sportIcon {
      ...icon
      __typename
    }
  }
  fragment gridCard on GridCard {
    __typename
    urn
    numberOfItemsToDisplay
    layout
    markets {
      displayLabel {
        ...displayName
        __typename
      }
      market {
        ...sportsbookMarketLiveData
        __typename
      }
      __typename
    }
    runners {
      displayName {
        ...displayName
        __typename
      }
      runner {
        runnerURN
        selectionId
        marketURN
        __typename
      }
      __typename
    }
  }
  fragment headToHeadCard on HeadToHeadCard {
    __typename
    urn
    footballFixture: fixture {
      ...footballFixture
      head2head {
        home {
          ...footballTeamForm
          __typename
        }
        away {
          ...footballTeamForm
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment highlightedSelectionCard on HighlightedSelectionCard {
    __typename
    urn
    title
    market {
      ...sportsbookMarket
      __typename
    }
    runner {
      runnerURN
      __typename
    }
    displayPreviousOdd
  }
  fragment icon on Icon {
    ... on SportIcon {
      sport {
        sportId
        __typename
      }
      __typename
    }
    __typename
  }
  fragment imsPromotion on ImsPromotion {
    __typename
    urn
    headline
    subHeadline
    bonusInstanceCode
    ctaText
    layout
    status
    timeLeft
    wagerType
    percentCompleted
    bonusWagering
    wageringLeft
    bonusAwarded
    currentBonusBalance
    amountOnPendingWinnings
    freeSpins {
      initialFreeSpins
      remainingFreeSpins
      __typename
    }
    goldenChips {
      initialGoldenChips
      remainingGoldenChips
      goldenChipsAmount
      __typename
    }
    buyIn {
      buyInMinValue
      buyInMaxValue
      boughtIn
      intervals {
        min
        max
        amount
        percentage
        __typename
      }
      __typename
    }
    image {
      url
      alt
      dimensions {
        width
        height
        __typename
      }
      __typename
    }
  }
  fragment imsPromotionDetailsCard on ImsPromotionDetailsCard {
    __typename
    urn
    promotion {
      ... on ImsPromotion {
        urn
        details {
          type
          text
          spans {
            start
            end
            style
            url
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment imsPromotionErrorCard on ImsPromotionErrorCard {
    __typename
    urn
    errorCode
    seeAll {
      viewUrn
      viewUrl
      __typename
    }
  }
  fragment imsPromotionStateCard on ImsPromotionStateCard {
    __typename
    urn
    title
    promotion {
      ...imsPromotion
      __typename
    }
    depositLink {
      viewUrn
      viewUrl
      __typename
    }
  }
  fragment imsPromotionTermsAndConditionsCard on ImsPromotionTermsAndConditionsCard {
    __typename
    urn
    promotion {
      ... on ImsPromotion {
        urn
        termsAndConditions {
          type
          text
          spans {
            start
            end
            style
            url
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment imsPromotionView on ImsPromotionView {
    __typename
    urn
    url
    title
    items(first: $numberOfFilledCardsInView) {
      ...viewItems
      __typename
    }
    partialItems: items {
      ...viewItemsPartial
      __typename
    }
    bottomBar @include(if: $withBottomBar) {
      ...bottomBar
      __typename
    }
    leftSidebar @include(if: $withLeftSidebar) {
      ...leftSidebar
      __typename
    }
    regulatoryData @include(if: $withRegulatoryData) {
      ...regulatoryData
      __typename
    }
  }
  fragment leftSidebar on LeftSidebar {
    __typename
    items {
      ...viewItems
      __typename
    }
  }
  fragment linksCard on LinksCard {
    __typename
    urn
    section {
      ... on LinksMenuSections {
        __typename
        title
        sectionType
        sectionLabel
        items {
          ... on RegulatoryLinkItem {
            __typename
            url
            text
            target
            alignment
          }
          __typename
        }
      }
      __typename
    }
  }
  fragment loyaltyPromoCard on LoyaltyPromoCard {
    __typename
    urn
    theme
    loyaltyPromotion {
      ...loyaltyPromotion
      __typename
    }
  }
  fragment loyaltyPromotion on LoyaltyPromotion {
    __typename
    urn
    name
    title
    promoImage {
      url
      __typename
    }
    state {
      optInState
      label {
        ...displayName
        __typename
      }
      link {
        label {
          ...displayName
          __typename
        }
        viewLink {
          viewUrn
          viewUrl
          viewDisplayMode
          __typename
        }
        __typename
      }
      __typename
    }
    termsAndConditions {
      summary
      link {
        label {
          ...displayName
          __typename
        }
        viewLink {
          viewUrn
          viewUrl
          viewDisplayMode
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment maintenanceView on MaintenanceView {
    __typename
    urn
    url
    redirectUrl
    products {
      product
      status
      viewLink {
        viewUrn
        viewUrl
        __typename
      }
      name {
        translate {
          key
          __typename
        }
        __typename
      }
      __typename
    }
    twitterUrl
    items {
      ...viewItems
      __typename
    }
    regulatoryData {
      ...regulatoryData
      __typename
    }
    bottomBar {
      ...bottomBar
      __typename
    }
  }
  fragment marketBetCard on MarketBetCard {
    __typename
    urn
    betCardGroupURN
    marketBetCardGroupURN
    marketBet {
      ...exchangeMarketBet
      __typename
    }
    matchedStatus
  }
  fragment marketBetCardGroup on MarketBetCardGroup {
    __typename
    urn
    full: items {
      edges {
        node {
          ...marketBetCard
          ...marketBetExpandableCardGroup
          ...marketBetSelectionCardGroup
          __typename
        }
        __typename
      }
      __typename
    }
    partials: items {
      edges {
        node {
          ...marketBetCardPartial
          ...marketBetExpandableCardGroupPartial
          ...marketBetSelectionCardGroupPartial
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment marketBetCardPartial on MarketBetCard {
    __typename
    urn
  }
  fragment marketBetExpandableCardGroup on MarketBetExpandableCardGroup {
    __typename
    urn
    isOpen: isExpanded
    marketBetCardGroupURN
    full: items {
      edges {
        node {
          ...marketBetSelectionCardGroup
          __typename
        }
        __typename
      }
      __typename
    }
    partials: items {
      edges {
        node {
          ...marketBetSelectionCardGroupPartial
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment marketBetExpandableCardGroupPartial on MarketBetExpandableCardGroup {
    __typename
    urn
  }
  fragment marketBetSelectionCard on MarketBetSelectionCard {
    __typename
    urn
    id
    handicap
    placedDate
    settledDate
    matchedDate
    price
    runnerDesc
    side
    isCashout
    size
    profit
    result
    isFreeBet
    freeBetSize
    priceMatched
    selectionId
    isUnmatched
    isBsp
    bspLiability
    editViewLink {
      viewUrn
      viewUrl
      viewDisplayMode
      __typename
    }
    marketBetURN
    runnerURN
    marketURN
    marketBetCardGroupURN
  }
  fragment marketBetSelectionCardGroup on MarketBetSelectionCardGroup {
    __typename
    urn
    betCardGroupURN
    marketBetCardURN
    marketBetCardGroupURN
    full: items {
      edges {
        node {
          ...marketBetSelectionCard
          __typename
        }
        __typename
      }
      __typename
    }
    partials: items {
      edges {
        node {
          ...marketBetSelectionCardPartial
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment marketBetSelectionCardGroupPartial on MarketBetSelectionCardGroup {
    __typename
    urn
  }
  fragment marketBetSelectionCardPartial on MarketBetSelectionCard {
    __typename
    urn
  }
  fragment marketCard on MarketCard {
    __typename
    urn
    cardTitle: title
    numberOfItemsToDisplay
    viewLinks {
      viewUrn
      viewUrl
      __typename
    }
    defaultIndex
    marketsHierarchy {
      ... on RaceHierarchy {
        __typename
        race {
          ...raceWithRaceRunners
          __typename
        }
      }
      __typename
    }
    displayRunners {
      exchange {
        market {
          ...exchangeMarketLiveData
          __typename
        }
        runners {
          runnerURN
          __typename
        }
        __typename
      }
      sportsbook {
        market {
          ...sportsbookMarketLiveData
          __typename
        }
        runners {
          runnerURN
          __typename
        }
        __typename
      }
      __typename
    }
    runnerViewLinks {
      runnerUrn
      viewUrl
      viewUrn
      __typename
    }
    isRunnerExpandable
    template
    marketPromo: promotion {
      title
      description
      signposting
      __typename
    }
  }
  fragment marketExtendedCard on MarketExtendedCard {
    __typename
    urn
    cardTitle: title
    numberOfItemsToDisplay
    viewLinks {
      viewUrn
      viewUrl
      __typename
    }
    defaultIndex
    displayRunners {
      exchange {
        market {
          ...exchangeMarketLiveData
          __typename
        }
        runners {
          runnerURN
          __typename
        }
        __typename
      }
      sportsbook {
        market {
          ...sportsbookMarketLiveData
          __typename
        }
        runners {
          runnerURN
          __typename
        }
        __typename
      }
      __typename
    }
    cashoutQuotes {
      exchangeCashoutQuotes {
        ...exchangeCashoutQuote
        __typename
      }
      __typename
    }
    runnerViewLinks {
      runnerUrn
      viewUrl
      viewUrn
      __typename
    }
    isRunnerExpandable
    raceViewLink {
      viewUrn
      viewUrl
      __typename
    }
    marketPromo: promotion {
      title
      description
      signposting
      __typename
    }
  }
  fragment marketGraphsCard on MarketGraphsCard {
    __typename
    urn
    market {
      ...exchangeMarketLiveData
      __typename
    }
    runner {
      ...runnerMarketGraph
      __typename
    }
  }
  fragment marketHierarchy on MarketHierarchy {
    __typename
    ... on RaceHierarchy {
      race {
        ...race
        __typename
      }
      meeting {
        ...meeting
        __typename
      }
      __typename
    }
    ... on EventHierarchy {
      sportevent {
        ...sportEvent
        __typename
      }
      __typename
    }
    ... on EventCompetitionHierarchy {
      sportevent {
        ...sportEvent
        __typename
      }
      competition {
        ...competitionBasic
        __typename
      }
      __typename
    }
  }
  fragment marketRulesCard on MarketRulesCard {
    __typename
    urn
    marketName
    wallet
    clarifications
    marketBaseRate
    discountAllowed
    eventStartTime
    marketBettingType
    numberOfWinners
    displayMode
    sections {
      name
      content
      __typename
    }
    footer
  }
  fragment marketRulesView on MarketRulesView {
    __typename
    urn
    url
    title
    category
    items {
      ...viewItems
      __typename
    }
  }
  fragment marketView on MarketView {
    __typename
    urn
    url
    canonicalUrl
    mainMarket {
      ...sportsbookMarket
      ...exchangeMarket
      __typename
    }
    items {
      ...viewItems
      __typename
    }
    bottomBar @include(if: $withBottomBar) {
      ...bottomBar
      __typename
    }
    leftSidebar @include(if: $withLeftSidebar) {
      ...leftSidebar
      __typename
    }
    regulatoryData @include(if: $withRegulatoryData) {
      ...regulatoryData
      __typename
    }
  }
  fragment marketViewLinkCard on MarketViewLinkCard {
    __typename
    urn
    viewLink {
      viewUrn
      viewUrl
      __typename
    }
    market {
      ... on ExchangeMarket {
        __typename
        name
        urn
      }
      ... on SportsbookMarket {
        __typename
        name
        urn
      }
      __typename
    }
    badge
  }
  fragment matchStatsCard on MatchStatsCard {
    __typename
    urn
    footballFixture: fixture {
      ...footballFixture
      stats {
        period
        periodStatus
        home {
          ...gameStats
          __typename
        }
        away {
          ...gameStats
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment matchTimelineCard on MatchTimelineCard {
    __typename
    urn
    footballFixture: fixture {
      ...footballFixture
      incidents {
        ...footballIncident
        __typename
      }
      stats {
        period
        periodStatus
        home {
          ...gameStats
          __typename
        }
        away {
          ...gameStats
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment meeting on Meeting {
    __typename
    urn
    name
    meetingId
    country
    countryFlag {
      small
      medium
      large
      __typename
    }
    venue
    date
    sport {
      ...sport
      __typename
    }
  }
  fragment miniPromoBannerCard on MiniPromoBannerCard {
    __typename
    urn
    theme
    loyaltyPromotion {
      ...loyaltyPromotion
      __typename
    }
  }
  fragment myAccountView on MyAccountView {
    __typename
    urn
    url
    wizardUrl
    __typename
    items {
      ...viewItems
      __typename
    }
    bottomBar @include(if: $withBottomBar) {
      ...bottomBar
      __typename
    }
    leftSidebar @include(if: $withLeftSidebar) {
      ...leftSidebar
      __typename
    }
    regulatoryData @include(if: $withRegulatoryData) {
      ...regulatoryData
      __typename
    }
  }
  fragment myBetsView on MyBetsView {
    __typename
    urn
    url
    filters {
      orderType {
        items
        defaultIndex
        __typename
      }
      productType {
        items
        defaultIndex
        __typename
      }
      marketIds
      matchedStatus {
        items {
          filterURN
          filter
          __typename
        }
        defaultIndex
        __typename
      }
      totalDaysRange
      __typename
    }
    items(first: 4, after: $cursor) {
      ...viewItems
      __typename
    }
    bottomBar @include(if: $withBottomBar) {
      ...bottomBar
      __typename
    }
    leftSidebar @include(if: $withLeftSidebar) {
      ...leftSidebar
      __typename
    }
    regulatoryData @include(if: $withRegulatoryData) {
      ...regulatoryData
      __typename
    }
  }
  fragment navigationTab on NavigationTab {
    __typename
    urn
    tabTitle: title {
      translated
      translate {
        key
        __typename
      }
      __typename
    }
    tabViewLink: viewLink {
      viewUrl
      viewUrn
      __typename
    }
    full: items(first: 1) {
      ...fullNavigationTabItems
      __typename
    }
    partials: items {
      ...partialsNavigationTabItems
      __typename
    }
  }
  fragment navigationTabPartial on NavigationTab {
    __typename
    urn
    tabTitle: title {
      translated
      translate {
        key
        __typename
      }
      __typename
    }
    tabViewLink: viewLink {
      viewUrl
      viewUrn
      __typename
    }
  }
  fragment navigationTabsList on NavigationTabsList {
    __typename
    urn
    tabsTitle: title
    full: items(first: 1, selectedOnly: true) {
      edges {
        node {
          ...navigationTab
          __typename
        }
        __typename
      }
      __typename
    }
    partials: items {
      edges {
        node {
          ...navigationTabPartial
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment notFoundView on NotFoundView {
    __typename
    urn
    url
    items(first: $numberOfFilledCardsInView) {
      ...viewItems
      __typename
    }
    bottomBar @include(if: $withBottomBar) {
      ...bottomBar
      __typename
    }
    leftSidebar @include(if: $withLeftSidebar) {
      ...leftSidebar
      __typename
    }
    regulatoryData @include(if: $withRegulatoryData) {
      ...regulatoryData
      __typename
    }
  }
  fragment outcomeDefinitionExp on OutcomeDefinitionExp {
    __typename
    outcomeDefinitionEntries {
      outcomeDefinitionType
      operator
      outcomeDefinition {
        query {
          sport
          outcome
          periodDefinition {
            period
            periodStatus
            __typename
          }
          participant {
            type
            side
            participantId
            __typename
          }
          __typename
        }
        statsThresholdDef {
          threshold
          comparison
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment outrightMarketListCard on OutrightMarketListCard {
    __typename
    urn
    title
    numberOfRowsToDisplay
    markets {
      ...sportsbookMarketLiveData
      __typename
    }
  }
  fragment packagedCreatedBetsCard on PackagedCreatedBetsCard {
    __typename
    urn
    pcbLayout: layout
    pcbTitle: title {
      ...displayNameTitle
      __typename
    }
    items(first: $first, after: $cursor) {
      ...packagedCreatedBetsItems
      __typename
    }
  }
  fragment packagedCreatedBetsItems on PackagedCreatedBetsCardItemsConnection {
    edges {
      ... on PackagedCreatedBetsCardItemEdge {
        cursor
        __typename
        node {
          ...popularBettingOpportunity
          __typename
        }
      }
      __typename
    }
    pageInfo {
      endCursor
      hasNextPage
      __typename
    }
    __typename
  }
  fragment partialsCardGroupItems on SwimlaneCardGroupItemsConnection {
    edges {
      node {
        urn
        __typename
      }
      __typename
    }
    __typename
  }
  fragment partialsExpandableCardGroupItems on ExpandableCardGroupItemsConnection {
    edges {
      node {
        urn
        __typename
      }
      __typename
    }
    __typename
  }
  fragment partialsFilteredCouponCardGroupItems on FilteredCouponCardGroupItemsConnection {
    edges {
      node {
        ...eventMarketCardPartial
        ...couponHeaderCardPartial
        __typename
      }
      __typename
    }
    pageInfo {
      hasNextPage
      __typename
    }
    __typename
  }
  fragment partialsFutureRacingCardGroupItems on FutureRacingCardGroupItemsConnection {
    edges {
      date
      node {
        urn
        __typename
      }
      __typename
    }
    pageInfo {
      hasNextPage
      __typename
    }
    __typename
  }
  fragment partialsGameCardGroupItems on GamingCardGroupItemsConnection {
    edges {
      node {
        urn
        __typename
      }
      __typename
    }
    __typename
  }
  fragment partialsNavigationTabItems on NavigationTabItems {
    edges {
      node {
        urn
        __typename
      }
      __typename
    }
    __typename
  }
  fragment partialsPebbleCardGroupItems on PebbleLayoutItemsConnection {
    edges {
      name
      node {
        urn
        __typename
      }
      __typename
    }
    __typename
  }
  fragment partialsQuicklinksGridCardGroupItems on QuicklinksGridCardGroupItemsConnection {
    edges {
      isExpanded
      isPromoted
      label
      icon {
        id
        category
        __typename
      }
      node {
        urn
        __typename
      }
      __typename
    }
    __typename
  }
  fragment partialsRacesByTimeRangeCardGroupItems on RacesByTimeRangeCardGroupItemsConnection {
    edges {
      node {
        urn
        __typename
      }
      __typename
    }
    pageInfo {
      hasNextPage
      __typename
    }
    __typename
  }
  fragment partialsSegmentedCardGroupItems on SegmentedCardGroupItemsConnection {
    edges {
      node {
        urn
        __typename
      }
      __typename
    }
    __typename
  }
  fragment partialsSelectableItemsCardGroupItems on SelectableItemsCardGroupItemsConnection {
    edges {
      ... on RaceTimeItemEdge {
        startTime
        venue
        promotion {
          title
          description
          signposting
          __typename
        }
        node {
          urn
          __typename
        }
        __typename
      }
      ... on StatisticsItemEdge {
        node {
          urn
          __typename
        }
        __typename
      }
      ...virtualCardGroupPartialItemEdge
      __typename
    }
    __typename
  }
  fragment pebbleCardGroup on PebbleCardGroup {
    __typename
    urn
    pebbleCardGroupTitle: title {
      translated
      translate {
        key
        __typename
      }
      __typename
    }
    outerTitle {
      translated
      translate {
        key
        __typename
      }
      __typename
    }
    viewOpenBets {
      viewUrl
      viewUrn
      __typename
    }
    viewAll {
      title {
        ...displayName
        __typename
      }
      viewLink {
        viewUrl
        viewUrn
        __typename
      }
      __typename
    }
    pebbleExpanded
    selectedItemUrn
    full: items(first: 1, selectedOnly: true) {
      ...fullPebbleCardGroupItems
      __typename
    }
    partials: items {
      ...partialsPebbleCardGroupItems
      __typename
    }
  }
  fragment popularBetBuilderCard on PopularBetBuilderCard {
    __typename
    urn
    sportevent {
      ...sportEvent
      __typename
    }
    fixture {
      ...fixture
      __typename
    }
    popularbettingopportunity {
      ...popularBettingOpportunity
      __typename
    }
    viewLink {
      viewUrn
      viewUrl
      __typename
    }
    tabViewLink {
      viewUrn
      viewUrl
      __typename
    }
  }
  fragment popularBettingOpportunity on PopularBettingOpportunity {
    __typename
    urn
    count
    selections {
      __typename
      market {
        ...sportsbookMarket
        __typename
      }
      runner {
        runnerURN
        selectionId
        __typename
      }
      raceRunner {
        ...raceRunnerLite
        __typename
      }
    }
    displayName
    type
  }
  fragment popularMultiplesBetBuilderCard on PopularMultiplesBetBuilderCard {
    __typename
    urn
    popularbettingopportunity {
      ...popularBettingOpportunity
      __typename
    }
    cmsConfiguredTitle: title {
      ...displayNameTitle
      __typename
    }
  }
  fragment preferenceSingleChoice on PreferenceSingleChoice {
    __typename
    urn
    preferenceKey
    preferenceValues {
      value
      translationKey
      __typename
    }
    selectedValueIndex
  }
  fragment preferenceSingleChoiceCard on PreferenceSingleChoiceCard {
    __typename
    urn
    title
    description
    preference {
      ...preferenceSingleChoice
      __typename
    }
    cardLayout
  }
  fragment priceBoostMultiplePromoCard on PriceBoostMultiplePromoCard {
    __typename
    urn
    theme
    title
    subTitle
    termsAndConditions {
      ...promoTermsAndConditions
      __typename
    }
    popularbettingopportunity {
      ...popularBettingOpportunity
      __typename
    }
    promoTag {
      ... on PromoIconTag {
        iconTag
        __typename
      }
      ... on PromoLabelTag {
        label
        __typename
      }
      __typename
    }
  }
  fragment priceBoostMultisCard on PriceBoostMultisCard {
    __typename
    urn
    pbmTitle: title {
      ...displayName
      __typename
    }
    showWasPrice
    popularbettingopportunity {
      ...popularBettingOpportunity
      __typename
    }
  }
  fragment promoTermsAndConditions on PromoTermsAndConditions {
    summary
    link {
      label {
        ...displayName
        __typename
      }
      viewLink {
        viewUrn
        viewUrl
        viewDisplayMode
        __typename
      }
      __typename
    }
    __typename
  }
  fragment promotionAddToBetslipAction on PromotionAddToBetslipAction {
    market {
      ...sportsbookMarket
      __typename
    }
    runner {
      runnerURN
      selectionId
      handicap
      __typename
    }
    displayPreviousOdd
    __typename
  }
  fragment promotionCard on PromotionCard {
    __typename
    urn
    promotionContentType
    promoTypeLabel
    promotionName: name
    headline
    subHeadline
    strapline
    promotionTitle: title
    backgroundImage {
      url
      width
      height
      tag
      __typename
    }
    termsAndConditions {
      summary
      url
      label {
        ...displayName
        __typename
      }
      viewLink {
        viewUrn
        viewUrl
        viewDisplayMode
        __typename
      }
      __typename
    }
    isImsPromo
    action {
      ...promotionNavigationAction
      ...promotionAddToBetslipAction
      __typename
    }
    introLine
    endDate
    optInState
    tags
    hasBetfairBoost
  }
  fragment promotionNavigationAction on PromotionNavigationAction {
    label
    viewLink {
      viewUrn
      viewUrl
      viewDisplayMode
      __typename
    }
    __typename
  }
  fragment promotionsView on PromotionsView {
    __typename
    urn
    url
    items(first: $numberOfFilledCardsInView) {
      ...viewItems
      __typename
    }
    partialItems: items {
      ...viewItemsPartial
      __typename
    }
    bottomBar @include(if: $withBottomBar) {
      ...bottomBar
      __typename
    }
    leftSidebar @include(if: $withLeftSidebar) {
      ...leftSidebar
      __typename
    }
    regulatoryData @include(if: $withRegulatoryData) {
      ...regulatoryData
      __typename
    }
  }
  fragment quickLinksCard on QuickLinksCard {
    __typename
    urn
    quickLinksTitle: title
    label {
      ...displayName
      __typename
    }
    accordionTitle
    accordionExpanded
    links {
      label
      viewLink {
        viewUrn
        viewUrl
        __typename
      }
      target
      icon
      __typename
    }
    iconName
  }
  fragment quicklinksGridCardGroup on QuicklinksGridCardGroup {
    __typename
    urn
    quicklinksGridTitle: title
    full: items(first: $numberOfFilledCardsInCardGroup) {
      ...quicklinksGridCardGroupItems
      __typename
    }
    partials: items {
      ...partialsQuicklinksGridCardGroupItems
      __typename
    }
  }
  fragment quicklinksGridCardGroupItems on QuicklinksGridCardGroupItemsConnection {
    edges {
      isExpanded
      isPromoted
      label
      icon {
        id
        category
        __typename
      }
      node {
        ...sportViewLinkCard
        ...competitionViewLinkCardBasic
        ...eventViewLinkCardWithoutFixture
        ...raceViewLinkCard
        ...genericViewLinkCard
        __typename
      }
      __typename
    }
    __typename
  }
  fragment race on Race {
    __typename
    urn
    startTime
    raceId
    name
    meeting {
      ...meeting
      __typename
    }
  }
  fragment raceByTimeRangeCard on RaceByTimeRangeCard {
    __typename
    urn
    race {
      ...raceWithRaceDetails
      __typename
    }
    viewLink {
      viewUrn
      viewUrl
      __typename
    }
    marketPromo: promotion {
      signposting
      __typename
    }
  }
  fragment raceDetailsCard on RaceDetailsCard {
    __typename
    urn
    race {
      ...raceWithRaceDetails
      __typename
    }
    numberOfRunners
    showMeetingInfo
    raceViewLink {
      viewUrn
      viewUrl
      __typename
    }
    availableToSubscribe
  }
  fragment raceMarketCard on RaceMarketCard {
    __typename
    urn
    raceViewLink {
      viewUrn
      viewUrl
      __typename
    }
    title
    defaultIndex
    displayRunners {
      exchange {
        market {
          ...exchangeMarketLiveData
          __typename
        }
        runners {
          runnerURN
          __typename
        }
        __typename
      }
      sportsbook {
        market {
          ...sportsbookMarketLiveData
          __typename
        }
        runners {
          runnerURN
          __typename
        }
        __typename
      }
      __typename
    }
    numberOfRunners
    race {
      ...raceWithRaceRunners
      __typename
    }
    runnerViewLinks {
      runnerUrn
      viewUrl
      viewUrn
      __typename
    }
    isRunnerExpandable
    marketPromo: promotion {
      title
      description
      signposting
      __typename
    }
  }
  fragment raceResultsCard on RaceResultsCard {
    __typename
    urn
    race {
      ...raceWithRaceRunnersPerformance
      __typename
    }
  }
  fragment raceRunner on RaceRunner {
    __typename
    urn
    raceURN
    rating123
    ratingStars
    selectionId
    form
    rating
    comments
    status
    horse {
      name
      sireName
      damName
      damSireName
      age
      color
      sex
      bred
      __typename
    }
    details {
      jockeyName
      trainerName
      saddleCloth
      weight {
        stones
        __typename
      }
      equipmentDescription
      silk
      draw
      __typename
    }
  }
  fragment raceRunnerHorsePerformance on RaceRunner {
    __typename
    urn
    rating123
    ratingStars
    selectionId
    raceURN
    form
    rating
    comments
    status
    horse {
      name
      sireName
      damName
      damSireName
      age
      color
      sex
      bred
      performance {
        positionOfficial
        distanceBeatenStatus
        positionStatusCode
        isp {
          decimal
          fractional {
            numerator
            denominator
            __typename
          }
          favourite
          __typename
        }
        bspAdvantage
        __typename
      }
      __typename
    }
    details {
      jockeyName
      trainerName
      saddleCloth
      weight {
        stones
        __typename
      }
      equipmentDescription
      silk
      draw
      __typename
    }
  }
  fragment raceRunnerLite on RaceRunner {
    __typename
    urn
    raceURN
    selectionId
    horse {
      name
      age
      color
      sex
      __typename
    }
    details {
      jockeyName
      trainerName
      silk
      saddleCloth
      __typename
    }
  }
  fragment raceSwitcherPartialCard on RaceSwitcherCard {
    __typename
    urn
    filterTitle {
      translated
      translate {
        key
        __typename
      }
      __typename
    }
    race {
      ...race
      __typename
    }
  }
  fragment raceView on RaceView {
    __typename
    urn
    url
    title
    canonicalUrl
    race {
      ...race
      __typename
    }
    items(first: $numberOfFilledCardsInView) {
      ...viewItems
      __typename
    }
    partialItems: items {
      ...viewItemsPartial
      __typename
    }
    bottomBar @include(if: $withBottomBar) {
      ...bottomBar
      __typename
    }
    leftSidebar @include(if: $withLeftSidebar) {
      ...leftSidebar
      __typename
    }
    regulatoryData @include(if: $withRegulatoryData) {
      ...regulatoryData
      __typename
    }
  }
  fragment raceViewLinkCard on RaceViewLinkCard {
    __typename
    urn
    race {
      ...race
      __typename
    }
    viewLink {
      viewUrn
      viewUrl
      __typename
    }
    isHighlighted
  }
  fragment raceViewLinksCard on RaceViewLinksCard {
    __typename
    urn
    race {
      ...raceWithRaceDetails
      __typename
    }
    raceViewLinks {
      race {
        ...raceWithRaceDetails
        __typename
      }
      viewLink {
        viewUrn
        viewUrl
        __typename
      }
      marketPromo: promotion {
        signposting
        __typename
      }
      __typename
    }
  }
  fragment raceWithRaceDetails on Race {
    __typename
    urn
    startTime
    name
    raceId
    verdict
    winningTime
    meeting {
      ...meeting
      __typename
    }
    details {
      scheduledTime
      resultType
      distance {
        miles
        furlongs
        yards
        __typename
      }
      numberOfRunners
      numberOfNonRunners
      numberOfParticipants
      going
      status
      type
      __typename
    }
  }
  fragment raceWithRaceRunners on Race {
    __typename
    urn
    startTime
    name
    raceId
    verdict
    winningTime
    details {
      scheduledTime
      distance {
        miles
        furlongs
        yards
        __typename
      }
      numberOfRunners
      numberOfNonRunners
      numberOfParticipants
      going
      status
      type
      resultType
      __typename
    }
    runners {
      ...raceRunner
      __typename
    }
    meeting {
      ...meeting
      __typename
    }
  }
  fragment raceWithRaceRunnersPerformance on Race {
    __typename
    urn
    startTime
    name
    raceId
    verdict
    winningTime
    details {
      scheduledTime
      distance {
        miles
        furlongs
        yards
        __typename
      }
      numberOfRunners
      numberOfNonRunners
      numberOfParticipants
      going
      status
      type
      resultType
      __typename
    }
    runners {
      ...raceRunnerHorsePerformance
      __typename
    }
    meeting {
      ...meeting
      __typename
    }
  }
  fragment racesByTimeRangeCardGroup on RacesByTimeRangeCardGroup {
    __typename
    urn
    filterOptions {
      ...byTimeRangeOptions
      __typename
    }
    full: items(first: $numberOfFilledCardsInCardGroup) {
      ...fullRacesByTimeRangeCardGroupItems
      __typename
    }
    partials: items {
      ...partialsRacesByTimeRangeCardGroupItems
      __typename
    }
  }
  fragment regulatoryCard on RegulatoryCard {
    urn
    __typename
    sections {
      __typename
      ... on RegulatorySectionGeneric {
        sectionType
        genericSectionTitle: title
        __typename
      }
      ... on RegulatorySectionAccordion {
        sectionType
        title
        __typename
      }
      items {
        __typename
        ... on RegulatoryImageItem {
          imageURL
          alignment
          alt
          target
          link: url
          viewLink {
            viewUrn
            viewUrl
            viewDisplayMode
            __typename
          }
          __typename
        }
        ... on RegulatoryTextItem {
          alignment
          text
          __typename
        }
        ... on RegulatoryLinkItem {
          alignment
          text
          url
          target
          viewLink {
            viewUrl
            viewUrn
            viewDisplayMode
            __typename
          }
          __typename
        }
        ... on RegulatorySessionItem {
          alignment
          timeFormat
          sessionText: text
          __typename
        }
        ... on RegulatoryLoggedInSinceItem {
          alignment
          loggedInSinceText: text
          timeFormat
          __typename
        }
        ... on RegulatoryCookieConsentItem {
          alignment
          text
          target
          __typename
        }
        ... on RegulatoryLastLogInItem {
          alignment
          lastLoginText: text
          time
          timeFormat
          __typename
        }
        ... on RegulatoryUserDetailsItem {
          alignment
          firstName
          lastName
          nationalIdentifier
          contractNumber
          __typename
        }
        ... on RegulatoryClockItem {
          alignment
          clockText: text
          timeFormat
          timeZone
          target
          __typename
        }
      }
    }
  }
  fragment regulatoryData on RegulatoryData {
    __typename
    sections {
      __typename
      ... on RegulatorySectionGeneric {
        sectionType
        __typename
      }
      items {
        __typename
        ... on RegulatoryTextItem {
          alignment
          text
          __typename
        }
        ... on RegulatoryLinkItem {
          alignment
          text
          target
          viewLink {
            viewUrl
            __typename
          }
          __typename
        }
        ... on RegulatoryImageItem {
          imageURL
          alignment
          alt
          target
          link: url
          viewLink {
            viewUrn
            viewUrl
            viewDisplayMode
            __typename
          }
          __typename
        }
        ... on RegulatorySessionItem {
          alignment
          timeFormat
          sessionText: text
          time
          __typename
        }
      }
    }
  }
  fragment rewardsCard on RewardsCard {
    __typename
    urn
    benefitsPackages {
      ... on BenefitsPackages {
        rewardsStatus
        lastMonthTradedMarkets
        currentMonthTradedMarkets
        currentMonth
        nextMonth
        qualifiedBenefitsPackage {
          ... on BenefitsPackage {
            commissionRate
            requiredMarketBets
            packageLevel
            criteriaType
            excludedBenefits {
              type
              accessLevel
              __typename
            }
            benefits {
              ... on Benefit {
                hidden
                accessLevel
                type
                valueLookup {
                  ... on ValueLookup {
                    maxAmount {
                      ... on ValueLookupItem {
                        type
                        value
                        __typename
                      }
                      __typename
                    }
                    quantity {
                      ... on ValueLookupItem {
                        type
                        value
                        __typename
                      }
                      __typename
                    }
                    size {
                      ... on ValueLookupItem {
                        type
                        value
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        chosenBenefitsPackage {
          ... on BenefitsPackage {
            commissionRate
            requiredMarketBets
            packageLevel
            criteriaType
            excludedBenefits {
              type
              accessLevel
              __typename
            }
            benefits {
              ... on Benefit {
                hidden
                accessLevel
                type
                valueLookup {
                  ... on ValueLookup {
                    maxAmount {
                      ... on ValueLookupItem {
                        type
                        value
                        __typename
                      }
                      __typename
                    }
                    quantity {
                      ... on ValueLookupItem {
                        type
                        value
                        __typename
                      }
                      __typename
                    }
                    size {
                      ... on ValueLookupItem {
                        type
                        value
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        availablePackages {
          ... on BenefitsPackage {
            commissionRate
            requiredMarketBets
            packageLevel
            criteriaType
            excludedBenefits {
              type
              accessLevel
              __typename
            }
            benefits {
              ... on Benefit {
                hidden
                accessLevel
                type
                valueLookup {
                  ... on ValueLookup {
                    maxAmount {
                      ... on ValueLookupItem {
                        type
                        value
                        __typename
                      }
                      __typename
                    }
                    quantity {
                      ... on ValueLookupItem {
                        type
                        value
                        __typename
                      }
                      __typename
                    }
                    size {
                      ... on ValueLookupItem {
                        type
                        value
                        __typename
                      }
                      __typename
                    }
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment runnerInfoCard on RunnerInfoCard {
    __typename
    urn
    raceRunner {
      ...raceRunner
      __typename
    }
  }
  fragment runnerMarketGraph on RunnerMarketGraph {
    __typename
    runnerURN
    graphParams
    liveData {
      urn
      selectionId
      handicap
      totalMatched
      lastPriceTraded
      availableToLay {
        odd
        liquidity
        __typename
      }
      availableToBack {
        odd
        liquidity
        __typename
      }
      traded {
        odd
        liquidity
        __typename
      }
      __typename
    }
  }
  fragment runnerView on RunnerView {
    __typename
    urn
    url
    title
    category
    items {
      ...viewItems
      __typename
    }
  }
  fragment searchBarCard on SearchBarCard {
    __typename
    searchTitle: title {
      ...displayNameTitle
      __typename
    }
    searchPlaceholder: placeholder {
      ...displayNameTitle
      __typename
    }
    urn
  }
  fragment segmentedCardGroup on SegmentedCardGroup {
    __typename
    urn
    full: items(first: $numberOfFilledCardsInCardGroup) {
      ...fullSegmentedCardGroupItems
      __typename
    }
    partials: items {
      ...partialsSegmentedCardGroupItems
      __typename
    }
  }
  fragment selectableitemsCardGroup on SelectableItemsCardGroup {
    __typename
    urn
    cardGroupTitle: title
    selectableItemsCardGroupType: type
    filter {
      ... on RaceCountriesFilter {
        countries
        defaultSelected
        __typename
      }
      __typename
    }
    full: items(first: 1) {
      ...fullSelectableItemsCardGroupItems
      __typename
    }
    partials: items {
      ...partialsSelectableItemsCardGroupItems
      __typename
    }
  }
  fragment selectionPromoCard on SelectionPromoCard {
    __typename
    urn
    theme
    title
    subTitle
    termsAndConditions {
      ...promoTermsAndConditions
      __typename
    }
    selectionAction: action {
      __typename
      market {
        ...sportsbookMarket
        __typename
      }
      runner {
        runnerURN
        __typename
      }
      displayPreviousOdd
    }
    promoTag {
      ... on PromoIconTag {
        iconTag
        __typename
      }
      ... on PromoLabelTag {
        label
        __typename
      }
      __typename
    }
  }
  fragment selfExcludedView on SelfExcludedView {
    __typename
    urn
    url
  }
  fragment settingsView on SettingsView {
    __typename
    urn
    url
    settings {
      text
      url
      __typename
    }
    items {
      ...viewItems
      __typename
    }
    bottomBar @include(if: $withBottomBar) {
      ...bottomBar
      __typename
    }
    leftSidebar @include(if: $withLeftSidebar) {
      ...leftSidebar
      __typename
    }
    regulatoryData @include(if: $withRegulatoryData) {
      ...regulatoryData
      __typename
    }
  }
  fragment sport on Sport {
    __typename
    urn
    name
    sportId
  }
  fragment sportEvent on SportsEvent {
    __typename
    urn
    eventId
    name
    openDate
    competition {
      ...competitionBasic
      __typename
    }
  }
  fragment sportRibbonCardGroup on SportRibbonCardGroup {
    __typename
    urn
    full: items {
      ...fullCardGroupItems
      __typename
    }
    partials: items {
      ...partialsCardGroupItems
      __typename
    }
  }
  fragment sportView on SportView {
    __typename
    urn
    url
    title
    canonicalUrl
    sport {
      ...sport
      __typename
    }
    items(first: $numberOfFilledCardsInView) {
      ...viewItems
      __typename
    }
    partialItems: items {
      ...viewItemsPartial
      __typename
    }
    bottomBar @include(if: $withBottomBar) {
      ...bottomBar
      __typename
    }
    leftSidebar @include(if: $withLeftSidebar) {
      ...leftSidebar
      __typename
    }
    regulatoryData @include(if: $withRegulatoryData) {
      ...regulatoryData
      __typename
    }
  }
  fragment sportViewLinkCard on SportViewLinkCard {
    __typename
    urn
    isHighlighted
    viewLink {
      viewUrn
      viewUrl
      __typename
    }
    sport {
      ...sportWithShortName
      __typename
    }
  }
  fragment sportWithShortName on Sport {
    __typename
    urn
    name
    sportId
    shortName
  }
  fragment sportsbookBet on SportsbookBet {
    urn
    __typename
    betReceiptId
    id
    isSettled
    profitAndLoss
    originalPotentialWin
    isOddsBoosted
    betType
    isSGM
    isSGMMulti
    has90MinBet
    currentSize
    numLines
    currentSizePerLine
    betPrice {
      decimal
      fractional {
        numerator
        denominator
        __typename
      }
      __typename
    }
    originalBetPrice {
      decimal
      fractional {
        numerator
        denominator
        __typename
      }
      __typename
    }
    legs {
      urn
      __typename
    }
    result
    cashoutQuote {
      ...sportsbookCashoutQuote
      __typename
    }
    bonus
    product
    edges {
      reason
      status
      __typename
    }
    lowestEventStartTime
  }
  fragment sportsbookBetCard on SportsbookBetCard {
    __typename
    urn
    navigationLinks {
      marketBetUrn
      viewUrn
      viewUrl
      __typename
    }
    bet {
      ...sportsbookBet
      __typename
    }
    betSharingViewLink {
      viewUrn
      viewUrl
      __typename
    }
  }
  fragment sportsbookBetInfoCard on SportsbookBetInfoCard {
    __typename
    urn
    placedDate
    settledDate
    betReceiptId
    regulatorBetId
    deviceId
    selections {
      marketUrn
      runnerUrn
      __typename
    }
    product
  }
  fragment sportsbookBetLeg on BetLeg {
    __typename
    urn
    type
    result
    legNumber
    parts {
      marketBetUrn
      marketId
      sportId
      eventUrn
      price {
        decimal
        fractional {
          numerator
          denominator
          __typename
        }
        __typename
      }
      originalPrice {
        decimal
        fractional {
          numerator
          denominator
          __typename
        }
        __typename
      }
      priceType
      eventDescription
      eventMarketDescription
      marketType
      selectionId
      selectionName
      handicap
      eachwayPlaces
      eachwayFactor {
        numerator
        denominator
        __typename
      }
      rule4Deductions
      deadHeatWinDeductions
      deadHeatEachwayDeductions
      outcomeDefinitionExp {
        ...outcomeDefinitionExp
        __typename
      }
      __typename
    }
  }
  fragment sportsbookBetLegCard on BetLegCard {
    __typename
    urn
    betUrn
    leg {
      ...sportsbookBetLeg
      __typename
    }
  }
  fragment sportsbookBetLegCardGroup on SportsbookBetLegCardGroup {
    __typename
    urn
    full: items {
      edges {
        node {
          ...fixtureCard
          ...eventHeaderCard
          ...raceDetailsCard
          ...sportsbookBetLegCard
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment sportsbookCashoutQuote on SportsbookCashoutQuote {
    __typename
    urn
    betUrn
    quote
    stake
    betDelay
    cashOutToken
    refreshRate
    status
  }
  fragment sportsbookExpandableLegCardGroup on SportsbookExpandableLegCardGroup {
    __typename
    urn
    full: items {
      edges {
        node {
          ...sportsbookBetLegCardGroup
          ...sportsbookBetInfoCard
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment sportsbookMarket on SportsbookMarket {
    __typename
    urn
    name
    marketType
    marketTypeName
    bettingType
    hierarchy {
      ...marketHierarchy
      __typename
    }
    sport {
      ...sport
      __typename
    }
    runners {
      __typename
      runnerURN
      name
      selectionId
      handicap
      resultType
    }
    isOddsboostMarketType
  }
  fragment sportsbookMarketLiveData on SportsbookMarket {
    __typename
    urn
    name
    marketType
    marketTypeName
    bettingType
    liveData {
      inplay
      turnInPlayEnabled
      sportsbookMarketStatus
      bspMarket
      runners {
        urn
        runnerURN
        handicap
        __typename
      }
      __typename
    }
    hierarchy {
      ...marketHierarchy
      __typename
    }
    sport {
      ...sport
      __typename
    }
    runners {
      __typename
      runnerURN
      name
      selectionId
      handicap
      resultType
    }
    isOddsboostMarketType
  }
  fragment swimlaneCardGroup on SwimlaneCardGroup {
    __typename
    urn
    cardGroupTitle: title
    displayName {
      translationKey
      __typename
    }
    viewAll {
      label
      icon
      viewLink {
        viewUrn
        viewUrl
        __typename
      }
      __typename
    }
    full: items(first: $numberOfFilledCardsInCardGroup) {
      ...fullCardGroupItems
      __typename
    }
    partials: items {
      ...partialsCardGroupItems
      __typename
    }
  }
  fragment swimlaneIndexedCardGroup on SwimlaneIndexedCardGroup {
    __typename
    urn
    cardGroupTitle: title
    displayName {
      translationKey
      __typename
    }
    icon {
      vector
      __typename
    }
    viewAll {
      label
      icon
      viewLink {
        viewUrn
        viewUrl
        __typename
      }
      __typename
    }
    hint
    items {
      ...fullSwimlaneIndexedCardGroupItems
      __typename
    }
  }
  fragment tableTennisFixture on TableTennisFixture {
    __typename
    urn
    runnerNames {
      home
      away
      __typename
    }
    isAmericanFormat
    currentSet {
      number
      score {
        home
        away
        __typename
      }
      currentServer
      __typename
    }
    setsWon {
      home
      away
      __typename
    }
    previousSets {
      number
      score {
        home
        away
        __typename
      }
      currentServer
      __typename
    }
  }
  fragment teamFormCard on TeamFormCard {
    __typename
    urn
    footballFixture: fixture {
      ...footballFixtureWithRecentForm
      __typename
    }
  }
  fragment teamLineupCard on TeamLineupCard {
    __typename
    urn
    footballFixture: fixture {
      ...footballFixture
      home {
        squad {
          manager
          players {
            ...footballPlayer
            __typename
          }
          __typename
        }
        __typename
      }
      away {
        squad {
          manager
          players {
            ...footballPlayer
            __typename
          }
          __typename
        }
        __typename
      }
      incidents {
        ...footballIncident
        __typename
      }
      __typename
    }
  }
  fragment tennisFixture on TennisMatch {
    __typename
    urn
    runnerNames {
      home
      away
      __typename
    }
    isAmericanFormat
    actualStartTime
    scheduledStartTime
    teamAScore
    teamBScore
    currentSet {
      currentGame {
        teamAScore
        teamBScore
        teamServing
        type
        __typename
      }
      teamAScore
      teamBScore
      __typename
    }
    status {
      status
      reason
      __typename
    }
    surface
    type
    teamA {
      players {
        name
        rank
        __typename
      }
      side
      __typename
    }
    teamB {
      players {
        name
        rank
        __typename
      }
      side
      __typename
    }
  }
  fragment timeFormBroadCastsCard on TimeFormBroadCastsCard {
    __typename
    urn
    raceBroadCasts: broadcasts {
      dataVizUrl
      liveVideoUrl
      __typename
    }
    selectedRace: race {
      ...raceWithRaceRunners
      __typename
    }
    availableToSubscribe
    raceToSubscribe
  }
  fragment viewItems on ViewItemsConnection {
    edges {
      node {
        ...accountBannersCard
        ...balanceCard
        ...betOpportunityPromoCard
        ...broadcastsAndStatisticsCard
        ...broadcastsCard
        ...budgetLimitsCard
        ...competitionRegionCard
        ...competitionViewLinkCard
        ...contentSummaryCard
        ...correctScoreCard
        ...editorialPromoCard
        ...embeddedContentCard
        ...embeddedViewCard
        ...eventMarketCard
        ...eventViewLinkCard
        ...expandableMarketCard
        ...fixtureCard
        ...forbiddenContentCard
        ...gameCard
        ...gameInfoCard
        ...gamingJackpotCard
        ...gamingLinkCard
        ...gamingPlayNewCard
        ...genericSwitcherPartialCard
        ...gridCard
        ...headToHeadCard
        ...highlightedSelectionCard
        ...imsPromotionDetailsCard
        ...imsPromotionErrorCard
        ...imsPromotionStateCard
        ...imsPromotionTermsAndConditionsCard
        ...linksCard
        ...marketBetCard
        ...marketBetSelectionCard
        ...marketCard
        ...marketExtendedCard
        ...marketGraphsCard
        ...marketRulesCard
        ...marketViewLinkCard
        ...matchStatsCard
        ...matchTimelineCard
        ...miniPromoBannerCard
        ...outrightMarketListCard
        ...popularMultiplesBetBuilderCard
        ...packagedCreatedBetsCard
        ...preferenceSingleChoiceCard
        ...promotionCard
        ...quickLinksCard
        ...raceByTimeRangeCard
        ...raceDetailsCard
        ...raceMarketCard
        ...raceResultsCard
        ...raceSwitcherPartialCard
        ...raceViewLinkCard
        ...raceViewLinksCard
        ...regulatoryCard
        ...rewardsCard
        ...runnerInfoCard
        ...searchBarCard
        ...selectionPromoCard
        ...sportsbookBetCard
        ...sportsbookBetInfoCard
        ...sportsbookBetLegCard
        ...teamFormCard
        ...teamLineupCard
        ...timeFormBroadCastsCard
        ...priceBoostMultiplePromoCard
        ...betCardGroup
        ...betSharingCardGroup
        ...expandableCardGroup
        ...expandableCardGroup
        ...filteredCouponCardGroup
        ...futureRacingCardGroup
        ...gamingCardGroup
        ...marketBetCardGroup
        ...marketBetExpandableCardGroup
        ...marketBetSelectionCardGroup
        ...navigationTabsList
        ...pebbleCardGroup
        ...quicklinksGridCardGroup
        ...racesByTimeRangeCardGroup
        ...segmentedCardGroup
        ...selectableitemsCardGroup
        ...sportRibbonCardGroup
        ...sportsbookBetLegCardGroup
        ...sportsbookExpandableLegCardGroup
        ...swimlaneCardGroup
        ...swimlaneIndexedCardGroup
        ...viewZone
        ...GamingPrizeMachineCard
        ...StatsPebbleCardGroup
        ...StatsContentCardGroup
        __typename
      }
      __typename
    }
    pageInfo @include(if: $withPageInfo) {
      endCursor
      hasNextPage
      __typename
    }
    __typename
  }
  fragment viewItemsPartial on ViewItemsConnection {
    edges {
      node {
        urn
        __typename
      }
      __typename
    }
    __typename
  }
  fragment viewZone on ViewZone {
    __typename
    urn
    title
    viewZoneItems: items(first: $numberOfFilledCardsInCardGroup) {
      edges {
        node {
          ...accountBannersCard
          ...balanceCard
          ...betOpportunityPromoCard
          ...broadcastsAndStatisticsCard
          ...broadcastsCard
          ...budgetLimitsCard
          ...competitionViewLinkCard
          ...contentSummaryCard
          ...editorialPromoCard
          ...eventMarketCard
          ...eventViewLinkCard
          ...fixtureCard
          ...gameCard
          ...gameInfoCard
          ...gamingJackpotCard
          ...gamingLinkCard
          ...gamingPlayNewCard
          ...genericViewLinkCard
          ...headToHeadCard
          ...highlightedSelectionCard
          ...linksCard
          ...marketCard
          ...marketExtendedCard
          ...marketGraphsCard
          ...marketViewLinkCard
          ...matchStatsCard
          ...matchTimelineCard
          ...miniPromoBannerCard
          ...promotionCard
          ...quickLinksCard
          ...raceDetailsCard
          ...raceMarketCard
          ...raceSwitcherPartialCard
          ...raceViewLinkCard
          ...raceViewLinksCard
          ...rewardsCard
          ...searchBarCard
          ...selectionPromoCard
          ...sportsbookBetCard
          ...sportViewLinkCard
          ...teamFormCard
          ...teamLineupCard
          ...priceBoostMultiplePromoCard
          ...gamingCardGroup
          ...pebbleCardGroup
          ...segmentedCardGroup
          ...swimlaneCardGroup
          ...swimlaneIndexedCardGroup
          ...GamingPrizeMachineCard
          ...StatsPebbleCardGroup
          ...StatsContentCardGroup
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment virtualCardGroup on VirtualCardGroup {
    __typename
    urn
    items {
      edges {
        node {
          ...pebbleCardGroup
          ...virtualEventDetailsCard
          ...virtualMarketCard
          __typename
        }
        __typename
      }
      __typename
    }
  }
  fragment virtualCardGroupFullItemEdge on VirtualCardGroupItemEdge {
    __typename
    startTime
    isClosed
    isDisabled
    node {
      ...virtualCardGroup
      __typename
    }
  }
  fragment virtualCardGroupPartialItemEdge on VirtualCardGroupItemEdge {
    __typename
    startTime
    isClosed
    isDisabled
    node {
      urn
      __typename
    }
  }
  fragment virtualEvent on VirtualEvent {
    __typename
    distance
    duration
    eventId
    name
    openDate
    sport {
      ...virtualSport
      __typename
    }
    urn
    venue
  }
  fragment virtualEventDetailsCard on VirtualEventDetailsCard {
    __typename
    urn
    virtualEvent {
      ...virtualEvent
      __typename
    }
  }
  fragment virtualMarket on VirtualMarket {
    __typename
    urn
    name
    marketType
    marketId
    status
    hasEachWay
    eachWayPlaces
    eachWayFraction
    sport {
      ...virtualSport
      __typename
    }
    event {
      ...virtualEvent
      __typename
    }
    runners {
      ...virtualRunner
      __typename
    }
  }
  fragment virtualMarketCard on VirtualMarketCard {
    __typename
    urn
    title
    marketHierarchy {
      ...virtualMarketHierarchy
      __typename
    }
    displayRunners {
      market {
        ...virtualMarket
        __typename
      }
      __typename
    }
    gameRulesViewLink {
      viewUrn
      viewUrl
      viewDisplayMode
      __typename
    }
  }
  fragment virtualMarketHierarchy on VirtualMarketHierarchy {
    __typename
    ... on VirtualEventHierarchy {
      virtualEvent {
        ...virtualEvent
        __typename
      }
      __typename
    }
  }
  fragment virtualRunner on VirtualRunner {
    __typename
    name
    humanName
    racerIndex
    odds {
      decimal
      fractional {
        numerator
        denominator
        __typename
      }
      __typename
    }
    runnerURN
    selectionId
    humanTexture
    selectionTexture
  }
  fragment virtualSport on VirtualSport {
    __typename
    name {
      translationKey
      __typename
    }
    sportId
    urn
    kind
  }
`;
