def sector_stats(data):
    stats={}
    for p in data:
        stats.setdefault(p["sector"],[]).append(p["progress"])
    return {k:sum(v)/len(v) for k,v in stats.items()}

def risk_score(p):
    score=0
    if p["progress"]<60: score+=30
    if p["revised_cost"]>p["original_cost"]: score+=30
    if p["expenditure"]<p["revised_cost"]*0.5: score+=20
    return min(score,100)
