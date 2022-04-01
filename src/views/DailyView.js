import h from "../utils/h.js"
import map from "../utils/map.js"
import StatLine from "../components/StatLine.js"
import toReadable from "../utils/toReadable.js"
import Separator from "../components/Separator.js"
import longNumFormatter from "../utils/longNumformatter.js"

const levels = [
  {
    from: 0,
    to: 5,
  },
  {
    from: 5,
    to: 20,
  },
  {
    from: 20,
    to: 50,
  },
  {
    from: 50,
    to: 100,
  },
  {
    from: 100,
    to: 200,
  },
  {
    from: 200,
    to: 500,
  },
  {
    from: 500,
    to: 1000,
  },
  {
    from: 1000,
    to: 2000,
  },
  {
    from: 2000,
    to: 5000,
  },
  {
    from: 5000,
    to: 10_000,
  },
  {
    from: 10_000,
    to: 20_000,
  },
  {
    from: 20_000,
    to: 50_000,
  },
  {
    from: 50_000,
    to: 100_000,
  },
  {
    from: 100_000,
    to: 200_000,
  },
  {
    from: 200_000,
    to: 500_000,
  },
  {
    from: 500_000,
    to: 1_000_000,
  },
  {
    from: 1_000_000,
    to: 2_000_000,
  },
]

const DailyView = ({
  total,
  totalTax,
  monthlyTax,
  monthlyTotal,
  dailyReadingTime,
  yesterdayEarnings,
  valuableStoryId,
  estimatedEarnings,
}) => {
  const totalInUSD = (total / 100).toFixed(2)

  const level = levels.find(
    (level) => totalInUSD < level.to && totalInUSD >= level.from
  )
  const levelNumber = levels.findIndex((l) => l === level) + 1

  const percent = map(totalInUSD, level?.from, level?.to, 0, 100) ?? 0

  return h(
    `
			<div id="daily">
				<div id="total">
          <button id="monthly-button" title="Monthly View">
            <img src="month.svg" alt="moon" />
          </button>
					<div id="total-balance" >
						<h2 title="$${totalInUSD}"> $ ${longNumFormatter(totalInUSD)} </h2>
						<p title="Net $${longNumFormatter((total - totalTax) / 100)}">
              with <span>$ ${longNumFormatter(totalTax / 100)} </span> tax
            </p>
					</div>
					<div id="chart">
						<div id="top">
							<span>Level ${levelNumber}</span>
							<p>Currency: <strong>USD</strong></p>
						</div>
						<div id="plot" title="%${longNumFormatter(percent)}">
							<img src="slider.svg" alt="slider" />
							<img src="slider-inner.png" alt="slider inner" style="--width: ${map(
                percent,
                0,
                100,
                3,
                97
              )}%" />
						</div>
						<div id="bottom">
								<span>$ ${level.from}</span>
								<span>$ ${level.to}</span>
						</div>
					</div>
				</div>
				${Separator({ title: "This Month" })}
				<div id="monthly-stats">
					<article>
						<div id="monthly-balance" title="Net $${longNumFormatter(
              (monthlyTotal - monthlyTax) / 100
            )}">
							<h3>$ ${longNumFormatter(monthlyTotal / 100)}</h3>
							<p>with <span>$ ${longNumFormatter(monthlyTax / 100)}</span> tax</p>
						</div>
						<p id="info">
							Monthly earnings are updated daily based on where you live.
						</p>
					</article>
					<div id="stats">
						${StatLine({
              title: "Today's Member Reading Time",
              value: toReadable(dailyReadingTime),
            })}		
						${StatLine({
              title: "Yesterday's Earnings",
              value: `$ ${longNumFormatter(yesterdayEarnings / 100)}`,
            })}		
						${StatLine({
              title: "This Months's Estimated Earnings",
              value: `$ ${longNumFormatter(estimatedEarnings / 100)}`,
            })}		
						${StatLine({
              title: "Yesterday's Most Valuable Story",
              link: `https://medium.com/me/stats/post/${valuableStoryId}/`,
            })}		
					</div>
				</div>
			</div>
		`
  )
}

export default DailyView
