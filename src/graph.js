import React, { useState } from 'react';
import useAudioStore from './store';

const SentimentPieChart = () => {

const data = useAudioStore(state => state.current_transcript)
   const [hoveredSegment, setHoveredSegment] = useState(null);
  // Process the data to count sentiments
  const sentimentCounts = data.reduce((acc, item) => {
    const sentiment = item.sentiment.label;
    acc[sentiment] = (acc[sentiment] || 0) + 1;
    return acc;
  }, {});

  // Define colors for each sentiment
  const colors = {
    'Neutral': '#6B7280', // grey
    'Negative': '#F59E0B', // amber
    'Positive': '#10B981'  // green
  };

  // Calculate total and percentages
  const total = Object.values(sentimentCounts).reduce((sum, count) => sum + count, 0);
  
  // Create segments data
  const segments = Object.entries(sentimentCounts).map(([sentiment, count]) => ({
    sentiment,
    count,
    percentage: (count / total) * 100,
    color: colors[sentiment]
  }));

  // SVG dimensions
  const svgSize = 220;
  const center = svgSize / 2;
  const radius = 80;
  const innerRadius = 40;

  // Function to create SVG path for donut segment
  const createPath = (startAngle, endAngle, outerRadius, innerRadius) => {
    const startAngleRad = (startAngle - 90) * Math.PI / 180;
    const endAngleRad = (endAngle - 90) * Math.PI / 180;
    
    const x1 = center + outerRadius * Math.cos(startAngleRad);
    const y1 = center + outerRadius * Math.sin(startAngleRad);
    const x2 = center + outerRadius * Math.cos(endAngleRad);
    const y2 = center + outerRadius * Math.sin(endAngleRad);
    
    const x3 = center + innerRadius * Math.cos(endAngleRad);
    const y3 = center + innerRadius * Math.sin(endAngleRad);
    const x4 = center + innerRadius * Math.cos(startAngleRad);
    const y4 = center + innerRadius * Math.sin(startAngleRad);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
  };

  // Calculate paths for each segment
  let currentAngle = 0;
  const paths = segments.map(segment => {
    const angle = (segment.count / total) * 360;
    const path = createPath(currentAngle, currentAngle + angle, radius, innerRadius);
    currentAngle += angle;
    
    return {
      ...segment,
      path,
      angle
    };
  });

  return (
    <div className="mt-5 w-[100%] h-[300px] bg-gray-100 border border-gray-300 rounded-lg flex flex-col items-center justify-center p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Sentiment Graph</h2>
      
      <div className="relative">
        <svg width="220" height="220" className="transform rotate-0">
          {paths.map((segment, index) => (
            <path
              key={segment.sentiment}
              d={segment.path}
              fill={segment.color}
              stroke="white"
              strokeWidth="2"
              className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
              onMouseEnter={() => setHoveredSegment(segment)}
              onMouseLeave={() => setHoveredSegment(null)}
            />
          ))}
        </svg>
        
        {/* Center text showing total or hovered segment */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            {hoveredSegment ? (
              <>
                <div className="text-xl font-bold text-gray-800">{hoveredSegment.count}</div>
                <div className="text-sm text-gray-600">{hoveredSegment.sentiment}</div>
                <div className="text-xs text-gray-500">({hoveredSegment.percentage.toFixed(1)}%)</div>
              </>
            ) : (
              <>
                <div className="text-xl font-bold text-gray-800">{total}</div>
                <div className="text-sm text-gray-600">Total</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SentimentPieChart;